const db = require("../models");
const sequelize = require("../models/index");
const HttpCheck = db.http;
const moment = require("moment");

const healthCheck = async (req, res) => {
  try {
    await sequelize.sequelize.authenticate();

    res
      .status(200)
      .header("Cache-Control", "no-cache, no-store, must-revalidate")
      .send("Connection established successfully!");
  } catch (error) {
    console.error("Database connection error:", error);

    res
      .status(503)
      .header("Cache-Control", "no-cache, no-store, must-revalidate")
      .send();
  }
};

const getAllHttpChecks = async (req, res) => {
  try {
    const httpChecks = await HttpCheck.findAll();

    res.status(200).json(httpChecks);
  } catch (error) {
    console.error("Error retrieving HTTP checks:", error);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getHttpCheck = async (req, res) => {
  const { id } = req.params;

  try {
    const httpCheck = await HttpCheck.findOne({ where: { id: id } });

    if (!httpCheck) {
      return res.status(404).json({ error: "HTTP check not found" });
    }

    res.status(200).json(httpCheck);
  } catch (error) {
    console.error("Error retrieving HTTP check:", error);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createHttpCheck = async (req, res) => {
  try {
    // Check if user is trying to send check_created or check_updated
    if (req.body.check_created || req.body.check_updated) {
      return res
        .status(400)
        .json({
          error: "Cannot set values for check_created or check_updated",
        });
    }

    // Add server-generated timestamps
    req.body.check_created = moment().toISOString();
    req.body.check_updated = moment().toISOString();

    const newHttpCheck = await HttpCheck.create(req.body);

    res.status(201).json(newHttpCheck);
  } catch (error) {
    console.error("Error creating HTTP check:", error);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateHttpCheck = async (req, res) => {
  const { id } = req.params;

  try {
    const existingHttpCheck = await HttpCheck.findByPk(id);

    if (!existingHttpCheck) {
      return res.status(404).json({ error: "HTTP check not found" });
    }

    // Check if user is trying to send check_created or check_updated
    if (req.body.check_created || req.body.check_updated) {
      return res
        .status(400)
        .json({
          error: "Cannot set values for check_created or check_updated",
        });
    }

    // Add server-generated timestamp for update
    req.body.check_updated = moment().toISOString();

    // Check if the user is authorized to update the HTTP check (you need to implement this logic)
    // For example, if you have user authentication, ensure that the current user is the creator of the HTTP check.

    await existingHttpCheck.update(req.body);

    res.status(200).json(existingHttpCheck);
  } catch (error) {
    console.error("Error updating HTTP check:", error);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteHttpCheck = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCount = await HttpCheck.destroy({
      where: {
        id,
      },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: "HTTP check not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting HTTP check:", error);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  healthCheck,
  getAllHttpChecks,
  getHttpCheck,
  createHttpCheck,
  updateHttpCheck,
  deleteHttpCheck,
};
