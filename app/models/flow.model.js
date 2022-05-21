module.exports = (sequelize, Sequelize) => {
    const Flow = sequelize.define("flow", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      direction: {
        type: Sequelize.STRING
      }
    });
    return Flow;
  };
  