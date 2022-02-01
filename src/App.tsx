import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import theme from './theme';

import { LandingPage } from './_shared/pages';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <LandingPage />
        {/*<BrowserRouter>*/}
        {/*  <>*/}
        {/*    <Switch>*/}
        {/*      <Route exact path="/">*/}
        {/*        <LandingPage />*/}
        {/*      </Route>*/}
        {/*      <Route path="/collections">*/}
        {/*        <CollectionsLandingPage />*/}
        {/*      </Route>*/}
        {/*      <Route path="/curated-corpus">*/}
        {/*        <CuratedCorpusLandingPage />*/}
        {/*      </Route>*/}
        {/*    </Switch>*/}
        {/*  </>*/}
        {/*</BrowserRouter>*/}
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
