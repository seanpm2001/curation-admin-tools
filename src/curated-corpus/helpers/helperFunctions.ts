import { DateTime } from 'luxon';
import { FileWithPath } from 'react-dropzone';
import { GetScheduledSurfacesForUserQuery } from '../../api/generatedTypes';
import { ScheduledSurfaces } from './definitions';

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
    throw new Error(
      'Failed to download image, please upload a new image manually'
    );
  }
  // upload downloaded image to s3
  const { data, errors } = await uploadApprovedItemMutation({
    variables: {
      image: image,
    },
  });

  // check for graphQL errors. Show an user friendly error message
  if (errors) {
    throw new Error('Failed to upload image, please try again');
  }

  return data?.uploadApprovedCorpusItemImage.url;
};

/**
 * This helper function reads a file, creates an HTML image and
 * assigns the onLoadCallBack function to its onLoad property
 * NOTE: the optional argument fileReader is only being used for testing purposes as of now
 */
export const readImageFileFromDisk = (
  file: FileWithPath,
  onloadCallBack?: VoidFunction,
  fileReader?: FileReader
) => {
  const reader: FileReader = fileReader || new FileReader();

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

export const getLocalDateTimeForGuid = (
  guidCode: string,
  scheduledSurfacesForUser: GetScheduledSurfacesForUserQuery
) => {
  const guid = scheduledSurfacesForUser.getScheduledSurfacesForUser.find(
    (item) => item.guid === guidCode
  );

  if (!guid) {
    return;
  }

  const localDateTime = DateTime.local().setZone(guid.ianaTimezone);

  // the Luxon library does not provide us a straightforward way to format the date the way we want
  // i.e August 28, 2022, 11:59 pm. That is why you can see we are concatenating two different formats
  // url for reference https://moment.github.io/luxon/#/formatting?id=table-of-tokens
  return localDateTime
    .toFormat('DDD')
    .concat(', ', localDateTime.toFormat('t'));
};

/**
 * Converts an user's Mozilla ldap username e.g ad|Mozilla-LDAP|jdoe to jdoe
 * @param ldapString
 * @returns Curator's username in the following format: flastname
 */
export const getCuratorNameFromLdap = (ldapString: string): string => {
  return ldapString.split('|')[2] ?? ldapString;
};

/**
 * Converts a scheduled surface guid e.g "NEW_TAB_EN_US" to a readable format
 * @param surfaceGuid
 * @returns Readable scheduled surface name e.g New Tab (en-US)
 */
export const getScheduledSurfaceName = (surfaceGuid: string): string => {
  return (
    ScheduledSurfaces.find((surface) => surface.guid === surfaceGuid)?.name ??
    surfaceGuid
  );
};
