const sendResponse = (res, statusCode, message, data = null, error = null) => {
    res.status(statusCode).json({ success, message, data, error });
    };

export{ sendResponse };
