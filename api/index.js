const express = require('express');
require('dotenv').config(); 
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const http = require('http');
const { json } = require('body-parser');
const morgan = require('morgan');


const startDatabase = require('./config/db');
const context = require('./context/context');


const typeDefs = require('./graphql/types');
const resolvers = require('./graphql/resolvers');

const PORT = process.env.SERVER_PORT || 4000; 

const startServer = async () => {
  const app = express();

  await startDatabase();

  
  app.use(morgan('dev')); 
  app.use(express.urlencoded({ extended: true })); 
  app.use(cors());

  const httpServer = http.createServer(app);

  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err) => {
      const { message } = err;
     
      return { message };
    },
    csrfPrevention: false, 
    includeStacktraceInErrorResponses: false, 
  });

 
  await server.start();

  
  app.use(
    '/graphql',
    json(), 
    expressMiddleware(server, {
      context: async ({ req }) => {
       
        const user = await context({ req });
        return { user }; 
      },
    })
  );

  // Démarrer le serveur HTTP
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
};

startServer();
