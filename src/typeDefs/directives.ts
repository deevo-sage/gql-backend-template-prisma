import { mapSchema, MapperKind, getDirective } from "@graphql-tools/utils";
import { AuthenticationError } from "apollo-server-errors";
import { defaultFieldResolver, GraphQLSchema } from "graphql";

export const authorizationDirective = (
  schema: GraphQLSchema,
  directiveName: string
) => {
  return mapSchema(schema, {
    [MapperKind.FIELD]: (fieldConfig: any) => {
      const auth = getDirective(schema, fieldConfig, directiveName)?.[0];
      if (auth) {
        const defaultResolver = fieldConfig.resolve || defaultFieldResolver;
        fieldConfig.resolve = async (...args: any) => {
          const role = auth.role;
          if (args[2]?.role !== role) {
            throw new AuthenticationError("user not authorized");
          }
          const answer = await defaultResolver.call(this, ...args);
          return answer;
        };
        return fieldConfig;
      }
    },
  });
};
export const authenticationDirective = (
  schema: GraphQLSchema,
  directiveName: string
) => {
  return mapSchema(schema, {
    [MapperKind.FIELD]: (fieldConfig: any) => {
      const auth = getDirective(schema, fieldConfig, directiveName)?.[0];
      if (auth) {
        const defaultResolver = fieldConfig.resolve || defaultFieldResolver;

        fieldConfig.resolve = async (...args: any) => {
          if (!args[2]?.id) {
            throw new AuthenticationError("user not logged in");
          }
          const answer = await defaultResolver.call(this, ...args);
          return answer;
        };
        return fieldConfig;
      }
    },
  });
};
const toFunc = ["toUpperCase", "toLowerCase"];

const SwitchCase = (data: string | string[], toCase: 1 | 2) => {
  let to = data;
  if (typeof data === "string") to = to[toFunc[toCase]]();
  else to = (to as string[]).map((item) => item[toFunc[toCase]]());
  return to;
};

export const toCaseDirective = (
  schema: GraphQLSchema,
  directiveName: string
) => {
  return mapSchema(schema, {
    [MapperKind.FIELD]: (fieldConfig: any) => {
      const toCase = getDirective(schema, fieldConfig, directiveName)?.[0];
      if (toCase) {
        const { to, type, key } = toCase;
        const defaultResolver = fieldConfig.resolve || defaultFieldResolver;
        fieldConfig.resolve = async (parent, data, ctx, query) => {
          const field = data;
          field[key] = SwitchCase(field[key], to);
          const answer = await defaultResolver.call(
            this,
            parent,
            field,
            ctx,
            query
          );
          return answer;
        };
        return fieldConfig;
      }
    },
  });
};
