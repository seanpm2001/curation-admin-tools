import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CollectionListCard } from './CollectionListCard';
import { CollectionModel, CollectionStatus } from '../../api/collection-api';

describe('The CollectionListCard component', () => {
  let collection: CollectionModel;

  beforeEach(() => {
    collection = {
      externalId: '124abc',
      title: 'Hidden Histories of Presidential Medical Dramas',
      slug: 'collection-slug',
      imageUrl: 'https://placeimg.com/640/480/people?random=494',
      excerpt:
        'There’s a long history of presidential ailments, including George Washington’s near-death encounter with the flu, Grover Cleveland’s secret tumor, and the clandestine suffering of John F. Kennedy. ',
      intro:
        'There’s a long history of presidential ailments, including George Washington’s near-death encounter with the flu, Grover Cleveland’s secret tumor, and the clandestine suffering of John F. Kennedy. ',
      status: CollectionStatus.Published,
      authors: [],
    };
  });

  it('shows basic collection information', () => {
    render(
      <MemoryRouter>
        <CollectionListCard collection={collection} />
      </MemoryRouter>
    );

    // The photo is present and the alt text is the collection title
    const photo = screen.getByAltText(collection.title);
    expect(photo).toBeInTheDocument();

    // The link to the collection page is present and is well-formed
    const linkToCollectionPage = screen.getByRole('link');
    expect(linkToCollectionPage).toBeInTheDocument();
    expect(linkToCollectionPage).toHaveAttribute(
      'href',
      expect.stringContaining(collection.externalId)
    );

    // The excerpt is also present
    const excerpt = screen.getByText(/presidential ailments/i);
    expect(excerpt).toBeInTheDocument();
  });

  it('shows "Published" status correctly', () => {
    render(
      <MemoryRouter>
        <CollectionListCard collection={collection} />
      </MemoryRouter>
    );

    // Shows 'Published' subtitle for a published collection
    const published = screen.getByText(/^published/i);
    expect(published).toBeInTheDocument();

    // Doesn't show the other two possible collection states
    const draft = screen.queryByText(/^draft/i);
    expect(draft).not.toBeInTheDocument();
    const archived = screen.queryByText(/^archived/i);
    expect(archived).not.toBeInTheDocument();
  });

  it('shows label if curation category is set', () => {
    collection.curationCategory = {
      externalId: 'cde-234',
      name: 'Food',
      slug: 'food',
    };

    render(
      <MemoryRouter>
        <CollectionListCard collection={collection} />
      </MemoryRouter>
    );

    expect(screen.getByText('Food')).toBeInTheDocument();
  });

  it('omits label if curation category is not set', () => {
    render(
      <MemoryRouter>
        <CollectionListCard collection={collection} />
      </MemoryRouter>
    );

    expect(screen.queryByText('Food')).not.toBeInTheDocument();
  });

  it('shows IAB label if IAB categories are set is set', () => {
    collection.IABParentCategory = {
      externalId: 'cde-234',
      name: 'Careers',
      slug: 'careers',
    };

    collection.IABChildCategory = {
      externalId: 'cde-234',
      name: 'Job Fairs',
      slug: 'job-fairs',
    };

    render(
      <MemoryRouter>
        <CollectionListCard collection={collection} />
      </MemoryRouter>
    );

    expect(screen.getByText('Careers → Job Fairs')).toBeInTheDocument();
  });

  it('omits IAB label if IAB categories are not set', () => {
    render(
      <MemoryRouter>
        <CollectionListCard collection={collection} />
      </MemoryRouter>
    );

    expect(screen.queryByText('Careers → Job Fairs')).not.toBeInTheDocument();
  });
});
