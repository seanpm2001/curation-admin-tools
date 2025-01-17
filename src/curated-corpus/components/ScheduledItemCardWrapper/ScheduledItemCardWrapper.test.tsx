import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ScheduledCorpusItem } from '../../../api/generatedTypes';
import { ScheduledItemCardWrapper } from './ScheduledItemCardWrapper';
import { getTestApprovedItem } from '../../helpers/approvedItem';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme';

describe('The ScheduledItemCardWrapper component', () => {
  let item: ScheduledCorpusItem;

  beforeEach(() => {
    item = {
      externalId: '456-qwerty',
      scheduledDate: '2030-01-01',
      createdAt: 1635014926,
      createdBy: 'Amy',
      updatedAt: 1635014926,
      updatedBy: 'Amy',
      scheduledSurfaceGuid: 'NEW_TAB_EN_US',
      approvedItem: getTestApprovedItem(),
    };
  });

  it('should render an approved item card from a scheduled item', () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <ScheduledItemCardWrapper
            item={item}
            onEdit={jest.fn()}
            onMoveToBottom={jest.fn()}
            onReschedule={jest.fn()}
            onRemove={jest.fn()}
          />
        </ThemeProvider>
      </MemoryRouter>
    );

    // Only check the title here as the rest is thoroughly tested
    // in the ApprovedItemCard itself.
    const title = screen.getByText(item.approvedItem.title);
    expect(title).toBeInTheDocument();
  });

  it('should render all buttons', () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <ScheduledItemCardWrapper
            item={item}
            onEdit={jest.fn()}
            onMoveToBottom={jest.fn()}
            onReschedule={jest.fn()}
            onRemove={jest.fn()}
          />
        </ThemeProvider>
      </MemoryRouter>
    );

    const editButton = screen.getByRole('button', {
      name: /Edit/i,
    });

    const removeButton = screen.getByRole('button', {
      name: /Remove/i,
    });

    const rescheduleButton = screen.getByRole('button', {
      name: /Reschedule/i,
    });

    const moveButton = screen.getByRole('button', {
      name: /move to bottom/i,
    });

    expect(editButton).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
    expect(rescheduleButton).toBeInTheDocument();
    expect(moveButton).toBeInTheDocument();
  });

  it('should run an action on pressing the "Remove" button', () => {
    const onRemove = jest.fn();

    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <ScheduledItemCardWrapper
            item={item}
            onEdit={jest.fn()}
            onMoveToBottom={jest.fn()}
            onReschedule={jest.fn()}
            onRemove={onRemove}
          />
        </ThemeProvider>
      </MemoryRouter>
    );

    userEvent.click(
      screen.getByRole('button', {
        name: /Remove/i,
      })
    );

    expect(onRemove).toHaveBeenCalled();
  });

  it('should run an action on pressing the "Reschedule" button', () => {
    const onReschedule = jest.fn();

    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <ScheduledItemCardWrapper
            item={item}
            onEdit={jest.fn()}
            onMoveToBottom={jest.fn()}
            onReschedule={onReschedule}
            onRemove={jest.fn()}
          />
        </ThemeProvider>
      </MemoryRouter>
    );

    userEvent.click(
      screen.getByRole('button', {
        name: /Reschedule/i,
      })
    );

    expect(onReschedule).toHaveBeenCalled();
  });

  it('should run an action on pressing the "Remove" button', () => {
    const onMoveToBottom = jest.fn();

    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <ScheduledItemCardWrapper
            item={item}
            onEdit={jest.fn()}
            onMoveToBottom={onMoveToBottom}
            onReschedule={jest.fn()}
            onRemove={jest.fn()}
          />
        </ThemeProvider>
      </MemoryRouter>
    );

    userEvent.click(
      screen.getByRole('button', {
        name: /Move to bottom/i,
      })
    );

    expect(onMoveToBottom).toHaveBeenCalled();
  });

  it('should run an action on pressing the "Edit" button', () => {
    const onEdit = jest.fn();

    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <ScheduledItemCardWrapper
            item={item}
            onEdit={onEdit}
            onMoveToBottom={jest.fn()}
            onReschedule={jest.fn()}
            onRemove={jest.fn()}
          />
        </ThemeProvider>
      </MemoryRouter>
    );

    userEvent.click(
      screen.getByRole('button', {
        name: /Edit/i,
      })
    );

    expect(onEdit).toHaveBeenCalled();
  });
});
