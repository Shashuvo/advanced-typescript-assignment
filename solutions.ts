// <-- problem 1 -->
const filterEvenNumbers = (arr: number[]): number[] => {
    const result = arr.filter(num => {
        if (num % 2 === 0) {
            return num;
        }
    })
    return result;
}

filterEvenNumbers([1, 2, 3, 4, 5, 6]);


// <-- problem 2 -->
const reverseString = (value: string) => {
    const result = value.split("").reverse().join("");
    return result;
}

reverseString("typescript");

// <-- problem 3 -->
type StringOrNumber = string | number;

const checkType = (value: StringOrNumber): string | undefined => {
    if (typeof value === "number") {
        return `Number`;
    }
    else if (typeof value === "string") {
        return `String`;
    }
}

checkType("Hello");
checkType(42);


// <-- problem 4 -->
type mustInfo = {
    id: number;
    name: string;
    age: number;
}

const getProperty = <T extends mustInfo>(userInfo: T, key: keyof T) => {
    return `${userInfo[key]}`;
}
const user = { id: 1, name: "John Doe", age: 21 };
getProperty(user, "name");

// <-- problem 5 -->
interface Book {
    title: string;
    author: string;
    publishedYear: number;
}

interface BookStat {
    isRead: boolean;
}

const toggleReadStatus = (obj: Book): BookStat => {
    return {
        ...obj,
        isRead: true
    }
}
const myBook = { title: "TypeScript Guide", author: "Jane Doe", publishedYear: 2024 };
toggleReadStatus(myBook);

// <-- problem 6 -->
class Person {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

class Student extends Person {
    grade: string;
    constructor(name: string, age: number, grade: string) {
        super(name, age);
        this.grade = grade;
    }
    getDetails(): string {
        const result = `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
        return result;
    }
}
const student = new Student("Alice", 20, "A");
student.getDetails();

// <-- problem 7 -->
const getIntersection = (arr1: number[], arr2: number[]): number[] => {
    const result = arr1.filter(num => {
        if (arr2.includes(num)) {
            return num;
        }
    })
    return result;
}
getIntersection([1, 2, 3, 4, 5], [3, 4, 5, 6, 7]);