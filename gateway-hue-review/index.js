const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'accounts', url: 'http://localhost:4001' },
    { name: 'colors', url: 'http://localhost:4002' },
    // reviews service not working since gateway does not forward the headers to the service
    { name: 'reviews', url: 'http://localhost:4003' },
  ],
});

const start = async () => {
  const server = new ApolloServer({
    gateway,
  });

  server.listen(process.env.PORT).then(({ url }) => {
    console.log(`🚀 Federation Server ready at ${url}`);
  });
};

start();
