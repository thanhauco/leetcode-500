/**
 * Self-contained Web Worker source for the playground. Kept as a string so the
 * worker can be created from a Blob URL — this avoids bundler-specific worker
 * resolution and runs identically in dev and production.
 *
 * The worker receives { code, entry, tests, comparison }, evaluates the user's
 * JavaScript in an isolated scope, runs each test, and posts back results.
 */
export const runnerWorkerSource = String.raw`
self.onmessage = function (e) {
  var data = e.data || {};
  var code = data.code || "";
  var entry = data.entry;
  var tests = data.tests || [];
  var mode = data.comparison || "deep";

  function canonical(x) {
    if (Array.isArray(x)) {
      var arr = x.map(canonical);
      arr.sort(function (a, b) {
        var as = JSON.stringify(a), bs = JSON.stringify(b);
        return as < bs ? -1 : as > bs ? 1 : 0;
      });
      return arr;
    }
    return x;
  }

  function approxEqual(a, b, tol) {
    tol = (tol == null) ? 1e-6 : tol;
    if (typeof a === "number" && typeof b === "number") return Math.abs(a - b) <= tol;
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (var i = 0; i < a.length; i++) if (!approxEqual(a[i], b[i], tol)) return false;
      return true;
    }
    return JSON.stringify(a) === JSON.stringify(b);
  }

  function equal(actual, expected, m, tol) {
    if (m === "approx") return approxEqual(actual, expected, tol);
    if (m === "canonical" || m === "set") {
      return JSON.stringify(canonical(actual)) === JSON.stringify(canonical(expected));
    }
    return JSON.stringify(actual) === JSON.stringify(expected);
  }

  function clone(x) {
    try { return structuredClone(x); }
    catch (e) { try { return JSON.parse(JSON.stringify(x)); } catch (e2) { return x; } }
  }

  function safe(x) {
    try { return JSON.stringify(x); } catch (e) { return String(x); }
  }

  var fn;
  try {
    fn = new Function(code + "\nreturn typeof " + entry + " === \"function\" ? " + entry + " : undefined;")();
  } catch (err) {
    self.postMessage({ ok: false, error: "Syntax error: " + (err && err.message ? err.message : String(err)) });
    return;
  }

  if (typeof fn !== "function") {
    self.postMessage({ ok: false, error: 'Could not find a function named "' + entry + '". Make sure it is defined.' });
    return;
  }

  var results = [];
  for (var i = 0; i < tests.length; i++) {
    var t = tests[i] || {};
    var args = Array.isArray(t.args) ? t.args : [];
    var t0 = (self.performance && performance.now) ? performance.now() : Date.now();
    try {
      var out = fn.apply(null, args.map(clone));
      var t1 = (self.performance && performance.now) ? performance.now() : Date.now();
      results.push({
        name: t.name || ("case " + (i + 1)),
        pass: equal(out, t.expected, t.comparison || mode, t.tolerance),
        actual: safe(out),
        expected: safe(t.expected),
        ms: Math.round((t1 - t0) * 100) / 100,
      });
    } catch (err) {
      results.push({
        name: t.name || ("case " + (i + 1)),
        pass: false,
        error: (err && err.message) ? err.message : String(err),
        expected: safe(t.expected),
      });
    }
  }

  self.postMessage({ ok: true, results: results });
};
`;
