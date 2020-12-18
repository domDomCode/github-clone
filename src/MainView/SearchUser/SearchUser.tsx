import React, { ChangeEvent, FC, useState } from 'react';
import styled from 'styled-components';
import { QueryOptions } from '@apollo/client';

const SearchInput = styled.input`
  padding: 8px;
`;


// FIXME type <any>
const SearchUser: FC<any> = ({ getReposByUser, createQueryString }) => {
  const [ user, setUser ] = useState('');

  const handleUserSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setUser(value);
    getReposByUser.callback({variables: {queryString: createQueryString(value)}});
  }

  return (
    <div>
      <SearchInput value={user} onChange={(e) => handleUserSearchChange(e)}/>
    </div>
  );
};

export default SearchUser;