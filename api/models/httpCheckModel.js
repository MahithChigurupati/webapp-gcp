module.exports = (sequelize, DataTypes) => {
  const HttpCheck = sequelize.define(
    "HttpCheck",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        readOnly: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uri: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_paused: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      num_retries: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      uptime_sla: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 100,
        },
      },
      response_time_sla: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 100,
        },
      },
      use_ssl: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      response_status_code: {
        type: DataTypes.INTEGER,
        defaultValue: 200,
      },
      check_interval_in_seconds: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 86400,
        },
      },
      check_created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        readOnly: true,
      },
      check_updated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        readOnly: true,
      },
    },
    {
      schema: "app",
      timestamps: false,
    }
  );

  return HttpCheck;
};
