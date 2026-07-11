# Dead Code Elimination Guide

This guide explains how the project handles "dead code" (unused variables, unused imports, or unreachable logic) and how to resolve deployment failures on Vercel caused by TypeScript compiler checks.

## What is "Dead Code"?
"Dead code" refers to any code that is written but never executed or referenced anywhere in your application. Common examples include:
- An `import` statement for a component or icon that you ended up deleting from the layout.
- A variable or `useState` hook that is initialized but never read or rendered.
- Functions that are declared but never called.

## Why does Vercel fail?
When deploying to Vercel (or any modern CI/CD pipeline), the system runs the build command:
`tsc -b && vite build`

The `tsc` (TypeScript Compiler) relies on the `tsconfig.json` configuration file, which enforces strict project standards. The following rules are usually enabled:
- `"noUnusedLocals": true`
- `"noUnusedParameters": true`

If the compiler detects dead code, it intentionally throws an error (e.g., `error TS6133: 'Variable' is declared but its value is never read`) and halts the build. This ensures that the final Javascript bundle sent to the user's browser is as lightweight and fast as possible.

## How to Fix Dead Code Errors

### 1. Remove Unused Imports
If you delete a component from your JSX, you must also delete its corresponding import at the top of the file.
**Error Example:**
```tsx
import { Search, GraduationCap } from 'lucide-react'; // 'GraduationCap' is unused
```
**Fix:**
```tsx
import { Search } from 'lucide-react';
```

### 2. Remove Unused Variables
If you define a state or variable but don't use it, remove the unused destructuring.
**Error Example:**
```tsx
const [data, setData] = useState([]); // 'setData' is unused
```
**Fix:**
```tsx
const [data] = useState([]); // Just keep what you read
```

### 3. Ignoring Variables intentionally (The Underscore Rule)
If you are required to accept a parameter (e.g., in an array map function or callback) but don't need to use it, you can prefix the variable with an underscore (`_`) to tell TypeScript to ignore it.
**Error Example:**
```tsx
array.map((item, index) => { // 'item' is unused
   return <div key={index}>Hello</div>;
});
```
**Fix:**
```tsx
array.map((_item, index) => { 
   return <div key={index}>Hello</div>;
});
```

---

## (Optional) Bypassing the Strict Rule
If you are rapidly prototyping and do not want Vercel to block your deployments due to unused variables, you can temporarily disable the strict check.

1. Open `tsconfig.app.json` or `tsconfig.json`.
2. Locate the `compilerOptions` section.
3. Change the following values:
```json
{
  "compilerOptions": {
    "noUnusedLocals": false,
    "noUnusedParameters": false
  }
}
```
*Note: This is generally NOT recommended for production, as it can lead to messy and bloated codebases over time.*
