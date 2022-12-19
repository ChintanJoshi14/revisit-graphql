const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const colors = require("colors");
const connectDB = require("./config/db");
require("dotenv").config();
const port = process.env.PORT || 5000;
const schema = require("./schema/schema");
const app = express();

//connect to database
connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => console.log(`Server Started on port: ${port}`));
