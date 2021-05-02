import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import {
  Button,
  CollectionListCard,
  HandleApiResponse,
} from '../../components';
import { CollectionModel } from '../../api';
import { useGetDraftCollectionsQuery } from '../../api';

/**
 * Collection List Page
 */
export const CollectionListPage = (): JSX.Element => {
  // Load collections
  const { loading, error, data } = useGetDraftCollectionsQuery();

  return (
    <>
      <Box display="flex">
        <Box flexGrow={1} alignSelf="center">
          <h1>Collections</h1>
        </Box>
        <Box alignSelf="center">
          <Button component={Link} to="/collections/add/" buttonType="hollow">
            Add collection
          </Button>
        </Box>
      </Box>

      {!data && <HandleApiResponse loading={loading} error={error} />}

      {data &&
        data.searchCollections?.collections.map(
          (collection: CollectionModel) => {
            return (
              <CollectionListCard
                key={collection.externalId}
                collection={collection}
              />
            );
          }
        )}
    </>
  );
};
