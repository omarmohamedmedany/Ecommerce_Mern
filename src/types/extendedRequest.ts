import { type Request } from "express";
export interface ExtendRequest extends Request {
    body: { product: any; quantity: any; };
    user?: any;
}