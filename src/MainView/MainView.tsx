import React, { FC } from 'react';
import SearchUser from './SearchUser/SearchUser';
import { gql, useLazyQuery } from '@apollo/client';
import { useDebouncedCallback } from 'use-debounce';

const GET_REPOS_BY_USER = gql`
query GetReposByUser($queryString: String!) {
  search(
    query: $queryString, 
    type: REPOSITORY, 
    first: 10,
  ) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          name
          descriptionHTML
          primaryLanguage {
            name
          }
          viewerHasStarred
          forkCount
          isFork
          isArchived
          isMirror
          stargazerCount
          licenseInfo {
            name
          }
        }
      }
    }
  }
}
`;

const MainView: FC = () => {
  const [ getReposByUser, { loading, error, data } ] = useLazyQuery(GET_REPOS_BY_USER);

  const getReposByUserDebounced = useDebouncedCallback(getReposByUser, 500)
  const createQueryString = (user: string) => `user:${user}`;

  return (
    <div>
      <SearchUser getReposByUser={getReposByUserDebounced} createQueryString={createQueryString}/>
    </div>
  );
};

export default MainView;