import { MockedProvider } from '@apollo/client/testing';
import LazyQuery, { GET_COMPANY_INFO } from '../LazyQuery';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockCompanyInfo = {
  request: {
    query: GET_COMPANY_INFO
  },
  result: {
    data: {
      company: {
        ceo: 'Elon',
        employees: 7000
      }
    }
  }
};

describe('LazyQuery', () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={[mockCompanyInfo]} addTypename={false}>
        <LazyQuery />
      </MockedProvider>
    );
    const button = screen.getByText(/Get info about company/i);
    userEvent.click(button);
  });

  it('renders name', async () => {
    const ceo = await screen.findByText(/elon/i);
    expect(ceo).toBeInTheDocument();
  });

  it('renders number of employees', async () => {
    const employees = await screen.findByText(/7000/i);
    expect(employees).toBeInTheDocument();
  });

  it('renders "Loading..."', async () => {
    const loading = await screen.findByText(/Loading.../i);
    expect(loading).toBeInTheDocument();
  });
});
