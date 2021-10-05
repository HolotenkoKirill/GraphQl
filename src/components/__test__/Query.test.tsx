import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
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
  });

  test('should render name', async () => {
    const name = await screen.findByRole('heading', { name: 'Dragon 2' });
    expect(name).toBeInTheDocument();
  });

  test('should render description', async () => {
    const description = await screen.findByText(/some description/i);
    expect(description).toBeInTheDocument();
  });

  test('should render height', async () => {
    const height = await screen.findByText(/4/i);
    expect(height).toBeInTheDocument();
  });
});
