class HttpError extends Error {

    constructor(status = 500, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params);
    
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, HttpError);
        }

        this.name = "HttpError";
        this.status = status;

        // Error occurs @
        this.date = new Date();
    }
}

module.exports = HttpError;
