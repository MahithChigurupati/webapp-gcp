// defining routes to route request calls to corresponding methods

const userController = require("../controllers/http-controller.js");

const router = require("express").Router();

//Route for GET method -- a health check method
router.get("/healthz", userController.healthCheck);

//Route for GET method -- to get all the http checks
router.get("/v1/http-check", userController.getAllHttpChecks);

//Route for GET method -- to get a specific http check
router.get("/v1/http-check/:id", userController.getHttpCheck);

//Route for POST method -- to create a new http check
router.post("/v1/http-check", userController.createHttpCheck);

//Route for PUT method -- to update an existing http check
router.put("/v1/http-check/:id", userController.updateHttpCheck);

//Route for DELETE method -- to delete an existing http check
router.delete("/v1/http-check/:id", userController.deleteHttpCheck);

module.exports = router;
