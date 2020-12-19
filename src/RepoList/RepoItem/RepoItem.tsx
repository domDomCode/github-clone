import React, { FC } from 'react';
import { RepoInterface } from '../RepoList';
import { Button } from '@primer/components';

interface Props {
  repo: RepoInterface
}

const RepoItem: FC<Props> = ({repo}) => {

  return (
    <div>
      <div>{repo.node.name}</div>
      <Button>Star {repo.node.viewerHasStarred ? 'yes' : 'no'}</Button>
      {/*<div>{repo.node.description}</div>*/}
    </div>
  )
}

export default RepoItem;