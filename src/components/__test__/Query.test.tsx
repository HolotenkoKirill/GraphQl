import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import Query, { GET_DRAGON_INFO } from '../Query';

const mockDragonInfo = {
  request: {
    query: GET_DRAGON_INFO,
    variables: {
      limit: 1
    }
  },
  result: {
    data: {
      dragons: [
        {
          name: 'Dragon 2',
          description: 'some description',
          height_w_trunk: {
            meters: 4
          }
        }
      ]
    }
  }
};

describe('Query', () => {
  beforeEach(async () => {
    render(
      <MockedProvider mocks={[mockDragonInfo]} addTypename={false}>
        <Query />
      </MockedProvider>
    );
    await waitFor(() => new Promise((res) => setTimeout(res, 0)));
  });

  test('should render name', () => {
    const name = screen.getByRole('heading', { name: 'Dragon 2' });
    expect(name).toBeInTheDocument();
  });

  test('should render description', () => {
    const description = screen.getByText(/some description/i);
    expect(description).toBeInTheDocument();
  });

  test('should render height', () => {
    const height = screen.getByText(/4/i);
    expect(height).toBeInTheDocument();
  });
});
