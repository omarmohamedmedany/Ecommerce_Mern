import type { NextFunction, Request, Response } from "express";
import JWT from 'jsonwebtoken';
import userModel from "../models/userModel.ts";
import type { ExtendRequest } from "../types/extendedRequest.ts";

const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
    const authroizationHeader = req.get('authorization');

    if (!authroizationHeader) {
        res.status(403).send({ message: 'Authorization header missing' });
        return;
    }

    const token = authroizationHeader.split(' ')[1];

    if (!token) {
        res.status(403).send( 'Token missing' );
        return;
    }

    JWT.verify(token, 'rWGXh1oRyUQtRnyDJKTi7qeHJ6CL5ycl', async (err, payload) => {
        if (err) {
            res.status(403).send({ message: 'Invalid token' });
            return;
        }

        if (!payload) {
            res.send(403).send("Invalid token payload");
            return;
        }

        const userPayload = payload as { email: string; firstName: string; lastName: string };

       const user = await userModel.findOne({ email: userPayload.email})
       req.user = user;
       next();
    });
}; 

export default validateJWT;