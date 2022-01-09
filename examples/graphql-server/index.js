const { ApolloServer, gql } = require("apollo-server");

let noteCounter = 0;
let categoryCounter = 0;

const notes = [
  {
    id: noteCounter++,
    content: "Why Apollo Client?",
    categoryIds: [0, 1],
  },
];

const categories = [
  { id: categoryCounter++, name: "GraphQL" },
  { id: categoryCounter++, name: "Apollo Client" },
];

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

const server = new ApolloServer({
  typeDefs: gql`
    type Mutation {
      createNote(content: String, categoryIds: [String]): Note
    }
    type Query {
      note(id: ID!): Note
      notes(categoryId: ID): [Note]
      categories: [Category]
    }
    type Note {
      id: ID
      content: String
      categories: [Category]
    }
    type Category {
      id: ID
      name: String
    }
  `,
  resolvers: {
    Mutation: {
      async createNote(_, { content, categoryIds }) {
        await wait(4000);

        if (
          categoryIds.some((categoryId) => !categories.includes(categoryId))
        ) {
          throw Error("Invalid Category ID");
        }

        const newNote = { id: noteCounter++, content, categoryIds };
        notes.push(newNote);
        return newNote;
      },
    },
    Query: {
      async note(_, { id }) {
        await wait(4000);

        const note = notes.find((note) => note.id === id);
        if (!note) {
          throw Error("Invalid Note ID");
        }

        return note;
      },
      async notes(_, { categoryId }) {
        await wait(4000);

        return typeof categoryId === "undefined"
          ? notes
          : notes.filter((note) =>
              note.categoryIds.includes(Number(categoryId))
            );
      },
      async categories() {
        await wait(4000);

        return categories;
      },
    },
    Note: {
      categories(parent) {
        return categories.filter(({ id }) => parent.categoryIds.includes(id));
      },
    },
  },
});

server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
