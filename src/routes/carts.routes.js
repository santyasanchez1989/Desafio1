import { Router } from "express";
import cartManager from "../cartManager.js";
import productManager from "../productManager.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const cart = await cartManager.createCart();

    res.status(201).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(Number(cid));
    if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });

    res.status(200).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
    try {
      const { cid, pid } = req.params;
  
      const product = await productManager.getProductById(Number(pid));
      if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });
  
      const cart = await cartManager.addProductToCart(Number(cid), Number(pid));
      if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });

      const existingProductIndex = cart.products.findIndex(p => p.product === Number(pid));
    if (existingProductIndex !== -1) {
      // Si el producto ya está en el carrito, incrementar la cantidad
      cart.products[existingProductIndex].quantity++;
    } else {
      // Si el producto no está en el carrito, agregarlo con cantidad 1
      cart.products.push({ product: Number(pid), quantity: 1 });
    }

    // Guardar el carrito actualizado
    await cartManager.updateCart(Number(cid), cart);
  
    res.status(200).json({ status: "success", cart });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  });
export default router;