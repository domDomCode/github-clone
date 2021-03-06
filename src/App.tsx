import React from 'react';
import './App.css';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BaseStyles } from '@primer/components'

import RepoList from './RepoList/RepoList';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = process.env.REACT_APP_GITHUB_KEY;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const client = new ApolloClient<unknown>({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <BaseStyles>
          <RepoList />
        </BaseStyles>
      </ApolloProvider>
    </div>
  );
}

export default App;
