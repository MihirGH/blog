// Libraries
import { gql, QueryResult, useQuery } from "@apollo/client";

export type Note = {
  id: number;
  content: string;
  categories: { id: number; name: string }[];
};

const NOTES_QUERY = gql`
  query notes($categoryId: ID) {
    notes(categoryId: $categoryId) {
      id
      content
      categories {
        id
        name
      }
    }
  }
`;

export type Response = { notes: Note[] };
export type Variables = { categoryId: number | undefined };

export const useNotesQuery = (
  categoryId: string | undefined
): Omit<QueryResult<Response, Variables>, "data"> & {
  notes: Note[] | undefined;
} => {
  const { data, ...rest } = useQuery<Response, Variables>(NOTES_QUERY, {
    variables: {
      categoryId:
        typeof categoryId === "string" ? Number(categoryId) : undefined,
    },
  });

  return { ...rest, notes: data?.notes };
};
