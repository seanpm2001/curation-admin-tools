import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { useStyles } from './CuratedItemListCard.styles';
import { CuratedItem } from '../../api/curated-corpus-api/generatedTypes';
import { Button } from '../../../_shared/components';

interface CuratedItemListCardProps {
  /**
   * An object with everything curated item-related in it.
   */
  item: CuratedItem;
}

export const CuratedItemListCard: React.FC<CuratedItemListCardProps> = (
  props
): JSX.Element => {
  const classes = useStyles();
  const { item } = props;

  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        src={
          item.imageUrl && item.imageUrl.length > 0
            ? item.imageUrl
            : '/placeholders/collectionSmall.svg'
        }
        alt={item.title}
      />
      <CardContent className={classes.content}>
        <Typography className={classes.publisher} gutterBottom>
          Publisher Name
        </Typography>
        <Typography
          className={classes.title}
          variant="h3"
          align="left"
          gutterBottom
        >
          <Link href={item.url} className={classes.link}>
            {item.title}
          </Link>
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          {item.excerpt}
        </Typography>
      </CardContent>

      {/* Push the rest of the elements to the bottom of the card. */}
      <div className={classes.flexGrow} />

      <List dense className={classes.list}>
        <ListItem>
          <ListItemIcon className={classes.listItemIcon}>
            <ThumbUpIcon />
          </ListItemIcon>
          <ListItemText
            className={classes.status}
            primary={item.status.toLowerCase()}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon className={classes.listItemIcon}>
            <LabelOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={item.topic} />
        </ListItem>
        <ListItem>
          <ListItemIcon className={classes.listItemIcon}>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText primary={item.language.toUpperCase()} />
        </ListItem>
      </List>

      <CardActions className={classes.actions}>
        <Button buttonType="positive" variant="text">
          Schedule
        </Button>
        <Button buttonType="negative" variant="text">
          Reject
        </Button>
        <Button buttonType="positive" variant="text">
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};
