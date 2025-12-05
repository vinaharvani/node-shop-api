const Product = require("../models/product");

exports.get_all_products = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}


exports.products_create_product =  async (req, res) => {
    try {
        console.log(req.file);
        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            productImage: req.file.path.replace(/\\/g, "/")
        });

        res.status(201).json({
            message: "Product created",
            createdProduct: product
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}



exports.products_get_product = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}


exports.products_update_product = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,
            req.body,
            { new: true }  // return updated doc
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product updated",
            updatedProduct
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}


exports.products_delete_product = async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.productId);

        if (!deleted) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product deleted",
            deletedProduct: deleted
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
