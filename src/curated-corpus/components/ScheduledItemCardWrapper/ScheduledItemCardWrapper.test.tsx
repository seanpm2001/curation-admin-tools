import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  CuratedStatus,
  ScheduledCuratedCorpusItem,
} from '../../api/curated-corpus-api/generatedTypes';
import { ScheduledItemCardWrapper } from './ScheduledItemCardWrapper';

describe('The ScheduledItemCardWrapper component', () => {
  let item: ScheduledCuratedCorpusItem;

  beforeEach(() => {
    item = {
      externalId: '456-qwerty',
      scheduledDate: '2030-01-01',
      createdAt: 1635014926,
      createdBy: 'Amy',
      updatedAt: 1635014926,
      updatedBy: 'Amy',
      approvedItem: {
        externalId: '123-abc',
        prospectId: '123-xyz',
        title: 'How To Win Friends And Influence People with React',
        url: 'http://www.test.com/how-to',
        imageUrl: 'https://placeimg.com/640/480/people?random=494',
        excerpt:
          'Everything You Wanted to Know About React and Were Afraid To Ask',
        language: 'de',
        publisher: 'Amazing Inventions',
        topic: 'Technology',
        status: CuratedStatus.Recommendation,
        isCollection: false,
        isSyndicated: false,
        isShortLived: false,
        createdAt: 1635014926,
        createdBy: 'Amy',
        updatedAt: 1635114926,
      },
    };
  });

  it('should render an approved item card from a scheduled item', () => {
    render(
      <MemoryRouter>
        <ScheduledItemCardWrapper item={item} />
      </MemoryRouter>
    );

    // Only check the title here as the rest is thoroughly tested
    // in the ApprovedItemCard itself.
    const title = screen.getByText(item.approvedItem.title);
    expect(title).toBeInTheDocument();
  });

  it('should render action buttons', () => {
    render(
      <MemoryRouter>
        <ScheduledItemCardWrapper item={item} />
      </MemoryRouter>
    );

    const removeButton = screen.getByRole('button', {
      name: /Remove/i,
    });

    expect(removeButton).toBeInTheDocument();
  });
});