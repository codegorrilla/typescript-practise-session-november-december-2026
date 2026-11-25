### Analyzed infer.ts

This line demonstrates two advanced TypeScript features: **Conditional Types (`? :`)** and the **`infer` keyword**.

In plain terms: **It checks if `T` is a `Promise`, and if so, extracts ("unwraps") the inner type inside it.**

---

### Visual Breakdown

```typescript
type UnwrapBox<T> = T extends Promise<infer U> ? U : T;
//   └────┬─────┘   └─────────────┬──────────┘   │   │
//        │                       │              │   └─ 4. If NO: return original T
//        │                       │              └───── 3. If YES: return the extracted U
//        │                       └──────────────────── 2. Is T a Promise? If so, deduce inner type as U
//        └──────────────────────────────────────────── 1. Generic type taking T
```

---

### Step-by-Step Explanation

#### 1. `T extends Promise<...>` (The Condition)

This behaves like an `if` statement at the type level:

> _"Does `T` match the shape of a `Promise`?"_

#### 2. `infer U` (The Type Extractor)

`infer` tells TypeScript:

> _"I don't know in advance what type is wrapped inside `Promise<...>`, so **figure it out automatically** and give that captured type the temporary name **`U`**."_

#### 3. `? U` (The "True" branch)

If `T` is indeed a `Promise`, return the extracted inner type `U`.

#### 4. `: T` (The "False" branch)

If `T` is **not** a `Promise`, return the original type `T` unchanged.

---

### Walkthrough with Examples

#### Example 1: Passing a Promise (Your code in lines 3–5)

```typescript
type ApiPromise = Promise<{ orderId: number; status: string }>;

type OrderData = UnwrapBox<ApiPromise>;
// Result: { orderId: number; status: string }
```

- `T` is `Promise<{ orderId: number; status: string }>`.
- TypeScript matches it to `Promise<infer U>`, so `U` is inferred as `{ orderId: number; status: string }`.
- Result: The promise wrapper is stripped away!

#### Example 2: Passing a Non-Promise

```typescript
type RegularNumber = UnwrapBox<number>;
// Result: number
```

- `number` is not a `Promise`.
- Condition is false &rarr; falls back to `: T`.
- Result: `number` is left untouched.

---

### Pro Tip: Built-in Equivalent

This exact pattern is how TypeScript’s official built-in utility type **`Awaited<T>`** works under the hood:

```typescript
type OrderData = Awaited<ApiPromise>; // identical outcome
```
