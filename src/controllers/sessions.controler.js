const sessionModel = require("../models/sessions.model");

// -----------------------------------------------------------------------------
//  @des              add new session
//  @method           post
//  @route            http://localhost:4000/api/v1/sessions/newSession
// -----------------------------------------------------------------------------
const addNewSession = async (req, res, next) => {
  const { sessionDate, decision, caseId } = await req.body;
  try {
    const session = await sessionModel.create({
      sessionDate,
      decision,
      caseId,
    });
    res.status(200).json(session);
  } catch (err) {
    console.log(err);
  }
};
// -----------------------------------------------------------------------------
//  @des              get sessions
//  @method           get
//  @route            http://localhost:4000/api/v1/sessions/getSessions/:date
// -----------------------------------------------------------------------------
const getSessions = async (req, res, next) => {
  try {
    const sessions = await sessionModel.find();
    res.status(200).json(sessions);
  } catch (err) {
    console.log(err);
  }
};
// -----------------------------------------------------------------------------
//  @des               update session
//  @method            patch
//  @route             http://localhost:4000/api/v1/sessions/updateSession/:id
// -----------------------------------------------------------------------------
const updateSession = async (req, res, next) => {
  const { id } = req.params;
  const { sessionDate, decision } = req.body;
  try {
    const sessionUpdated = await sessionModel.findByIdAndUpdate(
      id,
      { sessionDate, decision },
      { new: true }
    );
    res.status(200).json(sessionUpdated);
  } catch (err) {
    next(new ApiError(`فشل في تعديل البيانات ${err}`, 500));
  }
};
// -----------------------------------------------------------------------------
//  @des               delete session
//  @method            delete
//  @route             http://localhost:4000/api/v1/sessions/deleteSession/:id
// -----------------------------------------------------------------------------
const deleteSession = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteSession = await sessionModel.findByIdAndDelete(id);
    res.status(200).json(deleteSession);
  } catch (err) {
    next(new ApiError(`فشل في حذف هذه الجلسة ${err}`, 500));
  }
};

module.exports = {
  addNewSession,
  getSessions,
  updateSession,
  deleteSession,
};
