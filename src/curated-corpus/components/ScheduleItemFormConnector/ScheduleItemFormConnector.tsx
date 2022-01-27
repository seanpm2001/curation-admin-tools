import { ScheduleItemForm } from '../ScheduleItemForm/ScheduleItemForm';
import React, { useEffect, useState } from 'react';
import { FormikHelpers, FormikValues } from 'formik';
import {
  HandleApiResponse,
  SharedFormButtonsProps,
} from '../../../_shared/components';
import {
  ScheduledCuratedCorpusItemsFilterInput,
  useGetNewTabsForUserQuery,
  useGetScheduledItemCountsLazyQuery,
} from '../../api/curated-corpus-api/generatedTypes';
import { DateTime } from 'luxon';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { ApolloError } from '@apollo/client';
import { useNotifications } from '../../../_shared/hooks';
import { CircularProgress } from '@material-ui/core';

interface ScheduleItemFormConnectorProps {
  /**
   * The UUID of the Approved Curated Item about to be scheduled.
   */
  approvedItemExternalId: string;

  /**
   * The GUID of the New Tab if one's been sent through.
   */
  newTabGuid?: string;

  /**
   * What do we do with the submitted data?
   */
  onSubmit: (
    values: FormikValues,
    formikHelpers: FormikHelpers<any>
  ) => void | Promise<any>;
}

export const ScheduleItemFormConnector: React.FC<
  ScheduleItemFormConnectorProps & SharedFormButtonsProps
> = (props) => {
  const { approvedItemExternalId, newTabGuid, onCancel, onSubmit } = props;

  // Get the list of New Tabs the currently logged-in user has access to.
  const { data, loading, error } = useGetNewTabsForUserQuery();

  // Set the default scheduled date to tomorrow.
  // Do we need to worry about timezones here? .local() returns the date
  // in the user locale, not the UTC date.
  const tomorrow = DateTime.local().plus({ days: 1 });

  // Save the date in a state var as the submitted form will contain
  // a formatted string instead of a luxon object. Would like to work with the luxon
  // object instead of parsing the date from string.
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(tomorrow);

  // Start with no copy underneath the form that shows if there are any other
  // scheduled items for the chosen date.
  const [lookupCopy, setLookupCopy] = useState<JSX.Element | string>('');

  // get a helper function to show an error in case scheduled item lookup fails.
  const { showNotification } = useNotifications();

  // Get the usual API response vars and a helper method to retrieve data
  // that can be used inside hooks.
  const [getScheduledItemCounts, { loading: loadingCounts }] =
    useGetScheduledItemCountsLazyQuery({
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        // If there's something already scheduled for the chosen date,
        // let the user know.
        if (data.getScheduledCuratedCorpusItems.length > 0) {
          const totalCount = data.getScheduledCuratedCorpusItems[0].totalCount;

          setLookupCopy(
            <>
              Already scheduled: {totalCount}{' '}
              {totalCount === 1 ? 'story' : 'stories'} (
              {data.getScheduledCuratedCorpusItems[0].syndicatedCount}{' '}
              syndicated).
            </>
          );
        } else {
          setLookupCopy('Nothing has been scheduled for this date yet.');
        }
      },
      onError: (error: ApolloError) => {
        showNotification(error.message, 'error');
      },
    });

  // What to do when the user clicks on a date in the calendar.
  const handleDateChange = (
    date: MaterialUiPickersDate,
    value?: string | null | undefined
  ) => {
    // Keep track of the chosen date.
    setSelectedDate(date);

    // If the New Tab has been specified, run a lookup query.
    // Realistically, this means that the lookup will be available on the Prospecting
    // page but not on the Corpus page.
    if (newTabGuid) {
      // Look up any other scheduled items for this date + new tab combination.
      // Start with the filters. Note `startDate` and `endDate` is the same as we're
      // interested in single day data only.
      const filters: ScheduledCuratedCorpusItemsFilterInput = {
        newTabGuid,
        startDate: date?.toFormat('yyyy-MM-dd'),
        endDate: date?.toFormat('yyyy-MM-dd'),
      };

      getScheduledItemCounts({ variables: { filters } });
    }
  };

  // There seems to be no better way of tracking this and passing it
  // to the child form component ¯\_(ツ)_/¯.
  useEffect(() => {
    if (loadingCounts) {
      setLookupCopy(
        <>
          <CircularProgress /> Checking...
        </>
      );
    }
  }, [loadingCounts]);

  return (
    <>
      {!data && <HandleApiResponse loading={loading} error={error} />}
      {data && (
        <ScheduleItemForm
          approvedItemExternalId={approvedItemExternalId}
          handleDateChange={handleDateChange}
          lookupCopy={lookupCopy}
          newTabs={data?.getNewTabsForUser}
          newTabGuid={newTabGuid}
          disableNewTab={!!newTabGuid}
          selectedDate={selectedDate}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      )}
    </>
  );
};