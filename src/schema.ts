import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import * as data from "./data";

const TodoType = new GraphQLObjectType({
  name: "Todo",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    completed: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    todos: {
      type: new GraphQLList(TodoType),
      resolve: () => data.getTodos(),
    },
    todo: {
      type: TodoType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: (_, args) => data.getTodo(args.id as string),
    },
  },
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    createTodo: {
      type: TodoType,
      args: { title: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: (_, args) => data.createTodo(args.title as string),
    },
    updateTodo: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
      },
      resolve: (_, args) =>
        data.updateTodo(
          args.id as string,
          args.title as string | undefined,
          args.completed as boolean | undefined
        ),
    },
    deleteTodo: {
      type: GraphQLBoolean,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: (_, args) => data.deleteTodo(args.id as string),
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
