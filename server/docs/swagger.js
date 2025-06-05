import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerDef from "./swaggerDef.js";
import { User } from "./schemas/user.swagger.js";
import { Event, EventCreate } from "./schemas/event.swagger.js";
import {
  Category,
  CategoryCreate,
  CategoryUpdate,
} from "./schemas/category.swagger.js";
import { Comment, CommentCreate } from "./schemas/comment.swagger.js";
import { RSVP, RSVPCreate } from "./schemas/rsvp.swagger.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    ...swaggerDef,
    components: {
      ...swaggerDef.components,
      schemas: {
        User,
        Event,
        EventCreate,
        Category,
        CategoryCreate,
        CategoryUpdate,
        Comment,
        CommentCreate,
        RSVP,
        RSVPCreate,
      },
    },
  },
  apis: [
    path.join(__dirname, "../routes/*.js"),
    path.join(__dirname, "../routes/**/*.js"),
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};
