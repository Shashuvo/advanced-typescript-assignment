// <-- problem 1 -->
const filterEvenNumbers = (arr: number[]) => {
    const result = arr.filter(num => {
        if (num % 2 === 0) {
            return num;
        }
    })
    console.log(result);
}

filterEvenNumbers([1, 2, 3, 4, 5, 6]);


// <-- problem 2 -->
const reverseString = (value: string) => {
    const result = value.split("").reverse().join("");
    console.log(result);
}

reverseString("typescript");

// <-- problem 3 -->
type StringOrNumber = string | number;

const checkType = (value: StringOrNumber) => {
    if (typeof value === "number") {
        console.log(`"Number"`);
    }
    else if (typeof value === "string") {
        console.log(`"String"`);
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
    console.log(`"${userInfo[key]}"`);
}
const user = { id: 1, name: "John Doe", age: 21 };
getProperty(user, "name");
