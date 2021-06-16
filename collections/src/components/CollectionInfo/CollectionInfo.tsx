import React from 'react';
import { Avatar, Box, Chip, Typography } from '@material-ui/core';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import ReactMarkdown from 'react-markdown';
import { AuthorModel, CollectionModel } from '../../api/collection-api';
import { useStyles } from './CollectionInfo.styles';

interface CollectionInfoProps {
  /**
   * An object with everything collection-related in it.
   */
  collection: CollectionModel;
}

export const CollectionInfo: React.FC<CollectionInfoProps> = (
  props
): JSX.Element => {
  const { collection } = props;
  const classes = useStyles();

  return (
    <>
      <Typography
        className={classes.subtitle}
        variant="subtitle2"
        color="textSecondary"
        component="span"
        align="left"
      >
        <span>{collection.status}</span> &middot;{' '}
        <span>
          {collection.authors
            .map((author: AuthorModel) => {
              return author.name;
            })
            .join(', ')}
        </span>
      </Typography>
      <Box py={1}>
        {collection.curationCategory && (
          <Chip
            variant="outlined"
            color="primary"
            label={collection.curationCategory.name}
            icon={<LabelOutlinedIcon />}
          />
        )}{' '}
        {collection.IABParentCategory && collection.IABChildCategory && (
          <Chip
            variant="outlined"
            color="primary"
            label={`${collection.IABParentCategory.name} → ${collection.IABChildCategory.name}`}
            icon={<Avatar className={classes.iabAvatar}>IAB</Avatar>}
          />
        )}{' '}
      </Box>

      <h3>Slug</h3>
      <Typography
        variant="subtitle2"
        color="textSecondary"
        component="span"
        align="left"
      >
        https://getpocket.com/collections/
        <Typography component="span">
          <strong>{collection.slug}</strong>
        </Typography>
      </Typography>
      <h3>Excerpt</h3>
      <Typography
        className={classes.excerpt}
        variant="subtitle2"
        color="textSecondary"
        component="span"
        align="left"
      >
        <ReactMarkdown>{collection.excerpt}</ReactMarkdown>
      </Typography>
      <h3>Intro</h3>
      <Typography
        variant="subtitle2"
        color="textSecondary"
        component="span"
        align="left"
      >
        <ReactMarkdown>{collection.intro}</ReactMarkdown>
      </Typography>
    </>
  );
};
