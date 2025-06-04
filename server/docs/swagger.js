import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerDef from "./swaggerDef.js";
import { User } from "./schemas/user.swagger.js";
import { Event } from "./schemas/event.swagger.js";

const options = {
  definition: {
    ...swaggerDef,
    components: {
      ...swaggerDef.components,
      schemas: {
        User,
        Event,
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};
