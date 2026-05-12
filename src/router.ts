import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, deleteProduct, getProductById, getProducts, restoreProduct, updateAvailability, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();
/** 
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del producto
 *           example: 1
 *         name:
 *           type: string
 *           description: Nombre del producto
 *           example: "Camiseta"
 *         price:
 *           type: number
 *           description: Precio del producto
 *           example: 300
 *         availability:
 *           type: boolean
 *           description: Disponibilidad del producto
 *           example: true
 */  

/** 
 * @swagger
 * /api/products:
 *      get:
 *        summary: Obtener todos los productos
 *        tags: 
 *          - Products
 *        description: Devuelve una lista de productos 
 *        responses:
 *          200:
 *            description: Respuesta exitosa
 *            content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Product'
 */

//Routing
router.get("/", getProducts);

/** 
 * @swagger
 * /api/products/{id}:
 *     get:
 *       summary: Obtener un producto por ID
 *       tags:
 *         - Products
 *       description: Devuelve un producto específico por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del producto a obtener
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: Respuesta exitosa
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Product'
 *         404:
 *           description: Producto no encontrado
 *         400:
 *           description: Solicitud incorrecta - ID no válido
 */

router.get("/:id", 
    param("id")
        .isInt().withMessage("ID no válido"),
    handleInputErrors,
    
    getProductById
);

/**
 * @swagger
 * /api/products:
 *     post:
 *       summary: Crear un nuevo producto
 *       tags:
 *         - Products
 *       description: Crea un nuevo producto con los datos proporcionados
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                name:
 *                  type: string
 *                  example: "Monitor de 24 pulgadas"
 *                price:
 *                  type: number
 *                  example: 300
 *       responses:
 *         201:
 *           description: Producto creado exitosamente 
 *         400:
 *           description: Solicitud incorrecta - Datos inválidos
 */

router.post("/", 
    //Validación de datos
    body("name")
        .notEmpty().withMessage("El nombre del producto no puede ir vacio"),
    body("price")
        .isNumeric().withMessage("El precio debe ser un número")
        .notEmpty().withMessage("El precio no puede ir vacio")
        .custom( value => value > 0).withMessage("Precio no válido"),
    handleInputErrors,    
    
    createProduct
);

/**
* @swagger  
* /api/products/{id}:
*     put:
*       summary: Actualizar un producto por ID
*       tags: 
*         - Products
*       description: Actualiza un producto específico por su ID
*       parameters:
*         - in: path
*           name: id
*           required: true
*           description: ID del producto a actualizar
*           schema:
*             type: integer
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 name:
*                   type: string
*                   example: "Monitor de 34 pulgadas"
*                 price:
*                   type: number
*                   example: 500
*                 availability:
*                   type: boolean
*                   example: true
*       responses:
*         200:
*           description: Producto actualizado exitosamente
*         404:
*           description: Producto no encontrado
*         400:
*           description: Solicitud incorrecta - ID inválido o Datos inválidos
*/

router.put("/:id", 
    //Validación de datos
    param("id")
        .isInt().withMessage("ID no válido"),
    body("name")
        .notEmpty().withMessage("El nombre del producto no puede ir vacio"),
    body("price")
        .isNumeric().withMessage("El precio debe ser un número")
        .notEmpty().withMessage("El precio no puede ir vacio")
        .custom( value => value > 0).withMessage("Precio no válido"),
    body("availability")
        .isBoolean().withMessage("Valor para la disponibilidad no válido"),
    handleInputErrors,        
    
    updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *     patch:
 *       summary: Actualizar la disponibilidad de un producto por ID
 *       tags:
 *         - Products
 *       description: Actualiza la disponibilidad de un producto específico por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del producto a actualizar
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: Disponibilidad del producto actualizada exitosamente
 *         404:
 *           description: Producto no encontrado
 *         400:
 *           description: Solicitud incorrecta - ID inválido o Datos inválidos
 */

router.patch("/:id", 
    //Validación de datos
    param("id")
        .isInt().withMessage("ID no válido"),
    handleInputErrors,

    updateAvailability
);

/**
 * @swagger
 * /api/products/restore/{id}:
 *     patch:
 *       summary: Restaurar un producto eliminado por ID
 *       tags:
 *         - Products
 *       description: Restaura un producto eliminado específico por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del producto a restaurar
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: Producto restaurado exitosamente
 *         404:
 *           description: Producto no encontrado
 *         400:
 *           description: Solicitud incorrecta - ID inválido o Datos inválidos
 */

router.patch("/restore/:id",
    //Validación de datos
    param("id")
        .isInt().withMessage("ID no válido"),
    handleInputErrors,

    restoreProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *    delete:
 *      summary: Eliminar un producto por ID
 *      tags:
 *        - Products
 *      description: Elimina un producto específico por su ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del producto a eliminar
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: Producto eliminado correctamente
 *        404:
 *          description: Producto no encontrado
 *        400:
 *          description: Solicitud incorrecta - ID inválido o Datos inválidos
 */

router.delete("/:id", 
    //Validación de datos
    param("id")
        .isInt().withMessage("ID no válido"),
    handleInputErrors,

    deleteProduct
);

export default router;