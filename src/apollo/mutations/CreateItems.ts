import gql from 'graphql-tag';

export const Mutation = gql`
  mutation CreateItems(
    $id: String!
    $name: String!
    $orderable: Boolean
    $enrollmentId: String
    $locationId: Int
    $notes: String
  ) {
    insert_items(
      input: {
        id: $id
        name: $name
        orderable: $orderable
        customizable: $customizable
        sellPrice: $sellPrice
        buyPrices: $buyPrices
        categoryId: $categoryId
      }
    ) {
      id
      name
      orderable
      customizable
      sellPrice
      buyPrices
      categoryId
    }
  }
`;

export default Mutation;
