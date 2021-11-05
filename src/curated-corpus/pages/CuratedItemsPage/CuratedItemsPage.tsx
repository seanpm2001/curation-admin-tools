import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { FormikHelpers, FormikValues } from 'formik';
import { config } from '../../../config';
import {
  CuratedItem,
  CuratedItemEdge,
  CuratedItemFilter,
  useCreateNewTabFeedScheduledItemMutation,
  useGetCuratedItemsLazyQuery,
} from '../../api/curated-corpus-api/generatedTypes';
import { HandleApiResponse } from '../../../_shared/components';
import {
  CuratedItemListCard,
  CuratedItemSearchForm,
  NextPrevPagination,
  ScheduleCuratedItemModal,
} from '../../components';
import { useRunMutation, useToggle } from '../../../_shared/hooks';
import { DateTime } from 'luxon';

export const CuratedItemsPage: React.FC = (): JSX.Element => {
  // Get the usual API response vars and a helper method to retrieve data
  // that can be used inside hooks.
  const [getCuratedItems, { loading, error, data }] =
    useGetCuratedItemsLazyQuery(
      // We need to make sure search results are never served from the cache.
      { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
    );

  // Get a helper function that will execute each mutation, show standard notifications
  // and execute any additional actions in a callback
  const { runMutation } = useRunMutation();

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

  /**
   * Keep track of whether the "Schedule this item for New Tab" modal is open or not.
   */
  const [scheduleModalOpen, toggleScheduleModal] = useToggle(false);

  /**
   * Set the current Curated Item to be worked on (e.g., scheduled for New Tab).
   */
  const [currentItem, setCurrentItem] = useState<CuratedItem | undefined>(
    undefined
  );

  // 1. Prepare the "schedule curated item" mutation
  const [scheduleCuratedItem] = useCreateNewTabFeedScheduledItemMutation();
  // 2. Schedule the curated item when the user saves a scheduling request
  const onScheduleSave = (
    values: FormikValues,
    formikHelpers: FormikHelpers<any>
  ): void => {
    // Set out all the variables we need to pass to the mutation
    const variables = {
      curatedItemExternalId: currentItem?.externalId,
      newTabGuid: values.newTabGuid,
      scheduledDate: values.scheduledDate.toISODate(),
    };

    // Run the mutation
    runMutation(
      scheduleCuratedItem,
      { variables },
      `Item scheduled successfully for ${values.scheduledDate.toLocaleString(
        DateTime.DATE_FULL
      )}`,
      () => {
        toggleScheduleModal();
        formikHelpers.setSubmitting(false);
      },
      () => {
        formikHelpers.setSubmitting(false);
      }
    );
  };

  return (
    <>
      <h1>Live Corpus</h1>
      <CuratedItemSearchForm onSubmit={handleSubmit} />

      {!data && <HandleApiResponse loading={loading} error={error} />}

      {currentItem && (
        <ScheduleCuratedItemModal
          curatedItem={currentItem}
          isOpen={scheduleModalOpen}
          onSave={onScheduleSave}
          toggleModal={toggleScheduleModal}
        />
      )}

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
                  onSchedule={() => {
                    setCurrentItem(edge.node);
                    toggleScheduleModal();
                  }}
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
