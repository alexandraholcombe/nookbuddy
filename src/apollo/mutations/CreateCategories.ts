import gql from 'graphql-tag';

export const Mutation = gql`
  mutation CreateCategories {
    insert_categories(objects: { name: "" }) {
      returning {
        id
        name
      }
    }
  }
`;

export default Mutation;
