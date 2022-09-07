let userInput: unknown;
// Can only we assigned to itself no other types can assign unknown Like
userInput = 4;
userInput = 'mayank';
let userName: string;
// userName = userInput; // not assignable BUT any is EXAMPLE
let userName2: any;
userName2 = 'mayank'
userName = userName2; // It is assignable
// For assigning unknown to other types be can use
if (typeof userInput === 'string') {
    userName = userInput;
}

// This will crash the server so now output is possible
function generateError(message: string, code: number): never { // Here return type will we never OR we can provide void
    throw { message: message, errorCode: code};
}

generateError('An Error Message', 400);