import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, getProductById, getProducts } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

//Routing
router.get("/", getProducts);

router.get("/:id", 
    param("id")
        .isInt().withMessage("ID no válido"),
    handleInputErrors,
    
    getProductById
);

router.post("/", 

    //Validación de datos
    body("name")
        .notEmpty().withMessage("El nombre del producto no puede ir vacio"),
    body("price")
        .isNumeric().withMessage("El precio debe ser un número")
        .notEmpty().withMessage("El precio no puede ir vacio")
        .custom( value => value > 0).withMessage("Precio no válido, debe ser mayor a 0"),
    handleInputErrors,    
    
    createProduct
);

router.put("/", (req, res) => {
    res.json("Desde PUT");
});

router.patch("/", (req, res) => {
    res.json("Desde PATCH");
});

router.delete("/", (req, res) => {
    res.json("Desde DELETE");
});

export default router;