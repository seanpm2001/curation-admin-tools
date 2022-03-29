import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { DateTime } from 'luxon';
import { ApolloError } from '@apollo/client';
import { FormikHelpers, FormikValues } from 'formik';
import { HandleApiResponse } from '../../../_shared/components';
import {
  LoadExtraButton,
  RemoveItemFromScheduledSurfaceModal,
  ScheduledItemCardWrapper,
  ScheduleItemModal,
  SplitButton,
} from '../../components';
import {
  ScheduledCorpusItem,
  ScheduledCorpusItemsFilterInput,
  ScheduledCorpusItemsResult,
  useDeleteScheduledItemMutation,
  useGetScheduledItemsQuery,
  useGetScheduledSurfacesForUserQuery,
  useRescheduleScheduledCorpusItemMutation,
} from '../../../api/generatedTypes';
import {
  useNotifications,
  useRunMutation,
  useToggle,
} from '../../../_shared/hooks';
import { useStyles } from './SchedulePage.styles';
import { DropdownOption } from '../../helpers/definitions';

export const SchedulePage: React.FC = (): JSX.Element => {
  const { showNotification } = useNotifications();
  const classes = useStyles();

  // set up initial start/end dates for the query
  const [startDate, setStartDate] = useState<DateTime>(DateTime.local());
  const [endDate, setEndDate] = useState<DateTime>(
    DateTime.local().plus({ days: 1 })
  );

  // set up the initial Scheduled Surface GUID value (nothing at this point)
  const [currentScheduledSurfaceGuid, setCurrentScheduledSurfaceGuid] =
    useState('');

  // Why not set up the options we'll feed to the Scheduled Surface dropdown as well
  // at the same time?
  const [scheduledSurfaceOptions, setScheduledSurfaceOptions] = useState<
    DropdownOption[]
  >([]);

  // Get the list of Scheduled Surfaces the currently logged-in user has access to.
  const { data: scheduledSurfaceData } = useGetScheduledSurfacesForUserQuery();

  // Once the data is ready, populate the values for current Scheduled Surface GUID
  // and the dropdown options.
  useEffect(() => {
    if (scheduledSurfaceData) {
      const options = scheduledSurfaceData.getScheduledSurfacesForUser.map(
        (surface) => {
          return { code: surface.guid, name: surface.name };
        }
      );
      if (options.length > 0) {
        setCurrentScheduledSurfaceGuid(options[0].code);
        setScheduledSurfaceOptions(options);
      }
    }
  }, [scheduledSurfaceData]);

  /**
   * When the user selects another Scheduled Surface from the "I am curating for..." dropdown,
   * refetch all the data on the page for that Scheduled Surface.
   */
  const updateScheduledSurface = (option: DropdownOption) => {
    refetch({
      filters: {
        scheduledSurfaceGuid: option.code,
        startDate: startDate.toFormat('yyyy-MM-dd'),
        endDate: endDate.toFormat('yyyy-MM-dd'),
      },
    });
    setCurrentScheduledSurfaceGuid(option.code);
  };

  // By default, load today and tomorrow's items that are already scheduled
  // for this Scheduled Surface
  const { loading, error, data, fetchMore, refetch } =
    useGetScheduledItemsQuery({
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
      variables: {
        filters: {
          scheduledSurfaceGuid: currentScheduledSurfaceGuid,
          startDate: startDate.toFormat('yyyy-MM-dd'),
          endDate: endDate.toFormat('yyyy-MM-dd'),
        },
      },
    });

  /**
   * Load two more days' worth of data in the direction indicated
   *
   * @param direction
   */
  const loadMore = (direction: 'past' | 'future') => {
    let filters: ScheduledCorpusItemsFilterInput;

    if (direction === 'future') {
      // shift the dates two days into the future
      filters = {
        scheduledSurfaceGuid: currentScheduledSurfaceGuid,
        startDate: startDate.plus({ days: 2 }).toFormat('yyyy-MM-dd'),
        endDate: endDate.plus({ days: 2 }).toFormat('yyyy-MM-dd'),
      };
    } else {
      // shift the dates two days into the past
      filters = {
        scheduledSurfaceGuid: currentScheduledSurfaceGuid,
        startDate: startDate.minus({ days: 2 }).toFormat('yyyy-MM-dd'),
        endDate: endDate.minus({ days: 2 }).toFormat('yyyy-MM-dd'),
      };
    }
    fetchMore({
      variables: filters,
    })
      .then(() => {
        // Update the state variables as they will be used to calculate the dates
        // for the next fetchMore() request.
        if (direction === 'future') {
          setStartDate(startDate.plus({ days: 2 }));
          setEndDate(endDate.plus({ days: 2 }));
        } else {
          setStartDate(startDate.minus({ days: 2 }));
          setEndDate(startDate.minus({ days: 2 }));
        }
      })
      .catch((error: ApolloError) => {
        // Show an error in a toast message, if any
        showNotification(error.message, 'error');
      });
  };

  /**
   * Keep track of whether the "Remove this item" modal is open or not.
   */
  const [removeModalOpen, toggleRemoveModal] = useToggle(false);

  /**
   * Keep track of whether the "Schedule Item Modal" is open or not
   */
  const [scheduleItemModalOpen, toggleScheduleItemModal] = useToggle(false);

  /**
   * Set the current Scheduled Item to be worked on.
   */
  const [currentItem, setCurrentItem] = useState<
    Omit<ScheduledCorpusItem, '__typename'> | undefined
  >(undefined);

  // Get a helper function that will execute each mutation, show standard notifications
  // and execute any additional actions in a callback
  const { runMutation } = useRunMutation();

  // Prepare the "delete scheduled item" mutation
  const [deleteScheduledItem] = useDeleteScheduledItemMutation();

  // Prepare the "reschedule scheduled curated corpus item" mutation
  const [rescheduleItem] = useRescheduleScheduledCorpusItemMutation();

  /**
   * Reschedule item
   *
   * @param values
   * @param formikHelpers
   */
  const onRescheduleItem = (
    values: FormikValues,
    formikHelpers: FormikHelpers<any>
  ): void => {
    // Set out all the variables we need to pass to the mutation
    const variables = {
      externalId: currentItem?.externalId,
      scheduledDate: values.scheduledDate.toISODate(),
    };

    // Run the mutation
    runMutation(
      rescheduleItem,
      { variables },
      `Item rescheduled successfully.`,
      () => {
        toggleScheduleItemModal();
        formikHelpers.setSubmitting(false);
      },
      () => {
        formikHelpers.setSubmitting(false);
      },
      refetch
    );
  };

  /**
   * Remove item from Scheduled Surface.
   *
   * @param values
   * @param formikHelpers
   */
  const onRemoveSave = (
    values: FormikValues,
    formikHelpers: FormikHelpers<any>
  ): void => {
    // Set out all the variables we need to pass to the mutation
    const variables = {
      externalId: currentItem?.externalId,
    };

    // Run the mutation
    runMutation(
      deleteScheduledItem,
      { variables },
      `Item removed successfully.`,
      () => {
        toggleRemoveModal();
        formikHelpers.setSubmitting(false);
      },
      () => {
        formikHelpers.setSubmitting(false);
      },
      refetch
    );
  };

  return (
    <>
      <h1>Schedule</h1>

      {currentItem && (
        <RemoveItemFromScheduledSurfaceModal
          item={currentItem}
          isOpen={removeModalOpen}
          onSave={onRemoveSave}
          toggleModal={toggleRemoveModal}
        />
      )}

      {currentItem && (
        <ScheduleItemModal
          approvedItem={currentItem.approvedItem}
          headingCopy={'Reschedule Item'}
          isOpen={scheduleItemModalOpen}
          toggleModal={toggleScheduleItemModal}
          onSave={onRescheduleItem}
          scheduledSurfaceGuid={currentScheduledSurfaceGuid}
        />
      )}

      {scheduledSurfaceOptions.length > 0 && (
        <Box mb={3}>
          View schedule for:
          <SplitButton
            onMenuOptionClick={updateScheduledSurface}
            options={scheduledSurfaceOptions}
            size="small"
          />
        </Box>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {!data && <HandleApiResponse loading={loading} error={error} />}

          {data && (
            <LoadExtraButton
              arrowDirection="up"
              label="Show Previous"
              onClick={() => {
                loadMore('past');
              }}
            />
          )}

          {data &&
            data.getScheduledCorpusItems.map(
              (data: ScheduledCorpusItemsResult) => (
                <Grid
                  container
                  direction="row"
                  alignItems="stretch"
                  justifyContent="flex-start"
                  spacing={3}
                  key={data.scheduledDate}
                >
                  <>
                    <Grid item xs={12}>
                      <Typography className={classes.heading} variant="h2">
                        {DateTime.fromFormat(data.scheduledDate, 'yyyy-MM-dd')
                          .setLocale('en')
                          .toLocaleString(DateTime.DATE_FULL)}{' '}
                        ({data.syndicatedCount}/{data.totalCount} syndicated)
                      </Typography>
                    </Grid>
                    {data.items.map((item: ScheduledCorpusItem) => {
                      return (
                        <ScheduledItemCardWrapper
                          key={item.externalId}
                          item={item}
                          onRemove={() => {
                            setCurrentItem(item);
                            toggleRemoveModal();
                          }}
                          onReschedule={() => {
                            setCurrentItem(item);
                            toggleScheduleItemModal();
                          }}
                        />
                      );
                    })}
                  </>
                </Grid>
              )
            )}

          {data && (
            <LoadExtraButton
              arrowDirection="down"
              label="Show Next"
              onClick={() => {
                loadMore('future');
              }}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};
