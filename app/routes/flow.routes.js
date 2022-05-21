module.exports = app => {
    const flows = require("../controllers/flow.controller.js");
    var router = require("express").Router();
    // Create a new flow
    router.post("/", flows.create);
    // Retrieve all flows
    router.get("/", flows.findAll);
    // Retrieve a single flow with id
    router.get("/:id", flows.findOne);
    // Update a flow with id
    router.put("/:id", flows.update);
    // Delete a flow with id
    router.delete("/:id", flows.delete);
    // Create a new flow
    router.delete("/", flows.deleteAll);
    app.use('/api/flows', router);
  };