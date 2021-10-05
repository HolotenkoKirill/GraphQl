import React from 'react';
import { useLazyQuery, gql } from '@apollo/client';

interface ICompanyInfo {
  company: {
    ceo: string;
    employees: number;
  };
}

const getCompanyInfo = gql`
  query ExampleQuery {
    company {
      ceo
      employees
    }
  }
`;

const LazyQuery = (): JSX.Element => {
  const [getInfo, { loading, data }] = useLazyQuery<ICompanyInfo>(getCompanyInfo);
  return (
    <div>
      <button onClick={() => getInfo()}>Get info about company</button>
      {!loading ? (
        data && (
          <div>
            <h2>CEO: {data.company.ceo}</h2>
            <h2>Employees: {data.company.employees}</h2>
          </div>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LazyQuery;
