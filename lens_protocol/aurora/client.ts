import { Client} from 'urql';
import { ApolloClient, InMemoryCache} from '@apollo/client'
export { gql } from '@apollo/client'
import 'cross-fetch/polyfill';

export const APIURL = 'https://iiomqabbrc.execute-api.us-east-1.amazonaws.com/prod'
export const apolloClient = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
})

export const basicClient = new Client({ url: APIURL});