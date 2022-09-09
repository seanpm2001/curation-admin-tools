import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import { EditCorpusItemAction } from './EditCorpusItemAction';
import { getTestApprovedItem } from '../../../helpers/approvedItem';
import { successMock } from '../../../integration-test-mocks/updateApprovedItem';
import userEvent from '@testing-library/user-event';
import { apolloCache } from '../../../../api/client';

describe('The EditCorpusItemAction', () => {
  let mocks: MockedResponse[] = [];

  it('renders the modal', async () => {
    mocks = [];

    render(
      <MockedProvider mocks={mocks} cache={apolloCache}>
        <SnackbarProvider maxSnack={3}>
          <EditCorpusItemAction
            item={getTestApprovedItem()}
            toggleModal={jest.fn()}
            modalOpen={true}
          />
        </SnackbarProvider>
      </MockedProvider>
    );

    // Do we have the modal heading?
    expect(screen.getByText(/edit item/i)).toBeInTheDocument();

    // How about the form?
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('completes the action successfully', async () => {
    mocks = [successMock];

    render(
      <MockedProvider mocks={mocks} cache={apolloCache}>
        <SnackbarProvider maxSnack={3}>
          <EditCorpusItemAction
            item={getTestApprovedItem()}
            toggleModal={jest.fn()}
            modalOpen={true}
          />
        </SnackbarProvider>
      </MockedProvider>
    );

    // The most basic of integration tests - we simply send through
    // the corpus item without any actual edits.
    userEvent.click(screen.getByText(/save/i));

    expect(
      await screen.findByText(/curated item .* successfully updated/i)
    ).toBeInTheDocument();
  });

  // See notes in RejectCorpusItemAction.test.tsx - add a fail test once it's
  // possible to do so
  it.todo('fails if an error is returned');
});
