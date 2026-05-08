import { Request, Response } from "express";
// import { check, validationResult } from "express-validator";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {

    try {
        const products = await Product.findAll({
            order: [
                ["price", "DESC"]
            ],
            // attributes: {exclude: ["createdAt", "updatedAt"]}
        });
        res.json({data: products, message: "Productos obtenidos correctamente"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener los productos" });
    }
    
}

export const getProductById = async (req: Request, res: Response) => {

    try {
        const id = Number(req.params.id);
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json({data: product, message: "Producto obtenido correctamente"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener el producto" });
    }

}

export const createProduct = async (req: Request, res: Response) => {

    //Validación de datos sin middleware
    // await check("name")
    //     .notEmpty().withMessage("El nombre del producto no puede ir vacio")
    //     .run(req);
    // await check("price")
    //     .isNumeric().withMessage("El precio debe ser un número")
    //     .notEmpty().withMessage("El precio no puede ir vacio")
    //     .custom( value => value > 0).withMessage("Precio no válido, debe ser mayor a 0")
    //     .run(req);

    // let errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    try {
        const savedProduct = await Product.create(req.body);
        res.status(201).json({data: savedProduct, message: "Producto creado correctamente"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al crear el producto" });
    }
}

export const updateProduct = async (req: Request, res: Response) => {

    try {
        const id = Number(req.params.id);
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        //Actualizar el producto
        await product.update(req.body);
        await product.save();

        res.json({data: product, message: "Producto actualizado correctamente"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al actualizar el producto" });
    }

}

export const updateAvailability = async (req: Request, res: Response) => {

    try {
        const id = Number(req.params.id);
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        //Actualizar la disponibilidad del producto
        product.availability = !product.dataValues.availability;
        await product.save();

        res.json({data: product, message: "Disponibilidad actualizada correctamente"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al actualizar la disponibilidad del producto" });
    }

}

export const restoreProduct = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        // Buscamos también entre los "paranoid: false" (incluye eliminados)
        const product = await Product.findByPk(id, { paranoid: false });

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        //Restaurar el producto
        await product.restore();
        res.json({data: product, message: "Producto restaurado correctamente"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al restaurar el producto" });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        //Eliminar el producto (soft delete)
        await product.destroy();
        res.json({message: "Producto eliminado correctamente", deletedAt: product.get('deletedAt')});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al eliminar el producto" });
    }
}