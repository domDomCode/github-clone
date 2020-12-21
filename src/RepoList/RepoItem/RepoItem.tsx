import React, { FC } from 'react';
import { RepoInterface } from '../RepoList';
import { Box, Button as PrimerButton, Link, Text } from '@primer/components';
import { gql, useMutation } from '@apollo/client';
import { ForkIcon, LicenseIcon, StarIcon } from '../../icons/icons';
import { border } from 'styled-system'

const ADD_STAR = gql`
mutation AddStar($repoId: ID!) {
  addStar(input:{starrableId:$repoId}) {
    starrable{
      viewerHasStarred
    }
  }
}
`

const REMOVE_STAR = gql`
mutation RemoveStar($repoId: ID!) {
  removeStar(input:{starrableId:$repoId}) {
    starrable{
      viewerHasStarred
    }
  }
}
`

interface AddStarResponseInterface {
  addStar: {
    starrable: {
      viewerHasStarred: boolean;
    }
  }
}

interface RemoveStarResponseInterface {
  removeStar: {
    starrable: {
      viewerHasStarred: boolean;
    }
  }
}

interface Props {
  repo: RepoInterface
}

const RepoItem: FC<Props> = ({repo}) => {
  const [addStar, {data: addStarData} ] = useMutation<AddStarResponseInterface>(ADD_STAR);
  const [removeStar, {data: removeStarData} ] = useMutation<RemoveStarResponseInterface>(REMOVE_STAR);
  // TODO implement removeStar!!!
  // TODO change star based on return response as well? dedicated const isStarred, that depends on both

  // if mutated, switch to displaying value from the mutation response
  const isStarred = addStarData?.addStar.starrable.viewerHasStarred || repo.node.viewerHasStarred;

  return (
    <Box
      py={4}
      display={'flex'}
      flexDirection={'row'}
      style={{borderBottom: '1px solid #d1d5da'}}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'}>
        <Box>
          <Link as={'h3'} my={2} href={`${repo.node.owner.url}/${repo.node.name}`} >{repo.node.name}</Link>
        </Box>
        <Box display={'inline-flex'} justifyContent={'flex-start'} mb={2} pr={4}>
          <Text
            textAlign={'left'}
            color={'gray.6'}
            fontSize={14}
          >
            {repo.node.description}
          </Text>
        </Box>
        <Box display={'flex'} mt={2}>
          {repo.node.primaryLanguage ? (
            <Text mr={3} color={'gray.6'} fontSize={12}>
              {repo.node?.primaryLanguage.name}
            </Text>
          ) : null}
          <Box mr={3} display={'flex'} alignItems={'center'}>
            {StarIcon}
            <Text color={'gray.6'} pl={1} fontSize={12}>{repo.node.stargazerCount}</Text>
          </Box>
          <Box mr={3} display={'flex'} alignItems={'center'}>
            {ForkIcon}
            <Text color={'gray.6'} pl={1} fontSize={12}> {repo.node.forkCount}</Text>
          </Box>
          {repo.node.licenseInfo ? (
            <Box mr={3} display={'flex'} alignItems={'center'}>
              {LicenseIcon}
              <Text color={'gray.6'} pl={1} fontSize={12}>
                {repo.node?.licenseInfo.name}
              </Text>
            </Box>
          ) : null}
          <Text color={'gray.6'} fontSize={12}>{repo.node.updatedAt}</Text>
        </Box>
      </Box>
      <Box width={100}>
        <PrimerButton
          display={'flex'}
          style={{alignItems: 'center'}}
          color={'gray.6'}
          onClick={() => addStar({variables: {repoId: repo.node.id}})}
        >
          {StarIcon} Star {isStarred ? 'yes' : 'no'}
        </PrimerButton>
      </Box>
    </Box>
  )
}

export default RepoItem;