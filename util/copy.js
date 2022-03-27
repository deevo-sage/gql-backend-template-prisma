const fs = require('fs');

const schema = fs.readFileSync('./src/typeDefs/schema.graphql');
fs.writeFileSync('./dist/typeDefs/schema.graphql', schema);
const schema2 = fs.readFileSync('./src/typeDefs/mySchema.graphql');
fs.writeFileSync('./dist/typeDefs/mySchema.graphql', schema2);
