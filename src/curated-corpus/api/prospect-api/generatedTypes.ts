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
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _FieldSet: any;
};

export type GetProspectsFilters = {
  /** string GUID of the new tab being prospected, e.g. 'EN_US' or 'DE_DE' */
  newTab: Scalars['String'];
  /** string GUID of the prospect type to further filter prospects, e.g. 'GLOBAL' or 'ORGANIC_TIMESPENT' */
  prospectType?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * marks a prospect as 'curated' in the database, preventing it from being displayed for prospecting.
   * returns true if the operation succeeds, false if not (almost surely due to an incorrect prospectId).
   */
  updateProspectAsCurated?: Maybe<Prospect>;
};

export type MutationUpdateProspectAsCuratedArgs = {
  prospectId: Scalars['ID'];
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
  topic: Scalars['String'];
  url: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** returns a set of at most 20 prospects (number may be smaller depending on available data) */
  getProspects: Array<Prospect>;
};

export type QueryGetProspectsArgs = {
  filters: GetProspectsFilters;
};

export type ProspectDataFragment = {
  __typename?: 'Prospect';
  id: string;
  newTab: string;
  topic: string;
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
        topic: string;
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
    topic: string;
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
