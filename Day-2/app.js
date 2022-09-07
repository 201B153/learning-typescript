var userInput;
// Can only we assigned to itself no other types can assign unknown Like
userInput = 4;
userInput = 'mayank';
var userName;
// userName = userInput; // not assignable BUT any is EXAMPLE
var userName2;
userName2 = 'mayank';
userName = userName2; // It is assignable
// For assigning unknown to other types be can use
if (typeof userInput === 'string') {
    userName = userInput;
}
// This will crash the server so now output is possible
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
generateError('An Error Message', 400);
