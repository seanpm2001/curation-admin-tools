import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

/**
 * Styles for the NewTabGroupedList component.
 */
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      fontSize: '1.5rem',
      fontWeight: 500,
      textTransform: 'capitalize',
      color: theme.palette.primary.main,
      padding: '0.75rem 0',
    },
    compact: {
      fontSize: '1rem',
      fontWeight: 500,
      textTransform: 'capitalize',
      color: theme.palette.primary.main,
      padding: '0.75rem 0',
    },
  })
);
