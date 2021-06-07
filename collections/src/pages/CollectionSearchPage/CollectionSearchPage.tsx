import { Box, Paper } from '@material-ui/core';
import {
  CollectionListCard,
  HandleApiResponse,
  CollectionSearchForm,
  ScrollToTop,
} from '../../components';
import { useGetSearchCollectionsLazyQuery } from '../../api/collection-api';
import { FormikValues } from 'formik';

export const CollectionSearchPage = (): JSX.Element => {
  // prepare the query for executing in the handleSubmit callback below
  const [
    searchCollections,
    { loading, error, data },
  ] = useGetSearchCollectionsLazyQuery();

  /**
   * Collect form data and send it to the API.
   * Update components on page if updates have been saved successfully
   */
  const handleSubmit = (values: FormikValues): void => {
    // prepare the search filters
    const searchVars: any = {
      author: values.author,
      title: values.title,
    };

    // author and title are strings and can be blank, but status must be a
    // CollectionStatus enum
    if (values.status !== '') {
      searchVars['status'] = values.status;
    }

    // execute the search
    searchCollections({
      variables: searchVars,
    });
  };

  return (
    <>
      <ScrollToTop />
      <Box display="flex">
        <h1>Search Collections</h1>
      </Box>

      <Box p={2} mt={3}>
        <CollectionSearchForm onSubmit={handleSubmit} />
      </Box>

      <Paper elevation={4}>
        <Box p={2} mt={3}>
          {!data && <HandleApiResponse loading={loading} error={error} />}

          {data &&
            data.searchCollections &&
            !data.searchCollections.collections.length && (
              <div>No results!</div>
            )}

          {data &&
            data.searchCollections &&
            data.searchCollections.collections.map((collection) => {
              return (
                <CollectionListCard
                  key={collection.externalId}
                  collection={collection}
                />
              );
            })}
        </Box>
      </Paper>
    </>
  );
};
