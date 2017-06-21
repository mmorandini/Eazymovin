module.exports = {
  db: process.env.MONGODB_URI || 'mongodb://127.0.0.1/wdi-project-2',
  port: process.env.PORT || 3000
};
