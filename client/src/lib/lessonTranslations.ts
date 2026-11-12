import { ILesson, ILessonSummary } from '../types';


export type LessonTranslation = Pick<ILesson, 'title' | 'summary' | 'contentMarkdown'> &
  Partial<Pick<ILesson, 'quiz' | 'interactiveExercise'>>;

const javascriptLessons: Record<string, LessonTranslation> = {
  'js-introduction': {
    title: 'Lesson 1: Introduction to JavaScript',
    summary: 'Learn what JavaScript does, how it relates to ECMAScript, and how to set up a development environment and connect scripts to HTML.',
    contentMarkdown: `# Lesson 1: Introduction to JavaScript

## What does JavaScript do?

Think of a web page as a house:

| Technology | Analogy | Role |
|---|---|---|
| HTML | Structure and rooms | Organizes content and its meaning |
| CSS | Paint and furniture | Controls appearance and layout |
| JavaScript | Movement and controls | Adds interaction, logic, and dynamic updates |

JavaScript runs in browsers to make pages interactive. It can also run outside the browser in environments such as Node.js.

## JavaScript and ECMAScript

ECMAScript is the standard that defines the core language. JavaScript is an implementation of that standard, while a runtime provides additional APIs:

| Part | Examples |
|---|---|
| Language features | Variables, functions, arrays, and classes |
| Browser APIs | \`document\`, the DOM, \`fetch\`, and \`localStorage\` |
| Node.js APIs | File systems, servers, and Node-specific modules |

Do not confuse a language feature with an API provided by the browser. \`Array.map()\` is part of the language, while \`document.querySelector()\` is a browser API.

## A brief history and development setup

JavaScript appeared in 1995, and its specifications were later standardized by ECMA International. The ES2015 release, also known as ES6, was a major milestone. The language has continued to evolve through regular specification updates.

To get started, use an editor such as VS Code, a modern browser, and its Developer Tools. Install Node.js when you need to run JavaScript outside the browser. Git, ESLint, and Prettier become useful as your project grows.

## Connect JavaScript to HTML

\`\`\`html
<script src="/scripts/app.js" defer></script>
\`\`\`

An external file is usually the best choice. With \`defer\`, the browser downloads the script in parallel and runs it after parsing the HTML. Deferred scripts keep their document order. Use \`async\` for an independent script that does not rely on the order of other scripts.

\`\`\`html
<script>
  console.log("Hello from the page");
</script>
\`\`\`

Inline scripts are suitable for small examples. An attribute such as \`onclick\` mixes structure and behavior, so prefer a separate file and \`addEventListener\`.

| Approach | When to use it |
|---|---|
| External file with \`defer\` | Most projects; organized and runs after HTML parsing |
| Inline \`<script>\` | A short experiment or tiny example |
| An attribute such as \`onclick\` | Avoid in projects because it mixes HTML and behavior |

## Your first program

\`\`\`javascript
const learner = "You";
console.log(\`Hello, \${learner}!\`);
\`\`\`

Open Developer Tools and select the Console tab to see the result. In upcoming lessons, you will learn data types, conditions, and functions, then build useful programs step by step.`,
    interactiveExercise: {
      instructions: 'Declare a variable named learnerName, then print a welcome message that uses its value in a template literal.',
      initialJs: `// Create a learnerName variable
// Print a welcome message with console.log`,
      solution: `const learnerName = "Alex";
console.log(\`Hello, \${learnerName}!\`);`,
    },
    quiz: {
      question: 'What does the defer attribute do when loading a JavaScript file from the head?',
      options: [
        'Downloads the file in parallel and runs it after the HTML has been parsed.',
        'Always runs the file before loading HTML.',
        'Converts JavaScript into CSS.',
        'Prevents the file from using the DOM.',
      ],
      correctIndex: 0,
      explanation: 'defer lets the browser download the script in parallel, then execute it after parsing the document while preserving the order of deferred scripts.',
    },
  },
  'js-variables-and-data-types': {
    title: 'Lesson 2: JavaScript Fundamentals',
    summary: 'Understand JavaScript syntax, variables, data types, operators, conditions, and loops.',
    contentMarkdown: `# Lesson 2: JavaScript Fundamentals

## Writing JavaScript

JavaScript is case-sensitive: \`score\` and \`Score\` are different names. Whitespace helps organize code, and comments explain the reason behind a decision:

\`\`\`javascript
// A single-line comment
/*
  A multi-line comment
*/
const learnerName = "Sam";
\`\`\`

Semicolons are optional in many places because of Automatic Semicolon Insertion (ASI). Follow one consistent style in your project.

## Variables: var, let, and const

| Keyword | Scope | Reassignment | Typical use |
|---|---|---|---|
| \`const\` | Block | No | Default when the variable will not be reassigned |
| \`let\` | Block | Yes | A value that changes, such as a counter |
| \`var\` | Function | Yes | Legacy syntax; avoid it in new code |

\`\`\`javascript
const academyName = "Code Academy";
let score = 0;
score += 10;

const skills = ["HTML"];
skills.push("JavaScript"); // Allowed: const prevents reassignment, not mutation
\`\`\`

## Data types

| Group | Types | Example |
|---|---|---|
| Primitives | \`string\`, \`number\`, \`boolean\`, \`undefined\`, \`null\`, \`symbol\`, \`bigint\` | \`"Hello"\`, \`42\`, \`true\` |
| Objects | \`object\`, including arrays and functions | \`{ name: "Layla" }\` |

Use \`typeof\` to inspect a value's type. One historical quirk: \`typeof null\` returns \`"object"\`.

## Operators and conversion

JavaScript has arithmetic operators such as \`+\`, \`-\`, \`*\`, and \`/\`; assignment operators such as \`=\` and \`+=\`; comparison operators such as \`===\` and \`!==\`; and logical operators such as \`&&\`, \`||\`, and \`!\`. Prefer strict equality.

| Expression | Result | Reason |
|---|---|---|
| \`"3" + 4\` | \`"34"\` | String concatenation |
| \`Number("3") + 4\` | \`7\` | Explicit conversion |
| \`3 == "3"\` | \`true\` | Implicit conversion |
| \`3 === "3"\` | \`false\` | The types differ |

Falsy values include \`false\`, \`0\`, \`-0\`, \`0n\`, \`""\`, \`null\`, \`undefined\`, and \`NaN\`. Empty arrays \`[]\` and empty objects \`{}\` are truthy.

## Conditions and loops

\`\`\`javascript
const grade = 82;
if (grade >= 90) console.log("Excellent");
else if (grade >= 60) console.log("Passed");
else console.log("Try again");

for (let i = 0; i < 3; i++) console.log(i);
\`\`\`

| Construct | Use |
|---|---|
| \`if/else\` | Choose a path based on a condition |
| \`switch\` | Choose among cases for one value |
| \`for\` and \`while\` | Repeat with an explicit stopping condition |
| \`do...while\` | Run the body at least once |
| \`for...of\` | Iterate over array or string values |
| \`for...in\` | Iterate over object keys; usually not the right choice for arrays |

\`break\` exits a loop, while \`continue\` skips the current iteration. Use JSDoc to document public or complex functions, and write comments that explain decisions rather than obvious lines.`,
    interactiveExercise: {
      instructions: 'Create a const array of three skills and a let variable for a score. Add 10 to the score, then print both values.',
      initialJs: `// Create a const array with three skills
// Create a let score and add 10
// Print the values`,
      solution: `const skills = ["HTML", "CSS", "JavaScript"];
let score = 0;
score += 10;

console.log(skills, score);`,
    },
    quiz: {
      question: 'Which statement about const is correct?',
      options: [
        'It prevents reassignment of the variable, but an array or object it references can still be mutated.',
        'It makes every nested value deeply immutable.',
        'It can be reassigned, but only inside a loop.',
        'It creates a function-scoped variable.',
      ],
      correctIndex: 0,
      explanation: 'const prevents assigning a new value to the binding. It does not make referenced objects or arrays immutable.',
    },
  },
  'js-functions-and-scope': {
    title: 'Lesson 3: JavaScript Functions',
    summary: 'Write reusable functions and understand parameters, arrow functions, scope, closures, callbacks, and higher-order functions.',
    contentMarkdown: `# Lesson 3: JavaScript Functions

A function performs a focused task and makes logic easier to reuse and test.

## Declarations and expressions

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}\`;
}

const double = function (number) {
  return number * 2;
};
\`\`\`

| Function form | Can be called before its definition? | Notes |
|---|---|---|
| Function declaration | Yes | The declaration is hoisted |
| Function expression | No, not before the variable is initialized | Follows \`let\` or \`const\` rules |
| Arrow function | No, not before the variable is initialized | Concise syntax; inherits \`this\` |

## Arrow functions and parameters

\`\`\`javascript
const multiply = (a, b) => a * b; // Implicit return
const greetStudent = name => \`Hello, \${name}\`;
const sum = (a = 0, b = 0) => a + b; // Default values
\`\`\`

Parameters are names in a function definition; arguments are the values passed when calling it. Rest parameters collect values into an array, while spread expands array elements:

\`\`\`javascript
function total(...prices) {
  return prices.reduce((sum, price) => sum + price, 0);
}
const allPrices = [10, 20, ...[30]];
\`\`\`

Arrow functions do not have their own \`this\` or \`arguments\`, so they should not replace every regular function.

## Scope and closures

Global scope is available at the module or environment level. Function scope exists inside a function. With \`let\` and \`const\`, block scope exists inside \`{}\`.

A closure is a function that retains access to the outer scope where it was created:

\`\`\`javascript
function createCounter() {
  let count = 0;
  return () => ++count;
}
const next = createCounter();
console.log(next()); // 1
console.log(next()); // 2
\`\`\`

Higher-order functions accept functions as arguments or return functions. A callback is passed in to run later, as with \`map\` or an event listener. An IIFE is a function expression that runs immediately; modern modules are often a better way to create an isolated scope.`,
    interactiveExercise: {
      instructions: 'Write a function that accepts two numbers and returns their sum. Then call it and print the result.',
      initialJs: `function add(a, b) {
  // Return the sum
}

console.log(add(4, 6));`,
      solution: `function add(a, b) {
  return a + b;
}

console.log(add(4, 6));`,
    },
    quiz: {
      question: 'What is a closure?',
      options: [
        'A function that retains access to the scope in which it was created.',
        'A loop that stops when its condition is false.',
        'A method that freezes an object.',
        'A function that can only run once.',
      ],
      correctIndex: 0,
      explanation: 'A closure lets a function keep access to variables from its lexical outer scope, even after that outer function has returned.',
    },
  },
  'js-objects-and-oop': {
    title: 'Lesson 4: Objects and Object-Oriented Programming',
    summary: 'Create objects, manage their properties, and understand this, prototypes, classes, inheritance, and JSON.',
    contentMarkdown: `# Lesson 4: Objects and Object-Oriented Programming

An object groups data and behavior as key-value pairs:

\`\`\`javascript
const student = {
  name: "Omar",
  level: "Beginner",
  introduce() {
    return \`I am \${this.name}\`;
  },
};

student.city = "Cairo";
console.log(student["level"]);
\`\`\`

Use dot notation for known property names and brackets when the key is stored in a variable. Objects also support shorthand properties such as \`{ name }\`, computed keys such as \`{ [key]: value }\`, getters, and setters.

## this and object methods

In a regular method, \`this\` usually refers to the object that called the method. An arrow function inherits \`this\` from its surrounding scope. You can explicitly set it with \`call\`, \`apply\`, or \`bind\`.

## Prototypes and classes

JavaScript uses a prototype chain. The \`class\` syntax provides a clearer interface for creating objects and expressing inheritance:

\`\`\`javascript
class Person {
  #name;
  constructor(name) {
    this.#name = name;
  }
  greet() {
    return \`Hello, I am \${this.#name}\`;
  }
}

class Student extends Person {
  constructor(name, course) {
    super(name);
    this.course = course;
  }
}
\`\`\`

\`extends\` defines inheritance, and \`super\` calls the parent constructor. Fields prefixed with \`#\` are private and cannot be accessed outside the class. Standard private fields arrived in ES2022.

| Method | Use |
|---|---|
| \`Object.keys\` / \`Object.values\` | Read an object's keys or values |
| \`Object.assign\` | Shallow-copy properties into an object |
| \`Object.create\` | Create an object with a chosen prototype |
| \`Object.freeze\` | Prevent shallow, direct changes |

## JSON

JSON is a text format for exchanging data; it is not the same thing as a JavaScript object:

\`\`\`javascript
const text = JSON.stringify({ name: "Omar" });
const data = JSON.parse(text);
\`\`\`

Handle errors from \`JSON.parse\` when input is untrusted. Also remember that \`Object.freeze\` does not deeply protect nested objects.`,
    interactiveExercise: {
      instructions: 'Create a Student class with a private name field and a method that returns a greeting. Create a student and print the greeting.',
      initialJs: `// Write the Student class
// Create an instance and print its greeting`,
      solution: `class Student {
  #name;
  constructor(name) {
    this.#name = name;
  }
  greet() {
    return \`Hello, I am \${this.#name}\`;
  }
}

const student = new Student("Omar");
console.log(student.greet());`,
    },
    quiz: {
      question: 'What does a class field whose name starts with # guarantee?',
      options: [
        'It is private and cannot be accessed directly outside the class.',
        'It is automatically converted to a string.',
        'It becomes constant across all instances.',
        'It is available globally.',
      ],
      correctIndex: 0,
      explanation: 'Private fields prefixed with # are accessible only from within the class definition.',
    },
  },
  'js-arrays-and-objects-methods': {
    title: 'Lesson 5: Arrays and Array Methods',
    summary: 'Create and update arrays, transform and search their values, and understand which methods mutate the original array.',
    contentMarkdown: `# Lesson 5: Arrays and Array Methods

An array is an ordered list whose index starts at zero. Use \`[]\` to create one and \`at(-1)\` to read its last item:

\`\`\`javascript
const skills = ["HTML", "CSS", "JavaScript"];
console.log(skills[0]); // HTML
console.log(skills.at(-1)); // JavaScript
\`\`\`

## Updates and common methods

| Method | What it does | Mutates the original? |
|---|---|---|
| \`push\` / \`pop\` | Add/remove at the end | Yes |
| \`unshift\` / \`shift\` | Add/remove at the beginning | Yes |
| \`splice\` | Remove or insert within the array | Yes |
| \`slice\` | Copy part of the array | No |
| \`concat\` | Combine arrays | No |
| \`includes\` / \`indexOf\` | Check whether a value exists or find its position | No |

## Transforming and searching

\`\`\`javascript
const prices = [10, 20, 30];
const withTax = prices.map(price => price * 1.15);
const expensive = prices.filter(price => price >= 20);
const total = prices.reduce((sum, price) => sum + price, 0);
\`\`\`

| Method | Result |
|---|---|
| \`map\` | A new array with transformed values |
| \`filter\` | A new array containing matching items |
| \`reduce\` | A single accumulated value |
| \`find\` / \`findIndex\` | The first matching item or its index |
| \`some\` / \`every\` | Whether some / all items match |
| \`flat\` / \`flatMap\` | Flatten levels, or map and then flatten |
| \`forEach\` | Run a function for each item without creating a result array |

By default, \`sort()\` orders values as strings. Pass a comparison function for numbers:

\`\`\`javascript
[10, 2, 30].sort((a, b) => a - b); // [2, 10, 30]
\`\`\`

\`sort\` and \`reverse\` mutate the original array. Copy it first with \`[...items]\` if you need to preserve the original. Nested arrays represent multidimensional data, and destructuring extracts their values: \`const [first, second] = skills;\`.`,
    interactiveExercise: {
      instructions: 'Use map to create a new array with every price increased by 10%, then use filter to keep prices above 20.',
      initialJs: `const prices = [10, 20, 30, 40];
// Create a new array with a 10% increase
// Filter the adjusted prices`,
      solution: `const prices = [10, 20, 30, 40];
const adjusted = prices.map(price => price * 1.1);
const aboveTwenty = adjusted.filter(price => price > 20);
console.log(aboveTwenty);`,
    },
    quiz: {
      question: 'Which array method creates a new array and leaves the original unchanged?',
      options: ['map', 'splice', 'pop', 'reverse'],
      correctIndex: 0,
      explanation: 'map returns a new array containing the callback results and does not mutate the source array.',
    },
  },
  'dom-manipulation-and-events': {
    title: 'Lesson 6: Working with the DOM',
    summary: 'Select and update page elements, create new elements, and respond to user interactions with events.',
    contentMarkdown: `# Lesson 6: Working with the DOM

The DOM represents HTML as a tree of objects. JavaScript can use it to select elements, update content, attributes, and classes, or create new elements.

## Selecting elements

| Method | Result |
|---|---|
| \`getElementById\` | One element by its ID |
| \`getElementsByClassName\` / \`getElementsByTagName\` | A live collection that updates when the DOM changes |
| \`querySelector\` | The first element matching a CSS selector |
| \`querySelectorAll\` | A static collection of matching elements |

\`\`\`javascript
const title = document.querySelector("#page-title");
title.textContent = "Welcome";
title.classList.add("highlight");
title.setAttribute("aria-live", "polite");
\`\`\`

Use \`textContent\` for text. Do not put untrusted user input into \`innerHTML\`; this can lead to XSS. Use \`createElement\` and \`textContent\` to build elements safely.

## Creating elements and handling events

\`\`\`javascript
const list = document.querySelector("#lessons");
const item = document.createElement("li");
item.textContent = "JavaScript lesson";
list.append(item);

list.addEventListener("click", event => {
  if (event.target.matches("li")) {
    console.log("Selected:", event.target.textContent);
  }
});
\`\`\`

Attaching one listener to a parent to handle its descendants is called **event delegation**. Most events bubble from the target to its ancestors. You can listen during the capture phase with the appropriate option. Use \`event.preventDefault()\` when you need to cancel a default action, and use \`stopPropagation()\` only when stopping propagation is intentional.

When creating many elements, use a \`DocumentFragment\` and append it once. Remove event listeners when they are no longer needed so memory is not retained by unused elements.`,
    interactiveExercise: {
      instructions: 'Select the button and message element. Add a click listener that updates the message with textContent.',
      initialHtml: `<button id="greet">Say hello</button>
<p id="message">Your message will appear here.</p>`,
      initialJs: `const button = document.querySelector("#greet");
const message = document.querySelector("#message");

// Add a click listener and update the message safely`,
      solution: `const button = document.querySelector("#greet");
const message = document.querySelector("#message");

button.addEventListener("click", () => {
  message.textContent = "Hello, learner!";
});`,
    },
    quiz: {
      question: 'Why is textContent safer than innerHTML for displaying untrusted user input?',
      options: [
        'It treats the input as text instead of parsing it as HTML.',
        'It automatically encrypts the input.',
        'It prevents all DOM events from running.',
        'It converts the input to a number.',
      ],
      correctIndex: 0,
      explanation: 'textContent inserts a string as text; it does not interpret markup or execute injected HTML.',
    },
  },
  'async-await-and-fetching-apis': {
    title: 'Lesson 7: Asynchronous JavaScript',
    summary: 'Understand callbacks and promises, use async/await and fetch, and coordinate concurrent requests.',
    contentMarkdown: `# Lesson 7: Asynchronous JavaScript

Synchronous code runs in order. Slow operations such as network requests and timers produce results later; JavaScript does not block the user interface while waiting for the network.

## From callbacks to promises

| Pattern | Idea | Challenge |
|---|---|---|
| Callback | Pass a function to run later | Deep nesting is hard to read |
| Promise | Represents a future success or failure | Chaining \`then/catch\` |
| \`async/await\` | Readable syntax built on promises | Rejections still need handling |

A promise has three states: pending, then fulfilled or rejected. Use \`then\` for success, \`catch\` for failure, and \`finally\` for cleanup.

\`\`\`javascript
async function loadUsers() {
  const response = await fetch("/api/users");
  if (!response.ok) throw new Error("Could not load users");
  return response.json();
}
\`\`\`

\`fetch\` rejects for network errors, but it does not automatically reject for every HTTP response such as 404. Check \`response.ok\`. Use \`try/catch\` to provide a useful error state.

## Coordinating multiple promises

| Method | Behavior |
|---|---|
| \`Promise.all\` | Waits for all promises; rejects if any one rejects |
| \`Promise.race\` | Settles as soon as the first promise settles |
| \`Promise.allSettled\` | Waits for all promises and reports each result |

For a POST request, pass an appropriate \`method\`, \`headers\`, and \`body\`. Use \`AbortController\` to cancel a request you no longer need. Debounce waits until the user stops typing before running a search; throttle limits how often a function runs. Never retry without a limit: set a timeout and a maximum number of attempts.`,
    interactiveExercise: {
      instructions: 'Create an async function that awaits a promise containing sample data, then prints the result. Handle errors with try/catch.',
      initialJs: `async function loadData() {
  try {
    // Fetch data and check the response
  } catch (error) {
    console.error(error.message);
  }
}

loadData();`,
      solution: `async function loadData() {
  try {
    const data = await Promise.resolve({ title: "Learn JavaScript", completed: true });
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
}

loadData();`,
    },
    quiz: {
      question: 'What should you check after calling fetch to detect an HTTP 404 response?',
      options: [
        'Check response.ok because HTTP error statuses do not automatically reject the promise.',
        'Check response.json() because it always rejects on 404.',
        'Check whether the response is an array.',
        'No check is needed; fetch always rejects for HTTP errors.',
      ],
      correctIndex: 0,
      explanation: 'fetch typically fulfills for HTTP error statuses such as 404. Check response.ok and handle unsuccessful responses explicitly.',
    },
  },
  'js-error-handling': {
    title: 'Lesson 8: Error Handling',
    summary: 'Handle errors clearly, create custom error types, and deal with rejected promises.',
    contentMarkdown: `# Lesson 8: Error Handling

Error handling provides a useful outcome instead of allowing an operation to stop without explanation.

\`\`\`javascript
try {
  const value = JSON.parse('{"score": 90}');
  console.log(value.score);
} catch (error) {
  console.error("Could not read the data:", error.message);
} finally {
  console.log("The read attempt has finished");
}
\`\`\`

\`catch\` handles an exception. \`finally\` runs whether the operation succeeds or fails, so it is useful for cleanup. Use \`throw new Error("message")\` instead of throwing arbitrary strings.

## Common error types

| Type | Example cause |
|---|---|
| \`SyntaxError\` | Invalid syntax |
| \`ReferenceError\` | Using an undefined name |
| \`TypeError\` | An operation is not valid for a value's type |
| \`RangeError\` | A value is outside the accepted range |

For domain-specific errors, create a class that extends \`Error\`:

\`\`\`javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
\`\`\`

## Promises and errors

Use \`.catch()\` with a promise or \`try/catch\` inside an \`async\` function. Remember to check \`response.ok\` when using \`fetch\` to handle unsuccessful HTTP responses.

In a browser, global failures can be observed through \`window.onerror\` and \`unhandledrejection\`; Node.js offers process-level APIs. These are backup reporting tools, not replacements for handling an error near its source. Do not silently swallow errors or expose sensitive internal details to users. Log suitable details and show a useful message.`,
    interactiveExercise: {
      instructions: 'Write a function that checks whether an age is a positive number. Throw ValidationError for an invalid value, then catch the error.',
      initialJs: `class ValidationError extends Error {
  // Complete the class
}

function validateAge(age) {
  // Validate the age and throw an error if it is invalid
}

try {
  validateAge(-2);
} catch (error) {
  console.log(error.name, error.message);
}`,
      solution: `class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function validateAge(age) {
  if (!Number.isFinite(age) || age <= 0) {
    throw new ValidationError("Age must be a positive number");
  }
  return age;
}

try {
  validateAge(-2);
} catch (error) {
  console.log(error.name, error.message);
}`,
    },
    quiz: {
      question: 'When does the finally block in try/catch run?',
      options: [
        'After the attempt finishes, whether it succeeds or throws an error.',
        'Only when a SyntaxError occurs.',
        'Only if no error occurs.',
        'Before the try block runs.',
      ],
      correctIndex: 0,
      explanation: 'Use finally for cleanup or work that must happen regardless of whether an operation succeeds or fails.',
    },
  },
  'js-es6-plus-features': {
    title: 'Lesson 9: Modern JavaScript Features (ES6+)',
    summary: 'Use template literals, destructuring, modules, Map, Set, and other modern language features safely.',
    contentMarkdown: `# Lesson 9: Modern JavaScript Features

## Template literals and destructuring

Template literals use backticks and support embedded expressions and multiple lines:

\`\`\`javascript
const name = "Layla";
const message = \`Hello, \${name}
Welcome to JavaScript\`;

const student = { name, level: "Beginner" };
const { level } = student;
const [first, second] = ["HTML", "CSS"];
\`\`\`

Functions can use default parameters. Rest collects items, while spread expands or copies values:

\`\`\`javascript
const updated = { ...student, level: "Intermediate" };
const greet = (person = "friend") => \`Hello, \${person}\`;
\`\`\`

## Modules

\`\`\`javascript
// math.js
export const add = (a, b) => a + b;

// app.js
import { add } from "./math.js";
\`\`\`

Modules support named exports and a default export. They split a project into files with clear responsibilities and commonly run in browsers with \`type="module"\`.

## Map, Set, and Symbol

| Structure | What it stores | Benefit |
|---|---|---|
| \`Map\` | Key/value pairs with keys of any type | Preserves insertion order and provides clear methods |
| \`Set\` | Unique values | Quickly removes duplicates |
| \`Symbol\` | A unique value | Creates distinct object keys |

\`\`\`javascript
const uniqueSkills = new Set(["HTML", "CSS", "HTML"]);
const scores = new Map([["Layla", 95]]);
\`\`\`

## Iterators and safer access

Generators written as \`function*\` yield values in sequence and can be paused and resumed:

\`\`\`javascript
function* ids() {
  yield 1;
  yield 2;
}
\`\`\`

Optional chaining avoids an error when an intermediate value is missing. Nullish coalescing uses a fallback only for \`null\` or \`undefined\`:

| Expression | Uses the fallback when |
|---|---|
| \`value ?? fallback\` | \`value\` is \`null\` or \`undefined\` |
| \`value || fallback\` | \`value\` is any falsy value, such as \`0\` or an empty string |

\`\`\`javascript
const city = student.profile?.city ?? "Unknown";
\`\`\`

Use these features when they make your intent clearer, not just because the syntax is newer.`,
    interactiveExercise: {
      instructions: 'Use destructuring to get a student name, then use ?. and ?? to read a city or provide a fallback. Print a message with a template literal.',
      initialJs: `const student = {
  name: "Layla",
  profile: { city: "Alexandria" }
};

// Safely get the name and city, then print a message`,
      solution: `const student = {
  name: "Layla",
  profile: { city: "Alexandria" }
};

const { name, profile } = student;
const city = profile?.city ?? "Unknown";
console.log(\`Student \${name} is from \${city}\`);`,
    },
    quiz: {
      question: 'What is the difference between ?? and || when choosing a fallback?',
      options: [
        '?? replaces only null and undefined, while || replaces all falsy values such as 0.',
        'There is no difference.',
        '|| works only with objects.',
        '?? converts strings to numbers.',
      ],
      correctIndex: 0,
      explanation: 'Nullish coalescing preserves values such as 0 and an empty string, using the fallback only for null or undefined.',
    },
  },
  'js-best-practices': {
    title: 'Lesson 10: JavaScript Best Practices',
    summary: 'Organize code, improve performance, and consider security, testing, and accessibility.',
    contentMarkdown: `# Lesson 10: JavaScript Best Practices

Good code does more than work: it should be clear, safe, and easy to change.

## Naming and file organization

| Item | Common convention | Example |
|---|---|---|
| Variables and functions | camelCase | \`loadLessons\` |
| Classes | PascalCase | \`LessonCard\` |
| Global constants, when appropriate | UPPER_SNAKE_CASE | \`MAX_RETRIES\` |
| Files | kebab-case | \`lesson-service.js\` |

Use prefixes such as \`is\` or \`has\` for booleans when they improve clarity, for example \`isLoading\`. Split code into small modules with understandable responsibilities. Use patterns such as Factory or Observer to solve a real problem, not just to apply a pattern.

## Performance and memory

- Batch DOM updates and use \`DocumentFragment\` when adding many elements.
- Use debounce or throttle for frequent events such as searching or scrolling.
- Use memoization for expensive functions only after measuring.
- Remove event listeners and timers when they are no longer needed.
- Avoid closures that retain large elements or data unnecessarily.

## Security

Do not put untrusted user text in \`innerHTML\` and do not use \`eval()\`. Use \`textContent\` to create text, and validate inputs on the server as well. Never store secrets in frontend code or browser storage. Protect sensitive cookies with appropriate server settings such as HttpOnly, Secure, and SameSite.

## Debugging and code quality

Use \`console.table\`, \`console.time\`, and breakpoints in Developer Tools. You can temporarily add \`debugger\` while developing, then remove it. Source maps help trace back to original code. ESLint finds problematic patterns, Prettier keeps formatting consistent, and unit tests verify small behaviors. In TDD, write a test that describes the behavior, implement the code, and make the test pass.

## Accessibility

Use semantic HTML, make interactions keyboard-accessible, and move focus clearly when opening dialogs or changing screens. Add ARIA only when needed; native semantics are usually better.

### Before-you-ship checklist

- Do names explain their purpose?
- Are loading and error states handled?
- Is untrusted input safe?
- Can the interface be used with a keyboard?
- Did you test behavior rather than rely on appearance?`,
    interactiveExercise: {
      instructions: 'Safely display a student name in a DOM element with textContent, and check that the element exists before updating it.',
      initialHtml: `<p id="greeting">Your greeting will appear here</p>`,
      initialJs: `const studentName = "<b>Alex</b>";
// Select the greeting element and display the name safely`,
      solution: `const studentName = "<b>Alex</b>";
const greeting = document.querySelector("#greeting");

if (greeting) {
  greeting.textContent = \`Hello, \${studentName}\`;
}`,
    },
    quiz: {
      question: 'What is the safest way to display untrusted text in a page?',
      options: [
        'Assign it to textContent.',
        'Insert it with innerHTML.',
        'Run it with eval().',
        'Store it in a global variable.',
      ],
      correctIndex: 0,
      explanation: 'textContent treats the value as text instead of parsing it as markup, reducing the risk of injected HTML.',
    },
  },
};

const markupLessonTitles: Record<string, string> = {
  'what-is-html-and-web-basics': 'What Is HTML and How Do Web Pages Work?',
  'html-document-structure': 'HTML Document Structure and Essential Elements',
  'html-attributes-links-images': 'Attributes, Links, and Images',
  'html-forms-and-inputs': 'Forms and Input Fields',
  'semantic-html-and-seo': 'Semantic HTML, Accessibility, and SEO',
  'css-selectors-and-cascade': 'CSS Selectors and the Cascade',
  'understanding-the-box-model': 'Understanding the CSS Box Model',
  'flexbox-mastery-guide': 'A Practical Guide to Flexbox',
  'responsive-design-media-queries': 'Responsive Design and Media Queries',
};

const formatMarkupTitle = (slug: string): string => {
  if (markupLessonTitles[slug]) return markupLessonTitles[slug];

  const acronyms: Record<string, string> = {
    aria: 'ARIA',
    css: 'CSS',
    cssom: 'CSSOM',
    html: 'HTML',
    html5: 'HTML5',
    id: 'ID',
    seo: 'SEO',
    svg: 'SVG',
  };
  const words = slug.split('-');
  if (words[0] === 'html' || words[0] === 'css') {
    words.shift();
  }
  const topic = words
    .map((word) => acronyms[word] ?? (word === '2d' || word === '3d' ? word.toUpperCase() : word))
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return `${slug.startsWith('css-') ? 'CSS' : 'HTML'}: ${topic}`;
};

const createMarkupLessonTranslation = (
  slug: string,
  sourceContent: string,
  sourceExercise?: ILesson['interactiveExercise'],
): LessonTranslation => {
  const title = formatMarkupTitle(slug);
  const isCssLesson = slug.startsWith('css-') ||
    ['css-selectors-and-cascade', 'understanding-the-box-model', 'flexbox-mastery-guide', 'responsive-design-media-queries'].includes(slug);
  const summary = isCssLesson
    ? `Learn how ${title.replace(/^CSS: /, '')} works and how to use it to create clear, reliable page layouts and styles.`
    : `Learn how ${title.replace(/^HTML: /, '')} helps structure web content and make pages more understandable and accessible.`;
  const examples = sourceContent.match(/```[\s\S]*?```/g) ?? [];
  const contentMarkdown = `# ${title}

${summary}

## Why this matters

${isCssLesson
    ? 'CSS controls how HTML content looks and how it is arranged on screen. Understanding this topic helps you build consistent interfaces that adapt to their content and screen sizes.'
    : 'HTML gives web content structure and meaning. Using the right elements and attributes helps browsers, search engines, and assistive technologies interpret a page.'}

## Examples

${examples.length > 0
    ? examples.join('\n\n')
    : 'Start with a small example, then adapt it to the content and behavior your page needs.'}

## Practice

Try the lesson exercise, then change the example and check how the result behaves. Prefer semantic HTML and predictable CSS over solutions that only work for one specific screen or browser.`;

  return {
    title,
    summary,
    contentMarkdown,
    quiz: {
      question: `What is the main focus of "${title}"?`,
      options: [
        summary,
        'Writing server-side database queries.',
        'Replacing all HTML and CSS with JavaScript.',
        'Configuring a computer operating system.',
      ],
      correctIndex: 0,
      explanation: summary,
    },
    interactiveExercise: {
      instructions: `Complete the example to demonstrate ${title}. Run the preview and check that the result matches the lesson's goal.`,
      initialHtml: sourceExercise?.initialHtml ?? (isCssLesson
        ? '<main class="demo">\n  <h1>CSS lesson preview</h1>\n  <p>Update the styles to demonstrate the lesson topic.</p>\n  <button type="button">Example button</button>\n</main>'
        : '<main>\n  <h1>HTML lesson example</h1>\n  <p>Update this markup to demonstrate the lesson topic.</p>\n</main>'),
      initialCss: sourceExercise?.initialCss ?? (isCssLesson
        ? '/* Add CSS rules to demonstrate the lesson topic. */'
        : undefined),
      initialJs: sourceExercise?.initialJs,
      solution: sourceExercise?.solution ?? (isCssLesson
        ? '.demo {\n  padding: 1rem;\n}\n\n.demo button {\n  cursor: pointer;\n}'
        : '<main>\n  <h1>My HTML example</h1>\n  <p>This markup demonstrates the lesson topic.</p>\n</main>'),
    },
  };
};

const allLessonTranslations: Record<string, LessonTranslation> = {
  ...javascriptLessons,
};

export const localizeLesson = (lesson: ILesson, language: 'ar' | 'en'): ILesson => {
  if (language === 'ar') return lesson;
  const translation = allLessonTranslations[lesson.slug] ??
    (lesson.slug.startsWith('html-') ||
      lesson.slug.startsWith('css-') ||
      ['what-is-html-and-web-basics', 'html-document-structure', 'html-attributes-links-images', 'html-forms-and-inputs', 'semantic-html-and-seo', 'flexbox-mastery-guide', 'responsive-design-media-queries'].includes(lesson.slug)
      ? createMarkupLessonTranslation(lesson.slug, lesson.contentMarkdown, lesson.interactiveExercise)
      : undefined);
  if (!translation) return lesson;

  return {
    ...lesson,
    ...translation,
    interactiveExercise: translation.interactiveExercise ?? lesson.interactiveExercise,
    quiz: translation.quiz ?? lesson.quiz,
  };
};

export const localizeLessonSummary = (
  lesson: ILessonSummary,
  language: 'ar' | 'en',
): ILessonSummary => {
  if (language === 'ar') return lesson;
  const translation = allLessonTranslations[lesson.slug] ??
    (lesson.slug.startsWith('html-') ||
      lesson.slug.startsWith('css-') ||
      ['what-is-html-and-web-basics', 'html-document-structure', 'html-attributes-links-images', 'html-forms-and-inputs', 'semantic-html-and-seo', 'flexbox-mastery-guide', 'responsive-design-media-queries'].includes(lesson.slug)
      ? createMarkupLessonTranslation(lesson.slug, '')
      : undefined);
  return translation
    ? { ...lesson, title: translation.title, summary: translation.summary }
    : lesson;
};

export const localizeLessonTitle = (
  slug: string,
  title: string,
  language: 'ar' | 'en',
): string => {
  if (language !== 'en') return title;
  const translation = allLessonTranslations[slug];
  if (translation) return translation.title;
  return slug.startsWith('html-') || slug.startsWith('css-') ||
    ['what-is-html-and-web-basics', 'html-document-structure', 'html-attributes-links-images', 'html-forms-and-inputs', 'semantic-html-and-seo', 'flexbox-mastery-guide', 'responsive-design-media-queries'].includes(slug)
    ? formatMarkupTitle(slug)
    : title;
};
