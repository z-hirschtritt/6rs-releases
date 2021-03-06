require('dotenv').load();

module.exports = {
  'host': 'localhost',
  'port': 3030,
  'public': '../public/',
  'paginate': {
    'default': 20,
    'max': 100
  },
  'mongodb': 'mongodb://localhost:27017/6rs_releases',
  'githubAuthSecret': process.env.GITHUB_AUTH_SECRET,
  'sqlite': 'sqlite://6_rs_releases.sqlite'
};
