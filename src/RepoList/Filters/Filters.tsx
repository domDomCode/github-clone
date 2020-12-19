import React, { ChangeEvent, FC, useState } from 'react';
import { Button, FormGroup, SelectMenu, TextInput } from '@primer/components';
import { DebouncedState } from 'use-debounce/lib/useDebouncedCallback';

interface Props {
  getReposByNameDebounced: DebouncedState<any>
}

export interface QueryStringFilters {
  repoName: string;
  isFork: string;
  isMirror: string;
  isArchived: string;
}

const Filters: FC<Props> = ({ getReposByNameDebounced }) => {
  // const typeFilters = [ 'All', 'Sources', 'Forks', 'Archived', 'Mirrors' ];
  // //TODO get from repos (not possible to get list from graphql? :/
  // const languageFilters = [ 'JavaScript', 'PHP', 'TypeScript' ];

  const [ repoName, setRepoName ] = useState('');

  const createQueryString = ({ repoName, isFork, isMirror, isArchived }: QueryStringFilters) => `
  in:name ${repoName}
  ${isFork ? 'fork:only' : ''}
  ${isMirror ? 'mirror:true' : ''}
  ${isArchived}
  `;

  const handleRepoNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setRepoName(value);
    getReposByNameDebounced.callback({variables: {queryString: `in:name ${repoName}`}})
  }

  return (
    <div>
      <FormGroup>
        <TextInput
          placeholder={'Search repos'}
          value={repoName}
          onChange={(e) => handleRepoNameChange(e)}
        />
        <SelectMenu>
          <Button as={'summary'}>Type</Button>
          <SelectMenu.Modal>
            <SelectMenu.Header>Select type</SelectMenu.Header>
            <SelectMenu.List>
              <SelectMenu.Item>All</SelectMenu.Item>
              <SelectMenu.Item selected={true}>Sources</SelectMenu.Item>
              <SelectMenu.Item>Forks</SelectMenu.Item>
              <SelectMenu.Item>Archived</SelectMenu.Item>
              <SelectMenu.Item>Mirrors</SelectMenu.Item>
            </SelectMenu.List>
          </SelectMenu.Modal>
        </SelectMenu>
      </FormGroup>
    </div>
  );
};

export default Filters;