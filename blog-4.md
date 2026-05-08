# How the Four Pillars of OOP Help Manage Logic and Reduce Complexity in Large-Scale TypeScript Projects

---

## Introduction

As a TypeScript project grows, managing logic becomes harder. Code gets repeated, files grow too large, and small changes break unrelated parts of the system.

Object-Oriented Programming (OOP) provides four core principles — Inheritance, Polymorphism, Abstraction, and Encapsulation — that help organize code into clear, manageable structures. Each pillar solves a specific problem that appears in large projects.

---

## Body

### Pillar 1: Encapsulation

Encapsulation means keeping the internal details of a class hidden from the outside. Only what is necessary is exposed. Everything else is kept private.

This prevents other parts of the code from directly touching or breaking internal logic.

```typescript
class BankAccount {
  private balance: number = 0;

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
    }
  }

  withdraw(amount: number): void {
    if (amount <= this.balance) {
      this.balance -= amount;
    }
  }

  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount();
account.deposit(500);
account.getBalance(); // 500
account.balance;      // Error — private, cannot access directly
```

The `balance` field is protected. External code cannot set it to any random value. All changes go through controlled methods. This reduces bugs in large projects where many developers touch the same codebase.

---

### Pillar 2: Inheritance

Inheritance allows a class to receive properties and methods from a parent class. Common logic is written once in the parent and shared across all child classes.

```typescript
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  move(): void {
    console.log(`${this.name} is moving.`);
  }
}

class Dog extends Animal {
  bark(): void {
    console.log(`${this.name} is barking.`);
  }
}

class Cat extends Animal {
  purr(): void {
    console.log(`${this.name} is purring.`);
  }
}

const dog = new Dog("Rex");
dog.move();  // Rex is moving.
dog.bark();  // Rex is barking.
```

The `move` method is written once in `Animal`. Both `Dog` and `Cat` inherit it automatically. In large projects, this prevents the same logic from being duplicated across dozens of classes.

---

### Pillar 3: Abstraction

Abstraction means hiding complex implementation details and only showing what a class is supposed to do. Abstract classes define a structure that child classes must follow, without specifying how.

```typescript
abstract class Shape {
  abstract getArea(): number;

  describe(): void {
    console.log(`This shape has an area of ${this.getArea()}.`);
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }

  getArea(): number {
    return this.width * this.height;
  }
}

const circle = new Circle(5);
circle.describe(); // This shape has an area of 78.53...

const rect = new Rectangle(4, 6);
rect.describe();   // This shape has an area of 24.
```

The `Shape` class sets the contract — every shape must have a `getArea` method. The details of how area is calculated are left to each child class. The rest of the application only needs to know that `getArea` exists, not how it works internally.

---

### Pillar 4: Polymorphism

Polymorphism means different classes can be used through the same interface, and each responds in its own way. The same method call produces different behavior depending on the object.

```typescript
abstract class Notification {
  abstract send(message: string): void;
}

class EmailNotification extends Notification {
  send(message: string): void {
    console.log(`Sending email: ${message}`);
  }
}

class SMSNotification extends Notification {
  send(message: string): void {
    console.log(`Sending SMS: ${message}`);
  }
}

class PushNotification extends Notification {
  send(message: string): void {
    console.log(`Sending push notification: ${message}`);
  }
}

const notifications: Notification[] = [
  new EmailNotification(),
  new SMSNotification(),
  new PushNotification(),
];

notifications.forEach(n => n.send("Your order has been placed."));
// Sending email: Your order has been placed.
// Sending SMS: Your order has been placed.
// Sending push notification: Your order has been placed.
```

The `forEach` loop does not need to know what type of notification it is working with. It just calls `send`. Each class handles the rest on its own. Adding a new notification type later does not change this loop at all.

---

### How All Four Work Together

In a real project, these four pillars are rarely used in isolation. They work together to manage complexity at scale.

```typescript
abstract class PaymentProcessor {
  // Abstraction — defines what every processor must do
  abstract processPayment(amount: number): void;

  // Encapsulation — internal log hidden from outside
  private log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }

  process(amount: number): void {
    this.log(`Processing payment of ${amount}`);
    this.processPayment(amount);
  }
}

// Inheritance — child classes share base structure
class StripeProcessor extends PaymentProcessor {
  // Polymorphism — each processor behaves differently
  processPayment(amount: number): void {
    console.log(`Stripe charged: $${amount}`);
  }
}

class PayPalProcessor extends PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`PayPal charged: $${amount}`);
  }
}

const processors: PaymentProcessor[] = [
  new StripeProcessor(),
  new PayPalProcessor(),
];

processors.forEach(p => p.process(100));
// [LOG]: Processing payment of 100
// Stripe charged: $100
// [LOG]: Processing payment of 100
// PayPal charged: $100
```



## Conclusion

The four pillars of OOP — Encapsulation, Inheritance, Abstraction, and Polymorphism — each address a different source of complexity in large TypeScript projects. Encapsulation protects data, Inheritance shares logic, Abstraction hides complexity, and Polymorphism keeps code extensible. Together, they make large codebases easier to read, maintain, and grow over time.

---

*Part of a TypeScript OOP series.*