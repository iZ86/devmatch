import config from 'config';
import * as async from 'async';
import * as dbModel from '../models/common/_connection';

const db: any = {
  uri: process.env.DB_URI,
  options: config.get('db.mongo.data.options')
};


export function connect(cb) {
  async.waterfall([
    // connect to db
    (cb) => {
      return dbModel.connect(db.uri, db.options, cb);
    }

  ], (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    return cb();
  });
}

export function disconnect(cb) {
  async.waterfall([
    // connect to db
    (cb) => {
      return dbModel.disconnect(cb);
    }

  ], (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    return cb();
  });
}
