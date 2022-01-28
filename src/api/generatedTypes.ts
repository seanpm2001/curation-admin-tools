import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _FieldSet: any;
  /** A date in the YYYY-MM-DD format. */
  Date: any;
  DateString: any;
  Markdown: any;
  /** This is a temporary return type for a test query on the public API. */
  PCTest: any;
  Upload: any;
  /** These are all just renamed strings right now */
  Url: any;
};

export type ApprovedCuratedCorpusImageUrl = {
  __typename?: 'ApprovedCuratedCorpusImageUrl';
  /** The url of the image stored in the s3 bucket */
  url: Scalars['String'];
};

/** A prospective story that has been reviewed by the curators and saved to the curated corpus. */
export type ApprovedCuratedCorpusItem = {
  __typename?: 'ApprovedCuratedCorpusItem';
  /** A Unix timestamp of when the entity was created. */
  createdAt: Scalars['Int'];
  /** A single sign-on user identifier of the user who created this entity. */
  createdBy: Scalars['String'];
  /** The excerpt of the story. */
  excerpt: Scalars['String'];
  /** An alternative primary key in UUID format that is generated on creation. */
  externalId: Scalars['ID'];
  /**
   * The image URL associated with the story.
   * This is a link to an S3 bucket - the image will have been pre-uploaded to S3 before saving a curated item.
   */
  imageUrl: Scalars['Url'];
  /** Whether this story is a Pocket Collection. */
  isCollection: Scalars['Boolean'];
  /** Whether this item is a syndicated article. */
  isSyndicated: Scalars['Boolean'];
  /**
   * A flag to ML to not recommend this item long term after it is added to the corpus.
   * Example: a story covering an election, or "The best of 202x" collection.
   */
  isTimeSensitive: Scalars['Boolean'];
  /** What language this story is in. This is a two-letter code, for example, 'en' for English. */
  language: Scalars['String'];
  /** The GUID of the corresponding Prospect ID. Will be empty if the item was manually added. */
  prospectId?: Maybe<Scalars['ID']>;
  /** The name of the online publication that published this story. */
  publisher: Scalars['String'];
  /** The outcome of the curators' review. */
  status: CuratedStatus;
  /** The title of the story. */
  title: Scalars['String'];
  /**
   * A topic this story best fits in.
   * Temporarily a string value that will be provided by Prospect API, possibly an enum in the future.
   */
  topic: Scalars['String'];
  /** A Unix timestamp of when the entity was last updated. */
  updatedAt: Scalars['Int'];
  /** A single sign-on user identifier of the user who last updated this entity. Null on creation. */
  updatedBy?: Maybe<Scalars['String']>;
  /** The URL of the story. */
  url: Scalars['Url'];
};

/** The connection type for Approved Item. */
export type ApprovedCuratedCorpusItemConnection = {
  __typename?: 'ApprovedCuratedCorpusItemConnection';
  /** A list of edges. */
  edges: Array<ApprovedCuratedCorpusItemEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of Approved Items in the connection. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type ApprovedCuratedCorpusItemEdge = {
  __typename?: 'ApprovedCuratedCorpusItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The Approved Item at the end of the edge. */
  node: ApprovedCuratedCorpusItem;
};

/** Available fields for filtering ApprovedCuratedCorpusItems. */
export type ApprovedCuratedCorpusItemFilter = {
  /**
   * Optional filter on the language Approved Items have been classified as.
   * This is a two-letter string, e.g. 'en' for English or 'de' for 'German'.
   */
  language?: InputMaybe<Scalars['String']>;
  /** Optional filter on the status of Approved Items. */
  status?: InputMaybe<CuratedStatus>;
  /** Optional filter on the title field. Returns partial matches. */
  title?: InputMaybe<Scalars['String']>;
  /** Optional filter on the topic field. */
  topic?: InputMaybe<Scalars['String']>;
  /** Optional filter on the URL field. Returns partial matches. */
  url?: InputMaybe<Scalars['Url']>;
};

export type ArticleMarkdown = {
  __typename?: 'ArticleMarkdown';
  images?: Maybe<Array<MarkdownImagePosition>>;
  text: Scalars['String'];
};

/** Information about an Author of an article or some content */
export type Author = {
  __typename?: 'Author';
  /** Unique id for that Author */
  id: Scalars['ID'];
  /** Display name */
  name?: Maybe<Scalars['String']>;
  /** A url to that Author's site */
  url?: Maybe<Scalars['String']>;
};

/** Row in a bulleted (unordered list) */
export type BulletedListElement = ListElement & {
  __typename?: 'BulletedListElement';
  /** Row in a list. */
  content: Scalars['Markdown'];
  /** Zero-indexed level, for handling nested lists. */
  level: Scalars['Int'];
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

export type Collection = {
  __typename?: 'Collection';
  IABChildCategory?: Maybe<IabCategory>;
  /**
   * We will never return child categories in this type, so there's no need to
   * specify `IABParentCategory` here. The basic `IABCategory` is sufficient.
   */
  IABParentCategory?: Maybe<IabCategory>;
  authors: Array<CollectionAuthor>;
  curationCategory?: Maybe<CurationCategory>;
  excerpt?: Maybe<Scalars['Markdown']>;
  externalId: Scalars['ID'];
  imageUrl?: Maybe<Scalars['Url']>;
  intro?: Maybe<Scalars['Markdown']>;
  /**
   * note that language is *not* being used as locale - only to specify the
   * language of the collection.
   */
  language: Scalars['String'];
  partnership?: Maybe<CollectionPartnership>;
  publishedAt?: Maybe<Scalars['DateString']>;
  slug: Scalars['String'];
  status: CollectionStatus;
  stories: Array<CollectionStory>;
  title: Scalars['String'];
};

export type CollectionAuthor = {
  __typename?: 'CollectionAuthor';
  active: Scalars['Boolean'];
  bio?: Maybe<Scalars['Markdown']>;
  externalId: Scalars['ID'];
  imageUrl?: Maybe<Scalars['Url']>;
  name: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
};

export type CollectionAuthorsResult = {
  __typename?: 'CollectionAuthorsResult';
  authors: Array<CollectionAuthor>;
  pagination?: Maybe<Pagination>;
};

export type CollectionImageUploadInput = {
  fileSizeBytes: Scalars['Int'];
  height: Scalars['Int'];
  image: Scalars['Upload'];
  width: Scalars['Int'];
};

export type CollectionImageUrl = {
  __typename?: 'CollectionImageUrl';
  url: Scalars['String'];
};

export type CollectionInput = {
  excerpt: Scalars['String'];
  title: Scalars['String'];
};

/** Details of a partner company sponsored collections are associated with. */
export type CollectionPartner = {
  __typename?: 'CollectionPartner';
  blurb: Scalars['Markdown'];
  externalId: Scalars['String'];
  imageUrl: Scalars['Url'];
  name: Scalars['String'];
  url: Scalars['Url'];
};

/**
 * If a collection was made in partnership with an external company, this
 * entity will hold all required info about that partnership.
 *
 * Note that this admin-only type exposes both the optional customized fields
 * and the CollectionPartner entity with the default values.
 *
 * The consolidated CollectionPartnership type is available in the public schema.
 */
export type CollectionPartnerAssociation = {
  __typename?: 'CollectionPartnerAssociation';
  blurb?: Maybe<Scalars['Markdown']>;
  externalId: Scalars['String'];
  imageUrl?: Maybe<Scalars['Url']>;
  name?: Maybe<Scalars['String']>;
  partner: CollectionPartner;
  type: CollectionPartnershipType;
  url?: Maybe<Scalars['Url']>;
};

export type CollectionPartnersResult = {
  __typename?: 'CollectionPartnersResult';
  pagination?: Maybe<Pagination>;
  partners: Array<CollectionPartner>;
};

/**
 * If a collection was made in partnership with an external company, this
 * entity will hold all required info about that partnership.
 */
export type CollectionPartnership = {
  __typename?: 'CollectionPartnership';
  blurb: Scalars['Markdown'];
  externalId: Scalars['String'];
  imageUrl: Scalars['Url'];
  name: Scalars['String'];
  type: CollectionPartnershipType;
  url: Scalars['Url'];
};

/** Type and enums related to Collections made in partnership with a company. */
export enum CollectionPartnershipType {
  Partnered = 'PARTNERED',
  Sponsored = 'SPONSORED',
}

export enum CollectionStatus {
  Archived = 'ARCHIVED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
  Review = 'REVIEW',
}

export type CollectionStory = {
  __typename?: 'CollectionStory';
  authors: Array<CollectionStoryAuthor>;
  excerpt: Scalars['Markdown'];
  externalId: Scalars['ID'];
  /** if True, the story is provided by a partner and should be displayed as such */
  fromPartner: Scalars['Boolean'];
  imageUrl?: Maybe<Scalars['Url']>;
  item?: Maybe<Item>;
  publisher?: Maybe<Scalars['String']>;
  sortOrder?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  url: Scalars['Url'];
};

export type CollectionStoryAuthor = {
  __typename?: 'CollectionStoryAuthor';
  name: Scalars['String'];
  sortOrder: Scalars['Int'];
};

export type CollectionStoryAuthorInput = {
  name: Scalars['String'];
  sortOrder: Scalars['Int'];
};

export type CollectionsResult = {
  __typename?: 'CollectionsResult';
  collections: Array<Collection>;
  pagination: Pagination;
};

/** Input data for creating an Approved Item and optionally scheduling this item to appear on New Tab. */
export type CreateApprovedCuratedCorpusItemInput = {
  /** The excerpt of the Approved Item. */
  excerpt: Scalars['String'];
  /** The image URL for this item's accompanying picture. */
  imageUrl: Scalars['Url'];
  /** Whether this story is a Pocket Collection. */
  isCollection: Scalars['Boolean'];
  /** Whether this item is a syndicated article. */
  isSyndicated: Scalars['Boolean'];
  /**
   * A flag to ML to not recommend this item long term after it is added to the corpus.
   * Example: a story covering an election, or "The best of 202x" collection.
   */
  isTimeSensitive: Scalars['Boolean'];
  /** What language this item is in. This is a two-letter code, for example, 'en' for English. */
  language: Scalars['String'];
  /** Optionally, specify the GUID of the New Tab this item should be scheduled for. */
  newTabGuid?: InputMaybe<Scalars['ID']>;
  /** The GUID of the corresponding Prospect ID. Will be empty for manually added items. */
  prospectId?: InputMaybe<Scalars['ID']>;
  /** The name of the online publication that published this story. */
  publisher: Scalars['String'];
  /** Optionally, specify the date this item should be appearing on New Tab. Format: YYYY-MM-DD */
  scheduledDate?: InputMaybe<Scalars['Date']>;
  /** The outcome of the curators' review of the Approved Item. */
  status: CuratedStatus;
  /** The title of the Approved Item. */
  title: Scalars['String'];
  /**
   * A topic this story best fits in.
   * Temporarily a string value that will be provided by Prospect API, possibly an enum in the future.
   */
  topic: Scalars['String'];
  /** The URL of the Approved Item. */
  url: Scalars['Url'];
};

export type CreateCollectionAuthorInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  bio?: InputMaybe<Scalars['Markdown']>;
  imageUrl?: InputMaybe<Scalars['Url']>;
  name: Scalars['String'];
  slug?: InputMaybe<Scalars['String']>;
};

export type CreateCollectionInput = {
  IABChildCategoryExternalId?: InputMaybe<Scalars['String']>;
  IABParentCategoryExternalId?: InputMaybe<Scalars['String']>;
  authorExternalId: Scalars['String'];
  curationCategoryExternalId?: InputMaybe<Scalars['String']>;
  excerpt?: InputMaybe<Scalars['Markdown']>;
  imageUrl?: InputMaybe<Scalars['Url']>;
  intro?: InputMaybe<Scalars['Markdown']>;
  language: Scalars['String'];
  slug: Scalars['String'];
  status?: InputMaybe<CollectionStatus>;
  title: Scalars['String'];
};

export type CreateCollectionPartnerAssociationInput = {
  blurb?: InputMaybe<Scalars['Markdown']>;
  collectionExternalId: Scalars['String'];
  imageUrl?: InputMaybe<Scalars['Url']>;
  name?: InputMaybe<Scalars['String']>;
  partnerExternalId: Scalars['String'];
  type: CollectionPartnershipType;
  url?: InputMaybe<Scalars['Url']>;
};

export type CreateCollectionPartnerInput = {
  blurb: Scalars['Markdown'];
  imageUrl: Scalars['Url'];
  name: Scalars['String'];
  url: Scalars['Url'];
};

export type CreateCollectionStoryInput = {
  authors: Array<CollectionStoryAuthorInput>;
  collectionExternalId: Scalars['String'];
  excerpt: Scalars['Markdown'];
  fromPartner?: InputMaybe<Scalars['Boolean']>;
  imageUrl: Scalars['Url'];
  publisher: Scalars['String'];
  sortOrder?: InputMaybe<Scalars['Int']>;
  title: Scalars['String'];
  url: Scalars['Url'];
};

/** Input data for creating a Rejected Item. */
export type CreateRejectedCuratedCorpusItemInput = {
  /** What language this item is in. This is a two-letter code, for example, 'en' for English. */
  language?: InputMaybe<Scalars['String']>;
  /** The GUID of the corresponding Prospect ID. Will be empty for manually added item. */
  prospectId?: InputMaybe<Scalars['ID']>;
  /** The name of the online publication that published this story. */
  publisher?: InputMaybe<Scalars['String']>;
  /** A comma-separated list of rejection reasons. */
  reason: Scalars['String'];
  /** The title of the Rejected Item. */
  title?: InputMaybe<Scalars['String']>;
  /**
   * A topic this story best fits in.
   * Temporarily a string value that will be provided by Prospect API, possibly an enum in the future.
   */
  topic: Scalars['String'];
  /** The URL of the Rejected Item. */
  url: Scalars['Url'];
};

/** Input data for creating a scheduled entry for an Approved Item on a New Tab Feed. */
export type CreateScheduledCuratedCorpusItemInput = {
  /** The ID of the Approved Item that needs to be scheduled. */
  approvedItemExternalId: Scalars['ID'];
  /** The GUID of the New Tab Feed the Approved Item is going to appear on. Example: 'EN_US'. */
  newTabGuid: Scalars['ID'];
  /** The date the associated Approved Item is scheduled to appear on New Tab. Format: YYYY-MM-DD. */
  scheduledDate: Scalars['Date'];
};

/** The outcome of the curators reviewing a prospective story. */
export enum CuratedStatus {
  /** This story is suitable for our curated corpus. It's a second-tier recommendation. */
  Corpus = 'CORPUS',
  /** Recommend this story for Pocket users. This is first-tier content. */
  Recommendation = 'RECOMMENDATION',
}

export type CurationCategory = {
  __typename?: 'CurationCategory';
  externalId: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type DeleteCollectionPartnerAssociationInput = {
  externalId: Scalars['String'];
};

/** Input data for deleting a scheduled item for a New Tab Feed. */
export type DeleteScheduledCuratedCorpusItemInput = {
  /** ID of the scheduled item. A string in UUID format. */
  externalId: Scalars['ID'];
};

/** Metadata from a domain, originally populated from ClearBit */
export type DomainMetadata = {
  __typename?: 'DomainMetadata';
  /** Url for the logo image */
  logo?: Maybe<Scalars['Url']>;
  /** Url for the greyscale logo image */
  logoGreyscale?: Maybe<Scalars['Url']>;
  /** The name of the domain (e.g., The New York Times) */
  name?: Maybe<Scalars['String']>;
};

export type GetProspectsFilters = {
  /** string GUID of the new tab being prospected, e.g. 'EN_US' or 'DE_DE' */
  newTab: Scalars['String'];
  /** string GUID of the prospect type to further filter prospects, e.g. 'GLOBAL' or 'ORGANIC_TIMESPENT' */
  prospectType?: InputMaybe<Scalars['String']>;
};

/** Interactive Advertising Bureau Category - these are used on clients to serve relevant ads */
export type IabCategory = {
  __typename?: 'IABCategory';
  externalId: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type IabParentCategory = {
  __typename?: 'IABParentCategory';
  children: Array<IabCategory>;
  externalId: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

/** An image, typically a thumbnail or article view image for an {Item} */
export type Image = {
  __typename?: 'Image';
  /** A caption or description of the image */
  caption?: Maybe<Scalars['String']>;
  /** A credit for the image, typically who the image belongs to / created by */
  credit?: Maybe<Scalars['String']>;
  /** If known, the height of the image in px */
  height?: Maybe<Scalars['Int']>;
  /** The id for placing within an Article View. {articleView.article} will have placeholders of <div id='RIL_IMG_X' /> where X is this id. Apps can download those images as needed and populate them in their article view. */
  imageId: Scalars['Int'];
  /** Absolute url to the image */
  src: Scalars['String'];
  /** If the image is also a link, the destination url */
  targetUrl?: Maybe<Scalars['String']>;
  /** If known, the width of the image in px */
  width?: Maybe<Scalars['Int']>;
};

export enum Imageness {
  /** Contains images (v3 value is 1) */
  HasImages = 'HAS_IMAGES',
  /** Is an image (v3 value is 2) */
  IsImage = 'IS_IMAGE',
  /** No images (v3 value is 0) */
  NoImages = 'NO_IMAGES',
}

/**
 * The heart of Pocket
 * A url and meta data related to it.
 */
export type Item = {
  __typename?: 'Item';
  /** If available, the url to an AMP version of this article */
  ampUrl?: Maybe<Scalars['Url']>;
  /** The pocket HTML string of the article */
  article?: Maybe<Scalars['String']>;
  /** List of Authors involved with this article */
  authors?: Maybe<Array<Maybe<Author>>>;
  /** If the item is a collection allow them to get the collection information */
  collection?: Maybe<Collection>;
  /**
   * The length in bytes of the content
   * @deprecated Clients should not use this
   */
  contentLength?: Maybe<Scalars['Int']>;
  /** The date the article was published */
  datePublished?: Maybe<Scalars['DateString']>;
  /** The date the parser resolved this item */
  dateResolved?: Maybe<Scalars['DateString']>;
  /** The domain, such as 'getpocket.com' of the {.resolved_url} */
  domain?: Maybe<Scalars['String']>;
  /**
   * The primary database id of the domain this article is from
   * @deprecated Use a domain as the identifier instead
   */
  domainId?: Maybe<Scalars['String']>;
  /** Additional information about the item domain, when present, use this for displaying the domain name */
  domainMetadata?: Maybe<DomainMetadata>;
  /** The string encoding code of this item's web page */
  encoding?: Maybe<Scalars['String']>;
  /** A snippet of text from the article */
  excerpt?: Maybe<Scalars['String']>;
  /** The url as provided by the user when saving. Only http or https schemes allowed. */
  givenUrl: Scalars['Url'];
  /** 0=no images, 1=contains images, 2=is an image */
  hasImage?: Maybe<Imageness>;
  /**
   * Indicates that the item was stored via a different search_hash (using the old method), we'll need to look up a different id
   * @deprecated Most new items use a new hash
   */
  hasOldDupes?: Maybe<Scalars['Boolean']>;
  /** 0=no videos, 1=contains video, 2=is a video */
  hasVideo?: Maybe<Videoness>;
  /** Array of images within an article */
  images?: Maybe<Array<Maybe<Image>>>;
  /**
   * Indicates if the text of the url is a redirect to another url
   * @deprecated Clients should not use this
   */
  innerDomainRedirect?: Maybe<Scalars['Boolean']>;
  /** true if the item is an article */
  isArticle?: Maybe<Scalars['Boolean']>;
  /** true if the item is an index / home page, rather than a specific single piece of content */
  isIndex?: Maybe<Scalars['Boolean']>;
  /** A server generated unique id for this item. Item's whose {.normalUrl} are the same will have the same item_id. Most likely numeric, but to ensure future proofing this can be treated as a String in apps. */
  itemId: Scalars['String'];
  /** The detected language of the article */
  language?: Maybe<Scalars['String']>;
  /**
   * Indicates if the url requires a login
   * @deprecated Clients should not use this
   */
  loginRequired?: Maybe<Scalars['Boolean']>;
  /** The Marticle format of the article, used by clients for native article view. */
  marticle?: Maybe<Array<MarticleComponent>>;
  /** The mime type of this item's web page */
  mimeType?: Maybe<Scalars['String']>;
  /**
   * A normalized value of the givenUrl.
   * It will look like a url but is not guaranteed to be a valid url, just a unique string that is used to eliminate common duplicates.
   * Item's that share a normal_url should be considered the same item. For example https://getpocket.com and http://getpocket.com will be considered the same since they both normalize to http://getpocket.com
   * This is technically the true identity of an item, since this is what the backend uses to tell if two items are the same.
   * However, for the clients to use this, they would all have to ship an implementation of the normalization function that the backend has exactly.
   * And even if it did that, some items, some of the earliest saves, use a legacy normalize function and the client would have no way to know when to use which normalizing function.
   */
  normalUrl: Scalars['String'];
  /**
   * If a the domainId is a subdomain this is the primary domain id
   * @deprecated Use a domain as the identifier instead
   */
  originDomainId?: Maybe<Scalars['String']>;
  /** The item id of the resolved_url */
  resolvedId?: Maybe<Scalars['String']>;
  /**
   * The resolved url, but ran through the normalized function
   * @deprecated Use the resolved url instead
   */
  resolvedNormalUrl?: Maybe<Scalars['Url']>;
  /** If the givenUrl redirects (once or many times), this is the final url. Otherwise, same as givenUrl */
  resolvedUrl?: Maybe<Scalars['Url']>;
  /**
   * The http resonse code of the given url
   * @deprecated Clients should not use this
   */
  responseCode?: Maybe<Scalars['Int']>;
  /**
   * Date this item was first parsed in Pocket
   * @deprecated Clients should not use this
   */
  timeFirstParsed?: Maybe<Scalars['DateString']>;
  /** How long it will take to read the article (TODO in what time unit? and by what calculation?) */
  timeToRead?: Maybe<Scalars['Int']>;
  /** The title as determined by the parser. */
  title?: Maybe<Scalars['String']>;
  /** The page's / publisher's preferred thumbnail image */
  topImageUrl?: Maybe<Scalars['Url']>;
  /**
   * Indicates if the parser used fallback methods
   * @deprecated Clients should not use this
   */
  usedFallback?: Maybe<Scalars['Int']>;
  /** Array of videos within the item If the item is a video, this will likely just contain one video */
  videos?: Maybe<Array<Maybe<Video>>>;
  /** Number of words in the article */
  wordCount?: Maybe<Scalars['Int']>;
};

/** represents a language supported in the system */
export type Language = {
  __typename?: 'Language';
  code: Scalars['String'];
};

export type ListElement = {
  /** Row in a list. */
  content: Scalars['Markdown'];
  /** Zero-indexed level, for handling nested lists. */
  level: Scalars['Int'];
};

export type MarkdownImagePosition = {
  __typename?: 'MarkdownImagePosition';
  index: Scalars['Int'];
  position: Scalars['Int'];
  /** Fallback is to use the images field in the Item entity */
  src?: Maybe<Scalars['String']>;
};

/** Content of a blockquote */
export type MarticleBlockquote = {
  __typename?: 'MarticleBlockquote';
  /** Markdown text content. */
  content: Scalars['Markdown'];
};

/** Content in a bulleted (unordered) list. */
export type MarticleBulletedList = {
  __typename?: 'MarticleBulletedList';
  rows: Array<BulletedListElement>;
};

/** A pre formatted text in the HTML content. */
export type MarticleCodeBlock = {
  __typename?: 'MarticleCodeBlock';
  /** Assuming the codeblock was a programming language, this field is used to identify it. */
  language?: Maybe<Scalars['Int']>;
  /** Content of a pre tag */
  text: Scalars['String'];
};

export type MarticleComponent =
  | Image
  | MarticleBlockquote
  | MarticleBulletedList
  | MarticleCodeBlock
  | MarticleDivider
  | MarticleHeading
  | MarticleNumberedList
  | MarticleTable
  | MarticleText
  | UnMarseable
  | Video;

export type MarticleDivider = {
  __typename?: 'MarticleDivider';
  /** Always '---'; provided for convenience if building a markdown string */
  content: Scalars['Markdown'];
};

/** A heading in an article, with markdown formatting. */
export type MarticleHeading = {
  __typename?: 'MarticleHeading';
  /** Heading text, in markdown. */
  content: Scalars['Markdown'];
  /** Heading level. Restricted to values 1-6. */
  level: Scalars['Int'];
};

/** Content in a bulleted (unordered) list. */
export type MarticleNumberedList = {
  __typename?: 'MarticleNumberedList';
  rows: Array<NumberedListElement>;
};

/** Content in a table. */
export type MarticleTable = {
  __typename?: 'MarticleTable';
  /** Raw HTML representation of the table. */
  html: Scalars['String'];
};

/**
 * A section of the article's text content, in markdown.
 * A subset of gfm is supported. See README.md for more information.
 */
export type MarticleText = {
  __typename?: 'MarticleText';
  /** Markdown text content. Typically, a paragraph. */
  content: Scalars['Markdown'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Uploads an image to S3. Does *not* save the image to any entity
   * (CollectionAuthor/Collection/CollectionStory).
   */
  collectionImageUpload: CollectionImageUrl;
  /** Creates an Approved Item and optionally schedules it to appear on New Tab. */
  createApprovedCuratedCorpusItem: ApprovedCuratedCorpusItem;
  /** Creates a Collection. */
  createCollection: Collection;
  /** Creates a CollectionAuthor. */
  createCollectionAuthor: CollectionAuthor;
  /** Creates a CollectionPartner. */
  createCollectionPartner: CollectionPartner;
  /** Creates a CollectionPartnerAssociation. */
  createCollectionPartnerAssociation: CollectionPartnerAssociation;
  /** Creates a CollectionStory. */
  createCollectionStory: CollectionStory;
  /** Creates a Rejected Item. */
  createRejectedCuratedCorpusItem: RejectedCuratedCorpusItem;
  /** Creates a New Tab Scheduled Item. */
  createScheduledCuratedCorpusItem: ScheduledCuratedCorpusItem;
  /** Deletes a CollectionPartnerAssociation. */
  deleteCollectionPartnerAssociation: CollectionPartnerAssociation;
  /** Deletes a CollectionStory. Also deletes all the related CollectionStoryAuthor records. */
  deleteCollectionStory: CollectionStory;
  /** Deletes an item from New Tab Schedule. */
  deleteScheduledCuratedCorpusItem: ScheduledCuratedCorpusItem;
  /** Refresh an {Item}'s article content. */
  refreshItemArticle: Item;
  /** Rejects an Approved Item: deletes it from the corpus and creates a Rejected Item instead. */
  rejectApprovedCuratedCorpusItem: ApprovedCuratedCorpusItem;
  /** Updates an Approved Item. */
  updateApprovedCuratedCorpusItem: ApprovedCuratedCorpusItem;
  /** Updates a Collection. */
  updateCollection: Collection;
  /** Updates a CollectionAuthor. */
  updateCollectionAuthor: CollectionAuthor;
  /**
   * Updates only the `imageUrl` property of a CollectionAuthor.
   * Dedicated to uploading images within the UI.
   */
  updateCollectionAuthorImageUrl: CollectionAuthor;
  /**
   * Updates only the `imageUrl` property of a Collection.
   * Dedicated to uploading images within the UI.
   */
  updateCollectionImageUrl: Collection;
  /** Updates a CollectionPartner. */
  updateCollectionPartner: CollectionPartner;
  /** Updates a CollectionPartnerAssociation. */
  updateCollectionPartnerAssociation: CollectionPartnerAssociation;
  /**
   * Updates only the `imageUrl` property of a CollectionPartner.
   * Dedicated to uploading images within the UI.
   */
  updateCollectionPartnerAssociationImageUrl: CollectionPartnerAssociation;
  /**
   * Updates only the `imageUrl` property of a CollectionPartner.
   * Dedicated to uploading images within the UI.
   */
  updateCollectionPartnerImageUrl: CollectionPartner;
  /** Updates a CollectionStory. */
  updateCollectionStory: CollectionStory;
  /**
   * Updates only the `imageUrl` property of a CollectionStory.
   * Dedicated to uploading images within the UI.
   */
  updateCollectionStoryImageUrl: CollectionStory;
  /**
   * Updates only the `sortOrder` property of a CollectionStory.
   * Dedicated to ordering stories within the UI.
   */
  updateCollectionStorySortOrder: CollectionStory;
  /**
   * marks a prospect as 'curated' in the database, preventing it from being displayed for prospecting.
   * returns true if the operation succeeds, false if not (almost surely due to an incorrect prospectId).
   */
  updateProspectAsCurated?: Maybe<Prospect>;
  /** Uploads an image to S3 for an Approved Curated Corpus Item */
  uploadApprovedCuratedCorpusItemImage: ApprovedCuratedCorpusImageUrl;
};

export type MutationCollectionImageUploadArgs = {
  data: CollectionImageUploadInput;
};

export type MutationCreateApprovedCuratedCorpusItemArgs = {
  data: CreateApprovedCuratedCorpusItemInput;
};

export type MutationCreateCollectionArgs = {
  data: CreateCollectionInput;
};

export type MutationCreateCollectionAuthorArgs = {
  data: CreateCollectionAuthorInput;
};

export type MutationCreateCollectionPartnerArgs = {
  data: CreateCollectionPartnerInput;
};

export type MutationCreateCollectionPartnerAssociationArgs = {
  data: CreateCollectionPartnerAssociationInput;
};

export type MutationCreateCollectionStoryArgs = {
  data: CreateCollectionStoryInput;
};

export type MutationCreateRejectedCuratedCorpusItemArgs = {
  data: CreateRejectedCuratedCorpusItemInput;
};

export type MutationCreateScheduledCuratedCorpusItemArgs = {
  data: CreateScheduledCuratedCorpusItemInput;
};

export type MutationDeleteCollectionPartnerAssociationArgs = {
  externalId: Scalars['String'];
};

export type MutationDeleteCollectionStoryArgs = {
  externalId: Scalars['String'];
};

export type MutationDeleteScheduledCuratedCorpusItemArgs = {
  data: DeleteScheduledCuratedCorpusItemInput;
};

export type MutationRefreshItemArticleArgs = {
  url: Scalars['String'];
};

export type MutationRejectApprovedCuratedCorpusItemArgs = {
  data: RejectApprovedCuratedCorpusItemInput;
};

export type MutationUpdateApprovedCuratedCorpusItemArgs = {
  data: UpdateApprovedCuratedCorpusItemInput;
};

export type MutationUpdateCollectionArgs = {
  data: UpdateCollectionInput;
};

export type MutationUpdateCollectionAuthorArgs = {
  data: UpdateCollectionAuthorInput;
};

export type MutationUpdateCollectionAuthorImageUrlArgs = {
  data: UpdateCollectionAuthorImageUrlInput;
};

export type MutationUpdateCollectionImageUrlArgs = {
  data: UpdateCollectionImageUrlInput;
};

export type MutationUpdateCollectionPartnerArgs = {
  data: UpdateCollectionPartnerInput;
};

export type MutationUpdateCollectionPartnerAssociationArgs = {
  data: UpdateCollectionPartnerAssociationInput;
};

export type MutationUpdateCollectionPartnerAssociationImageUrlArgs = {
  data: UpdateCollectionPartnerAssociationImageUrlInput;
};

export type MutationUpdateCollectionPartnerImageUrlArgs = {
  data: UpdateCollectionPartnerImageUrlInput;
};

export type MutationUpdateCollectionStoryArgs = {
  data: UpdateCollectionStoryInput;
};

export type MutationUpdateCollectionStoryImageUrlArgs = {
  data: UpdateCollectionStoryImageUrlInput;
};

export type MutationUpdateCollectionStorySortOrderArgs = {
  data: UpdateCollectionStorySortOrderInput;
};

export type MutationUpdateProspectAsCuratedArgs = {
  prospectId: Scalars['ID'];
};

export type MutationUploadApprovedCuratedCorpusItemImageArgs = {
  data: Scalars['Upload'];
};

/** A New Tab, including its associated Prospect Types. */
export type NewTab = {
  __typename?: 'NewTab';
  /** The GUID of the New Tab. Example: 'EN_US'. */
  guid: Scalars['String'];
  /** The display name of the New Tab. Example 'en-US'. */
  name: Scalars['String'];
  /** An array of associated ProspectTypes. */
  prospectTypes: Array<ProspectType>;
  /** The UTC offset of the New Tab's scheduling day, represented in HMM numeric format. */
  utcOffset: Scalars['Int'];
};

export type NumberedListElement = ListElement & {
  __typename?: 'NumberedListElement';
  /** Row in a list */
  content: Scalars['Markdown'];
  /** Numeric index. If a nested item, the index is zero-indexed from the first child. */
  index: Scalars['Int'];
  /** Zero-indexed level, for handling nexted lists. */
  level: Scalars['Int'];
};

/** Options for returning items sorted by the supplied field. */
export enum OrderBy {
  /** Return items in ascending order. */
  Asc = 'ASC',
  /** Return items in descending order. */
  Desc = 'DESC',
}

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Pagination = {
  __typename?: 'Pagination';
  currentPage: Scalars['Int'];
  perPage: Scalars['Int'];
  totalPages: Scalars['Int'];
  totalResults: Scalars['Int'];
};

/**
 * Pagination request. To determine which edges to return, the connection
 * evaluates the `before` and `after` cursors (if given) to filter the
 * edges, then evaluates `first`/`last` to slice the edges (only include a
 * value for either `first` or `last`, not both). If all fields are null,
 * by default will return a page with the first 30 elements.
 */
export type PaginationInput = {
  /**
   * Returns the elements in the list that come after the specified cursor.
   * The specified cursor is not included in the result.
   */
  after?: InputMaybe<Scalars['String']>;
  /**
   * Returns the elements in the list that come before the specified cursor.
   * The specified cursor is not included in the result.
   */
  before?: InputMaybe<Scalars['String']>;
  /**
   * Returns the first _n_ elements from the list. Must be a non-negative integer.
   * If `first` contains a value, `last` should be null/omitted in the input.
   */
  first?: InputMaybe<Scalars['Int']>;
  /**
   * Returns the last _n_ elements from the list. Must be a non-negative integer.
   * If `last` contains a value, `first` should be null/omitted in the input.
   */
  last?: InputMaybe<Scalars['Int']>;
};

export type Prospect = {
  __typename?: 'Prospect';
  createdAt?: Maybe<Scalars['Int']>;
  domain?: Maybe<Scalars['String']>;
  excerpt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  isCollection?: Maybe<Scalars['Boolean']>;
  isSyndicated?: Maybe<Scalars['Boolean']>;
  language?: Maybe<Scalars['String']>;
  newTab: Scalars['String'];
  prospectType: Scalars['String'];
  publisher?: Maybe<Scalars['String']>;
  saveCount?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  topic?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

/**
 * Prospect types. This enum is not used anywhere in this schema, however it is used
 * by the Curation Admin Tools frontend to filter prospects.
 */
export enum ProspectType {
  Global = 'GLOBAL',
  OrganicTimespent = 'ORGANIC_TIMESPENT',
  Syndicated = 'SYNDICATED',
}

export type Query = {
  __typename?: 'Query';
  /** Retrieves an approved curated item with the given URL. */
  getApprovedCuratedCorpusItemByUrl?: Maybe<ApprovedCuratedCorpusItem>;
  /** Retrieves a paginated, filterable list of ApprovedCuratedCorpusItems. */
  getApprovedCuratedCorpusItems: ApprovedCuratedCorpusItemConnection;
  /** Retrieves a Collection by externalId. */
  getCollection?: Maybe<Collection>;
  /** Retrieves a CollectionAuthor by externalId. */
  getCollectionAuthor?: Maybe<CollectionAuthor>;
  /** Retrieves a paged list of CollectionAuthors. */
  getCollectionAuthors: CollectionAuthorsResult;
  /** Retrieves a CollectionAuthor by externalId. */
  getCollectionPartner?: Maybe<CollectionPartner>;
  /** Retrieves a CollectionPartnerAssociation by externalId. Used for tests only. */
  getCollectionPartnerAssociation?: Maybe<CollectionPartnerAssociation>;
  /**
   * Retrieves a CollectionPartnerAssociation by the externalId of the collection
   * it is related to.
   */
  getCollectionPartnerAssociationForCollection?: Maybe<CollectionPartnerAssociation>;
  /** Retrieves a paged list of CollectionAuthors. */
  getCollectionPartners: CollectionPartnersResult;
  /** Retrieves a CollectionStory by externalId. Used for tests only. */
  getCollectionStory?: Maybe<CollectionStory>;
  /** Retrieves a list of CurationCategories, sorted alphabetically */
  getCurationCategories: Array<CurationCategory>;
  /** Retrieves the nested list of IAB top/sub categories. */
  getIABCategories: Array<IabParentCategory>;
  /** Look up {Item} info by ID. */
  getItemByItemId?: Maybe<Item>;
  /** Look up {Item} info by a url. */
  getItemByUrl?: Maybe<Item>;
  /** Retrieves the languages currently supported. */
  getLanguages: Array<Language>;
  /** Retrieves all NewTabs available to the given SSO user. Requires an Authorization header. */
  getNewTabsForUser: Array<NewTab>;
  /** returns a set of at most 20 prospects (number may be smaller depending on available data) */
  getProspects: Array<Prospect>;
  /** Retrieves a paginated, filterable list of RejectedCuratedCorpusItems. */
  getRejectedCuratedCorpusItems: RejectedCuratedCorpusItemConnection;
  /** Retrieves a list of Approved Items that are scheduled to appear on New Tab. */
  getScheduledCuratedCorpusItems: Array<ScheduledCuratedCorpusItemsResult>;
  /** returns parser meta data for a given url */
  getUrlMetadata: UrlMetadata;
  searchCollections: CollectionsResult;
};

export type QueryGetApprovedCuratedCorpusItemByUrlArgs = {
  url: Scalars['String'];
};

export type QueryGetApprovedCuratedCorpusItemsArgs = {
  filters?: InputMaybe<ApprovedCuratedCorpusItemFilter>;
  pagination?: InputMaybe<PaginationInput>;
};

export type QueryGetCollectionArgs = {
  externalId: Scalars['String'];
};

export type QueryGetCollectionAuthorArgs = {
  externalId: Scalars['String'];
};

export type QueryGetCollectionAuthorsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
};

export type QueryGetCollectionPartnerArgs = {
  externalId: Scalars['String'];
};

export type QueryGetCollectionPartnerAssociationArgs = {
  externalId: Scalars['String'];
};

export type QueryGetCollectionPartnerAssociationForCollectionArgs = {
  externalId: Scalars['String'];
};

export type QueryGetCollectionPartnersArgs = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
};

export type QueryGetCollectionStoryArgs = {
  externalId: Scalars['String'];
};

export type QueryGetItemByItemIdArgs = {
  id: Scalars['ID'];
};

export type QueryGetItemByUrlArgs = {
  url: Scalars['String'];
};

export type QueryGetProspectsArgs = {
  filters: GetProspectsFilters;
};

export type QueryGetRejectedCuratedCorpusItemsArgs = {
  filters?: InputMaybe<RejectedCuratedCorpusItemFilter>;
  pagination?: InputMaybe<PaginationInput>;
};

export type QueryGetScheduledCuratedCorpusItemsArgs = {
  filters: ScheduledCuratedCorpusItemsFilterInput;
};

export type QueryGetUrlMetadataArgs = {
  url: Scalars['String'];
};

export type QuerySearchCollectionsArgs = {
  filters: SearchCollectionsFilters;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
};

/** Input data for rejecting an Approved Item. */
export type RejectApprovedCuratedCorpusItemInput = {
  /** Approved Item ID. */
  externalId: Scalars['ID'];
  /** A comma-separated list of rejection reasons. */
  reason: Scalars['String'];
};

/** A prospective story that has been rejected by the curators. */
export type RejectedCuratedCorpusItem = {
  __typename?: 'RejectedCuratedCorpusItem';
  /** A Unix timestamp of when the entity was created. */
  createdAt: Scalars['Int'];
  /** A single sign-on user identifier of the user who created this entity. */
  createdBy: Scalars['String'];
  /** An alternative primary key in UUID format that is generated on creation. */
  externalId: Scalars['ID'];
  /** What language this story is in. This is a two-letter code, for example, 'en' for English. */
  language: Scalars['String'];
  /** The GUID of the corresponding Prospect ID. Will be empty if the item was manually added. */
  prospectId?: Maybe<Scalars['ID']>;
  /** The name of the online publication that published this story. */
  publisher: Scalars['String'];
  /** Reason why it was rejected. Can be multiple reasons. Will likely be stored either as comma-separated values or JSON. */
  reason: Scalars['String'];
  /** The title of the story. */
  title: Scalars['String'];
  /**
   * A topic this story best fits in.
   * Temporarily a string value that will be provided by Prospect API, possibly an enum in the future.
   */
  topic: Scalars['String'];
  /** The URL of the story. */
  url: Scalars['Url'];
};

/** The connection type for Rejected Curated Item. */
export type RejectedCuratedCorpusItemConnection = {
  __typename?: 'RejectedCuratedCorpusItemConnection';
  /** A list of edges. */
  edges: Array<RejectedCuratedCorpusItemEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of Rejected Curated Items in the connection. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection for RejectedCuratedCorpusItem type. */
export type RejectedCuratedCorpusItemEdge = {
  __typename?: 'RejectedCuratedCorpusItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The Rejected Curated Item at the end of the edge. */
  node: RejectedCuratedCorpusItem;
};

/** Available fields for filtering RejectedCuratedCorpusItems. */
export type RejectedCuratedCorpusItemFilter = {
  /**
   * Optional filter on the language Rejected Curated Items have been classified as.
   * This is a two-letter string, e.g. 'en' for English or 'de' for 'German'.
   */
  language?: InputMaybe<Scalars['String']>;
  /** Optional filter on the title field. Returns partial matches. */
  title?: InputMaybe<Scalars['String']>;
  /** Optional filter on the topic field. */
  topic?: InputMaybe<Scalars['String']>;
  /** Optional filter on the URL field. Returns partial matches. */
  url?: InputMaybe<Scalars['Url']>;
};

/**
 * Possible reasons for rejecting a prospect. This enum is not used anywhere in this schema,
 * however it is used by the Curation Admin Tools frontend to specify rejection reasons.
 */
export enum RejectionReason {
  Misinformation = 'MISINFORMATION',
  OffensiveMaterial = 'OFFENSIVE_MATERIAL',
  Other = 'OTHER',
  Paywall = 'PAYWALL',
  PoliticalOpinion = 'POLITICAL_OPINION',
  TimeSensitive = 'TIME_SENSITIVE',
}

/**
 * A scheduled entry for an Approved Item to appear on a New Tab Feed.
 * For example, a story that is scheduled to appear on December 31st, 2021 on the New Tab in Firefox for the US audience.
 */
export type ScheduledCuratedCorpusItem = {
  __typename?: 'ScheduledCuratedCorpusItem';
  /** The associated Approved Item. */
  approvedItem: ApprovedCuratedCorpusItem;
  /** A Unix timestamp of when the entity was created. */
  createdAt: Scalars['Int'];
  /** A single sign-on user identifier of the user who created this entity. */
  createdBy: Scalars['String'];
  /** An alternative primary key in UUID format that is generated on creation. */
  externalId: Scalars['ID'];
  /**
   * The date the associated Approved Item is scheduled to appear on New Tab.
   * This date is relative to the time zone of the New Tab. Format: YYYY-MM-DD.
   */
  scheduledDate: Scalars['Date'];
  /** A Unix timestamp of when the entity was last updated. */
  updatedAt: Scalars['Int'];
  /** A single sign-on user identifier of the user who last updated this entity. Null on creation. */
  updatedBy?: Maybe<Scalars['String']>;
};

/** Available fields for filtering scheduled items for a given New Tab. */
export type ScheduledCuratedCorpusItemsFilterInput = {
  /** To what day to show scheduled items to, inclusive. Expects a date in YYYY-MM-DD format. */
  endDate: Scalars['Date'];
  /** The GUID of the New Tab. Example: 'EN_US'. */
  newTabGuid: Scalars['ID'];
  /** Which day to show scheduled items from. Expects a date in YYYY-MM-DD format. */
  startDate: Scalars['Date'];
};

/** The shape of the result returned by the getScheduledCuratedCorpusItems query. */
export type ScheduledCuratedCorpusItemsResult = {
  __typename?: 'ScheduledCuratedCorpusItemsResult';
  /** The number of curated items that are collections for the scheduled date. */
  collectionCount: Scalars['Int'];
  /** An array of items for a given New Tab Feed */
  items: Array<ScheduledCuratedCorpusItem>;
  /** The date items are scheduled for, in YYYY-MM-DD format. */
  scheduledDate: Scalars['Date'];
  /** The number of syndicated articles for the scheduled date. */
  syndicatedCount: Scalars['Int'];
  /** The total number of items for the scheduled date. */
  totalCount: Scalars['Int'];
};

/** available filters for searching collections */
export type SearchCollectionsFilters = {
  author?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<CollectionStatus>;
  title?: InputMaybe<Scalars['String']>;
};

/**
 * The list of Pocket topics. This enum is not used anywhere in this schema, however it is used
 * by the Curation Admin Tools frontend to edit curated items.
 */
export enum Topics {
  Business = 'BUSINESS',
  Career = 'CAREER',
  Coronavirus = 'CORONAVIRUS',
  Education = 'EDUCATION',
  Entertainment = 'ENTERTAINMENT',
  Food = 'FOOD',
  Gaming = 'GAMING',
  HealthFitness = 'HEALTH_FITNESS',
  Parenting = 'PARENTING',
  PersonalFinance = 'PERSONAL_FINANCE',
  Politics = 'POLITICS',
  Science = 'SCIENCE',
  SelfImprovement = 'SELF_IMPROVEMENT',
  Sports = 'SPORTS',
  Technology = 'TECHNOLOGY',
  Travel = 'TRAVEL',
}

/** Represents content that could not be parsed into a valid Marticle* component. */
export type UnMarseable = {
  __typename?: 'UnMarseable';
  /** The html that could not be parsed into a Marticle* component. */
  html: Scalars['String'];
};

/** Input data for updating an Approved Item. */
export type UpdateApprovedCuratedCorpusItemInput = {
  /** The excerpt of the Approved Item. */
  excerpt: Scalars['String'];
  /** Approved Item ID. */
  externalId: Scalars['ID'];
  /** The image URL for this item's accompanying picture. */
  imageUrl: Scalars['Url'];
  /**
   * A flag to ML to not recommend this item long term after it is added to the corpus.
   * Example: a story covering an election, or "The best of 202x" collection.
   */
  isTimeSensitive: Scalars['Boolean'];
  /** What language this item is in. This is a two-letter code, for example, 'en' for English. */
  language: Scalars['String'];
  /** The name of the online publication that published this story. */
  publisher: Scalars['String'];
  /** The outcome of the curators' review of the Approved Item. */
  status: CuratedStatus;
  /** The title of the Approved Item. */
  title: Scalars['String'];
  /**
   * A topic this story best fits in.
   * Temporarily a string value that will be provided by Prospect API, possibly an enum in the future.
   */
  topic: Scalars['String'];
};

export type UpdateCollectionAuthorImageUrlInput = {
  externalId: Scalars['String'];
  imageUrl: Scalars['Url'];
};

export type UpdateCollectionAuthorInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  bio?: InputMaybe<Scalars['Markdown']>;
  externalId: Scalars['String'];
  imageUrl?: InputMaybe<Scalars['Url']>;
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type UpdateCollectionImageUrlInput = {
  externalId: Scalars['String'];
  imageUrl: Scalars['Url'];
};

export type UpdateCollectionInput = {
  IABChildCategoryExternalId?: InputMaybe<Scalars['String']>;
  IABParentCategoryExternalId?: InputMaybe<Scalars['String']>;
  authorExternalId: Scalars['String'];
  curationCategoryExternalId?: InputMaybe<Scalars['String']>;
  excerpt: Scalars['Markdown'];
  externalId?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['Url']>;
  intro?: InputMaybe<Scalars['Markdown']>;
  language: Scalars['String'];
  slug: Scalars['String'];
  status: CollectionStatus;
  title: Scalars['String'];
};

export type UpdateCollectionPartnerAssociationImageUrlInput = {
  externalId: Scalars['String'];
  imageUrl: Scalars['Url'];
};

export type UpdateCollectionPartnerAssociationInput = {
  blurb?: InputMaybe<Scalars['Markdown']>;
  externalId: Scalars['String'];
  imageUrl?: InputMaybe<Scalars['Url']>;
  name?: InputMaybe<Scalars['String']>;
  partnerExternalId: Scalars['String'];
  type: CollectionPartnershipType;
  url?: InputMaybe<Scalars['Url']>;
};

export type UpdateCollectionPartnerImageUrlInput = {
  externalId: Scalars['String'];
  imageUrl: Scalars['Url'];
};

export type UpdateCollectionPartnerInput = {
  blurb: Scalars['Markdown'];
  externalId: Scalars['String'];
  imageUrl?: InputMaybe<Scalars['Url']>;
  name: Scalars['String'];
  url: Scalars['Url'];
};

export type UpdateCollectionStoryImageUrlInput = {
  externalId: Scalars['String'];
  imageUrl: Scalars['Url'];
};

export type UpdateCollectionStoryInput = {
  authors: Array<CollectionStoryAuthorInput>;
  excerpt: Scalars['Markdown'];
  externalId: Scalars['String'];
  fromPartner?: InputMaybe<Scalars['Boolean']>;
  imageUrl: Scalars['Url'];
  publisher: Scalars['String'];
  sortOrder?: InputMaybe<Scalars['Int']>;
  title: Scalars['String'];
  url: Scalars['Url'];
};

export type UpdateCollectionStorySortOrderInput = {
  externalId: Scalars['String'];
  sortOrder: Scalars['Int'];
};

export type UrlMetadata = {
  __typename?: 'UrlMetadata';
  domain?: Maybe<Scalars['String']>;
  excerpt?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  isCollection?: Maybe<Scalars['Boolean']>;
  isSyndicated?: Maybe<Scalars['Boolean']>;
  language?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

/** A Video, typically within an Article View of an {Item} or if the Item is a video itself." */
export type Video = {
  __typename?: 'Video';
  /** If known, the height of the video in px */
  height?: Maybe<Scalars['Int']>;
  /** If known, the length of the video in seconds */
  length?: Maybe<Scalars['Int']>;
  /** Absolute url to the video */
  src: Scalars['String'];
  /** The type of video */
  type: VideoType;
  /** The video's id within the service defined by type */
  vid?: Maybe<Scalars['String']>;
  /** The id of the video within Article View. {articleView.article} will have placeholders of <div id='RIL_VID_X' /> where X is this id. Apps can download those images as needed and populate them in their article view. */
  videoId: Scalars['Int'];
  /** If known, the width of the video in px */
  width?: Maybe<Scalars['Int']>;
};

export enum VideoType {
  /** Brightcove (v3 value is 8) */
  Brightcove = 'BRIGHTCOVE',
  /** Flash (v3 value is 6) */
  Flash = 'FLASH',
  /** html5 (v3 value is 5) */
  Html5 = 'HTML5',
  /** iframe (v3 value is 7) */
  Iframe = 'IFRAME',
  /** video iframe (v3 value is 4) */
  VimeoIframe = 'VIMEO_IFRAME',
  /** Vimeo Link (v3 value is 2) */
  VimeoLink = 'VIMEO_LINK',
  /** Vimeo Moogaloop (v3 value is 3) */
  VimeoMoogaloop = 'VIMEO_MOOGALOOP',
  /** Youtube (v3 value is 1) */
  Youtube = 'YOUTUBE',
}

export enum Videoness {
  /** Contains videos (v3 value is 1) */
  HasVideos = 'HAS_VIDEOS',
  /** Is a video (v3 value is 2) */
  IsVideo = 'IS_VIDEO',
  /** No videos (v3 value is 0) */
  NoVideos = 'NO_VIDEOS',
}

export type CollectionAuthorDataFragment = {
  __typename?: 'CollectionAuthor';
  externalId: string;
  name: string;
  slug?: string | null | undefined;
  bio?: any | null | undefined;
  imageUrl?: any | null | undefined;
  active: boolean;
};

export type CollectionDataFragment = {
  __typename?: 'Collection';
  externalId: string;
  title: string;
  slug: string;
  excerpt?: any | null | undefined;
  intro?: any | null | undefined;
  imageUrl?: any | null | undefined;
  language: string;
  status: CollectionStatus;
  authors: Array<{
    __typename?: 'CollectionAuthor';
    externalId: string;
    name: string;
    slug?: string | null | undefined;
    bio?: any | null | undefined;
    imageUrl?: any | null | undefined;
    active: boolean;
  }>;
  curationCategory?:
    | {
        __typename?: 'CurationCategory';
        externalId: string;
        name: string;
        slug: string;
      }
    | null
    | undefined;
  IABParentCategory?:
    | {
        __typename?: 'IABCategory';
        externalId: string;
        name: string;
        slug: string;
      }
    | null
    | undefined;
  IABChildCategory?:
    | {
        __typename?: 'IABCategory';
        externalId: string;
        name: string;
        slug: string;
      }
    | null
    | undefined;
  partnership?:
    | {
        __typename?: 'CollectionPartnership';
        externalId: string;
        type: CollectionPartnershipType;
        name: string;
        url: any;
        imageUrl: any;
        blurb: any;
      }
    | null
    | undefined;
};

export type CollectionPartnerAssociationDataFragment = {
  __typename?: 'CollectionPartnerAssociation';
  externalId: string;
  type: CollectionPartnershipType;
  name?: string | null | undefined;
  url?: any | null | undefined;
  imageUrl?: any | null | undefined;
  blurb?: any | null | undefined;
  partner: {
    __typename?: 'CollectionPartner';
    externalId: string;
    name: string;
    url: any;
    imageUrl: any;
    blurb: any;
  };
};

export type CollectionPartnerDataFragment = {
  __typename?: 'CollectionPartner';
  externalId: string;
  name: string;
  url: any;
  imageUrl: any;
  blurb: any;
};

export type CollectionStoryDataFragment = {
  __typename?: 'CollectionStory';
  externalId: string;
  url: any;
  title: string;
  excerpt: any;
  imageUrl?: any | null | undefined;
  publisher?: string | null | undefined;
  fromPartner: boolean;
  sortOrder?: number | null | undefined;
  authors: Array<{
    __typename?: 'CollectionStoryAuthor';
    name: string;
    sortOrder: number;
  }>;
};

export type CuratedItemDataFragment = {
  __typename?: 'ApprovedCuratedCorpusItem';
  externalId: string;
  prospectId?: string | null | undefined;
  title: string;
  language: string;
  publisher: string;
  url: any;
  imageUrl: any;
  excerpt: string;
  status: CuratedStatus;
  topic: string;
  isCollection: boolean;
  isTimeSensitive: boolean;
  isSyndicated: boolean;
  createdBy: string;
  createdAt: number;
  updatedBy?: string | null | undefined;
  updatedAt: number;
};

export type ProspectDataFragment = {
  __typename?: 'Prospect';
  id: string;
  newTab: string;
  topic?: string | null | undefined;
  prospectType: string;
  url: string;
  createdAt?: number | null | undefined;
  imageUrl?: string | null | undefined;
  publisher?: string | null | undefined;
  domain?: string | null | undefined;
  title?: string | null | undefined;
  excerpt?: string | null | undefined;
  language?: string | null | undefined;
  saveCount?: number | null | undefined;
  isSyndicated?: boolean | null | undefined;
  isCollection?: boolean | null | undefined;
};

export type RejectedItemDataFragment = {
  __typename?: 'RejectedCuratedCorpusItem';
  externalId: string;
  prospectId?: string | null | undefined;
  url: any;
  title: string;
  topic: string;
  language: string;
  publisher: string;
  reason: string;
  createdBy: string;
  createdAt: number;
};

export type UrlMetadataFragment = {
  __typename?: 'UrlMetadata';
  url: string;
  imageUrl?: string | null | undefined;
  publisher?: string | null | undefined;
  domain?: string | null | undefined;
  title?: string | null | undefined;
  excerpt?: string | null | undefined;
  language?: string | null | undefined;
  isSyndicated?: boolean | null | undefined;
  isCollection?: boolean | null | undefined;
};

export type CreateApprovedCuratedCorpusItemMutationVariables = Exact<{
  data: CreateApprovedCuratedCorpusItemInput;
}>;

export type CreateApprovedCuratedCorpusItemMutation = {
  __typename?: 'Mutation';
  createApprovedCuratedCorpusItem: {
    __typename?: 'ApprovedCuratedCorpusItem';
    externalId: string;
    prospectId?: string | null | undefined;
    title: string;
    language: string;
    publisher: string;
    url: any;
    imageUrl: any;
    excerpt: string;
    status: CuratedStatus;
    topic: string;
    isCollection: boolean;
    isTimeSensitive: boolean;
    isSyndicated: boolean;
    createdBy: string;
    createdAt: number;
    updatedBy?: string | null | undefined;
    updatedAt: number;
  };
};

export type CreateCollectionMutationVariables = Exact<{
  title: Scalars['String'];
  slug: Scalars['String'];
  excerpt?: InputMaybe<Scalars['Markdown']>;
  intro?: InputMaybe<Scalars['Markdown']>;
  status: CollectionStatus;
  authorExternalId: Scalars['String'];
  curationCategoryExternalId?: InputMaybe<Scalars['String']>;
  IABParentCategoryExternalId?: InputMaybe<Scalars['String']>;
  IABChildCategoryExternalId?: InputMaybe<Scalars['String']>;
  language: Scalars['String'];
}>;

export type CreateCollectionMutation = {
  __typename?: 'Mutation';
  createCollection: {
    __typename?: 'Collection';
    externalId: string;
    title: string;
    slug: string;
    excerpt?: any | null | undefined;
    intro?: any | null | undefined;
    imageUrl?: any | null | undefined;
    language: string;
    status: CollectionStatus;
    authors: Array<{
      __typename?: 'CollectionAuthor';
      externalId: string;
      name: string;
      slug?: string | null | undefined;
      bio?: any | null | undefined;
      imageUrl?: any | null | undefined;
      active: boolean;
    }>;
    curationCategory?:
      | {
          __typename?: 'CurationCategory';
          externalId: string;
          name: string;
          slug: string;
        }
      | null
      | undefined;
    IABParentCategory?:
      | {
          __typename?: 'IABCategory';
          externalId: string;
          name: string;
          slug: string;
        }
      | null
      | undefined;
    IABChildCategory?:
      | {
          __typename?: 'IABCategory';
          externalId: string;
          name: string;
          slug: string;
        }
      | null
      | undefined;
    partnership?:
      | {
          __typename?: 'CollectionPartnership';
          externalId: string;
          type: CollectionPartnershipType;
          name: string;
          url: any;
          imageUrl: any;
          blurb: any;
        }
      | null
      | undefined;
  };
};

export type CreateCollectionAuthorMutationVariables = Exact<{
  name: Scalars['String'];
  slug?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['Markdown']>;
  imageUrl?: InputMaybe<Scalars['Url']>;
  active?: InputMaybe<Scalars['Boolean']>;
}>;

export type CreateCollectionAuthorMutation = {
  __typename?: 'Mutation';
  createCollectionAuthor: {
    __typename?: 'CollectionAuthor';
    externalId: string;
    name: string;
    slug?: string | null | undefined;
    bio?: any | null | undefined;
    imageUrl?: any | null | undefined;
    active: boolean;
  };
};

export type CreateCollectionPartnerMutationVariables = Exact<{
  name: Scalars['String'];
  url: Scalars['Url'];
  blurb: Scalars['Markdown'];
  imageUrl: Scalars['Url'];
}>;

export type CreateCollectionPartnerMutation = {
  __typename?: 'Mutation';
  createCollectionPartner: {
    __typename?: 'CollectionPartner';
    externalId: string;
    name: string;
    url: any;
    imageUrl: any;
    blurb: any;
  };
};

export type CreateCollectionPartnerAssociationMutationVariables = Exact<{
  type: CollectionPartnershipType;
  partnerExternalId: Scalars['String'];
  collectionExternalId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['Url']>;
  imageUrl?: InputMaybe<Scalars['Url']>;
  blurb?: InputMaybe<Scalars['Markdown']>;
}>;

export type CreateCollectionPartnerAssociationMutation = {
  __typename?: 'Mutation';
  createCollectionPartnerAssociation: {
    __typename?: 'CollectionPartnerAssociation';
    externalId: string;
    type: CollectionPartnershipType;
    name?: string | null | undefined;
    url?: any | null | undefined;
    imageUrl?: any | null | undefined;
    blurb?: any | null | undefined;
    partner: {
      __typename?: 'CollectionPartner';
      externalId: string;
      name: string;
      url: any;
      imageUrl: any;
      blurb: any;
    };
  };
};

export type CreateCollectionStoryMutationVariables = Exact<{
  collectionExternalId: Scalars['String'];
  url: Scalars['Url'];
  title: Scalars['String'];
  excerpt: Scalars['Markdown'];
  imageUrl: Scalars['Url'];
  authors: Array<CollectionStoryAuthorInput> | CollectionStoryAuthorInput;
  publisher: Scalars['String'];
  sortOrder?: InputMaybe<Scalars['Int']>;
  fromPartner?: InputMaybe<Scalars['Boolean']>;
}>;

export type CreateCollectionStoryMutation = {
  __typename?: 'Mutation';
  createCollectionStory: {
    __typename?: 'CollectionStory';
    externalId: string;
    url: any;
    title: string;
    excerpt: any;
    imageUrl?: any | null | undefined;
    publisher?: string | null | undefined;
    fromPartner: boolean;
    sortOrder?: number | null | undefined;
    authors: Array<{
      __typename?: 'CollectionStoryAuthor';
      name: string;
      sortOrder: number;
    }>;
  };
};

export type CreateNewTabFeedScheduledItemMutationVariables = Exact<{
  approvedItemExternalId: Scalars['ID'];
  newTabGuid: Scalars['ID'];
  scheduledDate: Scalars['Date'];
}>;

export type CreateNewTabFeedScheduledItemMutation = {
  __typename?: 'Mutation';
  createScheduledCuratedCorpusItem: {
    __typename?: 'ScheduledCuratedCorpusItem';
    externalId: string;
    createdAt: number;
    createdBy: string;
    updatedAt: number;
    updatedBy?: string | null | undefined;
    scheduledDate: any;
    approvedItem: {
      __typename?: 'ApprovedCuratedCorpusItem';
      externalId: string;
      prospectId?: string | null | undefined;
      title: string;
      language: string;
      publisher: string;
      url: any;
      imageUrl: any;
      excerpt: string;
      status: CuratedStatus;
      topic: string;
      isCollection: boolean;
      isTimeSensitive: boolean;
      isSyndicated: boolean;
      createdBy: string;
      createdAt: number;
      updatedBy?: string | null | undefined;
      updatedAt: number;
    };
  };
};

export type DeleteCollectionPartnerAssociationMutationVariables = Exact<{
  externalId: Scalars['String'];
}>;

export type DeleteCollectionPartnerAssociationMutation = {
  __typename?: 'Mutation';
  deleteCollectionPartnerAssociation: {
    __typename?: 'CollectionPartnerAssociation';
    externalId: string;
    type: CollectionPartnershipType;
    name?: string | null | undefined;
    url?: any | null | undefined;
    imageUrl?: any | null | undefined;
    blurb?: any | null | undefined;
    partner: {
      __typename?: 'CollectionPartner';
      externalId: string;
      name: string;
      url: any;
      imageUrl: any;
      blurb: any;
    };
  };
};

export type DeleteCollectionStoryMutationVariables = Exact<{
  externalId: Scalars['String'];
}>;

export type DeleteCollectionStoryMutation = {
  __typename?: 'Mutation';
  deleteCollectionStory: {
    __typename?: 'CollectionStory';
    externalId: string;
    url: any;
    title: string;
    excerpt: any;
    imageUrl?: any | null | undefined;
    publisher?: string | null | undefined;
    fromPartner: boolean;
    sortOrder?: number | null | undefined;
    authors: Array<{
      __typename?: 'CollectionStoryAuthor';
      name: string;
      sortOrder: number;
    }>;
  };
};

export type DeleteScheduledItemMutationVariables = Exact<{
  externalId: Scalars['ID'];
}>;

export type DeleteScheduledItemMutation = {
  __typename?: 'Mutation';
  deleteScheduledCuratedCorpusItem: {
    __typename?: 'ScheduledCuratedCorpusItem';
    externalId: string;
    createdAt: number;
    createdBy: string;
    updatedAt: number;
    updatedBy?: string | null | undefined;
    scheduledDate: any;
    approvedItem: {
      __typename?: 'ApprovedCuratedCorpusItem';
      externalId: string;
      prospectId?: string | null | undefined;
      title: string;
      language: string;
      publisher: string;
      url: any;
      imageUrl: any;
      excerpt: string;
      status: CuratedStatus;
      topic: string;
      isCollection: boolean;
      isTimeSensitive: boolean;
      isSyndicated: boolean;
      createdBy: string;
      createdAt: number;
      updatedBy?: string | null | undefined;
      updatedAt: number;
    };
  };
};

export type ImageUploadMutationVariables = Exact<{
  image: Scalars['Upload'];
  width: Scalars['Int'];
  height: Scalars['Int'];
  fileSizeBytes: Scalars['Int'];
}>;

export type ImageUploadMutation = {
  __typename?: 'Mutation';
  collectionImageUpload: { __typename?: 'CollectionImageUrl'; url: string };
};

export type RejectApprovedItemMutationVariables = Exact<{
  data: RejectApprovedCuratedCorpusItemInput;
}>;

export type RejectApprovedItemMutation = {
  __typename?: 'Mutation';
  rejectApprovedCuratedCorpusItem: {
    __typename?: 'ApprovedCuratedCorpusItem';
    externalId: string;
    prospectId?: string | null | undefined;
    title: string;
    language: string;
    publisher: string;
    url: any;
    imageUrl: any;
    excerpt: string;
    status: CuratedStatus;
    topic: string;
    isCollection: boolean;
    isTimeSensitive: boolean;
    isSyndicated: boolean;
    createdBy: string;
    createdAt: number;
    updatedBy?: string | null | undefined;
    updatedAt: number;
  };
};

export type RejectProspectMutationVariables = Exact<{
  data: CreateRejectedCuratedCorpusItemInput;
}>;

export type RejectProspectMutation = {
  __typename?: 'Mutation';
  createRejectedCuratedCorpusItem: {
    __typename?: 'RejectedCuratedCorpusItem';
    externalId: string;
    prospectId?: string | null | undefined;
    url: any;
    title: string;
    topic: string;
    language: string;
    publisher: string;
    reason: string;
    createdBy: string;
    createdAt: number;
  };
};

export type UpdateApprovedCuratedCorpusItemMutationVariables = Exact<{
  data: UpdateApprovedCuratedCorpusItemInput;
}>;

export type UpdateApprovedCuratedCorpusItemMutation = {
  __typename?: 'Mutation';
  updateApprovedCuratedCorpusItem: {
    __typename?: 'ApprovedCuratedCorpusItem';
    externalId: string;
    prospectId?: string | null | undefined;
    title: string;
    language: string;
    publisher: string;
    url: any;
    imageUrl: any;
    excerpt: string;
    status: CuratedStatus;
    topic: string;
    isCollection: boolean;
    isTimeSensitive: boolean;
    isSyndicated: boolean;
    createdBy: string;
    createdAt: number;
    updatedBy?: string | null | undefined;
    updatedAt: number;
  };
};

export type UpdateCollectionMutationVariables = Exact<{
  externalId?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  slug: Scalars['String'];
  excerpt: Scalars['Markdown'];
  intro?: InputMaybe<Scalars['Markdown']>;
  status: CollectionStatus;
  authorExternalId: Scalars['String'];
  curationCategoryExternalId?: InputMaybe<Scalars['String']>;
  IABParentCategoryExternalId?: InputMaybe<Scalars['String']>;
  IABChildCategoryExternalId?: InputMaybe<Scalars['String']>;
  language: Scalars['String'];
  imageUrl?: InputMaybe<Scalars['Url']>;
}>;

export type UpdateCollectionMutation = {
  __typename?: 'Mutation';
  updateCollection: {
    __typename?: 'Collection';
    externalId: string;
    title: string;
    slug: string;
    excerpt?: any | null | undefined;
    intro?: any | null | undefined;
    imageUrl?: any | null | undefined;
    language: string;
    status: CollectionStatus;
    authors: Array<{
      __typename?: 'CollectionAuthor';
      externalId: string;
      name: string;
      slug?: string | null | undefined;
      bio?: any | null | undefined;
      imageUrl?: any | null | undefined;
      active: boolean;
    }>;
    curationCategory?:
      | {
          __typename?: 'CurationCategory';
          externalId: string;
          name: string;
          slug: string;
        }
      | null
      | undefined;
    IABParentCategory?:
      | {
          __typename?: 'IABCategory';
          externalId: string;
          name: string;
          slug: string;
        }
      | null
      | undefined;
    IABChildCategory?:
      | {
          __typename?: 'IABCategory';
          externalId: string;
          name: string;
          slug: string;
        }
      | null
      | undefined;
    partnership?:
      | {
          __typename?: 'CollectionPartnership';
          externalId: string;
          type: CollectionPartnershipType;
          name: string;
          url: any;
          imageUrl: any;
          blurb: any;
        }
      | null
      | undefined;
  };
};

export type UpdateCollectionAuthorMutationVariables = Exact<{
  externalId: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
  bio?: InputMaybe<Scalars['Markdown']>;
  imageUrl?: InputMaybe<Scalars['Url']>;
  active?: InputMaybe<Scalars['Boolean']>;
}>;

export type UpdateCollectionAuthorMutation = {
  __typename?: 'Mutation';
  updateCollectionAuthor: {
    __typename?: 'CollectionAuthor';
    externalId: string;
    name: string;
    slug?: string | null | undefined;
    bio?: any | null | undefined;
    imageUrl?: any | null | undefined;
    active: boolean;
  };
};

export type UpdateCollectionAuthorImageUrlMutationVariables = Exact<{
  externalId: Scalars['String'];
  imageUrl: Scalars['Url'];
}>;

export type UpdateCollectionAuthorImageUrlMutation = {
  __typename?: 'Mutation';
  updateCollectionAuthorImageUrl: {
    __typename?: 'CollectionAuthor';
    externalId: string;
    name: string;
    slug?: string | null | undefined;
    bio?: any | null | undefined;
    imageUrl?: any | null | undefined;
    active: boolean;
  };
};

export type UpdateCollectionImageUrlMutationVariables = Exact<{
  externalId: Scalars['String'];
  imageUrl: Scalars['Url'];
}>;

export type UpdateCollectionImageUrlMutation = {
  __typename?: 'Mutation';
  updateCollectionImageUrl: {
    __typename?: 'Collection';
    externalId: string;
    title: string;
    slug: string;
    excerpt?: any | null | undefined;
    intro?: any | null | undefined;
    imageUrl?: any | null | undefined;
    language: string;
    status: CollectionStatus;
    authors: Array<{
      __typename?: 'CollectionAuthor';
      externalId: string;
      name: string;
      slug?: string | null | undefined;
      bio?: any | null | undefined;
      imageUrl?: any | null | undefined;
      active: boolean;
    }>;
    curationCategory?:
      | {
          __typename?: 'CurationCategory';
          externalId: string;
          name: string;
          slug: string;
        }
      | null
      | undefined;
    IABParentCategory?:
      | {
          __typename?: 'IABCategory';
          externalId: string;
          name: string;
          slug: string;
        }
      | null
      | undefined;
    IABChildCategory?:
      | {
          __typename?: 'IABCategory';
          externalId: string;
          name: string;
          slug: string;
        }
      | null
      | undefined;
    partnership?:
      | {
          __typename?: 'CollectionPartnership';
          externalId: string;
          type: CollectionPartnershipType;
          name: string;
          url: any;
          imageUrl: any;
          blurb: any;
        }
      | null
      | undefined;
  };
};

export type UpdateCollectionPartnerMutationVariables = Exact<{
  externalId: Scalars['String'];
  name: Scalars['String'];
  url: Scalars['Url'];
  blurb: Scalars['Markdown'];
  imageUrl?: InputMaybe<Scalars['Url']>;
}>;

export type UpdateCollectionPartnerMutation = {
  __typename?: 'Mutation';
  updateCollectionPartner: {
    __typename?: 'CollectionPartner';
    externalId: string;
    name: string;
    url: any;
    imageUrl: any;
    blurb: any;
  };
};

export type UpdateCollectionPartnerAssociationMutationVariables = Exact<{
  externalId: Scalars['String'];
  type: CollectionPartnershipType;
  partnerExternalId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['Url']>;
  imageUrl?: InputMaybe<Scalars['Url']>;
  blurb?: InputMaybe<Scalars['Markdown']>;
}>;

export type UpdateCollectionPartnerAssociationMutation = {
  __typename?: 'Mutation';
  updateCollectionPartnerAssociation: {
    __typename?: 'CollectionPartnerAssociation';
    externalId: string;
    type: CollectionPartnershipType;
    name?: string | null | undefined;
    url?: any | null | undefined;
    imageUrl?: any | null | undefined;
    blurb?: any | null | undefined;
    partner: {
      __typename?: 'CollectionPartner';
      externalId: string;
      name: string;
      url: any;
      imageUrl: any;
      blurb: any;
    };
  };
};

export type UpdateCollectionPartnerAssociationImageUrlMutationVariables =
  Exact<{
    externalId: Scalars['String'];
    imageUrl: Scalars['Url'];
  }>;

export type UpdateCollectionPartnerAssociationImageUrlMutation = {
  __typename?: 'Mutation';
  updateCollectionPartnerAssociationImageUrl: {
    __typename?: 'CollectionPartnerAssociation';
    externalId: string;
    type: CollectionPartnershipType;
    name?: string | null | undefined;
    url?: any | null | undefined;
    imageUrl?: any | null | undefined;
    blurb?: any | null | undefined;
    partner: {
      __typename?: 'CollectionPartner';
      externalId: string;
      name: string;
      url: any;
      imageUrl: any;
      blurb: any;
    };
  };
};

export type UpdateCollectionPartnerImageUrlMutationVariables = Exact<{
  externalId: Scalars['String'];
  imageUrl: Scalars['Url'];
}>;

export type UpdateCollectionPartnerImageUrlMutation = {
  __typename?: 'Mutation';
  updateCollectionPartnerImageUrl: {
    __typename?: 'CollectionPartner';
    externalId: string;
    name: string;
    url: any;
    imageUrl: any;
    blurb: any;
  };
};

export type UpdateCollectionStoryMutationVariables = Exact<{
  externalId: Scalars['String'];
  url: Scalars['Url'];
  title: Scalars['String'];
  excerpt: Scalars['Markdown'];
  imageUrl: Scalars['Url'];
  authors: Array<CollectionStoryAuthorInput> | CollectionStoryAuthorInput;
  publisher: Scalars['String'];
  sortOrder?: InputMaybe<Scalars['Int']>;
  fromPartner?: InputMaybe<Scalars['Boolean']>;
}>;

export type UpdateCollectionStoryMutation = {
  __typename?: 'Mutation';
  updateCollectionStory: {
    __typename?: 'CollectionStory';
    externalId: string;
    url: any;
    title: string;
    excerpt: any;
    imageUrl?: any | null | undefined;
    publisher?: string | null | undefined;
    fromPartner: boolean;
    sortOrder?: number | null | undefined;
    authors: Array<{
      __typename?: 'CollectionStoryAuthor';
      name: string;
      sortOrder: number;
    }>;
  };
};

export type UpdateCollectionStoryImageUrlMutationVariables = Exact<{
  externalId: Scalars['String'];
  imageUrl: Scalars['Url'];
}>;

export type UpdateCollectionStoryImageUrlMutation = {
  __typename?: 'Mutation';
  updateCollectionStoryImageUrl: {
    __typename?: 'CollectionStory';
    externalId: string;
    url: any;
    title: string;
    excerpt: any;
    imageUrl?: any | null | undefined;
    publisher?: string | null | undefined;
    fromPartner: boolean;
    sortOrder?: number | null | undefined;
    authors: Array<{
      __typename?: 'CollectionStoryAuthor';
      name: string;
      sortOrder: number;
    }>;
  };
};

export type UpdateCollectionStorySortOrderMutationVariables = Exact<{
  externalId: Scalars['String'];
  sortOrder: Scalars['Int'];
}>;

export type UpdateCollectionStorySortOrderMutation = {
  __typename?: 'Mutation';
  updateCollectionStorySortOrder: {
    __typename?: 'CollectionStory';
    externalId: string;
    url: any;
    title: string;
    excerpt: any;
    imageUrl?: any | null | undefined;
    publisher?: string | null | undefined;
    fromPartner: boolean;
    sortOrder?: number | null | undefined;
    authors: Array<{
      __typename?: 'CollectionStoryAuthor';
      name: string;
      sortOrder: number;
    }>;
  };
};

export type UpdateProspectAsCuratedMutationVariables = Exact<{
  prospectId: Scalars['ID'];
}>;

export type UpdateProspectAsCuratedMutation = {
  __typename?: 'Mutation';
  updateProspectAsCurated?:
    | {
        __typename?: 'Prospect';
        id: string;
        newTab: string;
        topic?: string | null | undefined;
        prospectType: string;
        url: string;
        createdAt?: number | null | undefined;
        imageUrl?: string | null | undefined;
        publisher?: string | null | undefined;
        domain?: string | null | undefined;
        title?: string | null | undefined;
        excerpt?: string | null | undefined;
        language?: string | null | undefined;
        saveCount?: number | null | undefined;
        isSyndicated?: boolean | null | undefined;
        isCollection?: boolean | null | undefined;
      }
    | null
    | undefined;
};

export type UploadApprovedCuratedCorpusItemImageMutationVariables = Exact<{
  image: Scalars['Upload'];
}>;

export type UploadApprovedCuratedCorpusItemImageMutation = {
  __typename?: 'Mutation';
  uploadApprovedCuratedCorpusItemImage: {
    __typename?: 'ApprovedCuratedCorpusImageUrl';
    url: string;
  };
};

export type GetApprovedItemByUrlQueryVariables = Exact<{
  url: Scalars['String'];
}>;

export type GetApprovedItemByUrlQuery = {
  __typename?: 'Query';
  getApprovedCuratedCorpusItemByUrl?:
    | {
        __typename?: 'ApprovedCuratedCorpusItem';
        externalId: string;
        prospectId?: string | null | undefined;
        title: string;
        language: string;
        publisher: string;
        url: any;
        imageUrl: any;
        excerpt: string;
        status: CuratedStatus;
        topic: string;
        isCollection: boolean;
        isTimeSensitive: boolean;
        isSyndicated: boolean;
        createdBy: string;
        createdAt: number;
        updatedBy?: string | null | undefined;
        updatedAt: number;
      }
    | null
    | undefined;
};

export type GetApprovedItemsQueryVariables = Exact<{
  filters?: InputMaybe<ApprovedCuratedCorpusItemFilter>;
  pagination?: InputMaybe<PaginationInput>;
}>;

export type GetApprovedItemsQuery = {
  __typename?: 'Query';
  getApprovedCuratedCorpusItems: {
    __typename?: 'ApprovedCuratedCorpusItemConnection';
    totalCount: number;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null | undefined;
      endCursor?: string | null | undefined;
    };
    edges: Array<{
      __typename?: 'ApprovedCuratedCorpusItemEdge';
      cursor: string;
      node: {
        __typename?: 'ApprovedCuratedCorpusItem';
        externalId: string;
        prospectId?: string | null | undefined;
        title: string;
        language: string;
        publisher: string;
        url: any;
        imageUrl: any;
        excerpt: string;
        status: CuratedStatus;
        topic: string;
        isCollection: boolean;
        isTimeSensitive: boolean;
        isSyndicated: boolean;
        createdBy: string;
        createdAt: number;
        updatedBy?: string | null | undefined;
        updatedAt: number;
      };
    }>;
  };
};

export type GetAuthorByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetAuthorByIdQuery = {
  __typename?: 'Query';
  getCollectionAuthor?:
    | {
        __typename?: 'CollectionAuthor';
        externalId: string;
        name: string;
        slug?: string | null | undefined;
        bio?: any | null | undefined;
        imageUrl?: any | null | undefined;
        active: boolean;
      }
    | null
    | undefined;
};

export type GetAuthorsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
}>;

export type GetAuthorsQuery = {
  __typename?: 'Query';
  getCollectionAuthors: {
    __typename?: 'CollectionAuthorsResult';
    authors: Array<{
      __typename?: 'CollectionAuthor';
      externalId: string;
      name: string;
      slug?: string | null | undefined;
      bio?: any | null | undefined;
      imageUrl?: any | null | undefined;
      active: boolean;
    }>;
    pagination?:
      | {
          __typename?: 'Pagination';
          currentPage: number;
          totalPages: number;
          totalResults: number;
        }
      | null
      | undefined;
  };
};

export type GetCollectionByExternalIdQueryVariables = Exact<{
  externalId: Scalars['String'];
}>;

export type GetCollectionByExternalIdQuery = {
  __typename?: 'Query';
  getCollection?:
    | {
        __typename?: 'Collection';
        externalId: string;
        title: string;
        slug: string;
        excerpt?: any | null | undefined;
        intro?: any | null | undefined;
        imageUrl?: any | null | undefined;
        language: string;
        status: CollectionStatus;
        authors: Array<{
          __typename?: 'CollectionAuthor';
          externalId: string;
          name: string;
          slug?: string | null | undefined;
          bio?: any | null | undefined;
          imageUrl?: any | null | undefined;
          active: boolean;
        }>;
        curationCategory?:
          | {
              __typename?: 'CurationCategory';
              externalId: string;
              name: string;
              slug: string;
            }
          | null
          | undefined;
        IABParentCategory?:
          | {
              __typename?: 'IABCategory';
              externalId: string;
              name: string;
              slug: string;
            }
          | null
          | undefined;
        IABChildCategory?:
          | {
              __typename?: 'IABCategory';
              externalId: string;
              name: string;
              slug: string;
            }
          | null
          | undefined;
        partnership?:
          | {
              __typename?: 'CollectionPartnership';
              externalId: string;
              type: CollectionPartnershipType;
              name: string;
              url: any;
              imageUrl: any;
              blurb: any;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type GetCollectionPartnerQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetCollectionPartnerQuery = {
  __typename?: 'Query';
  getCollectionPartner?:
    | {
        __typename?: 'CollectionPartner';
        externalId: string;
        name: string;
        url: any;
        imageUrl: any;
        blurb: any;
      }
    | null
    | undefined;
};

export type GetCollectionPartnerAssociationQueryVariables = Exact<{
  externalId: Scalars['String'];
}>;

export type GetCollectionPartnerAssociationQuery = {
  __typename?: 'Query';
  getCollectionPartnerAssociationForCollection?:
    | {
        __typename?: 'CollectionPartnerAssociation';
        externalId: string;
        type: CollectionPartnershipType;
        name?: string | null | undefined;
        url?: any | null | undefined;
        imageUrl?: any | null | undefined;
        blurb?: any | null | undefined;
        partner: {
          __typename?: 'CollectionPartner';
          externalId: string;
          name: string;
          url: any;
          imageUrl: any;
          blurb: any;
        };
      }
    | null
    | undefined;
};

export type GetCollectionPartnersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
}>;

export type GetCollectionPartnersQuery = {
  __typename?: 'Query';
  getCollectionPartners: {
    __typename?: 'CollectionPartnersResult';
    partners: Array<{
      __typename?: 'CollectionPartner';
      externalId: string;
      name: string;
      url: any;
      imageUrl: any;
      blurb: any;
    }>;
    pagination?:
      | {
          __typename?: 'Pagination';
          currentPage: number;
          totalPages: number;
          totalResults: number;
        }
      | null
      | undefined;
  };
};

export type GetCollectionStoriesQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetCollectionStoriesQuery = {
  __typename?: 'Query';
  getCollection?:
    | {
        __typename?: 'Collection';
        externalId: string;
        stories: Array<{
          __typename?: 'CollectionStory';
          externalId: string;
          url: any;
          title: string;
          excerpt: any;
          imageUrl?: any | null | undefined;
          publisher?: string | null | undefined;
          fromPartner: boolean;
          sortOrder?: number | null | undefined;
          authors: Array<{
            __typename?: 'CollectionStoryAuthor';
            name: string;
            sortOrder: number;
          }>;
        }>;
      }
    | null
    | undefined;
};

export type GetCollectionsQueryVariables = Exact<{
  page: Scalars['Int'];
  perPage: Scalars['Int'];
  status: CollectionStatus;
}>;

export type GetCollectionsQuery = {
  __typename?: 'Query';
  searchCollections: {
    __typename?: 'CollectionsResult';
    collections: Array<{
      __typename?: 'Collection';
      externalId: string;
      title: string;
      slug: string;
      excerpt?: any | null | undefined;
      intro?: any | null | undefined;
      imageUrl?: any | null | undefined;
      language: string;
      status: CollectionStatus;
      authors: Array<{
        __typename?: 'CollectionAuthor';
        externalId: string;
        name: string;
        slug?: string | null | undefined;
        bio?: any | null | undefined;
        imageUrl?: any | null | undefined;
        active: boolean;
      }>;
      curationCategory?:
        | {
            __typename?: 'CurationCategory';
            externalId: string;
            name: string;
            slug: string;
          }
        | null
        | undefined;
      IABParentCategory?:
        | {
            __typename?: 'IABCategory';
            externalId: string;
            name: string;
            slug: string;
          }
        | null
        | undefined;
      IABChildCategory?:
        | {
            __typename?: 'IABCategory';
            externalId: string;
            name: string;
            slug: string;
          }
        | null
        | undefined;
      partnership?:
        | {
            __typename?: 'CollectionPartnership';
            externalId: string;
            type: CollectionPartnershipType;
            name: string;
            url: any;
            imageUrl: any;
            blurb: any;
          }
        | null
        | undefined;
    }>;
    pagination: {
      __typename?: 'Pagination';
      currentPage: number;
      totalPages: number;
      totalResults: number;
    };
  };
};

export type GetInitialCollectionFormDataQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
}>;

export type GetInitialCollectionFormDataQuery = {
  __typename?: 'Query';
  getCollectionAuthors: {
    __typename?: 'CollectionAuthorsResult';
    authors: Array<{
      __typename?: 'CollectionAuthor';
      externalId: string;
      name: string;
      slug?: string | null | undefined;
      bio?: any | null | undefined;
      imageUrl?: any | null | undefined;
      active: boolean;
    }>;
  };
  getLanguages: Array<{ __typename?: 'Language'; code: string }>;
  getCurationCategories: Array<{
    __typename?: 'CurationCategory';
    externalId: string;
    name: string;
    slug: string;
  }>;
  getIABCategories: Array<{
    __typename?: 'IABParentCategory';
    externalId: string;
    name: string;
    slug: string;
    children: Array<{
      __typename?: 'IABCategory';
      externalId: string;
      name: string;
      slug: string;
    }>;
  }>;
};

export type GetNewTabsForUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetNewTabsForUserQuery = {
  __typename?: 'Query';
  getNewTabsForUser: Array<{
    __typename?: 'NewTab';
    guid: string;
    name: string;
    utcOffset: number;
    prospectTypes: Array<ProspectType>;
  }>;
};

export type GetProspectsQueryVariables = Exact<{
  newTab: Scalars['String'];
  prospectType?: InputMaybe<Scalars['String']>;
}>;

export type GetProspectsQuery = {
  __typename?: 'Query';
  getProspects: Array<{
    __typename?: 'Prospect';
    id: string;
    newTab: string;
    topic?: string | null | undefined;
    prospectType: string;
    url: string;
    createdAt?: number | null | undefined;
    imageUrl?: string | null | undefined;
    publisher?: string | null | undefined;
    domain?: string | null | undefined;
    title?: string | null | undefined;
    excerpt?: string | null | undefined;
    language?: string | null | undefined;
    saveCount?: number | null | undefined;
    isSyndicated?: boolean | null | undefined;
    isCollection?: boolean | null | undefined;
  }>;
};

export type GetRejectedItemsQueryVariables = Exact<{
  filters?: InputMaybe<RejectedCuratedCorpusItemFilter>;
  pagination?: InputMaybe<PaginationInput>;
}>;

export type GetRejectedItemsQuery = {
  __typename?: 'Query';
  getRejectedCuratedCorpusItems: {
    __typename?: 'RejectedCuratedCorpusItemConnection';
    totalCount: number;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null | undefined;
      endCursor?: string | null | undefined;
    };
    edges: Array<{
      __typename?: 'RejectedCuratedCorpusItemEdge';
      cursor: string;
      node: {
        __typename?: 'RejectedCuratedCorpusItem';
        externalId: string;
        prospectId?: string | null | undefined;
        url: any;
        title: string;
        topic: string;
        language: string;
        publisher: string;
        reason: string;
        createdBy: string;
        createdAt: number;
      };
    }>;
  };
};

export type GetScheduledItemCountsQueryVariables = Exact<{
  filters: ScheduledCuratedCorpusItemsFilterInput;
}>;

export type GetScheduledItemCountsQuery = {
  __typename?: 'Query';
  getScheduledCuratedCorpusItems: Array<{
    __typename?: 'ScheduledCuratedCorpusItemsResult';
    collectionCount: number;
    syndicatedCount: number;
    totalCount: number;
  }>;
};

export type GetScheduledItemsQueryVariables = Exact<{
  filters: ScheduledCuratedCorpusItemsFilterInput;
}>;

export type GetScheduledItemsQuery = {
  __typename?: 'Query';
  getScheduledCuratedCorpusItems: Array<{
    __typename?: 'ScheduledCuratedCorpusItemsResult';
    collectionCount: number;
    syndicatedCount: number;
    totalCount: number;
    scheduledDate: any;
    items: Array<{
      __typename?: 'ScheduledCuratedCorpusItem';
      externalId: string;
      createdAt: number;
      createdBy: string;
      updatedAt: number;
      updatedBy?: string | null | undefined;
      scheduledDate: any;
      approvedItem: {
        __typename?: 'ApprovedCuratedCorpusItem';
        externalId: string;
        prospectId?: string | null | undefined;
        title: string;
        language: string;
        publisher: string;
        url: any;
        imageUrl: any;
        excerpt: string;
        status: CuratedStatus;
        topic: string;
        isCollection: boolean;
        isTimeSensitive: boolean;
        isSyndicated: boolean;
        createdBy: string;
        createdAt: number;
        updatedBy?: string | null | undefined;
        updatedAt: number;
      };
    }>;
  }>;
};

export type GetSearchCollectionsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<CollectionStatus>;
  author?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
}>;

export type GetSearchCollectionsQuery = {
  __typename?: 'Query';
  searchCollections: {
    __typename?: 'CollectionsResult';
    collections: Array<{
      __typename?: 'Collection';
      externalId: string;
      title: string;
      slug: string;
      excerpt?: any | null | undefined;
      intro?: any | null | undefined;
      imageUrl?: any | null | undefined;
      language: string;
      status: CollectionStatus;
      authors: Array<{
        __typename?: 'CollectionAuthor';
        externalId: string;
        name: string;
        slug?: string | null | undefined;
        bio?: any | null | undefined;
        imageUrl?: any | null | undefined;
        active: boolean;
      }>;
      curationCategory?:
        | {
            __typename?: 'CurationCategory';
            externalId: string;
            name: string;
            slug: string;
          }
        | null
        | undefined;
      IABParentCategory?:
        | {
            __typename?: 'IABCategory';
            externalId: string;
            name: string;
            slug: string;
          }
        | null
        | undefined;
      IABChildCategory?:
        | {
            __typename?: 'IABCategory';
            externalId: string;
            name: string;
            slug: string;
          }
        | null
        | undefined;
      partnership?:
        | {
            __typename?: 'CollectionPartnership';
            externalId: string;
            type: CollectionPartnershipType;
            name: string;
            url: any;
            imageUrl: any;
            blurb: any;
          }
        | null
        | undefined;
    }>;
    pagination: { __typename?: 'Pagination'; totalResults: number };
  };
};

export type GetStoryFromParserQueryVariables = Exact<{
  url: Scalars['String'];
}>;

export type GetStoryFromParserQuery = {
  __typename?: 'Query';
  getItemByUrl?:
    | {
        __typename?: 'Item';
        resolvedUrl?: any | null | undefined;
        title?: string | null | undefined;
        excerpt?: string | null | undefined;
        topImageUrl?: any | null | undefined;
        images?:
          | Array<
              | {
                  __typename?: 'Image';
                  src: string;
                  width?: number | null | undefined;
                  height?: number | null | undefined;
                }
              | null
              | undefined
            >
          | null
          | undefined;
        authors?:
          | Array<
              | { __typename?: 'Author'; name?: string | null | undefined }
              | null
              | undefined
            >
          | null
          | undefined;
        domainMetadata?:
          | { __typename?: 'DomainMetadata'; name?: string | null | undefined }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type GetUrlMetadataQueryVariables = Exact<{
  url: Scalars['String'];
}>;

export type GetUrlMetadataQuery = {
  __typename?: 'Query';
  getUrlMetadata: {
    __typename?: 'UrlMetadata';
    url: string;
    imageUrl?: string | null | undefined;
    publisher?: string | null | undefined;
    domain?: string | null | undefined;
    title?: string | null | undefined;
    excerpt?: string | null | undefined;
    language?: string | null | undefined;
    isSyndicated?: boolean | null | undefined;
    isCollection?: boolean | null | undefined;
  };
};

export const CollectionAuthorDataFragmentDoc = gql`
  fragment CollectionAuthorData on CollectionAuthor {
    externalId
    name
    slug
    bio
    imageUrl
    active
  }
`;
export const CollectionDataFragmentDoc = gql`
  fragment CollectionData on Collection {
    externalId
    title
    slug
    excerpt
    intro
    imageUrl
    language
    status
    authors {
      ...CollectionAuthorData
    }
    curationCategory {
      externalId
      name
      slug
    }
    IABParentCategory {
      externalId
      name
      slug
    }
    IABChildCategory {
      externalId
      name
      slug
    }
    partnership {
      externalId
      type
      name
      url
      imageUrl
      blurb
    }
  }
  ${CollectionAuthorDataFragmentDoc}
`;
export const CollectionPartnerDataFragmentDoc = gql`
  fragment CollectionPartnerData on CollectionPartner {
    externalId
    name
    url
    imageUrl
    blurb
  }
`;
export const CollectionPartnerAssociationDataFragmentDoc = gql`
  fragment CollectionPartnerAssociationData on CollectionPartnerAssociation {
    externalId
    type
    name
    url
    imageUrl
    blurb
    partner {
      ...CollectionPartnerData
    }
  }
  ${CollectionPartnerDataFragmentDoc}
`;
export const CollectionStoryDataFragmentDoc = gql`
  fragment CollectionStoryData on CollectionStory {
    externalId
    url
    title
    excerpt
    imageUrl
    authors {
      name
      sortOrder
    }
    publisher
    fromPartner
    sortOrder
  }
`;
export const CuratedItemDataFragmentDoc = gql`
  fragment CuratedItemData on ApprovedCuratedCorpusItem {
    externalId
    prospectId
    title
    language
    publisher
    url
    imageUrl
    excerpt
    status
    topic
    isCollection
    isTimeSensitive
    isSyndicated
    createdBy
    createdAt
    updatedBy
    updatedAt
  }
`;
export const ProspectDataFragmentDoc = gql`
  fragment ProspectData on Prospect {
    id
    newTab
    topic
    prospectType
    url
    createdAt
    imageUrl
    publisher
    domain
    title
    excerpt
    language
    saveCount
    isSyndicated
    isCollection
  }
`;
export const RejectedItemDataFragmentDoc = gql`
  fragment RejectedItemData on RejectedCuratedCorpusItem {
    externalId
    prospectId
    url
    title
    topic
    language
    publisher
    reason
    createdBy
    createdAt
  }
`;
export const UrlMetadataFragmentDoc = gql`
  fragment urlMetadata on UrlMetadata {
    url
    imageUrl
    publisher
    domain
    title
    excerpt
    language
    isSyndicated
    isCollection
  }
`;
export const CreateApprovedCuratedCorpusItemDocument = gql`
  mutation createApprovedCuratedCorpusItem(
    $data: CreateApprovedCuratedCorpusItemInput!
  ) {
    createApprovedCuratedCorpusItem(data: $data) {
      ...CuratedItemData
    }
  }
  ${CuratedItemDataFragmentDoc}
`;
export type CreateApprovedCuratedCorpusItemMutationFn = Apollo.MutationFunction<
  CreateApprovedCuratedCorpusItemMutation,
  CreateApprovedCuratedCorpusItemMutationVariables
>;

/**
 * __useCreateApprovedCuratedCorpusItemMutation__
 *
 * To run a mutation, you first call `useCreateApprovedCuratedCorpusItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateApprovedCuratedCorpusItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createApprovedCuratedCorpusItemMutation, { data, loading, error }] = useCreateApprovedCuratedCorpusItemMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateApprovedCuratedCorpusItemMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateApprovedCuratedCorpusItemMutation,
    CreateApprovedCuratedCorpusItemMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateApprovedCuratedCorpusItemMutation,
    CreateApprovedCuratedCorpusItemMutationVariables
  >(CreateApprovedCuratedCorpusItemDocument, options);
}
export type CreateApprovedCuratedCorpusItemMutationHookResult = ReturnType<
  typeof useCreateApprovedCuratedCorpusItemMutation
>;
export type CreateApprovedCuratedCorpusItemMutationResult =
  Apollo.MutationResult<CreateApprovedCuratedCorpusItemMutation>;
export type CreateApprovedCuratedCorpusItemMutationOptions =
  Apollo.BaseMutationOptions<
    CreateApprovedCuratedCorpusItemMutation,
    CreateApprovedCuratedCorpusItemMutationVariables
  >;
export const CreateCollectionDocument = gql`
  mutation createCollection(
    $title: String!
    $slug: String!
    $excerpt: Markdown
    $intro: Markdown
    $status: CollectionStatus!
    $authorExternalId: String!
    $curationCategoryExternalId: String
    $IABParentCategoryExternalId: String
    $IABChildCategoryExternalId: String
    $language: String!
  ) {
    createCollection(
      data: {
        title: $title
        slug: $slug
        excerpt: $excerpt
        intro: $intro
        status: $status
        authorExternalId: $authorExternalId
        curationCategoryExternalId: $curationCategoryExternalId
        IABParentCategoryExternalId: $IABParentCategoryExternalId
        IABChildCategoryExternalId: $IABChildCategoryExternalId
        language: $language
      }
    ) {
      ...CollectionData
    }
  }
  ${CollectionDataFragmentDoc}
`;
export type CreateCollectionMutationFn = Apollo.MutationFunction<
  CreateCollectionMutation,
  CreateCollectionMutationVariables
>;

/**
 * __useCreateCollectionMutation__
 *
 * To run a mutation, you first call `useCreateCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCollectionMutation, { data, loading, error }] = useCreateCollectionMutation({
 *   variables: {
 *      title: // value for 'title'
 *      slug: // value for 'slug'
 *      excerpt: // value for 'excerpt'
 *      intro: // value for 'intro'
 *      status: // value for 'status'
 *      authorExternalId: // value for 'authorExternalId'
 *      curationCategoryExternalId: // value for 'curationCategoryExternalId'
 *      IABParentCategoryExternalId: // value for 'IABParentCategoryExternalId'
 *      IABChildCategoryExternalId: // value for 'IABChildCategoryExternalId'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useCreateCollectionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCollectionMutation,
    CreateCollectionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCollectionMutation,
    CreateCollectionMutationVariables
  >(CreateCollectionDocument, options);
}
export type CreateCollectionMutationHookResult = ReturnType<
  typeof useCreateCollectionMutation
>;
export type CreateCollectionMutationResult =
  Apollo.MutationResult<CreateCollectionMutation>;
export type CreateCollectionMutationOptions = Apollo.BaseMutationOptions<
  CreateCollectionMutation,
  CreateCollectionMutationVariables
>;
export const CreateCollectionAuthorDocument = gql`
  mutation createCollectionAuthor(
    $name: String!
    $slug: String
    $bio: Markdown
    $imageUrl: Url
    $active: Boolean
  ) {
    createCollectionAuthor(
      data: {
        name: $name
        slug: $slug
        bio: $bio
        imageUrl: $imageUrl
        active: $active
      }
    ) {
      ...CollectionAuthorData
    }
  }
  ${CollectionAuthorDataFragmentDoc}
`;
export type CreateCollectionAuthorMutationFn = Apollo.MutationFunction<
  CreateCollectionAuthorMutation,
  CreateCollectionAuthorMutationVariables
>;

/**
 * __useCreateCollectionAuthorMutation__
 *
 * To run a mutation, you first call `useCreateCollectionAuthorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCollectionAuthorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCollectionAuthorMutation, { data, loading, error }] = useCreateCollectionAuthorMutation({
 *   variables: {
 *      name: // value for 'name'
 *      slug: // value for 'slug'
 *      bio: // value for 'bio'
 *      imageUrl: // value for 'imageUrl'
 *      active: // value for 'active'
 *   },
 * });
 */
export function useCreateCollectionAuthorMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCollectionAuthorMutation,
    CreateCollectionAuthorMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCollectionAuthorMutation,
    CreateCollectionAuthorMutationVariables
  >(CreateCollectionAuthorDocument, options);
}
export type CreateCollectionAuthorMutationHookResult = ReturnType<
  typeof useCreateCollectionAuthorMutation
>;
export type CreateCollectionAuthorMutationResult =
  Apollo.MutationResult<CreateCollectionAuthorMutation>;
export type CreateCollectionAuthorMutationOptions = Apollo.BaseMutationOptions<
  CreateCollectionAuthorMutation,
  CreateCollectionAuthorMutationVariables
>;
export const CreateCollectionPartnerDocument = gql`
  mutation createCollectionPartner(
    $name: String!
    $url: Url!
    $blurb: Markdown!
    $imageUrl: Url!
  ) {
    createCollectionPartner(
      data: { name: $name, url: $url, blurb: $blurb, imageUrl: $imageUrl }
    ) {
      ...CollectionPartnerData
    }
  }
  ${CollectionPartnerDataFragmentDoc}
`;
export type CreateCollectionPartnerMutationFn = Apollo.MutationFunction<
  CreateCollectionPartnerMutation,
  CreateCollectionPartnerMutationVariables
>;

/**
 * __useCreateCollectionPartnerMutation__
 *
 * To run a mutation, you first call `useCreateCollectionPartnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCollectionPartnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCollectionPartnerMutation, { data, loading, error }] = useCreateCollectionPartnerMutation({
 *   variables: {
 *      name: // value for 'name'
 *      url: // value for 'url'
 *      blurb: // value for 'blurb'
 *      imageUrl: // value for 'imageUrl'
 *   },
 * });
 */
export function useCreateCollectionPartnerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCollectionPartnerMutation,
    CreateCollectionPartnerMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCollectionPartnerMutation,
    CreateCollectionPartnerMutationVariables
  >(CreateCollectionPartnerDocument, options);
}
export type CreateCollectionPartnerMutationHookResult = ReturnType<
  typeof useCreateCollectionPartnerMutation
>;
export type CreateCollectionPartnerMutationResult =
  Apollo.MutationResult<CreateCollectionPartnerMutation>;
export type CreateCollectionPartnerMutationOptions = Apollo.BaseMutationOptions<
  CreateCollectionPartnerMutation,
  CreateCollectionPartnerMutationVariables
>;
export const CreateCollectionPartnerAssociationDocument = gql`
  mutation createCollectionPartnerAssociation(
    $type: CollectionPartnershipType!
    $partnerExternalId: String!
    $collectionExternalId: String!
    $name: String
    $url: Url
    $imageUrl: Url
    $blurb: Markdown
  ) {
    createCollectionPartnerAssociation(
      data: {
        type: $type
        partnerExternalId: $partnerExternalId
        collectionExternalId: $collectionExternalId
        name: $name
        url: $url
        imageUrl: $imageUrl
        blurb: $blurb
      }
    ) {
      ...CollectionPartnerAssociationData
    }
  }
  ${CollectionPartnerAssociationDataFragmentDoc}
`;
export type CreateCollectionPartnerAssociationMutationFn =
  Apollo.MutationFunction<
    CreateCollectionPartnerAssociationMutation,
    CreateCollectionPartnerAssociationMutationVariables
  >;

/**
 * __useCreateCollectionPartnerAssociationMutation__
 *
 * To run a mutation, you first call `useCreateCollectionPartnerAssociationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCollectionPartnerAssociationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCollectionPartnerAssociationMutation, { data, loading, error }] = useCreateCollectionPartnerAssociationMutation({
 *   variables: {
 *      type: // value for 'type'
 *      partnerExternalId: // value for 'partnerExternalId'
 *      collectionExternalId: // value for 'collectionExternalId'
 *      name: // value for 'name'
 *      url: // value for 'url'
 *      imageUrl: // value for 'imageUrl'
 *      blurb: // value for 'blurb'
 *   },
 * });
 */
export function useCreateCollectionPartnerAssociationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCollectionPartnerAssociationMutation,
    CreateCollectionPartnerAssociationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCollectionPartnerAssociationMutation,
    CreateCollectionPartnerAssociationMutationVariables
  >(CreateCollectionPartnerAssociationDocument, options);
}
export type CreateCollectionPartnerAssociationMutationHookResult = ReturnType<
  typeof useCreateCollectionPartnerAssociationMutation
>;
export type CreateCollectionPartnerAssociationMutationResult =
  Apollo.MutationResult<CreateCollectionPartnerAssociationMutation>;
export type CreateCollectionPartnerAssociationMutationOptions =
  Apollo.BaseMutationOptions<
    CreateCollectionPartnerAssociationMutation,
    CreateCollectionPartnerAssociationMutationVariables
  >;
export const CreateCollectionStoryDocument = gql`
  mutation createCollectionStory(
    $collectionExternalId: String!
    $url: Url!
    $title: String!
    $excerpt: Markdown!
    $imageUrl: Url!
    $authors: [CollectionStoryAuthorInput!]!
    $publisher: String!
    $sortOrder: Int
    $fromPartner: Boolean
  ) {
    createCollectionStory(
      data: {
        collectionExternalId: $collectionExternalId
        url: $url
        title: $title
        excerpt: $excerpt
        imageUrl: $imageUrl
        authors: $authors
        publisher: $publisher
        sortOrder: $sortOrder
        fromPartner: $fromPartner
      }
    ) {
      ...CollectionStoryData
    }
  }
  ${CollectionStoryDataFragmentDoc}
`;
export type CreateCollectionStoryMutationFn = Apollo.MutationFunction<
  CreateCollectionStoryMutation,
  CreateCollectionStoryMutationVariables
>;

/**
 * __useCreateCollectionStoryMutation__
 *
 * To run a mutation, you first call `useCreateCollectionStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCollectionStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCollectionStoryMutation, { data, loading, error }] = useCreateCollectionStoryMutation({
 *   variables: {
 *      collectionExternalId: // value for 'collectionExternalId'
 *      url: // value for 'url'
 *      title: // value for 'title'
 *      excerpt: // value for 'excerpt'
 *      imageUrl: // value for 'imageUrl'
 *      authors: // value for 'authors'
 *      publisher: // value for 'publisher'
 *      sortOrder: // value for 'sortOrder'
 *      fromPartner: // value for 'fromPartner'
 *   },
 * });
 */
export function useCreateCollectionStoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCollectionStoryMutation,
    CreateCollectionStoryMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCollectionStoryMutation,
    CreateCollectionStoryMutationVariables
  >(CreateCollectionStoryDocument, options);
}
export type CreateCollectionStoryMutationHookResult = ReturnType<
  typeof useCreateCollectionStoryMutation
>;
export type CreateCollectionStoryMutationResult =
  Apollo.MutationResult<CreateCollectionStoryMutation>;
export type CreateCollectionStoryMutationOptions = Apollo.BaseMutationOptions<
  CreateCollectionStoryMutation,
  CreateCollectionStoryMutationVariables
>;
export const CreateNewTabFeedScheduledItemDocument = gql`
  mutation createNewTabFeedScheduledItem(
    $approvedItemExternalId: ID!
    $newTabGuid: ID!
    $scheduledDate: Date!
  ) {
    createScheduledCuratedCorpusItem(
      data: {
        approvedItemExternalId: $approvedItemExternalId
        newTabGuid: $newTabGuid
        scheduledDate: $scheduledDate
      }
    ) {
      externalId
      createdAt
      createdBy
      updatedAt
      updatedBy
      scheduledDate
      approvedItem {
        ...CuratedItemData
      }
    }
  }
  ${CuratedItemDataFragmentDoc}
`;
export type CreateNewTabFeedScheduledItemMutationFn = Apollo.MutationFunction<
  CreateNewTabFeedScheduledItemMutation,
  CreateNewTabFeedScheduledItemMutationVariables
>;

/**
 * __useCreateNewTabFeedScheduledItemMutation__
 *
 * To run a mutation, you first call `useCreateNewTabFeedScheduledItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewTabFeedScheduledItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewTabFeedScheduledItemMutation, { data, loading, error }] = useCreateNewTabFeedScheduledItemMutation({
 *   variables: {
 *      approvedItemExternalId: // value for 'approvedItemExternalId'
 *      newTabGuid: // value for 'newTabGuid'
 *      scheduledDate: // value for 'scheduledDate'
 *   },
 * });
 */
export function useCreateNewTabFeedScheduledItemMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateNewTabFeedScheduledItemMutation,
    CreateNewTabFeedScheduledItemMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateNewTabFeedScheduledItemMutation,
    CreateNewTabFeedScheduledItemMutationVariables
  >(CreateNewTabFeedScheduledItemDocument, options);
}
export type CreateNewTabFeedScheduledItemMutationHookResult = ReturnType<
  typeof useCreateNewTabFeedScheduledItemMutation
>;
export type CreateNewTabFeedScheduledItemMutationResult =
  Apollo.MutationResult<CreateNewTabFeedScheduledItemMutation>;
export type CreateNewTabFeedScheduledItemMutationOptions =
  Apollo.BaseMutationOptions<
    CreateNewTabFeedScheduledItemMutation,
    CreateNewTabFeedScheduledItemMutationVariables
  >;
export const DeleteCollectionPartnerAssociationDocument = gql`
  mutation deleteCollectionPartnerAssociation($externalId: String!) {
    deleteCollectionPartnerAssociation(externalId: $externalId) {
      ...CollectionPartnerAssociationData
    }
  }
  ${CollectionPartnerAssociationDataFragmentDoc}
`;
export type DeleteCollectionPartnerAssociationMutationFn =
  Apollo.MutationFunction<
    DeleteCollectionPartnerAssociationMutation,
    DeleteCollectionPartnerAssociationMutationVariables
  >;

/**
 * __useDeleteCollectionPartnerAssociationMutation__
 *
 * To run a mutation, you first call `useDeleteCollectionPartnerAssociationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCollectionPartnerAssociationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCollectionPartnerAssociationMutation, { data, loading, error }] = useDeleteCollectionPartnerAssociationMutation({
 *   variables: {
 *      externalId: // value for 'externalId'
 *   },
 * });
 */
export function useDeleteCollectionPartnerAssociationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCollectionPartnerAssociationMutation,
    DeleteCollectionPartnerAssociationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteCollectionPartnerAssociationMutation,
    DeleteCollectionPartnerAssociationMutationVariables
  >(DeleteCollectionPartnerAssociationDocument, options);
}
export type DeleteCollectionPartnerAssociationMutationHookResult = ReturnType<
  typeof useDeleteCollectionPartnerAssociationMutation
>;
export type DeleteCollectionPartnerAssociationMutationResult =
  Apollo.MutationResult<DeleteCollectionPartnerAssociationMutation>;
export type DeleteCollectionPartnerAssociationMutationOptions =
  Apollo.BaseMutationOptions<
    DeleteCollectionPartnerAssociationMutation,
    DeleteCollectionPartnerAssociationMutationVariables
  >;
export const DeleteCollectionStoryDocument = gql`
  mutation deleteCollectionStory($externalId: String!) {
    deleteCollectionStory(externalId: $externalId) {
      ...CollectionStoryData
    }
  }
  ${CollectionStoryDataFragmentDoc}
`;
export type DeleteCollectionStoryMutationFn = Apollo.MutationFunction<
  DeleteCollectionStoryMutation,
  DeleteCollectionStoryMutationVariables
>;

/**
 * __useDeleteCollectionStoryMutation__
 *
 * To run a mutation, you first call `useDeleteCollectionStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCollectionStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCollectionStoryMutation, { data, loading, error }] = useDeleteCollectionStoryMutation({
 *   variables: {
 *      externalId: // value for 'externalId'
 *   },
 * });
 */
export function useDeleteCollectionStoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCollectionStoryMutation,
    DeleteCollectionStoryMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteCollectionStoryMutation,
    DeleteCollectionStoryMutationVariables
  >(DeleteCollectionStoryDocument, options);
}
export type DeleteCollectionStoryMutationHookResult = ReturnType<
  typeof useDeleteCollectionStoryMutation
>;
export type DeleteCollectionStoryMutationResult =
  Apollo.MutationResult<DeleteCollectionStoryMutation>;
export type DeleteCollectionStoryMutationOptions = Apollo.BaseMutationOptions<
  DeleteCollectionStoryMutation,
  DeleteCollectionStoryMutationVariables
>;
export const DeleteScheduledItemDocument = gql`
  mutation deleteScheduledItem($externalId: ID!) {
    deleteScheduledCuratedCorpusItem(data: { externalId: $externalId }) {
      externalId
      createdAt
      createdBy
      updatedAt
      updatedBy
      scheduledDate
      approvedItem {
        ...CuratedItemData
      }
    }
  }
  ${CuratedItemDataFragmentDoc}
`;
export type DeleteScheduledItemMutationFn = Apollo.MutationFunction<
  DeleteScheduledItemMutation,
  DeleteScheduledItemMutationVariables
>;

/**
 * __useDeleteScheduledItemMutation__
 *
 * To run a mutation, you first call `useDeleteScheduledItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteScheduledItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteScheduledItemMutation, { data, loading, error }] = useDeleteScheduledItemMutation({
 *   variables: {
 *      externalId: // value for 'externalId'
 *   },
 * });
 */
export function useDeleteScheduledItemMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteScheduledItemMutation,
    DeleteScheduledItemMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteScheduledItemMutation,
    DeleteScheduledItemMutationVariables
  >(DeleteScheduledItemDocument, options);
}
export type DeleteScheduledItemMutationHookResult = ReturnType<
  typeof useDeleteScheduledItemMutation
>;
export type DeleteScheduledItemMutationResult =
  Apollo.MutationResult<DeleteScheduledItemMutation>;
export type DeleteScheduledItemMutationOptions = Apollo.BaseMutationOptions<
  DeleteScheduledItemMutation,
  DeleteScheduledItemMutationVariables
>;
export const ImageUploadDocument = gql`
  mutation imageUpload(
    $image: Upload!
    $width: Int!
    $height: Int!
    $fileSizeBytes: Int!
  ) {
    collectionImageUpload(
      data: {
        image: $image
        width: $width
        height: $height
        fileSizeBytes: $fileSizeBytes
      }
    ) {
      url
    }
  }
`;
export type ImageUploadMutationFn = Apollo.MutationFunction<
  ImageUploadMutation,
  ImageUploadMutationVariables
>;

/**
 * __useImageUploadMutation__
 *
 * To run a mutation, you first call `useImageUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImageUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [imageUploadMutation, { data, loading, error }] = useImageUploadMutation({
 *   variables: {
 *      image: // value for 'image'
 *      width: // value for 'width'
 *      height: // value for 'height'
 *      fileSizeBytes: // value for 'fileSizeBytes'
 *   },
 * });
 */
export function useImageUploadMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ImageUploadMutation,
    ImageUploadMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ImageUploadMutation, ImageUploadMutationVariables>(
    ImageUploadDocument,
    options
  );
}
export type ImageUploadMutationHookResult = ReturnType<
  typeof useImageUploadMutation
>;
export type ImageUploadMutationResult =
  Apollo.MutationResult<ImageUploadMutation>;
export type ImageUploadMutationOptions = Apollo.BaseMutationOptions<
  ImageUploadMutation,
  ImageUploadMutationVariables
>;
export const RejectApprovedItemDocument = gql`
  mutation rejectApprovedItem($data: RejectApprovedCuratedCorpusItemInput!) {
    rejectApprovedCuratedCorpusItem(data: $data) {
      ...CuratedItemData
    }
  }
  ${CuratedItemDataFragmentDoc}
`;
export type RejectApprovedItemMutationFn = Apollo.MutationFunction<
  RejectApprovedItemMutation,
  RejectApprovedItemMutationVariables
>;

/**
 * __useRejectApprovedItemMutation__
 *
 * To run a mutation, you first call `useRejectApprovedItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectApprovedItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectApprovedItemMutation, { data, loading, error }] = useRejectApprovedItemMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRejectApprovedItemMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RejectApprovedItemMutation,
    RejectApprovedItemMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RejectApprovedItemMutation,
    RejectApprovedItemMutationVariables
  >(RejectApprovedItemDocument, options);
}
export type RejectApprovedItemMutationHookResult = ReturnType<
  typeof useRejectApprovedItemMutation
>;
export type RejectApprovedItemMutationResult =
  Apollo.MutationResult<RejectApprovedItemMutation>;
export type RejectApprovedItemMutationOptions = Apollo.BaseMutationOptions<
  RejectApprovedItemMutation,
  RejectApprovedItemMutationVariables
>;
export const RejectProspectDocument = gql`
  mutation rejectProspect($data: CreateRejectedCuratedCorpusItemInput!) {
    createRejectedCuratedCorpusItem(data: $data) {
      ...RejectedItemData
    }
  }
  ${RejectedItemDataFragmentDoc}
`;
export type RejectProspectMutationFn = Apollo.MutationFunction<
  RejectProspectMutation,
  RejectProspectMutationVariables
>;

/**
 * __useRejectProspectMutation__
 *
 * To run a mutation, you first call `useRejectProspectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectProspectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectProspectMutation, { data, loading, error }] = useRejectProspectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRejectProspectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RejectProspectMutation,
    RejectProspectMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RejectProspectMutation,
    RejectProspectMutationVariables
  >(RejectProspectDocument, options);
}
export type RejectProspectMutationHookResult = ReturnType<
  typeof useRejectProspectMutation
>;
export type RejectProspectMutationResult =
  Apollo.MutationResult<RejectProspectMutation>;
export type RejectProspectMutationOptions = Apollo.BaseMutationOptions<
  RejectProspectMutation,
  RejectProspectMutationVariables
>;
export const UpdateApprovedCuratedCorpusItemDocument = gql`
  mutation updateApprovedCuratedCorpusItem(
    $data: UpdateApprovedCuratedCorpusItemInput!
  ) {
    updateApprovedCuratedCorpusItem(data: $data) {
      ...CuratedItemData
    }
  }
  ${CuratedItemDataFragmentDoc}
`;
export type UpdateApprovedCuratedCorpusItemMutationFn = Apollo.MutationFunction<
  UpdateApprovedCuratedCorpusItemMutation,
  UpdateApprovedCuratedCorpusItemMutationVariables
>;

/**
 * __useUpdateApprovedCuratedCorpusItemMutation__
 *
 * To run a mutation, you first call `useUpdateApprovedCuratedCorpusItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateApprovedCuratedCorpusItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateApprovedCuratedCorpusItemMutation, { data, loading, error }] = useUpdateApprovedCuratedCorpusItemMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateApprovedCuratedCorpusItemMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateApprovedCuratedCorpusItemMutation,
    UpdateApprovedCuratedCorpusItemMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateApprovedCuratedCorpusItemMutation,
    UpdateApprovedCuratedCorpusItemMutationVariables
  >(UpdateApprovedCuratedCorpusItemDocument, options);
}
export type UpdateApprovedCuratedCorpusItemMutationHookResult = ReturnType<
  typeof useUpdateApprovedCuratedCorpusItemMutation
>;
export type UpdateApprovedCuratedCorpusItemMutationResult =
  Apollo.MutationResult<UpdateApprovedCuratedCorpusItemMutation>;
export type UpdateApprovedCuratedCorpusItemMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateApprovedCuratedCorpusItemMutation,
    UpdateApprovedCuratedCorpusItemMutationVariables
  >;
export const UpdateCollectionDocument = gql`
  mutation updateCollection(
    $externalId: String
    $title: String!
    $slug: String!
    $excerpt: Markdown!
    $intro: Markdown
    $status: CollectionStatus!
    $authorExternalId: String!
    $curationCategoryExternalId: String
    $IABParentCategoryExternalId: String
    $IABChildCategoryExternalId: String
    $language: String!
    $imageUrl: Url
  ) {
    updateCollection(
      data: {
        externalId: $externalId
        title: $title
        slug: $slug
        excerpt: $excerpt
        intro: $intro
        status: $status
        authorExternalId: $authorExternalId
        curationCategoryExternalId: $curationCategoryExternalId
        IABParentCategoryExternalId: $IABParentCategoryExternalId
        IABChildCategoryExternalId: $IABChildCategoryExternalId
        language: $language
        imageUrl: $imageUrl
      }
    ) {
      ...CollectionData
    }
  }
  ${CollectionDataFragmentDoc}
`;
export type UpdateCollectionMutationFn = Apollo.MutationFunction<
  UpdateCollectionMutation,
  UpdateCollectionMutationVariables
>;

/**
 * __useUpdateCollectionMutation__
 *
 * To run a mutation, you first call `useUpdateCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCollectionMutation, { data, loading, error }] = useUpdateCollectionMutation({
 *   variables: {
 *      externalId: // value for 'externalId'
 *      title: // value for 'title'
 *      slug: // value for 'slug'
 *      excerpt: // value for 'excerpt'
 *      intro: // value for 'intro'
 *      status: // value for 'status'
 *      authorExternalId: // value for 'authorExternalId'
 *      curationCategoryExternalId: // value for 'curationCategoryExternalId'
 *      IABParentCategoryExternalId: // value for 'IABParentCategoryExternalId'
 *      IABChildCategoryExternalId: // value for 'IABChildCategoryExternalId'
 *      language: // value for 'language'
 *      imageUrl: // value for 'imageUrl'
 *   },
 * });
 */
export function useUpdateCollectionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCollectionMutation,
    UpdateCollectionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCollectionMutation,
    UpdateCollectionMutationVariables
  >(UpdateCollectionDocument, options);
}
export type UpdateCollectionMutationHookResult = ReturnType<
  typeof useUpdateCollectionMutation
>;
export type UpdateCollectionMutationResult =
  Apollo.MutationResult<UpdateCollectionMutation>;
export type UpdateCollectionMutationOptions = Apollo.BaseMutationOptions<
  UpdateCollectionMutation,
  UpdateCollectionMutationVariables
>;
export const UpdateCollectionAuthorDocument = gql`
  mutation updateCollectionAuthor(
    $externalId: String!
    $name: String!
    $slug: String!
    $bio: Markdown
    $imageUrl: Url
    $active: Boolean
  ) {
    updateCollectionAuthor(
      data: {
        externalId: $externalId
        name: $name
        slug: $slug
        bio: $bio
        imageUrl: $imageUrl
        active: $active
      }
    ) {
      ...CollectionAuthorData
    }
  }
  ${CollectionAuthorDataFragmentDoc}
`;
export type UpdateCollectionAuthorMutationFn = Apollo.MutationFunction<
  UpdateCollectionAuthorMutation,
  UpdateCollectionAuthorMutationVariables
>;

/**
 * __useUpdateCollectionAuthorMutation__
 *
 * To run a mutation, you first call `useUpdateCollectionAuthorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCollectionAuthorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCollectionAuthorMutation, { data, loading, error }] = useUpdateCollectionAuthorMutation({
 *   variables: {
 *      externalId: // value for 'externalId'
 *      name: // value for 'name'
 *      slug: // value for 'slug'
 *      bio: // value for 'bio'
 *      imageUrl: // value for 'imageUrl'
 *      active: // value for 'active'
 *   },
 * });
 */
export function useUpdateCollectionAuthorMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCollectionAuthorMutation,
    UpdateCollectionAuthorMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCollectionAuthorMutation,
    UpdateCollectionAuthorMutationVariables
  >(UpdateCollectionAuthorDocument, options);
}
export type UpdateCollectionAuthorMutationHookResult = ReturnType<
  typeof useUpdateCollectionAuthorMutation
>;
export type UpdateCollectionAuthorMutationResult =
  Apollo.MutationResult<UpdateCollectionAuthorMutation>;
export type UpdateCollectionAuthorMutationOptions = Apollo.BaseMutationOptions<
  UpdateCollectionAuthorMutation,
  UpdateCollectionAuthorMutationVariables
>;
export const UpdateCollectionAuthorImageUrlDocument = gql`
  mutation updateCollectionAuthorImageUrl(
    $externalId: String!
    $imageUrl: Url!
  ) {
    updateCollectionAuthorImageUrl(
      data: { externalId: $externalId, imageUrl: $imageUrl }
    ) {
      ...CollectionAuthorData
    }
  }
  ${CollectionAuthorDataFragmentDoc}
`;
export type UpdateCollectionAuthorImageUrlMutationFn = Apollo.MutationFunction<
  UpdateCollectionAuthorImageUrlMutation,
  UpdateCollectionAuthorImageUrlMutationVariables
>;

/**
 * __useUpdateCollectionAuthorImageUrlMutation__
 *
 * To run a mutation, you first call `useUpdateCollectionAuthorImageUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCollectionAuthorImageUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCollectionAuthorImageUrlMutation, { data, loading, error }] = useUpdateCollectionAuthorImageUrlMutation({
 *   variables: {
 *      externalId: // value for 'externalId'
 *      imageUrl: // value for 'imageUrl'
 *   },
 * });
 */
export function useUpdateCollectionAuthorImageUrlMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCollectionAuthorImageUrlMutation,
    UpdateCollectionAuthorImageUrlMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCollectionAuthorImageUrlMutation,
    UpdateCollectionAuthorImageUrlMutationVariables
  >(UpdateCollectionAuthorImageUrlDocument, options);
}
export type UpdateCollectionAuthorImageUrlMutationHookResult = ReturnType<
  typeof useUpdateCollectionAuthorImageUrlMutation
>;
export type UpdateCollectionAuthorImageUrlMutationResult =
  Apollo.MutationResult<UpdateCollectionAuthorImageUrlMutation>;
export type UpdateCollectionAuthorImageUrlMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateCollectionAuthorImageUrlMutation,
    UpdateCollectionAuthorImageUrlMutationVariables
  >;
export const UpdateCollectionImageUrlDocument = gql`
  mutation updateCollectionImageUrl($externalId: String!, $imageUrl: Url!) {
    updateCollectionImageUrl(
      data: { externalId: $externalId, imageUrl: $imageUrl }
    ) {
      ...CollectionData
    }
  }
  ${CollectionDataFragmentDoc}
`;
export type UpdateCollectionImageUrlMutationFn = Apollo.MutationFunction<
  UpdateCollectionImageUrlMutation,
  UpdateCollectionImageUrlMutationVariables
>;

/**
 * __useUpdateCollectionImageUrlMutation__
 *
 * To run a mutation, you first call `useUpdateCollectionImageUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCollectionImageUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCollectionImageUrlMutation, { data, loading, error }] = useUpdateCollectionImageUrlMutation({
 *   variables: {
 *      externalId: // value for 'externalId'
 *      imageUrl: // value for 'imageUrl'
 *   },
 * });
 */
export function useUpdateCollectionImageUrlMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCollectionImageUrlMutation,
    UpdateCollectionImageUrlMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCollectionImageUrlMutation,
    UpdateCollectionImageUrlMutationVariables
  >(UpdateCollectionImageUrlDocument, options);
}
export type UpdateCollectionImageUrlMutationHookResult = ReturnType<
  typeof useUpdateCollectionImageUrlMutation
>;
export type UpdateCollectionImageUrlMutationResult =
  Apollo.MutationResult<UpdateCollectionImageUrlMutation>;
export type UpdateCollectionImageUrlMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateCollectionImageUrlMutation,
    UpdateCollectionImageUrlMutationVariables
  >;
export const UpdateCollectionPartnerDocument = gql`
  mutation updateCollectionPartner(
    $externalId: String!
    $name: String!
    $url: Url!
    $blurb: Markdown!
    $imageUrl: Url
  ) {
    updateCollectionPartner(
      data: {
        externalId: $externalId
        name: $name
        url: $url
        blurb: $blurb
        imageUrl: $imageUrl
      }
    ) {
      ...CollectionPartnerData
    }
  }
  ${CollectionPartnerDataFragmentDoc}
`;
export type UpdateCollectionPartnerMutationFn = Apollo.MutationFunction<
  UpdateCollectionPartnerMutation,
  UpdateCollectionPartnerMutationVariables
>;

/**
 * __useUpdateCollectionPartnerMutation__
 *
 * To run a mutation, you first call `useUpdateCollectionPartnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCollectionPartnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCollectionPartnerMutation, { data, loading, error }] = useUpdateCollectionPartnerMutation({
 *   variables: {
 *      externalId: // value for 'externalId'
 *      name: // value for 'name'
 *      url: // value for 'url'
 *      blurb: // value for 'blurb'
 *      imageUrl: // value for 'imageUrl'
 *   },
 * });
 */
export function useUpdateCollectionPartnerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCollectionPartnerMutation,
    UpdateCollectionPartnerMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCollectionPartnerMutation,
    UpdateCollectionPartnerMutationVariables
  >(UpdateCollectionPartnerDocument, options);
}
export type UpdateCollectionPartnerMutationHookResult = ReturnType<
  typeof useUpdateCollectionPartnerMutation
>;
export type UpdateCollectionPartnerMutationResult =
  Apollo.MutationResult<UpdateCollectionPartnerMutation>;
export type UpdateCollectionPartnerMutationOptions = Apollo.BaseMutationOptions<
  UpdateCollectionPartnerMutation,
  UpdateCollectionPartnerMutationVariables
>;
export const UpdateCollectionPartnerAssociationDocument = gql`
  mutation updateCollectionPartnerAssociation(
    $externalId: String!
    $type: CollectionPartnershipType!
    $partnerExternalId: String!
    $name: String
    $url: Url
    $imageUrl: Url
    $blurb: Markdown
  ) {
    updateCollectionPartnerAssociation(
      data: {
        externalId: $externalId
        type: $type
        partnerExternalId: $partnerExternalId
        name: $name
        url: $url
        imageUrl: $imageUrl
        blurb: $blurb
      }
    ) {
      ...CollectionPartnerAssociationData
    }
  }
  ${CollectionPartnerAssociationDataFragmentDoc}
`;
export type UpdateCollectionPartnerAssociationMutationFn =
  Apollo.MutationFunction<
    UpdateCollectionPartnerAssociationMutation,
    UpdateCollectionPartnerAssociationMutationVariables
  >;

/**
 * __useUpdateCollectionPartnerAssociationMutation__
 *
 * To run a mutation, you first call `useUpdateCollectionPartnerAssociationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCollectionPartnerAssociationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCollectionPartnerAssociationMutation, { data, loading, error }] = useUpdateCollectionPartnerAssociationMutation({
 *   variables: {
 *      externalId: // value for 'externalId'
 *      type: // value for 'type'
 *      partnerExternalId: // value for 'partnerExternalId'
 *      name: // value for 'name'
 *      url: // value for 'url'
 *      imageUrl: // value for 'imageUrl'
 *      blurb: // value for 'blurb'
 *   },
 * });
 */
export function useUpdateCollectionPartnerAssociationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCollectionPartnerAssociationMutation,
    UpdateCollectionPartnerAssociationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCollectionPartnerAssociationMutation,
    UpdateCollectionPartnerAssociationMutationVariables
  >(UpdateCollectionPartnerAssociationDocument, options);
}
export type UpdateCollectionPartnerAssociationMutationHookResult = ReturnType<
  typeof useUpdateCollectionPartnerAssociationMutation
>;
export type UpdateCollectionPartnerAssociationMutationResult =
  Apollo.MutationResult<UpdateCollectionPartnerAssociationMutation>;
export type UpdateCollectionPartnerAssociationMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateCollectionPartnerAssociationMutation,
    UpdateCollectionPartnerAssociationMutationVariables
  >;
export const UpdateCollectionPartnerAssociationImageUrlDocument = gql`
  mutation updateCollectionPartnerAssociationImageUrl(
    $externalId: String!
    $imageUrl: Url!
  ) {
    updateCollectionPartnerAssociationImageUrl(
      data: { externalId: $externalId, imageUrl: $imageUrl }
    ) {
      ...CollectionPartnerAssociationData
    }
  }
  ${CollectionPartnerAssociationDataFragmentDoc}
`;
export type UpdateCollectionPartnerAssociationImageUrlMutationFn =
  Apollo.MutationFunction<
    UpdateCollectionPartnerAssociationImageUrlMutation,
    UpdateCollectionPartnerAssociationImageUrlMutationVariables
  >;

/**
 * __useUpdateCollectionPartnerAssociationImageUrlMutation__
 *
 * To run a mutation, you first call `useUpdateCollectionPartnerAssociationImageUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCollectionPartnerAssociationImageUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCollectionPartnerAssociationImageUrlMutation, { data, loading, error }] = useUpdateCollectionPartnerAssociationImageUrlMutation({
 *   variables: {
 *      externalId: // value for 'externalId'
 *      imageUrl: // value for 'imageUrl'
 *   },
 * });
 */
export function useUpdateCollectionPartnerAssociationImageUrlMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCollectionPartnerAssociationImageUrlMutation,
    UpdateCollectionPartnerAssociationImageUrlMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCollectionPartnerAssociationImageUrlMutation,
    UpdateCollectionPartnerAssociationImageUrlMutationVariables
  >(UpdateCollectionPartnerAssociationImageUrlDocument, options);
}
export type UpdateCollectionPartnerAssociationImageUrlMutationHookResult =
  ReturnType<typeof useUpdateCollectionPartnerAssociationImageUrlMutation>;
export type UpdateCollectionPartnerAssociationImageUrlMutationResult =
  Apollo.MutationResult<UpdateCollectionPartnerAssociationImageUrlMutation>;
export type UpdateCollectionPartnerAssociationImageUrlMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateCollectionPartnerAssociationImageUrlMutation,
    UpdateCollectionPartnerAssociationImageUrlMutationVariables
  >;
export const UpdateCollectionPartnerImageUrlDocument = gql`
  mutation updateCollectionPartnerImageUrl(
    $externalId: String!
    $imageUrl: Url!
  ) {
    updateCollectionPartnerImageUrl(
      data: { externalId: $externalId, imageUrl: $imageUrl }
    ) {
      ...CollectionPartnerData
    }
  }
  ${CollectionPartnerDataFragmentDoc}
`;
export type UpdateCollectionPartnerImageUrlMutationFn = Apollo.MutationFunction<
  UpdateCollectionPartnerImageUrlMutation,
  UpdateCollectionPartnerImageUrlMutationVariables
>;

/**
 * __useUpdateCollectionPartnerImageUrlMutation__
 *
 * To run a mutation, you first call `useUpdateCollectionPartnerImageUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCollectionPartnerImageUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCollectionPartnerImageUrlMutation, { data, loading, error }] = useUpdateCollectionPartnerImageUrlMutation({
 *   variables: {
 *      externalId: // value for 'externalId'
 *      imageUrl: // value for 'imageUrl'
 *   },
 * });
 */
export function useUpdateCollectionPartnerImageUrlMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCollectionPartnerImageUrlMutation,
    UpdateCollectionPartnerImageUrlMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCollectionPartnerImageUrlMutation,
    UpdateCollectionPartnerImageUrlMutationVariables
  >(UpdateCollectionPartnerImageUrlDocument, options);
}
export type UpdateCollectionPartnerImageUrlMutationHookResult = ReturnType<
  typeof useUpdateCollectionPartnerImageUrlMutation
>;
export type UpdateCollectionPartnerImageUrlMutationResult =
  Apollo.MutationResult<UpdateCollectionPartnerImageUrlMutation>;
export type UpdateCollectionPartnerImageUrlMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateCollectionPartnerImageUrlMutation,
    UpdateCollectionPartnerImageUrlMutationVariables
  >;
export const UpdateCollectionStoryDocument = gql`
  mutation updateCollectionStory(
    $externalId: String!
    $url: Url!
    $title: String!
    $excerpt: Markdown!
    $imageUrl: Url!
    $authors: [CollectionStoryAuthorInput!]!
    $publisher: String!
    $sortOrder: Int
    $fromPartner: Boolean
  ) {
    updateCollectionStory(
      data: {
        externalId: $externalId
        url: $url
        title: $title
        excerpt: $excerpt
        imageUrl: $imageUrl
        authors: $authors
        publisher: $publisher
        sortOrder: $sortOrder
        fromPartner: $fromPartner
      }
    ) {
      ...CollectionStoryData
    }
  }
  ${CollectionStoryDataFragmentDoc}
`;
export type UpdateCollectionStoryMutationFn = Apollo.MutationFunction<
  UpdateCollectionStoryMutation,
  UpdateCollectionStoryMutationVariables
>;

/**
 * __useUpdateCollectionStoryMutation__
 *
 * To run a mutation, you first call `useUpdateCollectionStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCollectionStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCollectionStoryMutation, { data, loading, error }] = useUpdateCollectionStoryMutation({
 *   variables: {
 *      externalId: // value for 'externalId'
 *      url: // value for 'url'
 *      title: // value for 'title'
 *      excerpt: // value for 'excerpt'
 *      imageUrl: // value for 'imageUrl'
 *      authors: // value for 'authors'
 *      publisher: // value for 'publisher'
 *      sortOrder: // value for 'sortOrder'
 *      fromPartner: // value for 'fromPartner'
 *   },
 * });
 */
export function useUpdateCollectionStoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCollectionStoryMutation,
    UpdateCollectionStoryMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCollectionStoryMutation,
    UpdateCollectionStoryMutationVariables
  >(UpdateCollectionStoryDocument, options);
}
export type UpdateCollectionStoryMutationHookResult = ReturnType<
  typeof useUpdateCollectionStoryMutation
>;
export type UpdateCollectionStoryMutationResult =
  Apollo.MutationResult<UpdateCollectionStoryMutation>;
export type UpdateCollectionStoryMutationOptions = Apollo.BaseMutationOptions<
  UpdateCollectionStoryMutation,
  UpdateCollectionStoryMutationVariables
>;
export const UpdateCollectionStoryImageUrlDocument = gql`
  mutation updateCollectionStoryImageUrl(
    $externalId: String!
    $imageUrl: Url!
  ) {
    updateCollectionStoryImageUrl(
      data: { externalId: $externalId, imageUrl: $imageUrl }
    ) {
      ...CollectionStoryData
    }
  }
  ${CollectionStoryDataFragmentDoc}
`;
export type UpdateCollectionStoryImageUrlMutationFn = Apollo.MutationFunction<
  UpdateCollectionStoryImageUrlMutation,
  UpdateCollectionStoryImageUrlMutationVariables
>;

/**
 * __useUpdateCollectionStoryImageUrlMutation__
 *
 * To run a mutation, you first call `useUpdateCollectionStoryImageUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCollectionStoryImageUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCollectionStoryImageUrlMutation, { data, loading, error }] = useUpdateCollectionStoryImageUrlMutation({
 *   variables: {
 *      externalId: // value for 'externalId'
 *      imageUrl: // value for 'imageUrl'
 *   },
 * });
 */
export function useUpdateCollectionStoryImageUrlMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCollectionStoryImageUrlMutation,
    UpdateCollectionStoryImageUrlMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCollectionStoryImageUrlMutation,
    UpdateCollectionStoryImageUrlMutationVariables
  >(UpdateCollectionStoryImageUrlDocument, options);
}
export type UpdateCollectionStoryImageUrlMutationHookResult = ReturnType<
  typeof useUpdateCollectionStoryImageUrlMutation
>;
export type UpdateCollectionStoryImageUrlMutationResult =
  Apollo.MutationResult<UpdateCollectionStoryImageUrlMutation>;
export type UpdateCollectionStoryImageUrlMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateCollectionStoryImageUrlMutation,
    UpdateCollectionStoryImageUrlMutationVariables
  >;
export const UpdateCollectionStorySortOrderDocument = gql`
  mutation updateCollectionStorySortOrder(
    $externalId: String!
    $sortOrder: Int!
  ) {
    updateCollectionStorySortOrder(
      data: { externalId: $externalId, sortOrder: $sortOrder }
    ) {
      ...CollectionStoryData
    }
  }
  ${CollectionStoryDataFragmentDoc}
`;
export type UpdateCollectionStorySortOrderMutationFn = Apollo.MutationFunction<
  UpdateCollectionStorySortOrderMutation,
  UpdateCollectionStorySortOrderMutationVariables
>;

/**
 * __useUpdateCollectionStorySortOrderMutation__
 *
 * To run a mutation, you first call `useUpdateCollectionStorySortOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCollectionStorySortOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCollectionStorySortOrderMutation, { data, loading, error }] = useUpdateCollectionStorySortOrderMutation({
 *   variables: {
 *      externalId: // value for 'externalId'
 *      sortOrder: // value for 'sortOrder'
 *   },
 * });
 */
export function useUpdateCollectionStorySortOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCollectionStorySortOrderMutation,
    UpdateCollectionStorySortOrderMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCollectionStorySortOrderMutation,
    UpdateCollectionStorySortOrderMutationVariables
  >(UpdateCollectionStorySortOrderDocument, options);
}
export type UpdateCollectionStorySortOrderMutationHookResult = ReturnType<
  typeof useUpdateCollectionStorySortOrderMutation
>;
export type UpdateCollectionStorySortOrderMutationResult =
  Apollo.MutationResult<UpdateCollectionStorySortOrderMutation>;
export type UpdateCollectionStorySortOrderMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateCollectionStorySortOrderMutation,
    UpdateCollectionStorySortOrderMutationVariables
  >;
export const UpdateProspectAsCuratedDocument = gql`
  mutation updateProspectAsCurated($prospectId: ID!) {
    updateProspectAsCurated(prospectId: $prospectId) {
      ...ProspectData
    }
  }
  ${ProspectDataFragmentDoc}
`;
export type UpdateProspectAsCuratedMutationFn = Apollo.MutationFunction<
  UpdateProspectAsCuratedMutation,
  UpdateProspectAsCuratedMutationVariables
>;

/**
 * __useUpdateProspectAsCuratedMutation__
 *
 * To run a mutation, you first call `useUpdateProspectAsCuratedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProspectAsCuratedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProspectAsCuratedMutation, { data, loading, error }] = useUpdateProspectAsCuratedMutation({
 *   variables: {
 *      prospectId: // value for 'prospectId'
 *   },
 * });
 */
export function useUpdateProspectAsCuratedMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProspectAsCuratedMutation,
    UpdateProspectAsCuratedMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateProspectAsCuratedMutation,
    UpdateProspectAsCuratedMutationVariables
  >(UpdateProspectAsCuratedDocument, options);
}
export type UpdateProspectAsCuratedMutationHookResult = ReturnType<
  typeof useUpdateProspectAsCuratedMutation
>;
export type UpdateProspectAsCuratedMutationResult =
  Apollo.MutationResult<UpdateProspectAsCuratedMutation>;
export type UpdateProspectAsCuratedMutationOptions = Apollo.BaseMutationOptions<
  UpdateProspectAsCuratedMutation,
  UpdateProspectAsCuratedMutationVariables
>;
export const UploadApprovedCuratedCorpusItemImageDocument = gql`
  mutation uploadApprovedCuratedCorpusItemImage($image: Upload!) {
    uploadApprovedCuratedCorpusItemImage(data: $image) {
      url
    }
  }
`;
export type UploadApprovedCuratedCorpusItemImageMutationFn =
  Apollo.MutationFunction<
    UploadApprovedCuratedCorpusItemImageMutation,
    UploadApprovedCuratedCorpusItemImageMutationVariables
  >;

/**
 * __useUploadApprovedCuratedCorpusItemImageMutation__
 *
 * To run a mutation, you first call `useUploadApprovedCuratedCorpusItemImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadApprovedCuratedCorpusItemImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadApprovedCuratedCorpusItemImageMutation, { data, loading, error }] = useUploadApprovedCuratedCorpusItemImageMutation({
 *   variables: {
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUploadApprovedCuratedCorpusItemImageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UploadApprovedCuratedCorpusItemImageMutation,
    UploadApprovedCuratedCorpusItemImageMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UploadApprovedCuratedCorpusItemImageMutation,
    UploadApprovedCuratedCorpusItemImageMutationVariables
  >(UploadApprovedCuratedCorpusItemImageDocument, options);
}
export type UploadApprovedCuratedCorpusItemImageMutationHookResult = ReturnType<
  typeof useUploadApprovedCuratedCorpusItemImageMutation
>;
export type UploadApprovedCuratedCorpusItemImageMutationResult =
  Apollo.MutationResult<UploadApprovedCuratedCorpusItemImageMutation>;
export type UploadApprovedCuratedCorpusItemImageMutationOptions =
  Apollo.BaseMutationOptions<
    UploadApprovedCuratedCorpusItemImageMutation,
    UploadApprovedCuratedCorpusItemImageMutationVariables
  >;
export const GetApprovedItemByUrlDocument = gql`
  query getApprovedItemByUrl($url: String!) {
    getApprovedCuratedCorpusItemByUrl(url: $url) {
      ...CuratedItemData
    }
  }
  ${CuratedItemDataFragmentDoc}
`;

/**
 * __useGetApprovedItemByUrlQuery__
 *
 * To run a query within a React component, call `useGetApprovedItemByUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetApprovedItemByUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetApprovedItemByUrlQuery({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useGetApprovedItemByUrlQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetApprovedItemByUrlQuery,
    GetApprovedItemByUrlQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetApprovedItemByUrlQuery,
    GetApprovedItemByUrlQueryVariables
  >(GetApprovedItemByUrlDocument, options);
}
export function useGetApprovedItemByUrlLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetApprovedItemByUrlQuery,
    GetApprovedItemByUrlQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetApprovedItemByUrlQuery,
    GetApprovedItemByUrlQueryVariables
  >(GetApprovedItemByUrlDocument, options);
}
export type GetApprovedItemByUrlQueryHookResult = ReturnType<
  typeof useGetApprovedItemByUrlQuery
>;
export type GetApprovedItemByUrlLazyQueryHookResult = ReturnType<
  typeof useGetApprovedItemByUrlLazyQuery
>;
export type GetApprovedItemByUrlQueryResult = Apollo.QueryResult<
  GetApprovedItemByUrlQuery,
  GetApprovedItemByUrlQueryVariables
>;
export const GetApprovedItemsDocument = gql`
  query getApprovedItems(
    $filters: ApprovedCuratedCorpusItemFilter
    $pagination: PaginationInput
  ) {
    getApprovedCuratedCorpusItems(filters: $filters, pagination: $pagination) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          ...CuratedItemData
        }
      }
    }
  }
  ${CuratedItemDataFragmentDoc}
`;

/**
 * __useGetApprovedItemsQuery__
 *
 * To run a query within a React component, call `useGetApprovedItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetApprovedItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetApprovedItemsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetApprovedItemsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetApprovedItemsQuery,
    GetApprovedItemsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetApprovedItemsQuery, GetApprovedItemsQueryVariables>(
    GetApprovedItemsDocument,
    options
  );
}
export function useGetApprovedItemsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetApprovedItemsQuery,
    GetApprovedItemsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetApprovedItemsQuery,
    GetApprovedItemsQueryVariables
  >(GetApprovedItemsDocument, options);
}
export type GetApprovedItemsQueryHookResult = ReturnType<
  typeof useGetApprovedItemsQuery
>;
export type GetApprovedItemsLazyQueryHookResult = ReturnType<
  typeof useGetApprovedItemsLazyQuery
>;
export type GetApprovedItemsQueryResult = Apollo.QueryResult<
  GetApprovedItemsQuery,
  GetApprovedItemsQueryVariables
>;
export const GetAuthorByIdDocument = gql`
  query getAuthorById($id: String!) {
    getCollectionAuthor(externalId: $id) {
      ...CollectionAuthorData
    }
  }
  ${CollectionAuthorDataFragmentDoc}
`;

/**
 * __useGetAuthorByIdQuery__
 *
 * To run a query within a React component, call `useGetAuthorByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthorByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthorByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAuthorByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAuthorByIdQuery,
    GetAuthorByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAuthorByIdQuery, GetAuthorByIdQueryVariables>(
    GetAuthorByIdDocument,
    options
  );
}
export function useGetAuthorByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAuthorByIdQuery,
    GetAuthorByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAuthorByIdQuery, GetAuthorByIdQueryVariables>(
    GetAuthorByIdDocument,
    options
  );
}
export type GetAuthorByIdQueryHookResult = ReturnType<
  typeof useGetAuthorByIdQuery
>;
export type GetAuthorByIdLazyQueryHookResult = ReturnType<
  typeof useGetAuthorByIdLazyQuery
>;
export type GetAuthorByIdQueryResult = Apollo.QueryResult<
  GetAuthorByIdQuery,
  GetAuthorByIdQueryVariables
>;
export const GetAuthorsDocument = gql`
  query getAuthors($page: Int, $perPage: Int) {
    getCollectionAuthors(page: $page, perPage: $perPage) {
      authors {
        ...CollectionAuthorData
      }
      pagination {
        currentPage
        totalPages
        totalResults
      }
    }
  }
  ${CollectionAuthorDataFragmentDoc}
`;

/**
 * __useGetAuthorsQuery__
 *
 * To run a query within a React component, call `useGetAuthorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthorsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useGetAuthorsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAuthorsQuery,
    GetAuthorsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAuthorsQuery, GetAuthorsQueryVariables>(
    GetAuthorsDocument,
    options
  );
}
export function useGetAuthorsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAuthorsQuery,
    GetAuthorsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAuthorsQuery, GetAuthorsQueryVariables>(
    GetAuthorsDocument,
    options
  );
}
export type GetAuthorsQueryHookResult = ReturnType<typeof useGetAuthorsQuery>;
export type GetAuthorsLazyQueryHookResult = ReturnType<
  typeof useGetAuthorsLazyQuery
>;
export type GetAuthorsQueryResult = Apollo.QueryResult<
  GetAuthorsQuery,
  GetAuthorsQueryVariables
>;
export const GetCollectionByExternalIdDocument = gql`
  query getCollectionByExternalId($externalId: String!) {
    getCollection(externalId: $externalId) {
      ...CollectionData
    }
  }
  ${CollectionDataFragmentDoc}
`;

/**
 * __useGetCollectionByExternalIdQuery__
 *
 * To run a query within a React component, call `useGetCollectionByExternalIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollectionByExternalIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollectionByExternalIdQuery({
 *   variables: {
 *      externalId: // value for 'externalId'
 *   },
 * });
 */
export function useGetCollectionByExternalIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCollectionByExternalIdQuery,
    GetCollectionByExternalIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCollectionByExternalIdQuery,
    GetCollectionByExternalIdQueryVariables
  >(GetCollectionByExternalIdDocument, options);
}
export function useGetCollectionByExternalIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCollectionByExternalIdQuery,
    GetCollectionByExternalIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCollectionByExternalIdQuery,
    GetCollectionByExternalIdQueryVariables
  >(GetCollectionByExternalIdDocument, options);
}
export type GetCollectionByExternalIdQueryHookResult = ReturnType<
  typeof useGetCollectionByExternalIdQuery
>;
export type GetCollectionByExternalIdLazyQueryHookResult = ReturnType<
  typeof useGetCollectionByExternalIdLazyQuery
>;
export type GetCollectionByExternalIdQueryResult = Apollo.QueryResult<
  GetCollectionByExternalIdQuery,
  GetCollectionByExternalIdQueryVariables
>;
export const GetCollectionPartnerDocument = gql`
  query getCollectionPartner($id: String!) {
    getCollectionPartner(externalId: $id) {
      ...CollectionPartnerData
    }
  }
  ${CollectionPartnerDataFragmentDoc}
`;

/**
 * __useGetCollectionPartnerQuery__
 *
 * To run a query within a React component, call `useGetCollectionPartnerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollectionPartnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollectionPartnerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCollectionPartnerQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCollectionPartnerQuery,
    GetCollectionPartnerQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCollectionPartnerQuery,
    GetCollectionPartnerQueryVariables
  >(GetCollectionPartnerDocument, options);
}
export function useGetCollectionPartnerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCollectionPartnerQuery,
    GetCollectionPartnerQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCollectionPartnerQuery,
    GetCollectionPartnerQueryVariables
  >(GetCollectionPartnerDocument, options);
}
export type GetCollectionPartnerQueryHookResult = ReturnType<
  typeof useGetCollectionPartnerQuery
>;
export type GetCollectionPartnerLazyQueryHookResult = ReturnType<
  typeof useGetCollectionPartnerLazyQuery
>;
export type GetCollectionPartnerQueryResult = Apollo.QueryResult<
  GetCollectionPartnerQuery,
  GetCollectionPartnerQueryVariables
>;
export const GetCollectionPartnerAssociationDocument = gql`
  query getCollectionPartnerAssociation($externalId: String!) {
    getCollectionPartnerAssociationForCollection(externalId: $externalId) {
      ...CollectionPartnerAssociationData
    }
  }
  ${CollectionPartnerAssociationDataFragmentDoc}
`;

/**
 * __useGetCollectionPartnerAssociationQuery__
 *
 * To run a query within a React component, call `useGetCollectionPartnerAssociationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollectionPartnerAssociationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollectionPartnerAssociationQuery({
 *   variables: {
 *      externalId: // value for 'externalId'
 *   },
 * });
 */
export function useGetCollectionPartnerAssociationQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCollectionPartnerAssociationQuery,
    GetCollectionPartnerAssociationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCollectionPartnerAssociationQuery,
    GetCollectionPartnerAssociationQueryVariables
  >(GetCollectionPartnerAssociationDocument, options);
}
export function useGetCollectionPartnerAssociationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCollectionPartnerAssociationQuery,
    GetCollectionPartnerAssociationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCollectionPartnerAssociationQuery,
    GetCollectionPartnerAssociationQueryVariables
  >(GetCollectionPartnerAssociationDocument, options);
}
export type GetCollectionPartnerAssociationQueryHookResult = ReturnType<
  typeof useGetCollectionPartnerAssociationQuery
>;
export type GetCollectionPartnerAssociationLazyQueryHookResult = ReturnType<
  typeof useGetCollectionPartnerAssociationLazyQuery
>;
export type GetCollectionPartnerAssociationQueryResult = Apollo.QueryResult<
  GetCollectionPartnerAssociationQuery,
  GetCollectionPartnerAssociationQueryVariables
>;
export const GetCollectionPartnersDocument = gql`
  query getCollectionPartners($page: Int, $perPage: Int) {
    getCollectionPartners(page: $page, perPage: $perPage) {
      partners {
        ...CollectionPartnerData
      }
      pagination {
        currentPage
        totalPages
        totalResults
      }
    }
  }
  ${CollectionPartnerDataFragmentDoc}
`;

/**
 * __useGetCollectionPartnersQuery__
 *
 * To run a query within a React component, call `useGetCollectionPartnersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollectionPartnersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollectionPartnersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useGetCollectionPartnersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCollectionPartnersQuery,
    GetCollectionPartnersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCollectionPartnersQuery,
    GetCollectionPartnersQueryVariables
  >(GetCollectionPartnersDocument, options);
}
export function useGetCollectionPartnersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCollectionPartnersQuery,
    GetCollectionPartnersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCollectionPartnersQuery,
    GetCollectionPartnersQueryVariables
  >(GetCollectionPartnersDocument, options);
}
export type GetCollectionPartnersQueryHookResult = ReturnType<
  typeof useGetCollectionPartnersQuery
>;
export type GetCollectionPartnersLazyQueryHookResult = ReturnType<
  typeof useGetCollectionPartnersLazyQuery
>;
export type GetCollectionPartnersQueryResult = Apollo.QueryResult<
  GetCollectionPartnersQuery,
  GetCollectionPartnersQueryVariables
>;
export const GetCollectionStoriesDocument = gql`
  query getCollectionStories($id: String!) {
    getCollection(externalId: $id) {
      externalId
      stories {
        ...CollectionStoryData
      }
    }
  }
  ${CollectionStoryDataFragmentDoc}
`;

/**
 * __useGetCollectionStoriesQuery__
 *
 * To run a query within a React component, call `useGetCollectionStoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollectionStoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollectionStoriesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCollectionStoriesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCollectionStoriesQuery,
    GetCollectionStoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCollectionStoriesQuery,
    GetCollectionStoriesQueryVariables
  >(GetCollectionStoriesDocument, options);
}
export function useGetCollectionStoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCollectionStoriesQuery,
    GetCollectionStoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCollectionStoriesQuery,
    GetCollectionStoriesQueryVariables
  >(GetCollectionStoriesDocument, options);
}
export type GetCollectionStoriesQueryHookResult = ReturnType<
  typeof useGetCollectionStoriesQuery
>;
export type GetCollectionStoriesLazyQueryHookResult = ReturnType<
  typeof useGetCollectionStoriesLazyQuery
>;
export type GetCollectionStoriesQueryResult = Apollo.QueryResult<
  GetCollectionStoriesQuery,
  GetCollectionStoriesQueryVariables
>;
export const GetCollectionsDocument = gql`
  query getCollections(
    $page: Int!
    $perPage: Int!
    $status: CollectionStatus!
  ) {
    searchCollections(
      filters: { status: $status }
      page: $page
      perPage: $perPage
    ) {
      collections {
        ...CollectionData
      }
      pagination {
        currentPage
        totalPages
        totalResults
      }
    }
  }
  ${CollectionDataFragmentDoc}
`;

/**
 * __useGetCollectionsQuery__
 *
 * To run a query within a React component, call `useGetCollectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollectionsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetCollectionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCollectionsQuery,
    GetCollectionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCollectionsQuery, GetCollectionsQueryVariables>(
    GetCollectionsDocument,
    options
  );
}
export function useGetCollectionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCollectionsQuery,
    GetCollectionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCollectionsQuery, GetCollectionsQueryVariables>(
    GetCollectionsDocument,
    options
  );
}
export type GetCollectionsQueryHookResult = ReturnType<
  typeof useGetCollectionsQuery
>;
export type GetCollectionsLazyQueryHookResult = ReturnType<
  typeof useGetCollectionsLazyQuery
>;
export type GetCollectionsQueryResult = Apollo.QueryResult<
  GetCollectionsQuery,
  GetCollectionsQueryVariables
>;
export const GetInitialCollectionFormDataDocument = gql`
  query getInitialCollectionFormData($page: Int, $perPage: Int) {
    getCollectionAuthors(page: $page, perPage: $perPage) {
      authors {
        ...CollectionAuthorData
      }
    }
    getLanguages {
      code
    }
    getCurationCategories {
      externalId
      name
      slug
    }
    getIABCategories {
      externalId
      name
      slug
      children {
        externalId
        name
        slug
      }
    }
  }
  ${CollectionAuthorDataFragmentDoc}
`;

/**
 * __useGetInitialCollectionFormDataQuery__
 *
 * To run a query within a React component, call `useGetInitialCollectionFormDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInitialCollectionFormDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInitialCollectionFormDataQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useGetInitialCollectionFormDataQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetInitialCollectionFormDataQuery,
    GetInitialCollectionFormDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetInitialCollectionFormDataQuery,
    GetInitialCollectionFormDataQueryVariables
  >(GetInitialCollectionFormDataDocument, options);
}
export function useGetInitialCollectionFormDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetInitialCollectionFormDataQuery,
    GetInitialCollectionFormDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetInitialCollectionFormDataQuery,
    GetInitialCollectionFormDataQueryVariables
  >(GetInitialCollectionFormDataDocument, options);
}
export type GetInitialCollectionFormDataQueryHookResult = ReturnType<
  typeof useGetInitialCollectionFormDataQuery
>;
export type GetInitialCollectionFormDataLazyQueryHookResult = ReturnType<
  typeof useGetInitialCollectionFormDataLazyQuery
>;
export type GetInitialCollectionFormDataQueryResult = Apollo.QueryResult<
  GetInitialCollectionFormDataQuery,
  GetInitialCollectionFormDataQueryVariables
>;
export const GetNewTabsForUserDocument = gql`
  query getNewTabsForUser {
    getNewTabsForUser {
      guid
      name
      utcOffset
      prospectTypes
    }
  }
`;

/**
 * __useGetNewTabsForUserQuery__
 *
 * To run a query within a React component, call `useGetNewTabsForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNewTabsForUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNewTabsForUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNewTabsForUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetNewTabsForUserQuery,
    GetNewTabsForUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetNewTabsForUserQuery,
    GetNewTabsForUserQueryVariables
  >(GetNewTabsForUserDocument, options);
}
export function useGetNewTabsForUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetNewTabsForUserQuery,
    GetNewTabsForUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetNewTabsForUserQuery,
    GetNewTabsForUserQueryVariables
  >(GetNewTabsForUserDocument, options);
}
export type GetNewTabsForUserQueryHookResult = ReturnType<
  typeof useGetNewTabsForUserQuery
>;
export type GetNewTabsForUserLazyQueryHookResult = ReturnType<
  typeof useGetNewTabsForUserLazyQuery
>;
export type GetNewTabsForUserQueryResult = Apollo.QueryResult<
  GetNewTabsForUserQuery,
  GetNewTabsForUserQueryVariables
>;
export const GetProspectsDocument = gql`
  query getProspects($newTab: String!, $prospectType: String) {
    getProspects(filters: { newTab: $newTab, prospectType: $prospectType }) {
      ...ProspectData
    }
  }
  ${ProspectDataFragmentDoc}
`;

/**
 * __useGetProspectsQuery__
 *
 * To run a query within a React component, call `useGetProspectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProspectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProspectsQuery({
 *   variables: {
 *      newTab: // value for 'newTab'
 *      prospectType: // value for 'prospectType'
 *   },
 * });
 */
export function useGetProspectsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetProspectsQuery,
    GetProspectsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProspectsQuery, GetProspectsQueryVariables>(
    GetProspectsDocument,
    options
  );
}
export function useGetProspectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProspectsQuery,
    GetProspectsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetProspectsQuery, GetProspectsQueryVariables>(
    GetProspectsDocument,
    options
  );
}
export type GetProspectsQueryHookResult = ReturnType<
  typeof useGetProspectsQuery
>;
export type GetProspectsLazyQueryHookResult = ReturnType<
  typeof useGetProspectsLazyQuery
>;
export type GetProspectsQueryResult = Apollo.QueryResult<
  GetProspectsQuery,
  GetProspectsQueryVariables
>;
export const GetRejectedItemsDocument = gql`
  query getRejectedItems(
    $filters: RejectedCuratedCorpusItemFilter
    $pagination: PaginationInput
  ) {
    getRejectedCuratedCorpusItems(filters: $filters, pagination: $pagination) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          ...RejectedItemData
        }
      }
    }
  }
  ${RejectedItemDataFragmentDoc}
`;

/**
 * __useGetRejectedItemsQuery__
 *
 * To run a query within a React component, call `useGetRejectedItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRejectedItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRejectedItemsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetRejectedItemsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetRejectedItemsQuery,
    GetRejectedItemsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetRejectedItemsQuery, GetRejectedItemsQueryVariables>(
    GetRejectedItemsDocument,
    options
  );
}
export function useGetRejectedItemsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRejectedItemsQuery,
    GetRejectedItemsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetRejectedItemsQuery,
    GetRejectedItemsQueryVariables
  >(GetRejectedItemsDocument, options);
}
export type GetRejectedItemsQueryHookResult = ReturnType<
  typeof useGetRejectedItemsQuery
>;
export type GetRejectedItemsLazyQueryHookResult = ReturnType<
  typeof useGetRejectedItemsLazyQuery
>;
export type GetRejectedItemsQueryResult = Apollo.QueryResult<
  GetRejectedItemsQuery,
  GetRejectedItemsQueryVariables
>;
export const GetScheduledItemCountsDocument = gql`
  query getScheduledItemCounts(
    $filters: ScheduledCuratedCorpusItemsFilterInput!
  ) {
    getScheduledCuratedCorpusItems(filters: $filters) {
      collectionCount
      syndicatedCount
      totalCount
    }
  }
`;

/**
 * __useGetScheduledItemCountsQuery__
 *
 * To run a query within a React component, call `useGetScheduledItemCountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScheduledItemCountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScheduledItemCountsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetScheduledItemCountsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetScheduledItemCountsQuery,
    GetScheduledItemCountsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetScheduledItemCountsQuery,
    GetScheduledItemCountsQueryVariables
  >(GetScheduledItemCountsDocument, options);
}
export function useGetScheduledItemCountsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetScheduledItemCountsQuery,
    GetScheduledItemCountsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetScheduledItemCountsQuery,
    GetScheduledItemCountsQueryVariables
  >(GetScheduledItemCountsDocument, options);
}
export type GetScheduledItemCountsQueryHookResult = ReturnType<
  typeof useGetScheduledItemCountsQuery
>;
export type GetScheduledItemCountsLazyQueryHookResult = ReturnType<
  typeof useGetScheduledItemCountsLazyQuery
>;
export type GetScheduledItemCountsQueryResult = Apollo.QueryResult<
  GetScheduledItemCountsQuery,
  GetScheduledItemCountsQueryVariables
>;
export const GetScheduledItemsDocument = gql`
  query getScheduledItems($filters: ScheduledCuratedCorpusItemsFilterInput!) {
    getScheduledCuratedCorpusItems(filters: $filters) {
      collectionCount
      syndicatedCount
      totalCount
      scheduledDate
      items {
        externalId
        createdAt
        createdBy
        updatedAt
        updatedBy
        scheduledDate
        approvedItem {
          ...CuratedItemData
        }
      }
    }
  }
  ${CuratedItemDataFragmentDoc}
`;

/**
 * __useGetScheduledItemsQuery__
 *
 * To run a query within a React component, call `useGetScheduledItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScheduledItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScheduledItemsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetScheduledItemsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetScheduledItemsQuery,
    GetScheduledItemsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetScheduledItemsQuery,
    GetScheduledItemsQueryVariables
  >(GetScheduledItemsDocument, options);
}
export function useGetScheduledItemsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetScheduledItemsQuery,
    GetScheduledItemsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetScheduledItemsQuery,
    GetScheduledItemsQueryVariables
  >(GetScheduledItemsDocument, options);
}
export type GetScheduledItemsQueryHookResult = ReturnType<
  typeof useGetScheduledItemsQuery
>;
export type GetScheduledItemsLazyQueryHookResult = ReturnType<
  typeof useGetScheduledItemsLazyQuery
>;
export type GetScheduledItemsQueryResult = Apollo.QueryResult<
  GetScheduledItemsQuery,
  GetScheduledItemsQueryVariables
>;
export const GetSearchCollectionsDocument = gql`
  query getSearchCollections(
    $page: Int
    $perPage: Int
    $status: CollectionStatus
    $author: String
    $title: String
  ) {
    searchCollections(
      filters: { status: $status, author: $author, title: $title }
      page: $page
      perPage: $perPage
    ) {
      collections {
        ...CollectionData
      }
      pagination {
        totalResults
      }
    }
  }
  ${CollectionDataFragmentDoc}
`;

/**
 * __useGetSearchCollectionsQuery__
 *
 * To run a query within a React component, call `useGetSearchCollectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSearchCollectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSearchCollectionsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      status: // value for 'status'
 *      author: // value for 'author'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useGetSearchCollectionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetSearchCollectionsQuery,
    GetSearchCollectionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetSearchCollectionsQuery,
    GetSearchCollectionsQueryVariables
  >(GetSearchCollectionsDocument, options);
}
export function useGetSearchCollectionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSearchCollectionsQuery,
    GetSearchCollectionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSearchCollectionsQuery,
    GetSearchCollectionsQueryVariables
  >(GetSearchCollectionsDocument, options);
}
export type GetSearchCollectionsQueryHookResult = ReturnType<
  typeof useGetSearchCollectionsQuery
>;
export type GetSearchCollectionsLazyQueryHookResult = ReturnType<
  typeof useGetSearchCollectionsLazyQuery
>;
export type GetSearchCollectionsQueryResult = Apollo.QueryResult<
  GetSearchCollectionsQuery,
  GetSearchCollectionsQueryVariables
>;
export const GetStoryFromParserDocument = gql`
  query getStoryFromParser($url: String!) {
    getItemByUrl(url: $url) {
      resolvedUrl
      title
      excerpt
      topImageUrl
      images {
        src
        width
        height
      }
      authors {
        name
      }
      domainMetadata {
        name
      }
    }
  }
`;

/**
 * __useGetStoryFromParserQuery__
 *
 * To run a query within a React component, call `useGetStoryFromParserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStoryFromParserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStoryFromParserQuery({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useGetStoryFromParserQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetStoryFromParserQuery,
    GetStoryFromParserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetStoryFromParserQuery,
    GetStoryFromParserQueryVariables
  >(GetStoryFromParserDocument, options);
}
export function useGetStoryFromParserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetStoryFromParserQuery,
    GetStoryFromParserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetStoryFromParserQuery,
    GetStoryFromParserQueryVariables
  >(GetStoryFromParserDocument, options);
}
export type GetStoryFromParserQueryHookResult = ReturnType<
  typeof useGetStoryFromParserQuery
>;
export type GetStoryFromParserLazyQueryHookResult = ReturnType<
  typeof useGetStoryFromParserLazyQuery
>;
export type GetStoryFromParserQueryResult = Apollo.QueryResult<
  GetStoryFromParserQuery,
  GetStoryFromParserQueryVariables
>;
export const GetUrlMetadataDocument = gql`
  query getUrlMetadata($url: String!) {
    getUrlMetadata(url: $url) {
      ...urlMetadata
    }
  }
  ${UrlMetadataFragmentDoc}
`;

/**
 * __useGetUrlMetadataQuery__
 *
 * To run a query within a React component, call `useGetUrlMetadataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUrlMetadataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUrlMetadataQuery({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useGetUrlMetadataQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetUrlMetadataQuery,
    GetUrlMetadataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUrlMetadataQuery, GetUrlMetadataQueryVariables>(
    GetUrlMetadataDocument,
    options
  );
}
export function useGetUrlMetadataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUrlMetadataQuery,
    GetUrlMetadataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUrlMetadataQuery, GetUrlMetadataQueryVariables>(
    GetUrlMetadataDocument,
    options
  );
}
export type GetUrlMetadataQueryHookResult = ReturnType<
  typeof useGetUrlMetadataQuery
>;
export type GetUrlMetadataLazyQueryHookResult = ReturnType<
  typeof useGetUrlMetadataLazyQuery
>;
export type GetUrlMetadataQueryResult = Apollo.QueryResult<
  GetUrlMetadataQuery,
  GetUrlMetadataQueryVariables
>;