import { Response } from 'express';

export class ResponseHandler {
    static successResponse(res: Response, data: any, message: string, statusCode: number) {
        return res.status(statusCode).json({
            status: true,
            status_code: statusCode,
            message: message,
            data: data,
        });
    }

    static errorResponse(res: Response, error: any, message: string, statusCode: number) {
        let params = {
            status_code: statusCode || 500,
            status: false,
            message: message || error.message,
            data: {},     
            };

        if (message) {
            params.message = message;
            params.status_code = statusCode || 400;
        }

        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            params.message = 'Please provide a proper ID';
            params.status_code = 400;
        }

        if (error.code === Number(11000)) {
            params.status_code = 400;
            const field = Object.keys(error.keyValue)[0];
            const formattedField = field.split('_').map((word, index) => index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word).join(' ');
            params.message = `${formattedField} already exists`;
        }

        return res.status(params.status_code).json(params);
    }
}