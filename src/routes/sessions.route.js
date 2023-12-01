const sessionsRouter = require("express").Router();

const {
  addNewSession,
  getSessions,
  updateSession,
  deleteSession,
} = require("../controllers/sessions.controler");

sessionsRouter.post("/newSession", addNewSession);
sessionsRouter.get("/getSessions", getSessions);
sessionsRouter.patch("/updateSession/:id", updateSession);
sessionsRouter.delete("/deleteSession/:id", deleteSession);
module.exports = sessionsRouter;
