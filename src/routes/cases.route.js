const { addNewCase, getCasesDaySelected, updateCase, deleteCase, getOneCase } = require("../controllers/cases.controller")
const verifyToken = require("../utilities/verifyToken")

const casesRouter = require("express").Router()

casesRouter.post("/newCase", verifyToken, addNewCase)
casesRouter.get("/getCases/:date", verifyToken, getCasesDaySelected)
casesRouter.patch("/updateCase/:id", verifyToken, updateCase)
casesRouter.delete("/deleteCase/:id", verifyToken, deleteCase)
casesRouter.get("/oneCase/:id", verifyToken, getOneCase)

module.exports = casesRouter