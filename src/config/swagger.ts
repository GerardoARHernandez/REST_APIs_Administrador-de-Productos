import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.2",
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: "Documentación REST API Express TypeScript",
            version: "1.0.0",
            description: "API Docs for Products"
        }
    },
    apis: ["./src/router.ts"]
}
const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions : SwaggerUiOptions = {
    customCss : `
        .swagger-ui .topbar { background-color: #284557 }
    `, 
}

export default swaggerSpec;
export { swaggerUiOptions };