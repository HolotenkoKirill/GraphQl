import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Mutation, { GET_COMPANY_INFO } from '../Mutation';

const mockUserAddition = {
  request: {
    query: GET_COMPANY_INFO,
    variables: { insertUsersObjects: { name: 'Adam' } }
  },
  result: {
    data: {
      insert_users: {
        returning: [
          {
            id: '7fa5378d-9632-4364-b3be-7c642400a88e',
            name: 'Adam'
          }
        ]
      }
    }
  }
};

describe('Mutation', () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={[mockUserAddition]} addTypename={false}>
        <Mutation />
      </MockedProvider>
    );
    const button = screen.getByText(/Save user/i);
    userEvent.click(button);
  });

  it('renders Adam', async () => {
    const name = await screen.findByText(/Adam/i);
    expect(name).toBeInTheDocument();
  });

  it('renders id', async () => {
    const id = await screen.findByText(/7fa5378d-9632-4364-b3be-7c642400a88e/i);
    expect(id).toBeInTheDocument();
  });
});
