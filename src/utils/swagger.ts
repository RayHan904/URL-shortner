import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "URL Shortener API",
      version: "1.0.0",
      description: "API to shorten a URL",
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
    },
    security: [{ cookieAuth: [] }],
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./src/dist/routes/*.js", "./src/dist/server.js"],
};
const swaggerSpecs = swaggerJsdoc(options);

export const swaggerDocs = (app: Express, port: number) => {
  // Swagger page
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

  // Docs in JSON format
  app.get("docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpecs);
  });

  //   log.info(`Docs available at http://localhost:${port}/docs`);
};
