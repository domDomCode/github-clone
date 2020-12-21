import { gql } from '@apollo/client';

export const GET_REPO_LIST = gql`
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
