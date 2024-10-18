const express = require('express');
require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const http = require('http');
const { json } = require('body-parser');
const morgan = require('morgan');
const { graphqlUploadExpress } = require('graphql-upload-minimal'); // Import this
const { GraphQLUpload } = require('graphql-upload-minimal');
const startDatabase = require('./config/db');
const context = require('./context/context');

const typeDefs = require('./graphql/types');
const resolvers = require('./graphql/resolvers');

const PORT = process.env.SERVER_PORT || 4000;

const startServer = async () => {
  const app = express();

  // Start the database
  await startDatabase();

  // Middleware logging
  app.use(morgan('dev'));
  app.use(express.urlencoded({ extended: true }));

  // Use CORS
  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
      credentials: true,
    })
  );

  // File upload middleware using graphql-upload
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 })); // Limit: 10MB and 10 files

  // Create the HTTP server
  const httpServer = http.createServer(app);

  // Create Apollo Server instance
  const server = new ApolloServer({
    typeDefs,
    resolvers:{
      Upload:GraphQLUpload,
      ...resolvers,
    },
    formatError: (err) => {
      console.error(err); // Log the full error
      const { message, extensions } = err;
      return { message, code: extensions?.code };
    },
    csrfPrevention: false,
    includeStacktraceInErrorResponses: process.env.NODE_ENV !== 'production',
  });

  // Start Apollo server
  await server.start();

  // Apply the Apollo middleware
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

  // Serve uploaded files (optional)
  app.use('/uploads', express.static('uploads'));

  // Start the HTTP server
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
};

startServer().catch(console.error);
