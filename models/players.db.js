module.exports = (sequelize, Sequelize) => {
    const Player = sequelize.define("players",
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          username: Sequelize.STRING,
          password: Sequelize.STRING,
          salt: Sequelize.STRING,
          kills: Sequelize.INTEGER,
          deaths: Sequelize.INTEGER,
          ip: Sequelize.STRING,
          country: Sequelize.STRING,
          admin: Sequelize.INTEGER,
          mute: Sequelize.INTEGER,
          skin: Sequelize.INTEGER,
          privatemsg: Sequelize.INTEGER,
          duel_invitation: Sequelize.INTEGER,
          ranked: Sequelize.INTEGER,
          team_ranked: Sequelize.INTEGER,
          won_duels: Sequelize.INTEGER,
          lost_duels: Sequelize.INTEGER,
          year: Sequelize.INTEGER,
          month: Sequelize.INTEGER,
          day: Sequelize.INTEGER,
        },
        {
          tableName: 'players',
          timestamps: false
        }
    );
  return Player;
};
