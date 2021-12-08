import React from 'react';
import { Prospect } from '../../api/prospect-api/generatedTypes';
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Chip,
  Grid,
  Link,
  Typography,
} from '@material-ui/core';
import { useStyles } from './ProspectListCard.styles';
import LanguageIcon from '@material-ui/icons/Language';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import { Button } from '../../../_shared/components';

interface ProspectListCardProps {
  /**
   * An object with everything prospect-related in it.
   */
  prospect: Prospect;

  /**
   * What to do when the user presses the "Reject" button on the card.
   */
  onReject: () => void;
}

export const ProspectListCard: React.FC<ProspectListCardProps> = (
  props
): JSX.Element => {
  const classes = useStyles();
  const { prospect, onReject } = props;

  return (
    <Card className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <CardMedia
            component="img"
            src={
              prospect.imageUrl && prospect.imageUrl.length > 0
                ? prospect.imageUrl
                : '/placeholders/collectionSmall.svg'
            }
            alt={prospect.title ?? 'No title supplied'}
            className={classes.image}
          />
          <Typography variant="subtitle2" color="textSecondary">
            Saves: {prospect.saveCount}
            <br />
            Source: {prospect.prospectType.toLowerCase()}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Link href={prospect.url} className={classes.link}>
            <Typography
              className={classes.title}
              variant="h3"
              align="left"
              gutterBottom
            >
              {prospect.title}
            </Typography>
          </Link>
          <Typography
            className={classes.subtitle}
            variant="subtitle2"
            color="textSecondary"
            component="span"
            align="left"
          >
            <span>{prospect.publisher}</span> &middot;{' '}
            <span>{prospect.domain}</span>
          </Typography>{' '}
          <Box py={1}>
            <Chip
              variant="outlined"
              color="primary"
              label={prospect.language?.toUpperCase() ?? 'N/A'}
              icon={<LanguageIcon />}
            />{' '}
            <Chip
              variant="outlined"
              color="primary"
              label={prospect.topic ?? 'N/A'}
              icon={<LabelOutlinedIcon />}
            />
          </Box>
          <Typography component="div">{prospect.excerpt}</Typography>
        </Grid>
      </Grid>
      <CardActions className={classes.actions}>
        <Button buttonType="positive" variant="text">
          Recommend
        </Button>
        <Button buttonType="positive" variant="text">
          Add to Corpus
        </Button>
        <Button buttonType="negative" variant="text" onClick={onReject}>
          Reject
        </Button>
      </CardActions>
    </Card>
  );
};