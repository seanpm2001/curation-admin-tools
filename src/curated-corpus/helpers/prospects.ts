import {
  ApprovedItemFromProspect,
  DropdownOption,
  prospectFilterOptions,
} from './definitions';
import {
  CorpusItemSource,
  CorpusLanguage,
  CuratedStatus,
  Prospect,
  ProspectType,
  Topics,
  UrlMetadata,
} from '../../api/generatedTypes';
import { transformAuthors } from '../../_shared/utils/transformAuthors';

const testProspect: Prospect = {
  id: 'test-id',
  prospectId: 'test-prospect-id',
  prospectType: 'GLOBAL',
  title: 'How To Win Friends And Influence People with React',
  url: 'http://www.test.com/how-to',
  imageUrl: 'https://placeimg.com/640/480/people?random=494',
  excerpt: 'Everything You Wanted to Know About React and Were Afraid To Ask',
  language: CorpusLanguage.En,
  authors: 'testAuthor',
  publisher: 'Amazing Inventions',
  topic: Topics.Technology,
  isCollection: false,
  isSyndicated: false,
  createdAt: 1635014926,
  scheduledSurfaceGuid: 'NEW_TAB_EN_US',
  domain: 'test-domain',
  saveCount: 10,
};

/**
 * @param options to override certain properties and customize the prospect
 * @returns Returns a test object of type Prospect
 *
 * NOTE: it does not have the approvedItem and rejectedItem properties by default
 */
export const getTestProspect = (options?: Partial<Prospect>): Prospect => {
  return {
    ...testProspect,
    ...options,
  };
};

/**
 * This helper function takes all possible prospect filter options for the filtering
 * dropdown on the Prospecting page and cuts the list down to the ones available for
 * a given Scheduled Surface.
 */
export const getProspectFilterOptions = (
  data: ProspectType[]
): DropdownOption[] => {
  const availableProspectFilters: string[] = data.map(
    (prospectType) => prospectType
  );

  const filters: DropdownOption[] = prospectFilterOptions.filter((option) => {
    if (availableProspectFilters.includes(option.code) || option.code == '') {
      return option;
    }
  });

  return filters;
};

/**
 *
 * This function simply transforms a Prospect object type to
 * an Approved Curated Corpus Item type. This is used to
 * convert a prospect item into a "dummy" approved item in the
 * ProspectItemModal
 */
export const transformProspectToApprovedItem = (
  prospect: Prospect,
  isRecommendation: boolean,
  isManual: boolean
): ApprovedItemFromProspect => {
  return {
    externalId: '',
    prospectId: prospect.prospectId,
    url: prospect.url,
    title: prospect.title ?? '',
    imageUrl: prospect.imageUrl ?? '',
    authors: transformAuthors(prospect.authors),
    publisher: prospect.publisher ?? '',
    language: prospect.language || undefined,
    source: isManual ? CorpusItemSource.Manual : CorpusItemSource.Prospect,
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
    scheduledSurfaceHistory:
      prospect.approvedCorpusItem?.scheduledSurfaceHistory ?? [],
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
  // set language to undefined if metadata.language is an empty string or undefined.
  // if not, then map it from string to its corresponding CorpusLanguage enum value
  const language = !metadata.language
    ? undefined
    : metadata.language === 'en'
    ? CorpusLanguage.En
    : CorpusLanguage.De;

  return {
    // manually added items don't have a prospect id!
    id: '',
    prospectId: '',
    // Set whatever properties the Parser could retrieve for us
    url: metadata.url,
    title: metadata.title ?? '',
    imageUrl: metadata.imageUrl ?? '',
    authors: metadata.authors ?? '',
    publisher: metadata.publisher ?? '',
    language,
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
