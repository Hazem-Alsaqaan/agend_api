const {
  addNewCase,
  getCasesDaySelected,
  deleteCase,
  getOneCase,
  updateCases,
  deleteUserCases,
} = require("../controllers/cases.controller");
const verifyToken = require("../utilities/verifyToken");

const casesRouter = require("express").Router();

casesRouter.post("/newCase", verifyToken, addNewCase);
casesRouter.get("/getCases/:pageDate", verifyToken, getCasesDaySelected);
casesRouter.patch("/updateCase/:id", verifyToken, updateCases);
casesRouter.delete("/deleteUserCases", verifyToken, deleteUserCases);
casesRouter.delete("/deleteCase/:id", verifyToken, deleteCase);
casesRouter.get("/oneCase/:id", verifyToken, getOneCase);

module.exports = casesRouter;
