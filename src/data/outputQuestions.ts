// AUTO-GENERATED from src/content/lessons/js-output/*.mdx — predict-the-output quiz bank.
// Each: { id, cat, title, code, answer (expected console output), why (explanation markdown) }.
export interface OutputQuestion { id: string; cat: string; title: string; code: string; answer: string; why: string; }
export const OUTPUT_QUESTIONS: OutputQuestion[] = [
  {
    "id": "hoisting-scope-1",
    "cat": "Hoisting & Scope",
    "title": "var hoisting: declaration but not initialization",
    "code": "console.log(a);   // ?\nvar a = 5;\nconsole.log(a);   // ?",
    "answer": "undefined\n5",
    "why": "`var` declarations are hoisted to the top of their function/global scope but their *value* is not. The engine treats it as:\n```js\nvar a;          // hoisted — exists but is undefined\nconsole.log(a); // undefined\na = 5;\nconsole.log(a); // 5\n```"
  },
  {
    "id": "hoisting-scope-2",
    "cat": "Hoisting & Scope",
    "title": "let/const: Temporal Dead Zone",
    "code": "console.log(x);   // ?\nlet x = 10;",
    "answer": "ReferenceError: Cannot access 'x' before initialization",
    "why": "`let` and `const` are hoisted but placed in the **Temporal Dead Zone** — they exist but are inaccessible until the declaration line is evaluated. Accessing them before that line throws a `ReferenceError`."
  },
  {
    "id": "hoisting-scope-3",
    "cat": "Hoisting & Scope",
    "title": "function declaration vs expression",
    "code": "console.log(foo());   // ?\nconsole.log(bar);     // ?\n// console.log(bar()); // would throw — uncomment to see\n\nfunction foo() { return 'foo'; }\nvar bar = function() { return 'bar'; };",
    "answer": "\"foo\"\nundefined",
    "why": "- **Function declarations** are fully hoisted — both the name and the body. You can call `foo()` before its definition.\n- **Function expressions** (`var bar = function…`) hoist only the `var bar` — the variable is `undefined` until that line runs. Calling `bar()` before line 5 throws `TypeError: bar is not a function`."
  },
  {
    "id": "hoisting-scope-4",
    "cat": "Hoisting & Scope",
    "title": "var in a block scope",
    "code": "{\n  var x = 1;\n  let y = 2;\n}\nconsole.log(x);   // ?\nconsole.log(typeof y); // ?",
    "answer": "1\n\"undefined\"",
    "why": "`var` ignores block scope — `x` leaks out of the block into the surrounding function/global scope. `let` is block-scoped, so `y` doesn't exist outside the `{}`. `typeof` on an undeclared variable returns `\"undefined\"` (not a ReferenceError — a special case)."
  },
  {
    "id": "hoisting-scope-5",
    "cat": "Hoisting & Scope",
    "title": "hoisting order: function vs var with same name",
    "code": "console.log(typeof foo);   // ?\nvar foo = 'variable';\nfunction foo() { return 'function'; }\nconsole.log(typeof foo);   // ?",
    "answer": "\"function\"\n\"string\"",
    "why": "When a variable and a function declaration share the same name, the **function declaration wins** during hoisting — it takes precedence over `var`. So before any code runs, `foo` is the function. After `foo = 'variable'` runs on line 2, `foo` becomes the string."
  },
  {
    "id": "hoisting-scope-6",
    "cat": "Hoisting & Scope",
    "title": "function declaration inside a block (non-strict mode)",
    "code": "console.log(typeof f);   // ?\n\nif (true) {\n  console.log(typeof f); // ?\n  function f() { return 1; }\n  console.log(typeof f); // ?\n}\n\nconsole.log(typeof f);   // ?",
    "answer": "\"undefined\"   (outer, before block)\n\"function\"    (inside block, after hoisting within block)\n\"function\"    (inside block, after declaration)\n\"function\"    (outer, after block — hoisted out in non-strict mode)",
    "why": "In non-strict mode, function declarations inside blocks have complex legacy behavior: the declaration is hoisted to the top of the block, but the name is also created in the outer scope (as `undefined` initially), and when execution passes the declaration line, the outer binding is updated. This is an engine-specific quirk — in strict mode, block-scoped functions stay in the block. **Avoid block-level function declarations.**"
  },
  {
    "id": "hoisting-scope-7",
    "cat": "Hoisting & Scope",
    "title": "var in a for loop",
    "code": "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}\n// What are the three outputs?",
    "answer": "3\n3\n3",
    "why": "`var` is function-scoped — there is **one shared `i`** across all iterations. By the time the `setTimeout` callbacks fire (after the loop completes), `i` is `3`. All three closures close over the same binding."
  },
  {
    "id": "hoisting-scope-8",
    "cat": "Hoisting & Scope",
    "title": "let fixes the loop bug",
    "code": "for (let j = 0; j < 3; j++) {\n  setTimeout(() => console.log(j), 0);\n}\n// What are the three outputs?",
    "answer": "0\n1\n2",
    "why": "`let` is block-scoped and creates a **fresh binding per iteration**. Each callback closes over its own independent `j`."
  },
  {
    "id": "hoisting-scope-9",
    "cat": "Hoisting & Scope",
    "title": "hoisting with re-declaration",
    "code": "var a = 1;\n{\n  var a = 2;  // re-declaration\n  console.log(a); // ?\n}\nconsole.log(a);   // ?",
    "answer": "2\n2",
    "why": "Both `var a` declarations are in the same function/global scope — `var` allows re-declaration and they both refer to the same variable. The inner block updates the shared `a` to `2`, so both logs print `2`."
  },
  {
    "id": "hoisting-scope-10",
    "cat": "Hoisting & Scope",
    "title": "const in a block",
    "code": "const x = 1;\n{\n  const x = 2;\n  console.log(x); // ?\n}\nconsole.log(x);   // ?",
    "answer": "2\n1",
    "why": "`const` is block-scoped — the inner `const x = 2` is a completely separate binding from the outer `const x = 1`. No error; each block has its own `x`."
  },
  {
    "id": "hoisting-scope-11",
    "cat": "Hoisting & Scope",
    "title": "function parameter shadowing",
    "code": "var x = 'global';\n\nfunction test(x) {\n  console.log(x);   // ?\n}\n\ntest('local');\nconsole.log(x);     // ?",
    "answer": "\"local\"\n\"global\"",
    "why": "The parameter `x` shadows the outer `x` within the function body. The global `x` is untouched."
  },
  {
    "id": "hoisting-scope-12",
    "cat": "Hoisting & Scope",
    "title": "class declaration hoisting",
    "code": "const obj = new MyClass(); // ?\nclass MyClass {\n  constructor() { this.val = 42; }\n}\nconsole.log(new MyClass().val); // ?",
    "answer": "ReferenceError: Cannot access 'MyClass' before initialization",
    "why": "`class` declarations are hoisted but placed in the **TDZ**, just like `let`/`const`. You cannot use a class before its declaration. (The second `console.log` never runs.)"
  },
  {
    "id": "closures-loops-1",
    "cat": "Closures & Loops",
    "title": "basic closure capture",
    "code": "function outer() {\n  let count = 0;\n  return function inner() {\n    count++;\n    return count;\n  };\n}\n\nconst fn = outer();\nconsole.log(fn()); // ?\nconsole.log(fn()); // ?\nconsole.log(fn()); // ?\n\nconst fn2 = outer(); // fresh closure\nconsole.log(fn2()); // ?",
    "answer": "1\n2\n3\n1",
    "why": "`inner` closes over `count` by **reference**, not by value. Each call to `fn()` reads and increments the same `count` variable in `outer`'s scope. `fn2` is a fresh invocation of `outer`, creating an independent `count` starting at `0`."
  },
  {
    "id": "closures-loops-2",
    "cat": "Closures & Loops",
    "title": "classic var loop bug",
    "code": "const funcs = [];\n\nfor (var i = 0; i < 3; i++) {\n  funcs.push(function() { return i; });\n}\n\nconsole.log(funcs[0]()); // ?\nconsole.log(funcs[1]()); // ?\nconsole.log(funcs[2]()); // ?",
    "answer": "3\n3\n3",
    "why": "All three functions close over the **same** `i` variable (because `var` is function-scoped, not block-scoped). By the time any function is called, the loop has finished and `i === 3`."
  },
  {
    "id": "closures-loops-3",
    "cat": "Closures & Loops",
    "title": "IIFE fix for the loop bug",
    "code": "const funcs = [];\n\nfor (var i = 0; i < 3; i++) {\n  funcs.push((function(j) {\n    return function() { return j; };\n  })(i));    // IIFE captures i as j by value\n}\n\nconsole.log(funcs[0]()); // ?\nconsole.log(funcs[1]()); // ?\nconsole.log(funcs[2]()); // ?",
    "answer": "0\n1\n2",
    "why": "The IIFE immediately invokes a new function with `i` passed as the argument `j`. Each iteration creates a **new scope** with its own `j`, freezing the current value of `i`. The inner function closes over `j`, which is independent per iteration."
  },
  {
    "id": "closures-loops-4",
    "cat": "Closures & Loops",
    "title": "closure over a variable that changes",
    "code": "let x = 10;\n\nfunction getX() {\n  return x;\n}\n\nconsole.log(getX()); // ?\nx = 20;\nconsole.log(getX()); // ?",
    "answer": "10\n20",
    "why": "Closures capture variables by **reference**, not snapshot. `getX` always reads the current value of `x`. When `x` changes to `20`, the next call sees `20`. This is why stale closures in React happen — a hook's closure captures the value at the time the function was created, but if the variable changes and the function isn't recreated, it sees the old value."
  },
  {
    "id": "closures-loops-5",
    "cat": "Closures & Loops",
    "title": "multiple closures sharing a variable",
    "code": "function makeCounter() {\n  let count = 0;\n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    value: () => count,\n  };\n}\n\nconst c = makeCounter();\nc.increment();\nc.increment();\nc.increment();\nc.decrement();\nconsole.log(c.value()); // ?",
    "answer": "2",
    "why": "All three methods close over the **same `count`** — they share the binding. `increment` is called 3× (count = 3), `decrement` once (count = 2)."
  },
  {
    "id": "closures-loops-6",
    "cat": "Closures & Loops",
    "title": "function factory with parameter",
    "code": "function multiplier(factor) {\n  return (number) => number * factor;\n}\n\nconst double = multiplier(2);\nconst triple = multiplier(3);\n\nconsole.log(double(5));  // ?\nconsole.log(triple(5));  // ?\nconsole.log(double(triple(2))); // ?",
    "answer": "10\n15\n12",
    "why": "`double` closes over `factor = 2`; `triple` over `factor = 3`. They're independent closures with different `factor` values. `triple(2)` = 6, then `double(6)` = 12."
  },
  {
    "id": "closures-loops-7",
    "cat": "Closures & Loops",
    "title": "stale closure in setTimeout",
    "code": "function test() {\n  let val = 0;\n\n  setTimeout(function() {\n    console.log(val); // ?\n  }, 100);\n\n  val = 42;\n}\n\ntest();",
    "answer": "42",
    "why": "The callback closes over `val` by reference. By the time the `setTimeout` fires (100ms later), `val` has been updated to `42`. It reads the **current** value at execution time, not a snapshot from when `setTimeout` was called."
  },
  {
    "id": "closures-loops-8",
    "cat": "Closures & Loops",
    "title": "closure inside object method",
    "code": "const obj = {\n  value: 10,\n  getValue: function() {\n    return function() {\n      return this.value;  // ?\n    };\n  }\n};\n\nconst fn = obj.getValue();\nconsole.log(fn()); // ?",
    "answer": "undefined",
    "why": "The inner function is a plain function, not a method. When called as `fn()` (not `obj.something()`), `this` is the global object (`window` in browser) or `undefined` in strict mode. `window.value` is `undefined`. Fix with `() =>` (arrow inherits outer `this`) or `.bind(obj)`."
  },
  {
    "id": "closures-loops-9",
    "cat": "Closures & Loops",
    "title": "IIFE output",
    "code": "const result = (function(a, b) {\n  return a + b;\n})(3, 4);\n\nconsole.log(result); // ?\n\n(function() {\n  var secret = 42;\n  console.log(secret); // ?\n})();\n\nconsole.log(typeof secret); // ?",
    "answer": "7\n42\n\"undefined\"",
    "why": "IIFEs execute immediately and return their value. `result` is `7`. The second IIFE logs `42` internally. `secret` is scoped inside the IIFE — it doesn't pollute the outer scope, so `typeof secret` is `\"undefined\"` (no ReferenceError because `typeof` on an undeclared name is safe)."
  },
  {
    "id": "closures-loops-10",
    "cat": "Closures & Loops",
    "title": "closure counter with reset",
    "code": "function createCounter(start = 0) {\n  let count = start;\n  return {\n    next() { return ++count; },\n    peek() { return count; },\n    reset() { count = start; },\n  };\n}\n\nconst c = createCounter(5);\nconsole.log(c.next());  // ?\nconsole.log(c.next());  // ?\nconsole.log(c.peek());  // ?\nc.reset();\nconsole.log(c.peek());  // ?",
    "answer": "6\n7\n7\n5",
    "why": "`start` and `count` are both in the closure. `reset()` sets `count` back to `start` (the original argument), which is still accessible because it's part of the outer function scope."
  },
  {
    "id": "closures-loops-11",
    "cat": "Closures & Loops",
    "title": "closure over let in switch",
    "code": "function test(n) {\n  switch(n) {\n    case 1:\n      let msg = 'one';\n      console.log(msg);\n      break;\n    case 2:\n      // console.log(msg); // What would this do?\n      let msg = 'two';    // ?\n      break;\n  }\n}\n\ntry { test(1); } catch(e) { console.log('Error:', e.message); }",
    "answer": "Error: Identifier 'msg' has already been declared",
    "why": "All `case` clauses in a `switch` share **one block scope**. The two `let msg` declarations conflict — you get a `SyntaxError` at parse time. Fix: wrap each case body in `{}` to give each case its own block.\n```js\ncase 1: { let msg = 'one'; ... break; }\ncase 2: { let msg = 'two'; ... break; }\n```"
  },
  {
    "id": "closures-loops-12",
    "cat": "Closures & Loops",
    "title": "closure in class method",
    "code": "class Timer {\n  constructor() {\n    this.seconds = 0;\n  }\n\n  start() {\n    setInterval(function() {\n      this.seconds++;           // ?\n      console.log(this.seconds);\n    }, 100);\n  }\n}\n\n// const t = new Timer();\n// t.start();  // What happens after 1 tick?\nconsole.log(\"What would t.start() log?\");",
    "answer": "NaN (after each tick)",
    "why": "The `function()` callback loses `this` — inside a regular function passed to `setInterval`, `this` is `window`/`undefined`. `window.seconds` is `undefined`, and `undefined++` is `NaN`. Fix: use an arrow function `() => { this.seconds++; }` — arrows inherit `this` from the enclosing class method."
  },
  {
    "id": "event-loop-async-1",
    "cat": "Event Loop & Async",
    "title": "the classic A/D/C/B",
    "code": "console.log('A');\n\nsetTimeout(() => console.log('B'), 0);\n\nPromise.resolve().then(() => console.log('C'));\n\nconsole.log('D');",
    "answer": "A\nD\nC\nB",
    "why": "1. `A` — synchronous, runs immediately.\n2. `B` — `setTimeout` schedules a **macrotask**.\n3. `C` — `Promise.resolve().then` schedules a **microtask**.\n4. `D` — synchronous, runs immediately.\n5. After the script finishes: drain microtasks → `C` fires.\n6. Pick the next macrotask → `B` fires."
  },
  {
    "id": "event-loop-async-2",
    "cat": "Event Loop & Async",
    "title": "Promise constructor is synchronous",
    "code": "console.log('1');\n\nnew Promise((resolve) => {\n  console.log('2');   // ?\n  resolve('3');\n  console.log('4');   // ?\n}).then((v) => console.log(v));\n\nconsole.log('5');",
    "answer": "1\n2\n4\n5\n3",
    "why": "The **executor function** (the callback you pass to `new Promise`) runs **synchronously**. Only `.then` is asynchronous (microtask). So `2` and `4` log before the script reaches `5`. After the script, the microtask runs and logs `3`."
  },
  {
    "id": "event-loop-async-3",
    "cat": "Event Loop & Async",
    "title": "chained promises ordering",
    "code": "Promise.resolve()\n  .then(() => {\n    console.log('A');\n    return 'B';\n  })\n  .then((v) => console.log(v))\n  .then(() => console.log('C'));\n\nPromise.resolve()\n  .then(() => console.log('D'));\n\nconsole.log('E');",
    "answer": "E\nA\nD\nB\nC",
    "why": "Both chains queue their first `.then` as microtasks at the same time. After `E` (sync), the microtask queue is: [A-handler, D-handler]. \n- A-handler runs → logs `A`, returns `'B'` → queues B-handler.\n- D-handler runs → logs `D`.\n- B-handler runs → logs `B`, queues C-handler.\n- C-handler runs → logs `C`.\n\nMicrotasks interleave between chains — it's a single FIFO queue."
  },
  {
    "id": "event-loop-async-4",
    "cat": "Event Loop & Async",
    "title": "async/await unwrapping",
    "code": "async function foo() {\n  console.log('1');\n  await Promise.resolve();\n  console.log('2');\n}\n\nconsole.log('3');\nfoo();\nconsole.log('4');",
    "answer": "3\n1\n4\n2",
    "why": "`foo()` starts synchronously: logs `1`, then hits `await`. `await` suspends `foo` (schedules the continuation as a microtask) and returns control to the caller. The caller logs `4`. After the synchronous script ends, the microtask queue runs and resumes `foo` → logs `2`."
  },
  {
    "id": "event-loop-async-5",
    "cat": "Event Loop & Async",
    "title": "await inside a loop (series not parallel)",
    "code": "function delay(ms, val) {\n  return new Promise(r => setTimeout(() => r(val), ms));\n}\n\nasync function run() {\n  console.log('start');\n  const a = await delay(0, 'A');\n  console.log(a);\n  const b = await delay(0, 'B');\n  console.log(b);\n  console.log('done');\n}\n\nrun();\nconsole.log('sync after run()');",
    "answer": "start\nsync after run()\nA\nB\ndone",
    "why": "Each `await` suspends the async function. `'sync after run()'` logs immediately after `run()` is called (before the first delay resolves). Then each `delay` resolves sequentially (because each `await` waits for the previous one)."
  },
  {
    "id": "event-loop-async-6",
    "cat": "Event Loop & Async",
    "title": "Promise.all vs sequential await",
    "code": "function delay(ms, val) {\n  return new Promise(r => setTimeout(() => r(val), ms));\n}\n\nasync function run() {\n  // Sequential (slow)\n  const a = await delay(100, 'A');\n  const b = await delay(100, 'B');\n  console.log('seq:', a, b);\n\n  // Parallel (fast)\n  const [c, d] = await Promise.all([delay(100, 'C'), delay(100, 'D')]);\n  console.log('par:', c, d);\n}\n\nrun();",
    "answer": "seq: A B   (after ~200ms)\npar: C D   (after ~300ms total, ~100ms after seq)",
    "why": "Sequential `await` means the second delay doesn't even *start* until the first resolves. Total: 200ms. `Promise.all` starts both simultaneously — both fire at the same time. Total extra: 100ms. The ordering of these two logs is always `seq` then `par`."
  },
  {
    "id": "event-loop-async-7",
    "cat": "Event Loop & Async",
    "title": "microtask flood",
    "code": "setTimeout(() => console.log('timeout'), 0);\n\nPromise.resolve()\n  .then(() => {\n    console.log('p1');\n    return Promise.resolve();\n  })\n  .then(() => {\n    console.log('p2');\n    return Promise.resolve();\n  })\n  .then(() => console.log('p3'));\n\nconsole.log('sync');",
    "answer": "sync\np1\np2\np3\ntimeout",
    "why": "The microtask queue drains **completely** before any macrotask runs. Even though the chain creates new microtasks on the fly (each `.then` adds the next to the queue), they all resolve before the `setTimeout` callback fires. `timeout` always comes last."
  },
  {
    "id": "event-loop-async-8",
    "cat": "Event Loop & Async",
    "title": "async error handling order",
    "code": "async function fail() {\n  throw new Error('oops');\n}\n\nasync function run() {\n  console.log('1');\n  try {\n    await fail();\n    console.log('2');    // ?\n  } catch (e) {\n    console.log('3:', e.message);\n  }\n  console.log('4');\n}\n\nrun();\nconsole.log('5');",
    "answer": "1\n5\n3: oops\n4",
    "why": "`run()` executes `1` synchronously, then hits `await fail()`. `fail()` throws synchronously but since it's an async function, the error becomes a rejected Promise. `await` catches the rejection and resumes at the `catch` block as a microtask. Meanwhile `5` (sync) runs. Then the microtask fires: `3: oops`, then `4`.\n\n`2` never prints — `await` threw."
  },
  {
    "id": "event-loop-async-9",
    "cat": "Event Loop & Async",
    "title": "nested async functions",
    "code": "async function inner() {\n  console.log('inner start');\n  await Promise.resolve();\n  console.log('inner end');\n  return 'result';\n}\n\nasync function outer() {\n  console.log('outer start');\n  const r = await inner();\n  console.log('outer end:', r);\n}\n\nouter();\nconsole.log('sync');",
    "answer": "outer start\ninner start\nsync\ninner end\nouter end: result",
    "why": "`outer` logs `outer start`, calls `inner`. `inner` logs `inner start`, hits `await` — suspends. Control returns to `outer`, which also awaits `inner`. Control returns to the synchronous code → `sync`. \n\nMicrotask 1: `inner` resumes → `inner end` → returns `'result'`.\nMicrotask 2: `outer` resumes with `r = 'result'` → `outer end: result`."
  },
  {
    "id": "event-loop-async-10",
    "cat": "Event Loop & Async",
    "title": "queueMicrotask vs Promise.resolve",
    "code": "console.log('1');\n\nsetTimeout(() => console.log('2'), 0);\n\nqueueMicrotask(() => console.log('3'));\n\nPromise.resolve().then(() => console.log('4'));\n\nqueueMicrotask(() => console.log('5'));\n\nconsole.log('6');",
    "answer": "1\n6\n3\n4\n5\n2",
    "why": "`queueMicrotask` adds directly to the microtask queue — same as `Promise.resolve().then(…)`. All microtasks drain before the macrotask (`setTimeout`). The microtask queue order is FIFO: `3` was queued first, then `4` (from Promise.then), then `5`."
  },
  {
    "id": "event-loop-async-11",
    "cat": "Event Loop & Async",
    "title": "Promise.resolve with a thenable",
    "code": "const p = Promise.resolve(\n  Promise.resolve('value')\n);\n\np.then(v => console.log(v)); // ?\nconsole.log('sync');",
    "answer": "sync\nvalue",
    "why": "`Promise.resolve(promise)` returns the **same** promise when passed a native Promise — it doesn't wrap it. The `.then` callback fires as a microtask after sync code. The value is `'value'`. (Note: if you pass a *thenable* that's not a native Promise, there's an extra microtask tick — but for native Promises, it's resolved immediately.)"
  },
  {
    "id": "event-loop-async-12",
    "cat": "Event Loop & Async",
    "title": "setTimeout(fn, 0) race with multiple promises",
    "code": "console.log('start');\n\nsetTimeout(() => console.log('timeout 1'), 0);\nsetTimeout(() => console.log('timeout 2'), 0);\n\nPromise.resolve().then(() => {\n  console.log('p1');\n  return Promise.resolve();\n}).then(() => console.log('p2'));\n\nconsole.log('end');",
    "answer": "start\nend\np1\np2\ntimeout 1\ntimeout 2",
    "why": "Both `setTimeout` callbacks are macrotasks queued in order. Both `.then` callbacks are microtasks. After `end` (sync), the microtask queue drains fully (p1 → p2). Then macrotasks run one by one: timeout 1 → timeout 2."
  },
  {
    "id": "this-prototype-1",
    "cat": "this & Prototype",
    "title": "implicit binding",
    "code": "const obj = {\n  name: 'Alice',\n  greet() {\n    return 'Hello, ' + this.name;\n  }\n};\n\nconsole.log(obj.greet()); // ?\n\nconst fn = obj.greet;\nconsole.log(fn());        // ?",
    "answer": "\"Hello, Alice\"\n\"Hello, undefined\"",
    "why": "`obj.greet()` — implicit binding: `this` is `obj`. `fn()` — the method is extracted into a plain variable, so when called as `fn()`, `this` is global (`window`) or `undefined` (strict). `window.name` is `\"\"` (empty string in browsers, `undefined` in Node strict)."
  },
  {
    "id": "this-prototype-2",
    "cat": "this & Prototype",
    "title": "call, apply, bind",
    "code": "function greet(greeting, punctuation) {\n  return greeting + ', ' + this.name + punctuation;\n}\n\nconst user = { name: 'Bob' };\n\nconsole.log(greet.call(user, 'Hello', '!'));      // ?\nconsole.log(greet.apply(user, ['Hi', '?']));      // ?\n\nconst bound = greet.bind(user, 'Hey');\nconsole.log(bound('.')); // ?",
    "answer": "\"Hello, Bob!\"\n\"Hi, Bob?\"\n\"Hey, Bob.\"",
    "why": "- `call(thisArg, ...args)` — sets `this` and spreads args.\n- `apply(thisArg, argsArray)` — same but args as array.\n- `bind(thisArg, ...partialArgs)` — returns a **new function** with `this` permanently bound. The `'Hey'` is partially applied; `'.'` is the remaining argument."
  },
  {
    "id": "this-prototype-3",
    "cat": "this & Prototype",
    "title": "arrow function: no own this",
    "code": "const obj = {\n  value: 42,\n  regular: function() {\n    return this.value;\n  },\n  arrow: () => {\n    return this.value;\n  }\n};\n\nconsole.log(obj.regular()); // ?\nconsole.log(obj.arrow());   // ?",
    "answer": "42\nundefined",
    "why": "`regular()` — implicit binding: `this` is `obj`, so `this.value` is `42`. `arrow()` — arrow functions **don't have their own `this`**. They inherit `this` from where they were *defined* — at the object literal level, which is the global scope. `global.value` is `undefined`."
  },
  {
    "id": "this-prototype-4",
    "cat": "this & Prototype",
    "title": "this in nested functions",
    "code": "const obj = {\n  name: 'Outer',\n  getNameFn: function() {\n    return function() {\n      return this.name;  // ?\n    };\n  },\n  getNameArrow: function() {\n    return () => {\n      return this.name;  // ?\n    };\n  }\n};\n\nconst fn1 = obj.getNameFn()();\nconst fn2 = obj.getNameArrow()();\n\nconsole.log(fn1); // ?\nconsole.log(fn2); // ?",
    "answer": "undefined\n\"Outer\"",
    "why": "`getNameFn()` returns a plain function. When called as `()`, `this` is global → `global.name` is `undefined`. \n`getNameArrow()` returns an arrow function. Arrows inherit `this` from the enclosing scope — which is `getNameArrow`'s `this`, which is `obj` (called as `obj.getNameArrow()`). So `this.name` is `\"Outer\"`."
  },
  {
    "id": "this-prototype-5",
    "cat": "this & Prototype",
    "title": "new binding",
    "code": "function Person(name) {\n  this.name = name;\n  this.sayHi = function() {\n    return 'Hi, I am ' + this.name;\n  };\n}\n\nconst p1 = new Person('Alice');\nconst p2 = new Person('Bob');\n\nconsole.log(p1.sayHi());              // ?\nconsole.log(p2.sayHi());              // ?\nconsole.log(p1.sayHi === p2.sayHi); // ?",
    "answer": "\"Hi, I am Alice\"\n\"Hi, I am Bob\"\nfalse",
    "why": "`new Person('Alice')` creates a fresh object, sets `this` to it, runs the constructor, and returns it. Each instance has its own `name` AND its own `sayHi` function (because it's created inside the constructor — this wastes memory). If `sayHi` were on `Person.prototype`, instances would share one copy."
  },
  {
    "id": "this-prototype-6",
    "cat": "this & Prototype",
    "title": "prototype chain lookup",
    "code": "function Animal(name) {\n  this.name = name;\n}\nAnimal.prototype.speak = function() {\n  return this.name + ' speaks';\n};\n\nconst a = new Animal('Dog');\n\nconsole.log(a.name);                      // ?\nconsole.log(a.speak());                   // ?\nconsole.log(a.hasOwnProperty('name'));    // ?\nconsole.log(a.hasOwnProperty('speak'));   // ?\nconsole.log(a.__proto__ === Animal.prototype); // ?",
    "answer": "\"Dog\"\n\"Dog speaks\"\ntrue\nfalse\ntrue",
    "why": "`name` is an **own property** on `a`. `speak` is on `Animal.prototype` — not own. When you access `a.speak`, JS walks the prototype chain: `a` → `Animal.prototype` (found!). `hasOwnProperty` returns `false` for prototype-inherited properties. `a.__proto__` points to `Animal.prototype`."
  },
  {
    "id": "this-prototype-7",
    "cat": "this & Prototype",
    "title": "class inheritance and super",
    "code": "class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n  speak() {\n    return this.name + ' makes a noise.';\n  }\n}\n\nclass Dog extends Animal {\n  speak() {\n    return super.speak() + ' Woof!';\n  }\n}\n\nconst d = new Dog('Rex');\nconsole.log(d.speak());                       // ?\nconsole.log(d instanceof Dog);                // ?\nconsole.log(d instanceof Animal);             // ?\nconsole.log(Object.getPrototypeOf(Dog) === Animal); // ?",
    "answer": "\"Rex makes a noise. Woof!\"\ntrue\ntrue\ntrue",
    "why": "`Dog.speak()` calls `super.speak()` which invokes `Animal.prototype.speak` with `this` still being the Dog instance (`d`). `instanceof` walks the prototype chain — `d` is both a `Dog` and an `Animal`. `Object.getPrototypeOf(Dog)` (not the instance — the class itself!) is `Animal` — classes inherit static methods too."
  },
  {
    "id": "this-prototype-8",
    "cat": "this & Prototype",
    "title": "this lost in callback",
    "code": "class Button {\n  constructor(label) {\n    this.label = label;\n  }\n\n  clickRegular() {\n    setTimeout(function() {\n      console.log('regular:', this.label); // ?\n    }, 0);\n  }\n\n  clickArrow() {\n    setTimeout(() => {\n      console.log('arrow:', this.label);   // ?\n    }, 0);\n  }\n}\n\nconst btn = new Button('Save');\nbtn.clickRegular();\nbtn.clickArrow();",
    "answer": "regular: undefined\narrow: Save",
    "why": "`clickRegular` — the callback is a regular function. When `setTimeout` calls it, `this` is global/undefined. `global.label` is `undefined`. \n`clickArrow` — arrow function captures `this` from `clickArrow`'s scope (which is the `Button` instance), so `this.label` is `'Save'`."
  },
  {
    "id": "this-prototype-9",
    "cat": "this & Prototype",
    "title": "bind priority over implicit",
    "code": "function greet() {\n  return this.name;\n}\n\nconst obj1 = { name: 'A', greet };\nconst obj2 = { name: 'B' };\n\nconst boundToObj2 = obj1.greet.bind(obj2);\n\nconsole.log(obj1.greet());     // ?\nconsole.log(boundToObj2());    // ?",
    "answer": "\"A\"\n\"B\"",
    "why": "`obj1.greet()` — implicit binding → `this` is `obj1`. `boundToObj2()` — explicit `bind` wins over implicit. Even though `greet` was originally accessed via `obj1`, `bind(obj2)` permanently sets `this` to `obj2`."
  },
  {
    "id": "this-prototype-10",
    "cat": "this & Prototype",
    "title": "class static this",
    "code": "class Counter {\n  static count = 0;\n\n  static increment() {\n    this.count++;\n    return this.count;\n  }\n}\n\nclass SpecialCounter extends Counter {\n  static count = 100;\n}\n\nconsole.log(Counter.increment());        // ?\nconsole.log(SpecialCounter.increment()); // ?\nconsole.log(Counter.count);             // ?\nconsole.log(SpecialCounter.count);      // ?",
    "answer": "1\n101\n1\n101",
    "why": "Static methods are called on the class itself — `this` is the class (constructor function). `Counter.increment()` uses `this = Counter`, so `Counter.count` becomes `1`. `SpecialCounter.increment()` — even though `increment` is inherited from `Counter`, `this` is `SpecialCounter`, so `SpecialCounter.count` becomes `101`. Each subclass has its own `count`."
  },
  {
    "id": "this-prototype-11",
    "cat": "this & Prototype",
    "title": "prototype property vs own property",
    "code": "function Foo() {\n  this.x = 1;\n}\nFoo.prototype.x = 2;\nFoo.prototype.y = 3;\n\nconst f = new Foo();\n\nconsole.log(f.x);  // ?\nconsole.log(f.y);  // ?\n\ndelete f.x;\nconsole.log(f.x);  // ?",
    "answer": "1\n3\n2",
    "why": "`f.x` — own property `1` shadows `Foo.prototype.x = 2`. `f.y` — not own, found on prototype: `3`. After `delete f.x` removes the **own** property, the prototype's `x = 2` is revealed. `delete` only removes own properties."
  },
  {
    "id": "this-prototype-12",
    "cat": "this & Prototype",
    "title": "Object.create and prototype",
    "code": "const proto = {\n  greet() { return 'Hello from ' + this.name; }\n};\n\nconst obj = Object.create(proto);\nobj.name = 'World';\n\nconsole.log(obj.greet());                          // ?\nconsole.log(Object.getPrototypeOf(obj) === proto); // ?\nconsole.log(obj.hasOwnProperty('greet'));           // ?\nconsole.log(obj.hasOwnProperty('name'));            // ?",
    "answer": "\"Hello from World\"\ntrue\nfalse\ntrue",
    "why": "`Object.create(proto)` creates an object whose `[[Prototype]]` is `proto`. `obj.greet()` finds `greet` on the prototype; `this` is `obj` (implicit binding). `greet` is NOT an own property — it's on the prototype. `name` IS an own property (set directly on `obj`)."
  },
  {
    "id": "coercion-operators-1",
    "cat": "Coercion & Operators",
    "title": "the + operator with mixed types",
    "code": "console.log(1 + '2');        // ?\nconsole.log('3' - 1);       // ?\nconsole.log(1 + 2 + '3');   // ?\nconsole.log('1' + 2 + 3);   // ?\nconsole.log(+'3');           // ?\nconsole.log(+true);          // ?\nconsole.log(+null);          // ?\nconsole.log(+undefined);     // ?\nconsole.log(+[]);            // ?\nconsole.log(+{});            // ?",
    "answer": "\"12\"\n2\n\"33\"\n\"123\"\n3\n1\n0\nNaN\n0\nNaN",
    "why": "- `+` prefers concatenation when either operand is a string.\n- `-` always converts to numbers (no string subtraction).\n- `1 + 2 + '3'` → left to right: `3 + '3'` → `'33'`.\n- `'1' + 2 + 3` → `'12' + 3` → `'123'`.\n- Unary `+` calls `ToNumber`: `+true` = 1, `+null` = 0, `+undefined` = NaN, `+[]` = `+''` = 0, `+{}` = NaN."
  },
  {
    "id": "coercion-operators-2",
    "cat": "Coercion & Operators",
    "title": "loose equality zoo",
    "code": "console.log(0 == false);       // ?\nconsole.log('' == false);      // ?\nconsole.log(null == false);    // ?\nconsole.log(null == undefined); // ?\nconsole.log(null == 0);        // ?\nconsole.log(undefined == 0);   // ?\nconsole.log(NaN == NaN);       // ?\nconsole.log([] == false);      // ?\nconsole.log([] == ![]);        // ?",
    "answer": "true\ntrue\nfalse\ntrue\nfalse\nfalse\nfalse\ntrue\ntrue",
    "why": "- `0 == false` → both → `0 == 0` → `true`\n- `'' == false` → `'' == 0` → `0 == 0` → `true`\n- `null == false` → **false** — `null` only equals `undefined` with `==`, nothing else.\n- `null == undefined` → **true** — special rule.\n- `null == 0` → **false** — null's only `==` partner is `undefined`.\n- `NaN == NaN` → **false** — NaN is never equal to anything including itself.\n- `[] == false` → `'' == false` → `0 == 0` → `true`\n- `[] == ![]` → `[] == false` → (above) → `true`"
  },
  {
    "id": "coercion-operators-3",
    "cat": "Coercion & Operators",
    "title": "typeof gotchas",
    "code": "console.log(typeof null);          // ?\nconsole.log(typeof undefined);     // ?\nconsole.log(typeof NaN);           // ?\nconsole.log(typeof []);            // ?\nconsole.log(typeof {});            // ?\nconsole.log(typeof function(){});  // ?\nconsole.log(typeof typeof 1);      // ?\nconsole.log(typeof undeclared);    // ?",
    "answer": "\"object\"\n\"undefined\"\n\"number\"\n\"object\"\n\"object\"\n\"function\"\n\"string\"\n\"undefined\"",
    "why": "- `typeof null` → `'object'` — historical bug, never fixed.\n- `typeof NaN` → `'number'` — NaN is the \"Not a Number\" number.\n- Arrays and objects both → `'object'`.\n- Functions → `'function'` (special case).\n- `typeof typeof 1` → `typeof 'number'` → `'string'`.\n- `typeof undeclaredVar` → `'undefined'` (not a ReferenceError — `typeof` is safe)."
  },
  {
    "id": "coercion-operators-4",
    "cat": "Coercion & Operators",
    "title": "increment/decrement operators",
    "code": "let a = 5;\nconsole.log(a++); // ?\nconsole.log(a);   // ?\nconsole.log(++a); // ?\nconsole.log(a--); // ?\nconsole.log(a);   // ?",
    "answer": "5\n6\n7\n7\n6",
    "why": "- `a++` (post-increment) — returns current value **then** increments: returns `5`, `a` becomes `6`.\n- `++a` (pre-increment) — increments **then** returns: `a` becomes `7`, returns `7`.\n- `a--` (post-decrement) — returns current value `7`, then decrements to `6`."
  },
  {
    "id": "coercion-operators-5",
    "cat": "Coercion & Operators",
    "title": "short-circuit evaluation",
    "code": "console.log(0 || 'default');       // ?\nconsole.log('' || 'fallback');     // ?\nconsole.log(null || undefined || 'ok'); // ?\nconsole.log(1 || 'never');         // ?\nconsole.log(0 && 'never');         // ?\nconsole.log(1 && 'yes');           // ?\nconsole.log(null ?? 'fallback');   // ?\nconsole.log(0 ?? 'not this');      // ?\nconsole.log(false ?? 'not this');  // ?",
    "answer": "\"default\"\n\"fallback\"\n\"ok\"\n1\n0\n\"yes\"\n\"fallback\"\n0\nfalse",
    "why": "- `||` returns the first truthy value (or the last value if all falsy).\n- `&&` returns the first falsy value (or the last value if all truthy).\n- `??` (nullish coalescing) — only falls through on `null` or `undefined` (not `0`, `''`, `false`). This is the key difference from `||`."
  },
  {
    "id": "coercion-operators-6",
    "cat": "Coercion & Operators",
    "title": "[] + [] and [] + {}",
    "code": "console.log([] + []);   // ?\nconsole.log([] + {});   // ?\n// console.log({} + []); // try in browser console — different result!\nconsole.log(({}) + []); // ?",
    "answer": "\"\"\n\"[object Object]\"\n\"[object Object]\"",
    "why": "- `[] + []` → `'' + ''` → `''` (both arrays convert to empty strings).\n- `[] + {}` → `'' + '[object Object]'` → `'[object Object]'`.\n- `{} + []` in a statement context — `{}` is parsed as an empty block, then `+[]` is the expression → `+'' = 0`. But `({}) + []` forces `{}` to be an object expression → `'[object Object]'`."
  },
  {
    "id": "coercion-operators-7",
    "cat": "Coercion & Operators",
    "title": "truthy/falsy surprises",
    "code": "const values = [0, -0, '', '0', false, null, undefined, NaN, [], {}, Infinity, -Infinity];\n\nvalues.forEach(v => {\n  // Only log if truthy to see which ones pass the if check\n  if (v) process.stdout ? process.stdout.write(JSON.stringify(v) + ' ') : console.log(JSON.stringify(v) + ' is truthy');\n});\nconsole.log('');\nconsole.log('truthy count:', values.filter(Boolean).length);",
    "answer": "(logs truthy values: \"0\", [], {}, Infinity, -Infinity)\ntruthy count: 5",
    "why": "Falsy: `0`, `-0`, `''`, `false`, `null`, `undefined`, `NaN` — 7 values. Everything else is truthy, including `\"0\"` (non-empty string), `[]` (empty array), `{}` (empty object), `Infinity`, `-Infinity`."
  },
  {
    "id": "coercion-operators-8",
    "cat": "Coercion & Operators",
    "title": "comparison oddities",
    "code": "console.log(null > 0);   // ?\nconsole.log(null == 0);  // ?\nconsole.log(null >= 0);  // ?\nconsole.log(undefined > 0);  // ?\nconsole.log(undefined < 0);  // ?\nconsole.log(undefined == 0); // ?",
    "answer": "false\nfalse\ntrue\nfalse\nfalse\nfalse",
    "why": "This is the most counterintuitive coercion result. For `>`, `<`, `>=`, `<=`, `null` converts to `0`. So `null >= 0` → `0 >= 0` → `true`. But `==` has special rules — `null` only equals `undefined`. So `null == 0` is `false` even though `null >= 0` is `true`. This inconsistency is a known JS quirk.\n\n`undefined` converts to `NaN` for comparisons → any comparison with NaN is `false`. And `undefined == 0` is `false` (only `null == undefined`)."
  },
  {
    "id": "coercion-operators-9",
    "cat": "Coercion & Operators",
    "title": "destructuring output",
    "code": "const [a, b, ...rest] = [1, 2, 3, 4, 5];\nconsole.log(a, b, rest);  // ?\n\nconst { x = 10, y = 20, z } = { x: 5, z: 30 };\nconsole.log(x, y, z);    // ?\n\nconst [, second, , fourth] = [1, 2, 3, 4];\nconsole.log(second, fourth); // ?",
    "answer": "1 2 [3, 4, 5]\n5 20 30\n2 4",
    "why": "- Rest element collects remaining items into an array.\n- `y = 20` — default values apply only when the property is `undefined`. `y` is not in the source → `20`.\n- `x = 10` — `x` IS in the source (`5`), so the default is ignored: `5`.\n- `z` — present in source as `30`.\n- `[, second, , fourth]` — skip positions with empty slots."
  },
  {
    "id": "coercion-operators-10",
    "cat": "Coercion & Operators",
    "title": "spread edge cases",
    "code": "const a = [1, 2, 3];\nconst b = [...a];\nb.push(4);\n\nconsole.log(a);  // ?\nconsole.log(b);  // ?\n\nconst obj = { x: 1, nested: { y: 2 } };\nconst copy = { ...obj };\ncopy.nested.y = 99;\n\nconsole.log(obj.nested.y);  // ?",
    "answer": "[1, 2, 3]\n[1, 2, 3, 4]\n99",
    "why": "Array spread creates a **shallow copy** — `b` is a new array, pushing to it doesn't affect `a`. Object spread is also **shallow** — `copy.nested` and `obj.nested` point to the **same object**. Mutating `copy.nested.y` mutates `obj.nested.y` too."
  },
  {
    "id": "coercion-operators-11",
    "cat": "Coercion & Operators",
    "title": "optional chaining and nullish",
    "code": "const user = {\n  profile: {\n    name: 'Alice',\n    address: null,\n  }\n};\n\nconsole.log(user?.profile?.name);            // ?\nconsole.log(user?.profile?.address?.city);   // ?\nconsole.log(user?.settings?.theme);          // ?\nconsole.log(user?.profile?.age ?? 18);       // ?\nconsole.log(user?.profile?.name ?? 'Anonymous'); // ?",
    "answer": "\"Alice\"\nundefined\nundefined\n18\n\"Alice\"",
    "why": "- `?.` short-circuits to `undefined` when it hits `null` or `undefined` without throwing.\n- `address?.city` — `address` is `null`, so `null?.city` → `undefined` (no error).\n- `settings` doesn't exist → `undefined`, then `?.theme` → `undefined`.\n- `?? 18` — `age` is `undefined`, so nullish coalescing returns `18`.\n- `name ?? 'Anonymous'` — `name` is `'Alice'` (not nullish) → `'Alice'`."
  },
  {
    "id": "coercion-operators-12",
    "cat": "Coercion & Operators",
    "title": "comma operator and void",
    "code": "let x = (1, 2, 3);\nconsole.log(x);           // ?\n\nlet y = void 0;\nconsole.log(y);           // ?\n\nconsole.log(void 'anything'); // ?\n\n// What does this log?\nfor (let i = 0, j = 10; i < 3; i++, j--) {\n  if (i === 1) console.log(i, j); // ?\n}",
    "answer": "3\nundefined\nundefined\n1 9",
    "why": "- The **comma operator** evaluates each operand left-to-right and returns the value of the **last** one. `(1, 2, 3)` → `3`.\n- `void expression` always evaluates the expression and returns `undefined`. Common use: `void 0` as a reliable `undefined`.\n- In `for (let i = 0, j = 10; ...)`, the comma in the init and update sections is part of the `for` syntax (initializes/updates multiple variables), not the comma operator."
  },
  {
    "id": "mixed-advanced-1",
    "cat": "Mixed & Advanced",
    "title": "Array method chaining output",
    "code": "const nums = [1, 2, 3, 4, 5];\n\nconst result = nums\n  .filter(n => n % 2 !== 0)   // keep odds\n  .map(n => n * n)             // square them\n  .reduce((acc, n) => acc + n, 0); // sum\n\nconsole.log(result); // ?\n\nconsole.log([1, [2, [3, [4]]]].flat());        // ?\nconsole.log([1, [2, [3, [4]]]].flat(Infinity)); // ?",
    "answer": "35\n[1, 2, [3, [4]]]\n[1, 2, 3, 4]",
    "why": "- Odds: `[1, 3, 5]`. Squared: `[1, 9, 25]`. Sum: `35`.\n- `.flat()` — default depth is `1`: flattens one level only.\n- `.flat(Infinity)` — recursively flattens all levels."
  },
  {
    "id": "mixed-advanced-2",
    "cat": "Mixed & Advanced",
    "title": "Array.from edge cases",
    "code": "console.log(Array.from('hello'));         // ?\nconsole.log(Array.from({ length: 3 }, (_, i) => i * 2)); // ?\nconsole.log(Array.from(new Set([1, 2, 2, 3]))); // ?\nconsole.log([...new Map([['a', 1], ['b', 2]])]); // ?",
    "answer": "['h', 'e', 'l', 'l', 'o']\n[0, 2, 4]\n[1, 2, 3]\n[['a', 1], ['b', 2]]",
    "why": "- `Array.from(string)` iterates characters.\n- `{length: 3}` is an array-like; the mapping function gets `(value, index)`.\n- `Set` removes duplicates; `Array.from` converts it.\n- Spreading a `Map` gives `[key, value]` pairs."
  },
  {
    "id": "mixed-advanced-3",
    "cat": "Mixed & Advanced",
    "title": "Object.keys/values/entries order",
    "code": "const obj = {\n  b: 2,\n  a: 1,\n  1: 'num',\n  c: 3,\n  0: 'zero',\n};\n\nconsole.log(Object.keys(obj));    // ?\nconsole.log(Object.values(obj));  // ?",
    "answer": "['0', '1', 'b', 'a', 'c']\n['zero', 'num', 2, 1, 3]",
    "why": "Object key ordering: **integer-like keys first** (ascending numeric), then string keys in **insertion order**. `'0'` and `'1'` come before `'b'`, `'a'`, `'c'`. This is a spec-guaranteed order since ES2015."
  },
  {
    "id": "mixed-advanced-4",
    "cat": "Mixed & Advanced",
    "title": "Symbol as object key",
    "code": "const id = Symbol('id');\nconst obj = {\n  name: 'Alice',\n  [id]: 123,\n};\n\nconsole.log(obj.name);             // ?\nconsole.log(obj[id]);              // ?\nconsole.log(Object.keys(obj));     // ?\nconsole.log(JSON.stringify(obj));  // ?",
    "answer": "\"Alice\"\n123\n[\"name\"]\n'{\"name\":\"Alice\"}'",
    "why": "Symbol keys are **hidden** from `Object.keys`, `for...in`, and `JSON.stringify`. They only show up in `Object.getOwnPropertySymbols()` or `Reflect.ownKeys()`. This makes them useful for private metadata on objects without risking accidental enumeration or serialization."
  },
  {
    "id": "mixed-advanced-5",
    "cat": "Mixed & Advanced",
    "title": "class private fields",
    "code": "class BankAccount {\n  #balance = 0;  // private field\n\n  deposit(amount) { this.#balance += amount; }\n  get balance() { return this.#balance; }\n}\n\nconst acc = new BankAccount();\nacc.deposit(100);\nacc.deposit(50);\n\nconsole.log(acc.balance);   // ?\nconsole.log(acc.#balance);  // ?",
    "answer": "150\nSyntaxError: Private field '#balance' must be declared in an enclosing class",
    "why": "Private class fields (`#`) are truly private — accessing them from outside the class is a **SyntaxError** (caught at parse time, not a runtime error). They don't appear in `Object.keys` or via any reflection API."
  },
  {
    "id": "mixed-advanced-6",
    "cat": "Mixed & Advanced",
    "title": "generator yield and return",
    "code": "function* gen() {\n  yield 1;\n  yield 2;\n  return 3;\n  yield 4;  // unreachable\n}\n\nconst g = gen();\nconsole.log(g.next()); // ?\nconsole.log(g.next()); // ?\nconsole.log(g.next()); // ?\nconsole.log(g.next()); // ?",
    "answer": "{ value: 1, done: false }\n{ value: 2, done: false }\n{ value: 3, done: true }\n{ value: undefined, done: true }",
    "why": "`yield` produces `{ value, done: false }`. `return` produces `{ value, done: true }`. Once `done: true`, all subsequent `next()` calls return `{ value: undefined, done: true }`. `yield 4` is unreachable code."
  },
  {
    "id": "mixed-advanced-7",
    "cat": "Mixed & Advanced",
    "title": "Promise.race and Promise.any",
    "code": "const p1 = new Promise(r => setTimeout(() => r('slow'), 200));\nconst p2 = new Promise(r => setTimeout(() => r('fast'), 50));\nconst p3 = Promise.reject('error');\n\nPromise.race([p1, p2, p3]).then(v => console.log('race:', v)).catch(e => console.log('race err:', e));\nPromise.any([p3, p1, p2]).then(v => console.log('any:', v)).catch(e => console.log('any err:', e));",
    "answer": "race err: error\nany: fast",
    "why": "- `Promise.race` resolves/rejects with the **first settled** (either fulfilled or rejected). `p3` rejects immediately → `race err: error`.\n- `Promise.any` resolves with the **first fulfilled** (ignores rejections). `p3` is rejected, then `p2` fulfills first at 50ms → `any: fast`."
  },
  {
    "id": "mixed-advanced-8",
    "cat": "Mixed & Advanced",
    "title": "Symbol.toPrimitive",
    "code": "const obj = {\n  [Symbol.toPrimitive](hint) {\n    if (hint === 'number') return 42;\n    if (hint === 'string') return 'hello';\n    return true;  // 'default' hint\n  }\n};\n\nconsole.log(+obj);        // ?\nconsole.log(`${obj}`);    // ?\nconsole.log(obj + '');    // ?\nconsole.log(obj == true); // ?",
    "answer": "42\n\"hello\"\n\"true\"\ntrue",
    "why": "`[Symbol.toPrimitive](hint)` overrides default type coercion. `+obj` needs number → hint `'number'` → `42`. Template literal needs string → hint `'string'` → `'hello'`. `obj + ''` — `+` with a string uses hint `'default'` → `true`, then `true + '' = 'true'`. `obj == true` → both use `'default'` → `true == true` → `true`."
  },
  {
    "id": "mixed-advanced-9",
    "cat": "Mixed & Advanced",
    "title": "Object.assign and spread differences",
    "code": "const target = { a: 1, b: 2 };\nconst source = { b: 3, c: 4 };\n\nconst result1 = Object.assign(target, source);\nconsole.log(target === result1); // ?\nconsole.log(target);             // ?\n\nconst obj = { a: 1, b: 2 };\nconst result2 = { ...obj, ...{ b: 3, c: 4 } };\nconsole.log(obj);    // ?\nconsole.log(result2); // ?",
    "answer": "true\n{ a: 1, b: 3, c: 4 }\n{ a: 1, b: 2 }\n{ a: 1, b: 3, c: 4 }",
    "why": "`Object.assign` **mutates the target** and returns it — `target === result1` is `true`. Spread creates a **new object** — `obj` is untouched. Both produce the same merged result (later keys win), but `Object.assign` is destructive."
  },
  {
    "id": "mixed-advanced-10",
    "cat": "Mixed & Advanced",
    "title": "class getter/setter",
    "code": "class Temperature {\n  #celsius;\n\n  constructor(c) { this.#celsius = c; }\n\n  get fahrenheit() {\n    return this.#celsius * 9/5 + 32;\n  }\n\n  set fahrenheit(f) {\n    this.#celsius = (f - 32) * 5/9;\n  }\n}\n\nconst t = new Temperature(0);\nconsole.log(t.fahrenheit);    // ?\n\nt.fahrenheit = 212;\nconsole.log(t.fahrenheit);    // ?\n// console.log(t.#celsius);   // ?",
    "answer": "32\n212",
    "why": "Getters and setters are called with property access syntax, not `()`. `t.fahrenheit` triggers the getter. `t.fahrenheit = 212` triggers the setter, converting to Celsius internally. The private `#celsius` would throw `SyntaxError` if accessed from outside."
  },
  {
    "id": "mixed-advanced-11",
    "cat": "Mixed & Advanced",
    "title": "for...in vs for...of",
    "code": "const arr = [10, 20, 30];\narr.custom = 'extra';\n\nfor (const k in arr) {\n  process.stdout ? process.stdout.write(k + ' ') : null;\n}\nconsole.log('(for..in)');\n\nfor (const v of arr) {\n  process.stdout ? process.stdout.write(v + ' ') : null;\n}\nconsole.log('(for..of)');",
    "answer": "0 1 2 custom (for..in)\n10 20 30 (for..of)",
    "why": "`for...in` iterates **all enumerable property keys** (including inherited ones and added properties like `custom`). `for...of` uses the **iterator protocol** — for arrays this iterates **values** only, ignoring non-numeric properties. Never use `for...in` on arrays."
  },
  {
    "id": "mixed-advanced-12",
    "cat": "Mixed & Advanced",
    "title": "the multi-concept boss question",
    "code": "const arr = [1, 2, 3];\n\nconst doubled = arr.map(async (n) => n * 2);\n\nconsole.log(doubled);          // ?\nconsole.log(doubled[0]);       // ?\n\nPromise.all(doubled).then(v => console.log(v)); // ?\n\nconsole.log('sync done');",
    "answer": "[Promise, Promise, Promise]\nPromise { <pending> }\nsync done\n[2, 4, 6]",
    "why": "`async` functions always return a Promise, even when the body is synchronous. `arr.map(async …)` produces an array of Promises, not values. To get the values, you must `await Promise.all(doubled)`. `'sync done'` runs immediately; the `Promise.all` resolution logs after the current task + microtask queue drains."
  }
];
export const OQ_CATEGORIES = ["Hoisting & Scope","Closures & Loops","Event Loop & Async","this & Prototype","Coercion & Operators","Mixed & Advanced"];
