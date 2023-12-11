class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        
        if (!(title && description && price && thumbnail && code && stock)) {
            console.log("Todos los campos son obligatorios.");
            return;
        }

        if (this.products.some(product => product.code === code)) {
            console.log(`Ya existe un producto con el código ${code}.`);
            return;
        }

        
        const product = {
            id: this.nextId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(product);
        this.nextId++;
    }

    getProducts() {
        return this.products;
    }

    getProductById(productId) {
        const foundProduct = this.products.find(product => product.id === productId);
        if (foundProduct) {
            return foundProduct;
        }
        console.log(`Producto con ID ${productId} no encontrado.`);
        return null;
    }
}


const productManager = new ProductManager();


productManager.addProduct("Pelota", "Pelota maciza tamaño numero 2", 9.99, "imagen1.jpg", "P001", 100);
productManager.addProduct("Hueso Cartilago", "Huesito Cartilago chico", 2.99, "imagen2.jpg", "P002", 50);

const products = productManager.getProducts();
console.log("Productos:", products);

const productIdToFind = 1;
const foundProduct = productManager.getProductById(productIdToFind);

if (foundProduct) {
    console.log("Producto encontrado:", foundProduct);
}
