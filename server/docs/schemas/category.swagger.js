/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the category
 *         name:
 *           type: string
 *           description: Name of the category
 *       required:
 *         - _id
 *         - name
 *     CategoryCreate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the category to create
 *       required:
 *         - name
 *     CategoryUpdate:
 *       type: object
 *       properties:
 *         categoryId:
 *           type: string
 *           description: ID of the category to update
 *         name:
 *           type: string
 *           description: New name for the category
 *       required:
 *         - categoryId
 *         - name
 */

export const Category = {
  type: "object",
  properties: {
    _id: {
      type: "string",
      format: "uuid",
      description: "Unique identifier for the category",
    },
    name: { type: "string", description: "Name of the category" },
  },
  required: ["_id", "name"],
};

export const CategoryCreate = {
  type: "object",
  properties: {
    name: { type: "string", description: "Name of the category to create" },
  },
  required: ["name"],
};

export const CategoryUpdate = {
  type: "object",
  properties: {
    categoryId: { type: "string", description: "ID of the category to update" },
    name: { type: "string", description: "New name for the category" },
  },
  required: ["categoryId", "name"],
};
