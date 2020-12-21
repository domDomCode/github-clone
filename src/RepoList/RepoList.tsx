import React, { FC } from 'react';
import Filters from './Filters/index';
import RepoItem from './RepoItem/index';
import { gql, useLazyQuery } from '@apollo/client';
import { useDebouncedCallback } from 'use-debounce';
import styled from 'styled-components';
import { Box } from '@primer/components';

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
          updatedAt
          owner {
            url
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
    updatedAt: string;
    forkCount: number;
    isArchived: boolean;
    isFork: boolean;
    isMirror: boolean;
    licenseInfo: LicenseInfoInterface;
    owner: OwnerInterface;
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

interface LicenseInfoInterface {
  name: string;
}

interface OwnerInterface {
  url: string;
}

const Container = styled.div`
  margin: 50px auto 0;
  max-width: 700px;
  width: 100%; 
`

const RepoList: FC = () => {
  const [ getRepoList, { loading, error, data } ] = useLazyQuery<RepoListResponseInterface>(GET_REPO_LIST);

  const getRepoListDebounced = useDebouncedCallback(getRepoList, 500);

  const loadingMode = (<div>loading...</div>);

  return (
    <Container>
      <Filters getRepoList={getRepoListDebounced} />
        {data?.search.edges.map((repo: RepoInterface) =>
          <RepoItem key={repo.node.id} repo={repo} />)}
        {loading ? loadingMode : null}
    </Container>
  );
};

export default RepoList;