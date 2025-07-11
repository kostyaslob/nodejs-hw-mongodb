import { HttpError } from "http-errors";


export const errorHandler = (error, req, res, next) => {
    if (error instanceof HttpError) {
        res.status(error.status).json({
            status: error.status,
            message: error.name,
            data: error,
        });
        return;
    }
    
    res.stastu(500).json({
        status: 500,
		message: "Something went wrong",
		error: error.message,
    });
};

