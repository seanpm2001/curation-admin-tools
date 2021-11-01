import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { FormikValues } from 'formik';
import { config } from '../../../config';
import {
  CuratedItemEdge,
  CuratedItemFilter,
  useGetCuratedItemsLazyQuery,
} from '../../api/curated-corpus-api/generatedTypes';
import { HandleApiResponse } from '../../../_shared/components';
import {
  CuratedItemListCard,
  CuratedItemSearchForm,
  NextPrevPagination,
} from '../../components';

export const CuratedItemsPage: React.FC = (): JSX.Element => {
  // Get the usual API response vars and a helper method to retrieve data
  // that can be used inside hooks.
  const [getCuratedItems, { loading, error, data }] =
    useGetCuratedItemsLazyQuery(
      // We need to make sure search results are never served from the cache.
      { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
    );

  // Save the filters in a state variable to be able to use them when paginating
  // through results.
  const [filters, setFilters] = useState<CuratedItemFilter>({});

  // Save the cursors returned with every request to be able to use them when
  // paginating through results.
  const [before, setBefore] = useState<string | null | undefined>(undefined);
  const [after, setAfter] = useState<string | null | undefined>(undefined);

  // On the initial page load, load most recently added Curated Items -
  // the first page of results, no filters applied.
  useEffect(() => {
    getCuratedItems({
      variables: {
        pagination: { first: config.pagination.curatedItemsPerPage },
      },
    });
  }, []);

  // Set the cursors once data is returned by the API.
  useEffect(() => {
    if (data) {
      setAfter(data.getCuratedItems.pageInfo.endCursor);
      setBefore(data.getCuratedItems.pageInfo.startCursor);
    }
  }, [data]);

  /**
   * Process search form values and convert them into a CuratedItemFilter
   * object that will be accepted as a variable by the getCuratedItems query.
   * @param values
   */
  const handleSubmit = (values: FormikValues): void => {
    // Using `any` here as TS is rather unhappy at the below for() loop
    // if filters are correctly typed as CuratedItemFilter.
    // The alternative appears to be setting the type correctly and then
    // manually checking each possible filter form value and setting it
    // in the filter input if it contains something.
    const filters: any = {};

    for (const key in values) {
      if (values[key].length > 0) {
        filters[key] = values[key];
      }
    }

    // Execute the search.
    getCuratedItems({
      variables: {
        pagination: { first: config.pagination.curatedItemsPerPage },
        filters,
      },
    });

    setFilters(filters);
  };

  /**
   * Fetch the next page's worth of search results.
   *
   * Note: no caching policies have been implemented yet.
   * Results are always retrieved from the API.
   */
  const loadNext = () => {
    getCuratedItems({
      variables: {
        pagination: { first: config.pagination.curatedItemsPerPage, after },
        filters,
      },
    });
  };

  /**
   * Fetch the previous page's worth of search results.
   *
   * Note: no caching policies have been implemented yet.
   * Results are always retrieved from the API.
   */
  const loadPrevious = () => {
    getCuratedItems({
      variables: {
        pagination: { last: config.pagination.curatedItemsPerPage, before },
        filters,
      },
    });
  };

  return (
    <>
      <h1>Live Corpus</h1>
      <CuratedItemSearchForm onSubmit={handleSubmit} />

      {!data && <HandleApiResponse loading={loading} error={error} />}

      <Grid
        container
        direction="row"
        alignItems="stretch"
        justifyContent="flex-start"
        spacing={3}
      >
        {data && (
          <Grid item xs={12}>
            <Typography>
              Found {data.getCuratedItems.totalCount} results.
            </Typography>
          </Grid>
        )}
        {data &&
          data.getCuratedItems.edges.map((edge: CuratedItemEdge) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={`grid-${edge.node.externalId}`}
              >
                <CuratedItemListCard
                  key={edge.node.externalId}
                  item={edge.node}
                />
              </Grid>
            );
          })}
      </Grid>

      {data && (
        <NextPrevPagination
          hasNextPage={data.getCuratedItems.pageInfo.hasNextPage}
          loadNext={loadNext}
          hasPreviousPage={data.getCuratedItems.pageInfo.hasPreviousPage}
          loadPrevious={loadPrevious}
        />
      )}
    </>
  );
};