import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, deleteProduct, getProductById, getProducts, restoreProduct, updateAvailability, updateProduct } from "./handlers/product";
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

router.put("/:id", 
    //Validación de datos
    param("id")
        .isInt().withMessage("ID no válido"),
    body("name")
        .notEmpty().withMessage("El nombre del producto no puede ir vacio"),
    body("price")
        .isNumeric().withMessage("El precio debe ser un número")
        .notEmpty().withMessage("El precio no puede ir vacio")
        .custom( value => value > 0).withMessage("Precio no válido, debe ser mayor a 0"),
    body("availability")
        .isBoolean().withMessage("Valor para la disponibilidad no válido"),
    handleInputErrors,        
    
    updateProduct

);

router.patch("/:id", 
    //Validación de datos
    param("id")
        .isInt().withMessage("ID no válido"),
    handleInputErrors,

    updateAvailability
);

router.patch("/restore/:id",
    //Validación de datos
    param("id")
        .isInt().withMessage("ID no válido"),
    handleInputErrors,

    restoreProduct
)

router.delete("/:id", 
    //Validación de datos
    param("id")
        .isInt().withMessage("ID no válido"),
    handleInputErrors,

    deleteProduct
);

export default router;