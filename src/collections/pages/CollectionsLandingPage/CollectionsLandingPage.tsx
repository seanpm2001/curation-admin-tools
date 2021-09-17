import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from '../../api/collection-api/client';
import {
  Header,
  MainContentWrapper,
  MenuLink,
} from '../../../_shared/components';
import {
  AddAuthorPage,
  AddCollectionPage,
  AddPartnerPage,
  AuthorListPage,
  AuthorPage,
  CollectionListPage,
  CollectionPage,
  CollectionSearchPage,
  CollectionsHomePage,
  PartnerListPage,
  PartnerPage,
} from '../';

/**
 * Collections landing page
 */
export const CollectionsLandingPage = (): JSX.Element => {
  // Get the base path (/collections)
  const { path } = useRouteMatch();

  const menuLinks: MenuLink[] = [
    {
      text: 'Collections',
      url: `${path}/collections/drafts/`,
    },
    {
      text: 'Authors',
      url: `${path}/authors/`,
    },
    {
      text: 'Partners',
      url: `${path}/partners/`,
    },
    {
      text: 'Search',
      url: `${path}/search/`,
    },
  ];

  return (
    <ApolloProvider client={client}>
      <Header productName="Collections" menuLinks={menuLinks} />
      <MainContentWrapper>
        <Switch>
          <Route exact path={path}>
            <CollectionsHomePage />
          </Route>
          <Route exact path={`${path}/authors/`}>
            <AuthorListPage />
          </Route>
          <Route exact path={`${path}/authors/add/`}>
            <AddAuthorPage />
          </Route>
          <Route exact path={`${path}/authors/:id/`}>
            <AuthorPage />
          </Route>
          <Route exact path={`${path}/collections/add/`}>
            <AddCollectionPage />
          </Route>
          <Route
            path={`${path}/collections/:status(drafts|review|published|archived)/`}
          >
            <CollectionListPage />
          </Route>
          <Route exact path={`${path}/collections/:id/`}>
            <CollectionPage />
          </Route>
          <Route exact path={`${path}/partners/`}>
            <PartnerListPage />
          </Route>
          <Route exact path={`${path}/partners/add/`}>
            <AddPartnerPage />
          </Route>
          <Route exact path={`${path}/partners/:id`}>
            <PartnerPage />
          </Route>
          <Route exact path={`${path}/search/`}>
            <CollectionSearchPage />
          </Route>
        </Switch>
      </MainContentWrapper>
    </ApolloProvider>
  );
};