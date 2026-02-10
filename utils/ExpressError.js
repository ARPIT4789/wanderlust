class ExpressError extends Error{
    constructor(statusCode,message){
        super();
        this.statusCode = statusCode
        this.message = message
    }
}
module.exports = ExpressError;

// class ExpressError extends Error {
//     constructor(statusCode, message) {
//         super(message);          // ✅ pass message here
//         this.statusCode = statusCode;
//     }
// }

// module.exports = ExpressError;
