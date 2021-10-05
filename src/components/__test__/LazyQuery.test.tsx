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

  test('should render name', async () => {
    const ceo = await screen.findByText(/elon/i);
    expect(ceo).toBeInTheDocument();
  });

  test('should render number of employees', async () => {
    const employees = await screen.findByText(/7000/i);
    expect(employees).toBeInTheDocument();
  });

  test('should render "Loading..."', async () => {
    const loading = await screen.findByText(/Loading.../i);
    expect(loading).toBeInTheDocument();
  });
});
