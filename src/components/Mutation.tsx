import React from 'react';
import { gql, useMutation } from '@apollo/client';

interface IUser {
  returning: { id: string; name: string }[];
}

const getCompanyInfo = gql`
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
  const [addUser, { data, loading }] = useMutation<{ insert_users: IUser }>(getCompanyInfo);
  return (
    <div>
      <button onClick={() => addUser({ variables: { insertUsersObjects: { name: 'Adam' } } })}>
        Save user
      </button>
      {!loading ? (
        data && (
          <div>
            {console.log(data.insert_users.returning[0])}
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
