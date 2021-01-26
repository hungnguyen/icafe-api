import express from "express";
import * as cartController from "../controllers/cart";
import * as cartItemController from "../controllers/cartItem";
import * as categoryController from "../controllers/category";
import * as foodController from "../controllers/food";
import * as tableController from "../controllers/table";

const router = express.Router();

router.get("/carts", cartController.getAll);
router.get("/carts/:id", cartController.getOne);
router.post("/carts", cartController.create);
router.put("/carts/:id", cartController.update);
router.delete("/carts/:id", cartController.remove);
router.post("/carts/:id/cartItems", cartController.createCartItem);
router.put("/carts/:id/cartItems/:itemId", cartController.updateCartItem);
router.delete("/carts/:id/cartItems/:itemId", cartController.removeCartItem);

router.get("/foods", foodController.getAll);
router.get("/foods/:id", foodController.getOne);
router.post("/foods", foodController.create);
router.put("/foods/:id", foodController.update);
router.delete("/foods/:id", foodController.remove);

router.get("/tables", tableController.getAll);
router.get("/tables/:id", tableController.getOne);
router.post("/tables", tableController.create);
router.put("/tables/:id", tableController.update);
router.delete("/tables/:id", tableController.remove);

router.get("/categories", categoryController.getAll);
router.get("/categories/:id", categoryController.getOne);
router.post("/categories", categoryController.create);
router.put("/categories/:id", categoryController.update);
router.delete("/categories/:id", categoryController.remove);

router.get("/cartItems", cartItemController.getAll);
router.get("/cartItems/:id", cartItemController.getOne);
router.post("/cartItems", cartItemController.create);
router.put("/cartItems/:id", cartItemController.update);
router.delete("/cartItems/:id", cartItemController.remove);

export default router;
