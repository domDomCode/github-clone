import { gql } from '@apollo/client';

export const ADD_STAR = gql`
mutation AddStar($repoId: ID!) {
  addStar(input:{starrableId:$repoId}) {
    starrable{
      viewerHasStarred
    }
  }
}
`;

export const REMOVE_STAR = gql`
mutation RemoveStar($repoId: ID!) {
  removeStar(input:{starrableId:$repoId}) {
    starrable{
      viewerHasStarred
    }
  }
}
`;

