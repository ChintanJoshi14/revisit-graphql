const express = require("express");
const expressGraphQl = require("express-graphql").graphqlHTTP;
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} = require("graphql");
const app = express();

const books = [
  {
    id: 1,
    name: "Book 1",
    authorId: 1,
  },
  {
    id: 2,
    name: "Book 2",
    authorId: 2,
  },
  {
    id: 3,
    name: "Book 3",
    authorId: 2,
  },
];
const authors = [
  { id: 1, name: "Jack Hales" },
  { id: 2, name: "Charles Mathew" },
];
const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This represents the books written by an author",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return authors.find((author) => author.id === book.authorId);
      },
    },
  }),
});
const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represents an author of a book",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: GraphQLList(BookType),
      resolve: (author) => {
        return books.filter((book) => book.authorId === author.id);
      },
    },
  }),
});
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    books: {
      type: GraphQLList(BookType),
      description: "This is a list of Books",
      resolve: () => books,
    },
    book: {
      type: BookType,
      description: "A Single Book",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => books.find((book) => book.id === args.id),
    },
    authors: {
      type: GraphQLList(AuthorType),
      description: "This is a list of Authors",
      resolve: () => authors,
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) =>
        authors.find((author) => author.id === args.id),
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addBook: {
      type: BookType,
      description: "Add a Book",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const book = {
          id: books.length + 1,
          name: args.name,
          authorId: args.authorId,
        };
        books.push({ book });
        return book;
      },
    },
    addAuthor: {
      type: AuthorType,
      description: "Add an Author",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const author = {
          id: authors.length + 1,
          name: args.name,
        };
        authors.push(author);
        return author;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  expressGraphQl({
    graphiql: true,
    schema: schema,
  })
);
app.listen(5000, () => console.log("Server started"));
