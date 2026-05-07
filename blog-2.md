# How Pick and Omit Utility Types Help Keep TypeScript Code DRY

---

## Introduction

In TypeScript, developers often work with large interfaces that contain many properties. However, not every part of an application needs all of those properties. Creating separate interfaces manually for different use cases leads to repetitive code and makes maintenance difficult.

To solve this problem, TypeScript provides utility types such as `Pick` and `Omit`. These utility types allow developers to create smaller, specialized "slices" of a master interface without rewriting code. This keeps the codebase DRY (**Don't Repeat Yourself**), clean, and easier to maintain.

---

## Body

###  What is `Pick`?

The `Pick` utility type creates a new type by **selecting specific properties** from an existing interface.

#### Syntax

```typescript
Pick<Type, Keys>
```

#### Example of `Pick`

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type UserProfile = Pick<User, "id" | "name" | "email">;
```

`UserProfile` only contains:

- `id`
- `name`
- `email`

The `password` property is excluded automatically. There is no need to create another interface manually with the same fields.

---

###  What is `Omit`?

The `Omit` utility type creates a new type by **removing specific properties** from an existing interface.

#### Syntax

```typescript
Omit<Type, Keys>
```

#### Example of `Omit`

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type PublicUser = Omit<User, "password">;
```

`PublicUser` contains all properties **except** `password`. This is useful when sensitive or unnecessary data should not be exposed.

---

###  How `Pick` and `Omit` Prevent Code Duplication

Without utility types, developers may create multiple similar interfaces manually.

####  Without Utility Types

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface UserProfile {
  id: number;
  name: string;
  email: string;
}
```

This approach repeats the same property definitions. If the original `User` interface changes later, every related interface must be updated manually — which is error-prone and time-consuming.

####  With Utility Types

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type UserProfile = Pick<User, "id" | "name" | "email">;
```

The specialized type automatically stays synchronized with the main interface. This reduces repetition and improves maintainability.

---

###  How They Keep Code DRY

The **DRY (Don't Repeat Yourself)** principle means avoiding unnecessary repetition in code.

`Pick` and `Omit` maintain DRY code by:

- Reusing existing interfaces instead of recreating them
- Reducing repeated property definitions across the codebase
- Keeping related types consistent with the master interface
- Making updates easier — change one place, everything follows
- Improving overall readability and maintainability

When the master interface changes, all derived types update automatically, reducing the chance of bugs and inconsistencies.

---

###  Real-World Use Case

Consider a backend API that returns a full `Product` object, but the frontend only needs a few fields for display.

```typescript
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockCount: number;
  supplierId: number;
}

// Only what the product card needs
type ProductCard = Pick<Product, "id" | "name" | "price">;

// Everything except internal supplier info
type PublicProduct = Omit<Product, "supplierId" | "stockCount">;
```

No repeated property lists. No manual syncing. If a field is renamed in `Product`, the derived types reflect that immediately.

---


## Conclusion

`Pick` and `Omit` are powerful TypeScript utility types that help developers create specialized versions of interfaces without rewriting code. `Pick` selects only the needed properties, while `Omit` removes the unwanted ones.

By creating reusable "slices" of a master interface, these utility types prevent code duplication and uphold the DRY principle. As a result, TypeScript code becomes cleaner, easier to maintain, and more scalable.

---

*Part of a TypeScript utility types series.*