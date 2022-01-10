// Libraries
import { gql, QueryResult, useQuery } from "@apollo/client";

export type Category = {
  id: number;
  name: string;
};

const CATEGORIES_QUERY = gql`
  query categories {
    categories {
      id
      name
    }
  }
`;

export type Response = { categories: Category[] };

export const useCategoriesQuery = (): Omit<QueryResult<Response>, "data"> & {
  categories: Category[] | undefined;
} => {
  const { data, ...rest } = useQuery<Response>(CATEGORIES_QUERY);

  return { ...rest, categories: data?.categories };
};
