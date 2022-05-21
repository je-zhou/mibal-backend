const db = require("../models");
const Flow = db.flows;
const Op = db.Sequelize.Op;
// Create and Save a new Flow
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Floa
  const flow = {
    title: req.body.title,
    description: req.body.description,
    direction: req.body.direction,
  };
  // Save Flow in the database
  Flow.create(flow)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Flow."
      });
    }); 
};
// Retrieve all Flows from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
    Flow.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving flows."
        });
      });
};
// Find a single Flow with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Flow.findByPk(id)
      .then(data => {
        if (data) {
            res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Flow with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Flow with id=" + id
        });
      });
};
// Update a Flow by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Flow.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Flow was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Flow with id=${id}. Maybe Flow was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Flow with id=" + id
        });
      });
};
// Delete a Flow with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Flow.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Flow was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Flow with id=${id}. Maybe Flow was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Flow with id=" + id
        });
      });
  
};
// Delete all Flows from the database.
exports.deleteAll = (req, res) => {
    Flow.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Flows were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Flows."
          });
        });
};