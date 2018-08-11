const env = process.env.NODE_ENV;

const dev = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT) || 3000
  },
  db: {
    mysql: {
      host: process.env.DEV_DB_HOST || '46.21.250.90',
      username: 'user271351',
      password: 'tfp7cRRoug4D',
      port: parseInt(process.env.DEV_DB_PORT) || 3306,
      name: process.env.DEV_DB_NAME || 'user271351_infinite_comics',
      pool: {
        maxPoolCount: 10,
        minPoolCount: 0,
        maxID: 100000
      }
    }
  },
  servises: {
    cloudinary: {
      name: 'dtquxmxcs',
      key: '219447449487377',
      secret: 'YsATAdSo0HSkKKu1Xhp9n4bV3js'
    }
  },
  validation: {
    admin: {
      username: '@dm1n',
      password: 'MJ0yWIZdQGTo7BKTOemsuKPr'
    }
  }
};

const prod = {

};

const test = {

};

const config = {
  dev,
  prod,
  test
}

module.exports = config[env];
