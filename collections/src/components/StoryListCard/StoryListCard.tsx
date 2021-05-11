import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardMedia,
  Collapse,
  Grid,
  Hidden,
  Paper,
  Typography,
} from '@material-ui/core';
import {
  StoryModel,
  useDeleteCollectionStoryMutation,
  useUpdateCollectionStoryMutation,
} from '../../api';
import { useStyles } from './StoryListCard.styles';
import ReactMarkdown from 'react-markdown';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import { GetCollectionStoriesDocument } from '../../api/generatedTypes';
import { StoryForm } from '../StoryForm/StoryForm';
import { FormikValues } from 'formik';
import { transformAuthors } from '../../utils/transformAuthors';

interface StoryListCardProps {
  story: StoryModel;

  collectionExternalId: string;

  showNotification: (message: string, isError?: boolean) => void;
}

/**
 * A compact card that displays story information
 *
 * @param props
 */
export const StoryListCard: React.FC<StoryListCardProps> = (props) => {
  const classes = useStyles();
  const { story, collectionExternalId, showNotification } = props;

  const [showEditForm, setShowEditForm] = useState<boolean>(false);

  const toggleEditForm = (): void => {
    setShowEditForm(!showEditForm);
  };

  // prepare the "delete story" mutation
  const [deleteStory] = useDeleteCollectionStoryMutation();

  // prepare the "update story" mutation
  const [updateStory] = useUpdateCollectionStoryMutation();

  const onDelete = (): void => {
    deleteStory({
      variables: {
        externalId: story.externalId,
      },
      refetchQueries: [
        {
          query: GetCollectionStoriesDocument,
          variables: {
            id: collectionExternalId,
          },
        },
      ],
    })
      .then(() => {
        showNotification(`Deleted "${story.title.substring(0, 50)}..."`);
      })
      .catch((error: Error) => {
        showNotification(error.message, true);
      });
  };

  const onUpdate = (values: FormikValues): void => {
    // prepare authors! They need to be an array of objects again
    const authors = transformAuthors(values.authors);

    updateStory({
      variables: {
        externalId: story.externalId,
        url: values.url,
        title: values.title,
        excerpt: values.excerpt,
        publisher: values.publisher,
        // NB: not updating the image here. Uploads will be handled on clicking
        // the image itself (or placeholder)
        imageUrl: story.imageUrl,
        authors,
      },
    })
      .then(() => {
        showNotification(`Updated "${story.title.substring(0, 50)}..."`);
        setShowEditForm(false);
      })
      .catch((error: Error) => {
        showNotification(error.message, true);
      });
  };

  return (
    <>
      <Card variant="outlined" square className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={2} sm={2}>
            <CardMedia
              component="img"
              src={
                story.imageUrl && story.imageUrl.length > 0
                  ? story.imageUrl
                  : '/placeholders/story.svg'
              }
              alt={story.title}
              className={classes.image}
            />
          </Grid>
          <Grid item xs={7} sm={8}>
            <Typography
              className={classes.title}
              variant="h3"
              align="left"
              gutterBottom
            >
              <a href={story.url}>{story.title}</a>
            </Typography>
            <Typography
              className={classes.subtitle}
              variant="subtitle2"
              color="textSecondary"
              component="span"
              align="left"
            >
              <span>
                {story.authors
                  .map((author: { name: string }) => {
                    return author.name;
                  })
                  .join(', ')}
              </span>{' '}
              &middot; <span>{story.publisher}</span>
            </Typography>
            <Hidden smDown implementation="css">
              <Typography component="div">
                <ReactMarkdown className="compact-markdown">
                  {story.excerpt ? story.excerpt : ''}
                </ReactMarkdown>
              </Typography>
            </Hidden>
          </Grid>
          <Grid item xs={1} sm={1}>
            <Button color="primary" onClick={toggleEditForm}>
              <EditIcon />
            </Button>
          </Grid>
          <Grid item xs={1} sm={1}>
            <Button color="primary" onClick={onDelete}>
              <DeleteOutlineIcon />
            </Button>
          </Grid>
        </Grid>

        <Collapse in={showEditForm}>
          <Paper elevation={4}>
            <Box p={2} mt={3}>
              <Box mb={2}>
                <h3>Edit Story</h3>
              </Box>
              <StoryForm
                key={story.externalId}
                story={story}
                showAllFields={true}
                showPopulateButton={false}
                onSubmit={onUpdate}
              />
            </Box>
          </Paper>
        </Collapse>
      </Card>
    </>
  );
};
