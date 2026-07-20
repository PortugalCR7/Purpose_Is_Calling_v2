#!/usr/bin/env node
// design/tokens.json rule 1 ("Never invent a design value") + AGENTS.md rule 1/2.
// Scans site/ for hardcoded colors, spacing, durations, and easing curves
// that should instead come from design/tokens.json / site/styles/tokens.css.
"use strict";

const fs = require("fs");
const path = require("path");

const SITE_ROOT = path.resolve(__dirname, "..");

const SCAN_EXTENSIONS = new Set([".tsx", ".ts", ".css"]);

const EXCLUDED_DIR_NAMES = new Set(["node_modules", ".next"]);

const EXCLUDED_FILES = new Set([
  path.join(SITE_ROOT, "next-env.d.ts"),
  path.join(SITE_ROOT, "styles", "tokens.css"),
]);

const IGNORE_MARKER = "token-lint-ignore";

// Ordered: longest/most-specific alternatives first so overlapping
// keywords (ease-in-out vs ease-in/ease-out) resolve to one match.
const EASING_RE =
  /\bcubic-bezier\([^)]*\)|\bease-in-out\b|\bease-in(?!-out)\b|\bease-out\b|\blinear\b(?!-gradient)/g;

const HEX_COLOR_RE = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b/g;

const COLOR_FN_RE = /\b(?:rgba?|hsla?)\(/g;

// Bare px, excluding 0px (handled by filtering matched value) and anything
// inside url(...) (stripped from the line before this regex runs).
const PX_RE = /(?<![\w.#-])(\d+(?:\.\d+)?)px\b/g;

// Bare ms/s duration literals, excluding 0ms/0s.
const DURATION_RE = /(?<![\w.#-])(\d+(?:\.\d+)?)(ms|s)\b/g;

function walk(dir, files) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (EXCLUDED_DIR_NAMES.has(entry.name)) continue;
      walk(path.join(dir, entry.name), files);
      continue;
    }
    const full = path.join(dir, entry.name);
    if (EXCLUDED_FILES.has(full)) continue;
    if (SCAN_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

function stripUrls(line) {
  // Blank out the contents of url(...) so px/duration numbers inside
  // asset paths (e.g. url(/fonts/foo-400.woff2)) don't trip the linter.
  return line.replace(/url\(([^)]*)\)/g, (m, inner) => `url(${" ".repeat(inner.length)})`);
}

function blank(str) {
  // Replace non-newline characters with spaces so column/line numbers of
  // remaining code stay accurate after stripping.
  return str.replace(/[^\n]/g, " ");
}

function stripComments(content, isCss) {
  // Block comments (/* ... */) — used heavily for JSDoc-style prose that
  // references token values in human units ("55px", "89ms") as
  // documentation, not as code. That prose isn't a hardcoded design value;
  // it is normal writing about one. Only literal values in live code should
  // fail the lint.
  let out = content.replace(/\/\*[\s\S]*?\*\//g, blank);
  if (!isCss) {
    // Line comments (// ...) for .ts/.tsx only — CSS has no // syntax.
    out = out.replace(/\/\/[^\n]*/g, blank);
  }
  return out;
}

function colToRuleCol(line, index) {
  return index + 1;
}

function scanLine(filePath, lineNumber, originalLine, strippedLine, violations) {
  if (originalLine.includes(IGNORE_MARKER)) {
    return { ignored: true };
  }

  const line = stripUrls(strippedLine);

  let m;

  HEX_COLOR_RE.lastIndex = 0;
  while ((m = HEX_COLOR_RE.exec(line))) {
    violations.push({
      file: filePath,
      line: lineNumber,
      col: colToRuleCol(line, m.index),
      rule: "hardcoded-hex-color",
      text: m[0],
    });
  }

  COLOR_FN_RE.lastIndex = 0;
  while ((m = COLOR_FN_RE.exec(line))) {
    violations.push({
      file: filePath,
      line: lineNumber,
      col: colToRuleCol(line, m.index),
      rule: "hardcoded-color-function",
      text: m[0],
    });
  }

  PX_RE.lastIndex = 0;
  while ((m = PX_RE.exec(line))) {
    if (Number(m[1]) === 0) continue;
    violations.push({
      file: filePath,
      line: lineNumber,
      col: colToRuleCol(line, m.index),
      rule: "bare-px-value",
      text: m[0],
    });
  }

  DURATION_RE.lastIndex = 0;
  while ((m = DURATION_RE.exec(line))) {
    if (Number(m[1]) === 0) continue;
    violations.push({
      file: filePath,
      line: lineNumber,
      col: colToRuleCol(line, m.index),
      rule: "bare-duration-value",
      text: m[0],
    });
  }

  EASING_RE.lastIndex = 0;
  while ((m = EASING_RE.exec(line))) {
    violations.push({
      file: filePath,
      line: lineNumber,
      col: colToRuleCol(line, m.index),
      rule: "non-token-easing",
      text: m[0],
    });
  }

  return { ignored: false };
}

function main() {
  const files = walk(SITE_ROOT, []);
  const violations = [];
  let ignoreCount = 0;
  const ignoreLocations = [];

  for (const file of files) {
    const rel = path.relative(process.cwd(), file);
    const rawContent = fs.readFileSync(file, "utf8");
    const isCss = path.extname(file) === ".css";
    const strippedContent = stripComments(rawContent, isCss);
    const rawLines = rawContent.split("\n");
    const strippedLines = strippedContent.split("\n");
    strippedLines.forEach((strippedLine, i) => {
      const { ignored } = scanLine(rel, i + 1, rawLines[i], strippedLine, violations);
      if (ignored) {
        ignoreCount += 1;
        ignoreLocations.push(`${rel}:${i + 1}`);
      }
    });
  }

  if (violations.length > 0) {
    for (const v of violations) {
      console.log(`${v.file}:${v.line}:${v.col}  ${v.rule}  ${v.text}`);
    }
  }

  if (ignoreLocations.length > 0) {
    console.log("");
    console.log("token-lint-ignore uses:");
    for (const loc of ignoreLocations) {
      console.log(`  ${loc}`);
    }
  }

  console.log("");
  console.log(
    `tokens:check — files scanned: ${files.length}, violations: ${violations.length}, ignores used: ${ignoreCount}`,
  );

  process.exit(violations.length > 0 ? 1 : 0);
}

main();
