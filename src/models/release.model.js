// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const release = sequelizeClient.define('release', {
    tag: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
      unique: true
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  release.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  release.sync({
    force: false,
  });


  return release;
};
