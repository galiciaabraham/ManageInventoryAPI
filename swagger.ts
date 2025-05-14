import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Inventory Management API",
    description:
      "An API to manage your inventory using HTTP requests.",
  },
  host: "http://localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./route/product.ts"];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
