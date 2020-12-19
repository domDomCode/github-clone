import React, { FC } from 'react';
import Filters from './Filters/index';
import RepoItem from './RepoItem/index';
import { gql, useLazyQuery } from '@apollo/client';
import { useDebouncedCallback } from 'use-debounce';

const GET_REPOS_BY_USER = gql`
query GetReposByUser($queryString: String!) {
  search(
    query: $queryString, 
    type: REPOSITORY,
    first: 100
  ) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          name
          description
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

export interface ReposByNameResponseInterface {
  search: {
    repositoryCount: number;
    edges: RepoInterface[];
  }
}

export interface RepoInterface {
  node: {
    description: string;
    forkCount: number;
    isArchived: boolean;
    isFork: boolean;
    isMirror: boolean;
    licenseInfo: string;
    databaseId: number;
    name: string;
    primaryLanguage: PrimaryLanguageInterface;
    stargazerCount: number;
    viewerHasStarred: false;
  }
}

interface PrimaryLanguageInterface {
  name: string;
}

const RepoList: FC = () => {
  const [ getReposByName, { loading, error, data } ] = useLazyQuery<ReposByNameResponseInterface>(GET_REPOS_BY_USER);

  const getReposByNameDebounced = useDebouncedCallback(getReposByName, 500);

  return (
    <div>
      <Filters getReposByNameDebounced={getReposByNameDebounced} />
      <div>
        {data?.search.edges.map((repo: RepoInterface) =>
          <RepoItem key={repo.node.databaseId} repo={repo} />)}
      </div>
    </div>
  );
};

export default RepoList;