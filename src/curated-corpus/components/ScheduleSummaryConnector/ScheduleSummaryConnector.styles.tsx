import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

/**
 * Styles for the ScheduleSummaryConnector component.
 */
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: '1rem',
      fontWeight: 500,
      padding: '0.75rem 0',
    },
  })
);
