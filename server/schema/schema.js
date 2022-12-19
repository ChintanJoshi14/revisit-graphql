const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
} = require("graphql");

//getting mongoose models here
const Project = require("../models/Project");
const Client = require("../models/Client");

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    project: {
      type: ProjectType,
      resolve: (parent) => {
        // return projects.find((project) => project.clientId === parent.id);
        return Project.findById(parent.id);
      },
    },
  }),
});
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: (parent, args) => {
        return Client.findById(parent.clientId);
      },
    },
  }),
});
//define the fields that we can query for
const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    //to get a single client
    client: {
      type: ClientType,
      description: "This represents a Single Client",
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        return Client.findById(args.id);
      },
    },
    // to get list of clients
    clients: {
      type: GraphQLList(ClientType),
      description: "This represents a List of Clients",
      resolve: () => Client.find(),
    },
    //to get a single project
    project: {
      type: ProjectType,
      description: "This represents a Single Project",
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        return Project.findById(args.id);
      },
    },
    //to get list of projects
    projects: {
      type: GraphQLList(ProjectType),
      description: "This represents a List of Projects",
      resolve: () => Project.find(),
    },
  }),
});

//define allowed mutations inside DB
const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    //Add a client
    addClient: {
      type: ClientType,
      description: "Add a Client",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        //create an object of Client model and assign user entered data inside it and save it
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return client.save();
      },
    },
    //Remove a client
    removeClient: {
      type: ClientType,
      description: "Remove a Client",
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        return Client.findByIdAndRemove(args.id);
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
