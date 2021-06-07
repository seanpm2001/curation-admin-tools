import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Collapse,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import {
  CollectionForm,
  CollectionInfo,
  HandleApiResponse,
  ImageUpload,
  ScrollToTop,
  StoryForm,
  StoryListCard,
} from '../../components';
import {
  CollectionModel,
  StoryModel,
  useGetAuthorsQuery,
  useGetCollectionByExternalIdQuery,
  useGetCollectionStoriesQuery,
  useUpdateCollectionMutation,
  useUpdateCollectionImageUrlMutation,
  useCreateCollectionStoryMutation,
  useImageUploadMutation,
  useUpdateCollectionStorySortOrderMutation,
  useUpdateCollectionStoryImageUrlMutation,
} from '../../api/collection-api';
import { useNotifications } from '../../hooks/useNotifications';
import { FormikValues } from 'formik';
import EditIcon from '@material-ui/icons/Edit';
import {
  GetArchivedCollectionsDocument,
  GetCollectionByExternalIdDocument,
  GetDraftCollectionsDocument,
  GetPublishedCollectionsDocument,
  useGetCurationCategoriesQuery,
} from '../../api/collection-api/generatedTypes';
import { transformAuthors } from '../../utils/transformAuthors';
import { FormikHelpers } from 'formik/dist/types';

interface CollectionPageProps {
  collection?: CollectionModel;
}

export const CollectionPage = (): JSX.Element => {
  // Prepare state vars and helper methods for API notifications
  const { showNotification } = useNotifications();

  // prepare the "update collection" mutation
  // has to be done at the top level of the component because it's a hook
  const [updateCollection] = useUpdateCollectionMutation();

  // And this one is only used to set the image url once the we know the S3 link
  const [updateCollectionImageUrl] = useUpdateCollectionImageUrlMutation();

  // prepare the "create story" mutation
  const [createStory] = useCreateCollectionStoryMutation();

  // prepare the "update story image url" mutation
  const [updateStoryImageUrl] = useUpdateCollectionStoryImageUrlMutation();

  // prepare the "update story sort order" mutation
  const [updateStorySortOrder] = useUpdateCollectionStorySortOrderMutation();

  // prepare the upload to S3 mutation
  const [uploadImage] = useImageUploadMutation();

  /**
   * If a Collection object was passed to the page from one of the other app pages,
   * let's extract it from the routing.
   */
  const location = useLocation<CollectionPageProps>();

  const [collection, setCollection] = useState<CollectionModel | undefined>(
    location.state?.collection
      ? // Deep clone a read-only object that comes from the routing
        JSON.parse(JSON.stringify(location.state?.collection))
      : undefined
  );

  /**
   * If the user came directly to this page (i.e., via a bookmarked page),
   * fetch the Collection info from the the API.
   */
  const params = useParams<{ id: string }>();
  const { loading, error, data } = useGetCollectionByExternalIdQuery({
    variables: {
      externalId: params.id,
    },
    // Skip query if collection object was delivered via the routing
    // This is needed because hooks can only be called at the top level
    // of the component.
    skip: typeof collection === 'object',
  });

  if (data) {
    //Collection is a read only object when returned from Apollo, if we want to
    // update it we have to stringify and then parse it
    setCollection(JSON.parse(JSON.stringify(data.getCollection)));
  }

  // Load authors for the dropdown in the edit form
  const {
    loading: authorsLoading,
    error: authorsError,
    data: authorsData,
  } = useGetAuthorsQuery({ variables: { page: 1, perPage: 1000 } });

  // load curation categories
  const {
    loading: curationCategoriesLoading,
    error: curationCategoriesError,
    data: curationCategoriesData,
  } = useGetCurationCategoriesQuery();

  // Load collection stories - deliberately in a separate query
  const {
    loading: storiesLoading,
    error: storiesError,
    data: storiesData,
    refetch: refetchStories,
  } = useGetCollectionStoriesQuery({
    variables: {
      id: params.id,
    },
    // This setting lets us switch this query to manual cache updates only
    // so that on reordering stories they (stories) don't snap back
    // after the first mutation has run
    fetchPolicy: 'standby',
  });

  if (!storiesData) {
    // We need to fetch these stories if they're absent from the cache
    // as the query won't run even once with the 'standby' fetch policy
    refetchStories();
  }

  // Let's keep stories in state to be able to reorder them with drag'n'drop
  const [stories, setStories] = useState<StoryModel[] | undefined>(undefined);
  // And update the state variable when data is loaded
  useEffect(() => {
    setStories(storiesData?.getCollection?.stories);
  }, [storiesData]);

  // for adding new stories, keep track of what the next story order value should be
  const [storySortOrder, setStorySortOrder] = useState<number>(1);
  useEffect(() => {
    if (stories && stories.length > 0) {
      const lastStorySortOrder = stories[stories.length - 1].sortOrder ?? 0;
      setStorySortOrder(lastStorySortOrder + 1);
    }
  }, [stories]);

  const [showEditForm, setShowEditForm] = useState<boolean>(false);

  const toggleEditForm = (): void => {
    setShowEditForm(!showEditForm);
  };

  /**
   * Collect "edit collection" form data and send it to the API.
   * Update components on page if updates have been saved successfully
   */
  const handleSubmit = (
    values: FormikValues,
    formikHelpers: FormikHelpers<any>
  ): void => {
    updateCollection({
      variables: {
        externalId: collection!.externalId,
        title: values.title,
        slug: values.slug,
        excerpt: values.excerpt,
        intro: values.intro,
        status: values.status,
        authorExternalId: values.authorExternalId,
        curationCategoryExternalId: values.curationCategoryExternalId,
      },
      refetchQueries: [
        {
          query: GetCollectionByExternalIdDocument,
          variables: {
            externalId: collection!.externalId,
          },
        },
        {
          query: GetDraftCollectionsDocument,
          variables: { perPage: 50 },
        },
        {
          query: GetPublishedCollectionsDocument,
          variables: { perPage: 50 },
        },
        {
          query: GetArchivedCollectionsDocument,
          variables: { perPage: 50 },
        },
      ],
    })
      .then(({ data }) => {
        showNotification('Collection updated successfully!', 'success');

        if (collection) {
          collection.title = data?.updateCollection?.title!;
          collection.slug = data?.updateCollection?.slug!;
          collection.excerpt = data?.updateCollection?.excerpt;
          collection.intro = data?.updateCollection?.intro;
          collection.status = data?.updateCollection?.status!;
          collection.authors = data?.updateCollection?.authors!;
          collection.curationCategory = data?.updateCollection?.curationCategory!;
          toggleEditForm();
          formikHelpers.setSubmitting(false);
        }
      })
      .catch((error: Error) => {
        showNotification(error.message, 'error');
        formikHelpers.setSubmitting(false);
      });
  };

  /**
   * Save the S3 URL we get back from the API to the collection record
   */
  const handleImageUploadSave = (url: string): void => {
    updateCollectionImageUrl({
      variables: {
        externalId: collection!.externalId,
        imageUrl: url,
      },
      refetchQueries: [
        {
          query: GetCollectionByExternalIdDocument,
          variables: {
            externalId: collection!.externalId,
          },
        },
      ],
    })
      .then(({ data }) => {
        if (collection) {
          collection.imageUrl = data?.updateCollectionImageUrl?.imageUrl!;
          showNotification(
            `Image saved to "${collection.title.substring(0, 50)}..."`,
            'success'
          );
        }
      })
      .catch((error: Error) => {
        showNotification(error.message, 'error');
      });
  };

  // make sure we regenerate the 'Add Story' form each time a new story
  // has been added
  const [addStoryFormKey, setAddStoryFormKey] = useState(1);

  /**
   * Save a new story - a multi-step process
   * @param values
   * @param formikHelpers
   */
  const handleCreateStorySubmit = (
    values: FormikValues,
    formikHelpers: FormikHelpers<any>
  ): void => {
    // First, let's save the new story
    // Prepare authors. They need to be an array of objects again
    const authors = transformAuthors(values.authors);

    // Save the new story with the S3 URL
    createStory({
      variables: {
        collectionExternalId: params.id,
        url: values.url,
        title: values.title,
        excerpt: values.excerpt,
        publisher: values.publisher,
        imageUrl: '',
        authors,
        sortOrder: storySortOrder,
      },
    })
      .then((data) => {
        showNotification(
          `Added "${data.data?.createCollectionStory?.title.substring(
            0,
            50
          )}..."`,
          'success'
        );

        // If the parser returned an image, let's upload it to S3
        // First, side-step CORS issues that prevent us from downloading
        // the image directly from the publisher
        const parserImageUrl =
          'https://pocket-image-cache.com/x/filters:no_upscale():format(jpg)/' +
          encodeURIComponent(values.imageUrl);

        // Get the file
        fetch(parserImageUrl)
          .then((res) => res.blob())
          .then((blob) => {
            // Upload the file to S3
            uploadImage({
              variables: {
                image: blob,
                height: 0,
                width: 0,
                fileSizeBytes: blob.size,
              },
            })
              .then((imgUploadData) => {
                if (
                  imgUploadData.data &&
                  imgUploadData.data.collectionImageUpload
                ) {
                  // Don't show a notification about a successful S3 upload just yet -
                  // that's just too many. Wait until we save the url to show another
                  // success message
                  updateStoryImageUrl({
                    variables: {
                      externalId: data.data?.createCollectionStory?.externalId!,
                      imageUrl: imgUploadData.data.collectionImageUpload.url,
                    },
                  })
                    .then(() => {
                      showNotification(
                        'Image uploaded to S3 and linked to story',
                        'success'
                      );
                      // manually refresh the cache
                      refetchStories();
                      formikHelpers.setSubmitting(false);
                    })
                    .catch((error) => {
                      // manually refresh the cache
                      refetchStories();
                      showNotification(error.message, 'error');
                      formikHelpers.setSubmitting(false);
                    });
                }
              })
              .catch((error) => {
                // manually refresh the cache
                refetchStories();
                showNotification(error.message, 'error');
              });
          })
          .catch((error: Error) => {
            showNotification(
              'Could not process image - file may be too large.\n' +
                `(Original error: ${error.message})`,
              'error'
            );
            // manually refresh the cache
            refetchStories();
            formikHelpers.setSubmitting(false);
          });

        setAddStoryFormKey(addStoryFormKey + 1);
        formikHelpers.setSubmitting(false);
      })
      .catch((error: Error) => {
        showNotification(error.message, 'error');
        formikHelpers.setSubmitting(false);
      });
  };

  // provide an empty story object for the 'Add story' form
  const emptyStory: StoryModel = {
    externalId: '',
    url: '',
    title: '',
    excerpt: null,
    authors: [
      {
        name: '',
        sortOrder: 0,
      },
    ],
    publisher: null,
    imageUrl: null,
    sortOrder: null,
  };

  /**
   * Save the new sort order of stories
   * @param result
   */
  const onDragEnd = (result: DropResult) => {
    // if a story was dragged out of the list, let it snap back to where it was
    // without an error in the console
    if (!result.destination) return;

    // save the new order of stories to state
    const reorderedStories = Array.from(stories!);
    const [story] = reorderedStories.splice(result.source.index, 1);
    reorderedStories.splice(result.destination.index, 0, story);
    setStories(reorderedStories);

    // save the new order of stories to the database
    reorderedStories.forEach((story: StoryModel, index: number) => {
      const newSortOrder = index + 1;

      // update each affected story with the new sort order
      if (story.sortOrder !== newSortOrder) {
        updateStorySortOrder({
          variables: {
            externalId: story.externalId,
            sortOrder: newSortOrder,
          },
        })
          .then(() => {
            showNotification(
              `Order updated for "${story.title.substring(0, 50)}..."`,
              'success'
            );
          })
          .catch((error: Error) => {
            showNotification(error.message, 'error');
          });
      }
    });
  };

  return (
    <>
      <ScrollToTop />
      {!data && <HandleApiResponse loading={loading} error={error} />}
      {collection && (
        <>
          <Box display="flex">
            <Box flexGrow={1} alignSelf="center" textOverflow="ellipsis">
              <h1>
                {collection.title}
                <Typography variant="subtitle2" component="div">
                  Collection
                </Typography>
              </h1>
            </Box>
            <Box alignSelf="center">
              <Button color="primary" onClick={toggleEditForm}>
                <EditIcon />
              </Button>
            </Box>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <ImageUpload
                entity={collection}
                placeholder="/placeholders/collection.svg"
                onImageSave={handleImageUploadSave}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <CollectionInfo collection={collection} />
            </Grid>
          </Grid>

          <Collapse in={showEditForm}>
            <Paper elevation={4}>
              <Box p={2} mt={3}>
                <Box mb={2}>
                  <h3>Edit Collection</h3>
                </Box>
                {!authorsData && (
                  <HandleApiResponse
                    loading={authorsLoading}
                    error={authorsError}
                  />
                )}

                {!curationCategoriesData && (
                  <HandleApiResponse
                    loading={curationCategoriesLoading}
                    error={curationCategoriesError}
                  />
                )}

                {authorsData &&
                  authorsData.getCollectionAuthors &&
                  curationCategoriesData &&
                  curationCategoriesData.getCurationCategories && (
                    <CollectionForm
                      authors={authorsData.getCollectionAuthors.authors}
                      collection={collection}
                      curationCategories={
                        curationCategoriesData.getCurationCategories
                      }
                      editMode={true}
                      onCancel={toggleEditForm}
                      onSubmit={handleSubmit}
                    />
                  )}
              </Box>
            </Paper>
          </Collapse>

          <Box mt={3}>
            <h2>Stories</h2>
            {!storiesData && (
              <HandleApiResponse
                loading={storiesLoading}
                error={storiesError}
              />
            )}
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="characters">
                {(provided) => (
                  <Typography
                    component="div"
                    className="characters"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {stories &&
                      stories.map((story: StoryModel, index: number) => {
                        return (
                          <Draggable
                            key={story.externalId}
                            draggableId={story.externalId}
                            index={index}
                          >
                            {(provided) => {
                              return (
                                <Typography
                                  component="div"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <StoryListCard
                                    key={story.externalId}
                                    story={story}
                                    refetch={refetchStories}
                                  />
                                </Typography>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </Typography>
                )}
              </Droppable>
            </DragDropContext>
          </Box>

          <Paper elevation={4}>
            <Box p={2} mt={3}>
              <Box mb={2}>
                <h3>Add Story</h3>
              </Box>
              <StoryForm
                key={addStoryFormKey}
                onCancel={() => {
                  setAddStoryFormKey(addStoryFormKey + 1);
                }}
                onSubmit={handleCreateStorySubmit}
                story={emptyStory}
              />
            </Box>
          </Paper>
        </>
      )}
    </>
  );
};
