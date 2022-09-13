// this is showing you how you use it with react for example
// if your using node or something else you can import using
// @apollo/client/core!
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from , DefaultOptions} from '@apollo/client'
// import {STORAGE_KEY} from '../../lens_protocol/api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '..';
export { gql } from '@apollo/client'

const httpLink = new HttpLink({ uri: 'https://api-mumbai.lens.dev/' });
let accessToken = '';


const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

// example how you can pass in the x-access-token into requests using `ApolloLink`
const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  // if your using node etc you have to handle your auth different

  console.log("access token HEYOO1: ", accessToken)
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      'x-access-token': accessToken ? `Bearer ${accessToken}` : ''
    }
  });
  // Call the next link in the middleware chain.
  return forward(operation);
});

export async function apolloClient() {

  const storage = await AsyncStorage.getItem(STORAGE_KEY)
  if (storage != null)
  {
    const parsedStorage = JSON.parse(storage);
    accessToken = parsedStorage.accessToken
  }

  return new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
  })
} 