import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CustomLoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly logger: CustomLoggerService) {
    }

    use(req: Request, res: Response, next: NextFunction) {
        // Log the incoming request
        this.logger.logRequest(req);

        // Store original send method to intercept response
        const originalSend = res.send.bind(res);

        res.send = (body) => {
            // Log the response when sending it
            this.logger.logResponse(req, res, body);
            return originalSend(body); // Call the original send method
        };

        // Mask password in the request body before logging
        const maskedBody = this.maskPassword(req.body);
        this.logger.logRequestBody(req, maskedBody);

        next();
    }

    private maskPassword(body: any) {
        // Check if body is an object and contains a password field
        if (body && typeof body === 'object') {
            // Clone the body to avoid mutating the original request body
            const maskedBody = { ...body };

            // Mask the password and other sensitive fields
            if (maskedBody.password) {
                maskedBody.password = '******';
            }
            if (maskedBody.newPassword) {
                maskedBody.newPassword = '******';
            }
            if (maskedBody.oldPassword) {
                maskedBody.oldPassword = '******';
            }

            return maskedBody;
        }
        return body;
    }
}
