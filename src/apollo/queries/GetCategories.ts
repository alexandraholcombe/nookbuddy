import gql from 'graphql-tag';

const Query = gql`
  query GetCategories query MyQuery {
  categories {
    id
    name
  }
}
`;

export default Query;
