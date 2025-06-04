export default {
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
    description: "A simple Express API with Swagger documentation",
    contact: {
      name: "API Support",
      email: "support@example.com",
    },
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};
