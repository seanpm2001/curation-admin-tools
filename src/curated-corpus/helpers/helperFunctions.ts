import { FormikValues } from 'formik';
import { FileWithPath } from 'react-dropzone';
import { v5 as uuidv5 } from 'uuid';
import {
  ApprovedCuratedCorpusItem,
  CreateApprovedCuratedCorpusItemInput,
  CuratedStatus,
  Maybe,
  Prospect,
  UrlMetadata,
} from '../../api/generatedTypes';
import { topics } from './definitions';

/**
 *
 * This function simply transforms a Prospect object type to
 * an Approved Curated Corpus Item type. This is used to
 * convert a prospect item into a "dummy" approved item in the
 * ProspectItemModal
 */
export const transformProspectToApprovedItem = (
  prospect: Prospect,
  isRecommendation: boolean
): ApprovedCuratedCorpusItem => {
  return {
    externalId: '',
    prospectId: prospect.id,
    url: prospect.url,
    title: prospect.title ?? '',
    imageUrl: prospect.imageUrl ?? '',
    publisher: prospect.publisher ?? '',
    language: prospect.language ?? '',
    topic: prospect.topic ?? '',
    status: isRecommendation
      ? CuratedStatus.Recommendation
      : CuratedStatus.Corpus,
    isTimeSensitive: false,
    isSyndicated: prospect.isSyndicated ?? false,
    isCollection: prospect.isCollection ?? false,
    excerpt: prospect.excerpt ?? '',
    createdAt: prospect.createdAt ?? 0,
    createdBy: '',
    updatedAt: 0,
  };
};

/**
 * Transforms the UrlMetaData object into a Prospect
 *
 * @param metadata
 * @returns Prospect
 */
export const transformUrlMetaDataToProspect = (
  metadata: UrlMetadata
): Prospect => {
  return {
    // Encode some sort of id that will be used by the backend to send
    // in a Snowplow event
    id: uuidv5(metadata.url, '9edace02-b9c6-4705-a0d6-16476438557b'),

    // Set whatever properties the Parser could retrieve for us
    url: metadata.url,
    title: metadata.title ?? '',
    imageUrl: metadata.imageUrl ?? '',
    publisher: metadata.publisher ?? '',
    language: metadata.language ?? '',
    isSyndicated: metadata.isSyndicated ?? false,
    isCollection: metadata.isCollection ?? false,
    excerpt: metadata.excerpt ?? '',

    // The curators will have to choose a topic manually
    topic: '',

    // These two properties are ok to set to empty strings
    // as they won't be recorded anywhere on the backend.
    prospectType: '',
    scheduledSurfaceGuid: '',
  };
};

/**
 * Transforms formik input values from the ApprovedItemForm component into
 * CreateApprovedCuratedCorpusItemInput type object to be used for
 * CreateApprovedCuratedCorpusItem mutation
 *
 * @param values
 * @param prospectId
 * @returns CreateApprovedCuratedCorpusItemInput
 */
export const transformFormInputToCreateApprovedItemInput = (
  values: FormikValues,
  prospectId?: string
): CreateApprovedCuratedCorpusItemInput => {
  return {
    prospectId:
      prospectId || uuidv5(values.url, '9edace02-b9c6-4705-a0d6-16476438557b'),
    url: values.url,
    title: values.title,
    excerpt: values.excerpt,
    status: values.curationStatus,
    language: values.language,
    publisher: values.publisher,
    imageUrl: values.imageUrl,
    topic: values.topic,
    isCollection: values.collection,
    isTimeSensitive: values.timeSensitive,
    isSyndicated: values.syndicated,
  };
};

// downloads image from source url
export const fetchFileFromUrl = async (
  url: string
): Promise<Blob | undefined> => {
  const response = await fetch(url);

  if (response.ok) return response.blob();
};

/**
 *
 * `uploadApprovedItemMutation` parameter type is set to `any`
 * because we can't pull the upload mutation hook outside of the functional component
 * hence we have to pass it in as a parameter
 */
export const downloadAndUploadApprovedItemImageToS3 = async (
  imageUrl: string,
  uploadApprovedItemMutation: any
): Promise<string> => {
  // bypassing CORS and downloading
  const image = await fetchFileFromUrl(
    'https://pocket-image-cache.com/x/filters:no_upscale():format(jpg)/' +
      encodeURIComponent(imageUrl)
  );

  if (!image) {
    throw new Error('Failed to download image from source for saving to s3');
  }
  // upload downloaded image to s3
  const { data, errors } = await uploadApprovedItemMutation({
    variables: {
      image: image,
    },
  });

  // check for graphQL errors. Throw the first one
  if (errors) {
    throw new Error(errors[0].message);
  }

  return data?.uploadApprovedCuratedCorpusItemImage.url;
};

/**
 * This helper function reads a file, creates an HTML image and
 * assigns the onLoadCallBack function to its onLoad property
 */
export const readImageFileFromDisk = (
  file: FileWithPath,
  onloadCallBack?: VoidFunction
) => {
  const reader = new FileReader();
  //read file as a blob
  reader.readAsDataURL(file);

  // Load it
  reader.onloadend = (e) => {
    const contents = e.target?.result;

    // Load the contents of this file to an image element
    const image = new Image() as HTMLImageElement;
    // make sure file is an image
    if (typeof contents === 'string' && contents.includes('image/')) {
      image.src = contents;

      if (onloadCallBack) {
        image.onload = onloadCallBack;
      }
    }
  };
};

/**
 * This function transforms topic names as recorded in the database
 * into more easily readable names, e.g. `TECHNOLOGY` -> `Technology`
 * or `HEALTH_FITNESS` -> `Health & Fitness`.
 *
 * Returns `N/A` if there is no topic match from the known list of topics.
 */
export const getDisplayTopic = (
  topicCode: Maybe<string> | string | undefined
): string => {
  const displayTopic = topics.find((topic) => {
    return topic.code === topicCode;
  })?.name;

  return displayTopic ? displayTopic : 'N/A';
};
