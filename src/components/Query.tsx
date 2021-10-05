import React from 'react';
import { useQuery, gql } from '@apollo/client';

interface IDragonDetails {
  name: string;
  description: string;
  height_w_trunk: {
    meters: number;
  };
}

interface IDragonData {
  dragons: IDragonDetails[];
}

interface IDragonParam {
  limit: number;
}

const getDragonInfo = gql`
  query getDragonInfo($limit: Int) {
    dragons(limit: $limit) {
      name
      description
      height_w_trunk {
        meters
      }
    }
  }
`;

const Query = (): JSX.Element => {
  const { loading, data } = useQuery<IDragonData, IDragonParam>(getDragonInfo, {
    variables: { limit: 1 }
  });

  return (
    <div>
      {!loading ? (
        <div>
          {data &&
            data.dragons.map((item, index) => (
              <div key={index}>
                {console.log(item.name)}
                <h1>{item.name}</h1>
                <p>{item.description}</p>
                <p>height of thunk{item.height_w_trunk.meters}</p>
              </div>
            ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Query;
