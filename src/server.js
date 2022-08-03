require("dotenv").config();
const http = require("http");
const path = require("path");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { ApolloServer } = require("apollo-server-express");

const PORT = process.env.PORT || 8000;

const { mongoConnect } = require("./services/mongo.service");

const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));
const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray,
});

const app = require("./app");

const server = http.createServer(app);

async function startServer() {
  //    // start Apolloserver
  const apolloserver = new ApolloServer({ schema });
  await apolloserver.start();
  apolloserver.applyMiddleware({ app, path: "/graphql" });

  // start mongodb
  mongoConnect();

  // start main server
  server.listen(PORT, () =>
    console.log(`Listenning at http://localhost:${PORT}`)
  );
}

startServer().catch((error) => console.error(error));
