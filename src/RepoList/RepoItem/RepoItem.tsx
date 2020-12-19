import React, { FC } from 'react';
import { RepoInterface } from '../RepoList';

interface Props {
  repo: RepoInterface
}

const RepoItem: FC<Props> = ({repo}) => {

  return (
    <div>
      <div>{repo.node.name}</div>
      {/*<div>{repo.node.description}</div>*/}
    </div>
  )
}

export default RepoItem;