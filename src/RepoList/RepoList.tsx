import React, { FC } from 'react';
import Filters from './Filters/index';
import RepoItem from './RepoItem/index';
import { gql, useLazyQuery } from '@apollo/client';
import { useDebouncedCallback } from 'use-debounce';

const GET_REPO_LIST = gql`
query GetRepoList($queryString: String!) {
  search(
    query: $queryString, 
    type: REPOSITORY,
    first: 100
  ) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          id
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

export interface RepoListResponseInterface {
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
    id: string;
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
  const [ getRepoList, { loading, error, data } ] = useLazyQuery<RepoListResponseInterface>(GET_REPO_LIST);

  const getRepoListDebounced = useDebouncedCallback(getRepoList, 500);

  return (
    <div>
      <Filters getRepoList={getRepoListDebounced} />
      <div>
        {data?.search.edges.map((repo: RepoInterface) =>
          <RepoItem key={repo.node.id} repo={repo} />)}
      </div>
    </div>
  );
};

export default RepoList;