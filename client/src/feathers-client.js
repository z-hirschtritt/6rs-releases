import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
// import auth from '@feathersjs/authentication-client';
import request from 'request';

const restClient = rest('http://localhost:3030');

const feathersClient = feathers()
  .configure(restClient.request(request));
  // .configure(auth({ storage: window.localStorage }));

export default feathersClient;
