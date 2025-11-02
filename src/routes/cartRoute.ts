import { addItemToCart, getActiveCartForUser, updateItemInCart } from "../services/cartService.ts";
import validateJWT from "../middleware/validateJWT.ts";
import express, { type Request, type Response } from "express";
import type { ExtendRequest } from "../types/extendedRequest.ts";

interface CustomRequest extends Request {
  user: {
    _id: string;
  };
}

const router = express.Router();

router.get(
  "/",
  validateJWT,
  async (req: ExtendRequest, res: Response) => {
    const userId = (req as CustomRequest).user._id;
    const cart = await getActiveCartForUser({ userId });
    res.status(200).send(cart);
  }
);

router.post('/items', validateJWT, async (req: ExtendRequest, res) => {
  const userId = (req as CustomRequest).user._id;
  const { product, quantity } = req.body;
  const response = await addItemToCart({ userId, productId: product, quantity });
  res.status(response.statusCode).send(response.data);
})

router.put("/items", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req?.user?._id;
  const { product, quantity } = req.body;
  const response = await updateItemInCart({ userId, productId: product, quantity })
  res.status(response.statusCode).send(response.data)
})

export default router;
