# How Generics Allow Building Reusable Components and Functions That Stay Strictly Typed

---

## Introduction

In TypeScript, writing a function that works with many data types creates a problem. Either the same function is written multiple times for each type, or `any` is used — which removes type safety completely.

Generics solve this. A generic function works with any data type while still keeping strict typing. The type is passed in at the time of use, like a parameter. This makes code reusable and safe at the same time.

---

## Body

### What Are Generics?

A generic is a placeholder for a type. Instead of writing `string` or `number`, a type variable `<T>` is used. TypeScript replaces `T` with the real type when the function is called.

```typescript
function identity<T>(value: T): T {
  return value;
}

identity("hello"); // T becomes string
identity(42);      // T becomes number
```

No duplication. No `any`. Full type safety.

---

### The Problem Generics Solve

Without generics, there are two options — both have problems.

#### Without Generics: Duplicate code

```typescript
function getString(value: string): string { return value; }
function getNumber(value: number): number { return value; }
```

Same logic written twice. This breaks the DRY principle.

#### Without Generics: Using `any`

```typescript
function getValue(value: any): any { return value; }
```

This loses all type safety. TypeScript cannot catch errors.

#### With Generics: One function, every type

```typescript
function getValue<T>(value: T): T { return value; }
```

One function handles all types, and TypeScript tracks each one correctly.

---

### Generic Functions

```typescript
function wrapInArray<T>(value: T): T[] {
  return [value];
}

const strings = wrapInArray("hello"); // string[]
const numbers = wrapInArray(100);     // number[]
```

TypeScript infers the type from the argument automatically.

---

### Generic Interfaces

```typescript
interface ApiResponse<T> {
  status: number;
  data: T;
}

type UserResponse = ApiResponse<{ id: number; name: string }>;
type PostResponse = ApiResponse<{ id: number; title: string }>;
```

The interface is defined once and reused for any data shape. The `data` field is always correctly typed.

---

### Generic Constraints

A constraint limits which types a generic accepts, using the `extends` keyword.

```typescript
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

getLength("hello");   // 5
getLength([1, 2, 3]); // 3
getLength(42);        // Error — number has no .length
```

TypeScript enforces this at compile time.

---

### Real-World Use Case: Typed API Fetcher

```typescript
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json() as T;
}

interface User { id: number; name: string; }
interface Post { id: number; title: string; }

const user = await fetchData<User>("/api/user/1");
// user.name is string

const post = await fetchData<Post>("/api/post/1");
// post.title is string
```

One function. Every API call. Always correctly typed.

---


## Conclusion

Generics allow a single function, interface, or class to work across many data types while keeping TypeScript's type checking fully intact. The type is not fixed in the definition — it is supplied at the point of use.

This keeps TypeScript code DRY, well-typed, and easy to maintain as the codebase grows.

---

*Part of a TypeScript utility types series.*