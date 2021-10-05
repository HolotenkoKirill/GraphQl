import React from 'react';
import { gql, useMutation } from '@apollo/client';

interface IUser {
  returning: { id: string; name: string }[];
}

export const GET_COMPANY_INFO = gql`
  mutation AddUser($insertUsersObjects: [users_insert_input!]!) {
    insert_users(objects: $insertUsersObjects) {
      returning {
        id
        name
      }
    }
  }
`;

const Mutation = (): JSX.Element => {
  const [addUser, { data, loading }] = useMutation<{ insert_users: IUser }>(GET_COMPANY_INFO);
  return (
    <div>
      <button onClick={() => addUser({ variables: { insertUsersObjects: { name: 'Adam' } } })}>
        Save user
      </button>
      {!loading ? (
        data && (
          <div>
            <h3>{data.insert_users.returning[0].name}</h3>
            <p>{data.insert_users.returning[0].id}</p>
          </div>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Mutation;
