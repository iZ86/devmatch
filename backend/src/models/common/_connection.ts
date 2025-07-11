import * as mongoose from 'mongoose';

export function connect(uri: string, options?: any, next?: (err?: any) => void): void {
  mongoose.connect(uri, options)
    .then((result) => {
      console.log(`Connected to mongodb`);
      (<any>mongoose).Promise = global.Promise;

      if (next) return next();
    })
    .catch((err) => {
      console.error(`Could not connect to - ${uri}`);

      if (next) return next(err);
      return;
    });
}

export function disconnect(next?: (err?: any) => void): void {
  mongoose.disconnect()
    .then((result) => {
      console.info('Disconnected from mongodb');
      if (next) return next();
    })
    .catch((err) => {
      console.error(`Could not disconnect from mongodb`);
      if (next) return next(err);
    });
}
