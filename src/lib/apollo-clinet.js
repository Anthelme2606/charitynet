import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import Cookies from 'js-cookie';

// Create a link to the GraphQL API
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql', // Replace with your actual GraphQL endpoint
});

// Set the Authorization header for every request
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from cookies (or local storage, etc.)
  const token = Cookies.get('token');

  // Return the headers with the Authorization token
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(createUploadLink({ uri: 'http://localhost:4000/graphql' })),
});

// Provider for the application
const ServerProvider = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};

export default ServerProvider;
