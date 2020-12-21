import React, { FC } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useDebouncedCallback } from 'use-debounce';
import styled from 'styled-components';

import Filters from './Filters/index';
import RepoItem from './RepoItem/index';
import { GET_REPO_LIST } from './index';
import { RepoInterface, RepoListResponseInterface } from '../types/types';
import { Text } from '@primer/components';

const Container = styled.div`
  margin: 50px auto 0;
  max-width: 700px;
  width: 100%; 
`;


const RepoList: FC = () => {
  const [ getRepoList, { loading, error, data } ] = useLazyQuery<RepoListResponseInterface>(GET_REPO_LIST);

  const getRepoListDebounced = useDebouncedCallback(getRepoList, 500);

  // UI modes
  const loadingMode = <Text color={'gray.6'}>loading...</Text>;

  const noResultsMode = <Text color={'gray.6'}>No results. Try altering your search</Text>;

  const errorMode = <Text color={'gray.6'}>Something went wrong.</Text>;
  // -------------------
  return (
    <Container>
      <Filters getRepoList={getRepoListDebounced}/>
      {data?.search.edges.map((repo: RepoInterface) =>
        <RepoItem key={repo.node.id} repo={repo}/>)}
      {data?.search.edges.length === 0 && noResultsMode}
      {error && errorMode}
      {loading ? loadingMode : null}
    </Container>
  );
};

export default RepoList;