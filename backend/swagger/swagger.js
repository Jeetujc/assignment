import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "Scalable REST API with JWT & RBAC"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ],
    tags: [
        {
          name: "Users",
          description: "User management APIs"
        },
        {
          name: "Tasks",
          description: "Task management APIs"
        }
      ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./routes/*.js", "./backend/routes/*.js"],

};

const specs = swaggerJsdoc(options);

export default specs;
