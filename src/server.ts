require('dotenv').config();
import cors from 'cors';
import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-express';
// import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import typeDefs from './typeDefs';
import http from 'http';
import { PrismaClient } from '@prisma/client';
import resolvers from './resolvers';
import GetCurrentUser from './middlewares/auth';
import {
  authenticationDirective,
  authorizationDirective,
  toCaseDirective,
} from './typeDefs/directives';

import { User } from './services';
export const prisma = new PrismaClient();
async function startApolloServer() {
  let schema = makeExecutableSchema({ typeDefs, resolvers });
  schema = authorizationDirective(schema, 'authorization');
  schema = authenticationDirective(schema, 'authentication');
  schema = toCaseDirective(schema, 'toCase');

  const PORT = process.env.PORT || 8000;
  const app = express();
  app.use(cors());
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    // mocks: true,
    // mockEntireSchema: false,
    context: async ({ req, res }) => {
      const user = await GetCurrentUser(req, res);
      if (user) {
        const services = new User();
        let ourUser: any = await services.get(user?.email);
        if (!Boolean(ourUser)) {
          ourUser = await services.create(
            user.email || '',
            user.name,
            user.picture,
          );
        }
        return ourUser;
      } else return null;
    },
    // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  //  app.post('/checkout_session', CreateCheckoutSession(private_key));

  server.applyMiddleware({ app });
  httpServer.listen({ port: PORT });
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
  );
}
try {
  startApolloServer();
} catch (err) {
  console.log(err);
}
