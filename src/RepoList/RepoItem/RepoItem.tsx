import React, { FC, ReactNode, useEffect, useState } from 'react';
import { RepoInterface } from '../RepoList';
import { Box, Button as PrimerButton, Grid, Link, Text } from '@primer/components';
import { gql, useMutation } from '@apollo/client';
import { border } from 'styled-system';
import { differenceInCalendarDays, format, parseISO } from 'date-fns';
import { LawIcon, RepoForkedIcon, StarFillIcon, StarIcon } from '@primer/octicons-react';

const ADD_STAR = gql`
mutation AddStar($repoId: ID!) {
  addStar(input:{starrableId:$repoId}) {
    starrable{
      viewerHasStarred
    }
  }
}
`;

const REMOVE_STAR = gql`
mutation RemoveStar($repoId: ID!) {
  removeStar(input:{starrableId:$repoId}) {
    starrable{
      viewerHasStarred
    }
  }
}
`;

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

const RepoItem: FC<Props> = ({ repo }) => {
  const [ addStar, { data: addStarData } ] = useMutation<AddStarResponseInterface>(ADD_STAR);
  const [ removeStar, { data: removeStarData } ] = useMutation<RemoveStarResponseInterface>(REMOVE_STAR);
  // TODO implement removeStar!!!
  // TODO change star based on return response as well? dedicated const isStarred, that depends on both

  // if mutated, switch to displaying value from the mutation response
  const [ isStarred, setIsStarred ] = useState<boolean | null>(repo.node.viewerHasStarred);

  useEffect(() => {
    (addStarData || removeStarData) && setIsStarred(prevState => !prevState);
  }, [ addStarData, removeStarData ]);

  const handleAddRemoveStar = (): void => {
    const mutationOptions = { variables: { repoId: repo.node.id } };


    isStarred ? removeStar(mutationOptions) : addStar(mutationOptions);
  };

  const getUpdatedAtInfo = (): ReactNode => {
    const updatedAtDate = parseISO(repo.node.updatedAt);

    const differenceInDays = differenceInCalendarDays(
      new Date(),
      updatedAtDate
    );

    if (differenceInDays === 0) {
      return null;
    } else if (differenceInDays <= 10) {
      return <Text color={'gray.6'} fontSize={12}>Updated {differenceInDays} ago</Text>;
    } else {
      return <Text color={'gray.6'} fontSize={12}>Updated on {format(updatedAtDate, 'MMM dd')}</Text>;
    }
  };

  const repoLink = `${repo.node.owner.url}/${repo.node.name}`;

  return (
    <Box
      py={4}
      display={'flex'}
      flexDirection={'row'}
      style={{ borderBottom: '1px solid #d1d5da' }}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'}>
        <Box>
          <Link as={'h3'}
                my={2}
                style={{ cursor: 'pointer' }}
                href={repoLink}
          >
            {repo.node.name}
          </Link>
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
        <Box display={'flex'} alignItems={'center'} mt={2}>
          {repo.node.primaryLanguage ? (
            <Text mr={3} color={'gray.6'} fontSize={12}>
              {repo.node?.primaryLanguage.name}
            </Text>
          ) : null}
          <Link
            href={`${repoLink}/stargazers`}
            mr={3}
            color={'gray.6'}
            muted={true}
            style={{ cursor: 'pointer' }}
            fontSize={12}
          >
            <StarIcon size={16}/>
            <Text pl={1}>{repo.node.stargazerCount}</Text>
          </Link>
          <Link
            href={`${repoLink}/network/members`}
            mr={3}
            color={'gray.6'}
            muted={true}
            style={{ cursor: 'pointer' }}
            fontSize={12}
          >
            <RepoForkedIcon size={16}/>
            <Text pl={1}>{repo.node.forkCount}</Text>
          </Link>
          {repo.node.licenseInfo ? (
            <Box mr={3} display={'flex'} alignItems={'center'} color={'gray.6'}>
              <LawIcon size={16}/>
              <Text color={'gray.6'} pl={1} fontSize={12}>
                {repo.node?.licenseInfo.name}
              </Text>
            </Box>
          ) : null}
          <Box>{getUpdatedAtInfo()}</Box>
        </Box>
      </Box>
      <Box>
        <PrimerButton
          display={'flex'}
          style={{ alignItems: 'center' }}
          color={'gray.6'}
          onClick={() => handleAddRemoveStar()}
        >
          {isStarred ? <StarFillIcon size={16}/> : <StarIcon size={16}/>}
          <Text color={'gray.6'} pl={1}>Star</Text>
        </PrimerButton>
      </Box>
    </Box>
  );
};

export default RepoItem;