import fs from "fs";

let carts = [];
const pathFile = "./src/data/carts.json";

const getCarts = async () => {
  const cartsJson = await fs.promises.readFile(pathFile, "utf-8");
  const cartsPars = JSON.parse(cartsJson);
  carts = cartsPars || [];
};

const createCart = async () => {
  await getCarts();
  const newCart = {
    id: carts.length + 1,
    products: [],
  };

  carts.push(newCart);

  await fs.promises.writeFile(pathFile, JSON.stringify(carts));
  return newCart;
};

const getCartById = async (cid) => {
  
  await getCarts();
  const cart = carts.find((c) => c.id === cid);
  return cart;
};

const addProductToCart = async (cid, pid) => {
  await getCarts();
  const index = carts.findIndex((cart) => cart.id === cid);
  
  // Verificar si el carrito existe
  if (index === -1) {
    throw new Error("Carrito no encontrado");
  }

  const existingProductIndex = carts[index].products.findIndex((product) => product.product === pid);
  
  if (existingProductIndex !== -1) {
    // Si el producto ya existe en el carrito, incrementar la cantidad
    carts[index].products[existingProductIndex].quantity++;
  } else {
    // Si el producto no existe, agregarlo al carrito con cantidad 1
    carts[index].products.push({ product: pid, quantity: 1 });
  }


  await fs.promises.writeFile(pathFile, JSON.stringify(carts));
  
  return carts[index];
};

const updateCart = async (cid, updatedCart) => {
  try {
    // Lógica para actualizar el carrito
    // Por ejemplo:
    // carts[cid - 1] = updatedCart; // Actualizar el carrito en la posición correspondiente
    // await saveCarts(); // Guardar los cambios en el archivo o base de datos
    return updatedCart; // Retornar el carrito actualizado
  } catch (error) {
    throw new Error("Failed to update cart");
  }
};



export default {
  getCarts,
  getCartById,
  addProductToCart,
  createCart,
  updateCart,
 };