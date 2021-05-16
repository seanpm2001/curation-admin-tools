import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

/**
 * Styles for the StoryListCard component.
 */
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 'auto',
      padding: '0.5rem 0.25rem',
      border: 0,
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
    image: {
      borderRadius: 4,
    },
    link: {
      textDecoration: 'none',
      padding: '1.25 rem 0',
    },
    title: {
      fontSize: '1.125rem',
      fontWeight: 500,
      '& a': {
        textDecoration: 'none',
        color: '#222222',
      },
    },
    subtitle: {
      fontWeight: 400,
      textTransform: 'capitalize',
    },
    [theme.breakpoints.down('sm')]: {
      title: {
        fontSize: '1rem',
      },
    },
  })
);