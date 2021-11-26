import React from 'react';
import { DateTime } from 'luxon';
import { Box, Grid, Hidden, Typography } from '@material-ui/core';
import { HandleApiResponse } from '../../../_shared/components';
import { MiniNewTabScheduleList, ProspectListCard } from '../../components';
import { client } from '../../api/prospect-api/client';
import { useGetProspectsQuery } from '../../api/prospect-api/generatedTypes';
import { useGetScheduledItemsQuery } from '../../api/curated-corpus-api/generatedTypes';

export const NewTabCurationPage: React.FC = (): JSX.Element => {
  // TODO: remove hardcoded value when New Tab selector is added to the page
  const newTabGuid = 'EN_US';

  // Get a list of prospects on the page
  const { loading, error, data } = useGetProspectsQuery(
    // We need to make sure these results are never served from the cache.
    {
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
      variables: { newTab: newTabGuid },
      client,
    }
  );

  // Get today and tomorrow's items that are already scheduled for this New Tab
  const {
    loading: loadingScheduled,
    error: errorScheduled,
    data: dataScheduled,
  } = useGetScheduledItemsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      filters: {
        newTabGuid,
        startDate: DateTime.local().toFormat('yyyy-MM-dd'),
        endDate: DateTime.local().plus({ days: 1 }).toFormat('yyyy-MM-dd'),
      },
    },
  });

  return (
    <>
      <h1>New Tab Curation</h1>
      <Box mb={3}>
        <Typography>
          I am curating for <strong>{newTabGuid}</strong> (temporarily
          hardcoded)
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={9}>
          {!data && <HandleApiResponse loading={loading} error={error} />}

          {data &&
            data.getProspects.map((prospect) => {
              return <ProspectListCard key={prospect.id} prospect={prospect} />;
            })}
        </Grid>
        <Hidden xsDown>
          <Grid item sm={3}>
            <h4>Scheduled for New Tab</h4>
            {!dataScheduled && (
              <HandleApiResponse
                loading={loadingScheduled}
                error={errorScheduled}
              />
            )}
            {dataScheduled && (
              <MiniNewTabScheduleList
                scheduledItems={
                  dataScheduled.getScheduledCuratedCorpusItems.items
                }
              />
            )}
          </Grid>
        </Hidden>
      </Grid>
    </>
  );
};
