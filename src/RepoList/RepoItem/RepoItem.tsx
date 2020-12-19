import React, { FC } from 'react';
import { RepoInterface } from '../RepoList';
import { Button } from '@primer/components';
import { gql, useMutation } from '@apollo/client';

const ADD_STAR = gql`
mutation AddStar($repoId: ID!) {
  addStar(input:{starrableId:$repoId}) {
    starrable{
      viewerHasStarred
    }
  }
}
`

interface Props {
  repo: RepoInterface
}

const RepoItem: FC<Props> = ({repo}) => {
  const [addStar, {data} ] = useMutation(ADD_STAR);

  return (
    <div>
      <div>{repo.node.name}</div>
      <Button onClick={() => addStar({variables: {repoId: repo.node.id}})}>
        Star {repo.node.viewerHasStarred ? 'yes' : 'no'}
      </Button>
      {/*<div>{repo.node.description}</div>*/}
    </div>
  )
}

export default RepoItem;