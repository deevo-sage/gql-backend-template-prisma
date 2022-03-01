// import { RedisPubSub } from 'graphql-redis-subscirptions';
// import Redis from 'ioredis';
// console.log('redis initializing');
// const options = {
//   host: process.env.REDIS_HOSTNAME,
//   port: +process.env.REDIS_PORT!,
//   password: process.env.REDIS_PASSWORD,
// };
// const redisClient = new Redis(options);

// export const pubsub = new RedisPubSub({
//   connectionListener: (...args) => {
//     console.log(args);
//   },
//   publisher: new Redis(options),
//   subscriber: new Redis(options),
// });

// redisClient.on('connect', () => {
//   console.log('Client connected to redis...');
//   redisClient.set('my-goal', 'skartner');
// });
// export default redisClient;
