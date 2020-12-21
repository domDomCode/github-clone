import React, { FC, useCallback, useEffect, useState } from 'react';
import { Box, Button, Text, SelectMenu, TextInput } from '@primer/components';
import { DebouncedState } from 'use-debounce/lib/useDebouncedCallback';

import { FilterTypesEnum } from './enum/FilterTypesEnum';
import { LanguagesEnum } from './enum/LanguagesEnum';
import ResetFilterBtn from './ResetFilterBtn';


interface Props {
  getRepoList: DebouncedState<any>;
}

const Filters: FC<Props> = ({ getRepoList }) => {
  const [ repoName, setRepoName ] = useState<string>('');
  const [ activeType, setActiveType ] = useState<FilterTypesEnum | null>(null);
  const [ activeLanguage, setActiveLanguage ] = useState<LanguagesEnum | null>(null);

  // ensures the useEffect below does not fetch unnecessarily
  const createQueryString = useCallback(() => `
    user:gaearon
    in:name ${repoName}
    ${activeLanguage ? 'language:' + activeLanguage.toLowerCase() : ''}
    ${activeType === FilterTypesEnum.FORK ? 'fork:only' : ''}
    ${activeType === FilterTypesEnum.MIRROR ? 'mirror:true' : ''}
    ${activeType === FilterTypesEnum.ARCHIVED ? 'archived:true' : ''}
  `, [ repoName, activeType, activeLanguage ]);

  // Fetch data on each filter change - with debounce
  useEffect(
    () => getRepoList.callback({ variables: { queryString: createQueryString() } }),
    [ repoName, getRepoList, createQueryString ]
  );

  return (
    <Box width={'100%'} display={'flex'} mb={4}>
      <Box mr={3} display={'flex'} flexGrow={4} flexBasis={2} justifyContent={'flex-end'}>

        <TextInput
          width={'100%'}
          placeholder={'Search repos (hardcoded user: gaearon)'}
          value={repoName}
          onChange={(e) => setRepoName(e.currentTarget.value)}
        />

      </Box>
      <Box display={'flex'} justifyContent={'space-between'} flexBasis={1} flexGrow={1}>

        <SelectMenu mr={2}>
          <Button as={'summary'}>
            {activeType
              ? <>
                <Text color={'gray.6'}>Type:</Text> {activeType}
              </>
              : <Text>Type</Text>}
          </Button>
          <SelectMenu.Modal align={'left'}>
            <SelectMenu.Header>
              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Text>Select type</Text>
                <ResetFilterBtn setActiveFilter={setActiveType}/>
              </Box>
            </SelectMenu.Header>
            <SelectMenu.List>
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
          <Button as={'summary'}>
            {activeLanguage
              ? <>
                <Text color={'gray.6'}>Language:</Text> {activeLanguage}
              </>
              : <Text>Languages</Text>}
          </Button>
          <SelectMenu.Modal>
            <SelectMenu.Header>
              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Text>Select Language</Text>
                <ResetFilterBtn setActiveFilter={setActiveLanguage}/>
              </Box>
            </SelectMenu.Header>
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

      </Box>
    </Box>
  );
};

export default Filters;