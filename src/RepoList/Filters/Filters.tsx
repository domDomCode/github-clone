import React, { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, FormGroup, SelectMenu, TextInput } from '@primer/components';
import { DebouncedState } from 'use-debounce/lib/useDebouncedCallback';
import { create } from 'domain';

export interface QueryStringFilters {
  repoName: string;
  isFork: string;
  isMirror: string;
  isArchived: string;
}

/** Filtering options by type, with displayable values */
enum FilterTypesEnum {
  ALL = 'All',
  SOURCES = 'Sources',
  FORK = 'Forks',
  ARCHIVED = 'Archived',
  MIRROR = 'Mirrors',
}

/** Filtering options by language, with displayable values */
enum LanguagesEnum {
  TS = 'TypeScript',
  PHP = 'PHP',
  JS = 'JavaScript',
  RUBY = 'Ruby',
  HTML = 'HTML',
}

interface Props {
  getRepoList: DebouncedState<any> //TODO replace <any>
}

const Filters: FC<Props> = ({ getRepoList }) => {
  const [ repoName, setRepoName ] = useState('');
  const [ activeType, setActiveType ] = useState('');
  const [ activeLanguage, setActiveLanguage ] = useState('');

  //TODO consider lifting fetch up, and only constructing query here - more semantic I guess

  // ensures the useEffect below does not fetch unnecessarily
  const createQueryString = useCallback(() => `
    in:name ${repoName}
    ${activeLanguage ? 'language:' + activeLanguage.toLowerCase() : ''}
    ${activeType === FilterTypesEnum.FORK ? 'fork:only' : ''}
    ${activeType === FilterTypesEnum.MIRROR ? 'mirror:true' : ''}
    ${activeType === FilterTypesEnum.ARCHIVED ? 'archived:true' : ''}
  `, [ repoName, activeType, activeLanguage ]);

  // Fetch data on each filter change - with debounce
  useEffect(
    () => repoName && getRepoList.callback({ variables: { queryString: createQueryString() } }),
    [ repoName, getRepoList, createQueryString ]
  );

  return (
    <div>
      <FormGroup>
        <TextInput
          placeholder={'Search repos'}
          value={repoName}
          onChange={(e) => setRepoName(e.currentTarget.value)}
        />
        <SelectMenu>
          <Button as={'summary'}>Type</Button>
          <SelectMenu.Modal>
            <SelectMenu.Header>Select type</SelectMenu.Header>
            <SelectMenu.List>
              {/*TODO replace any*/}
              {Object.values(FilterTypesEnum).map(type =>
                <SelectMenu.Item
                  key={type}
                  selected={type === activeType}
                  onClick={() => setActiveType(type)}
                >
                  {type}
                </SelectMenu.Item>)}
            </SelectMenu.List>
          </SelectMenu.Modal>
        </SelectMenu>
        <SelectMenu>
          <Button as={'summary'}>Languages</Button>
          <SelectMenu.Modal>
            <SelectMenu.Header>Select language</SelectMenu.Header>
            <SelectMenu.List>
              {Object.values(LanguagesEnum).map(language =>
                <SelectMenu.Item
                  key={language}
                  selected={language === activeLanguage}
                  onClick={() => setActiveLanguage(language)}
                >
                  {language}
                </SelectMenu.Item>)}
            </SelectMenu.List>
          </SelectMenu.Modal>
        </SelectMenu>
      </FormGroup>
    </div>
  );
};

export default Filters;