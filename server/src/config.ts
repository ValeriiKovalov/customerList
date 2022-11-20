import * as _ from 'lodash';

const toNumber = (value) => {
  return _.toNumber(value);
};

export default {
  port: toNumber(process.env.NODE_PORT) || 3000,
  mongo: {
    database: process.env.MONGO_DATABASE,
    user: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    host: process.env.MONGO_HOST,
  },
};
