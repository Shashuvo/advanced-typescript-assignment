Question 1: Why is any labeled a "type safety hole," and why is unknown the safer choice for handling unpredictable data? Explain the concept of type narrowing.

Answer: 
any is labeled a "type safety hole" because it disables the type checker for a specific variable and allows to treat a variable like any other JS variable. example:
let value : any = "string"; 
value.toFixed(2); 
any gives no error during compile. but it can crash any time during run-time. that is why it is labeled as "type safety hole".

unknown is safer for unpredictable data because it requires to confirm the data type before using it. example:
let value: unknown = "Hello";
if (typeof value === "string") {
    console.log(data.toUpperCase());
}
value is unknown so it can not access before type narrowing. after narrowing the type it is accessible. that is why unknown is safer.

type narrowing is the process of reducing a wide type to a more specific type within a specific code block. it can be used by using typeof, instance of. it is also known as type guard.