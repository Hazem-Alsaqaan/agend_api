const caseModel = require("../models/cases.model");
const sessionModel = require("../models/sessions.model");
const ApiError = require("../utilities/ApiError");

// -----------------------------------------------------------------------------
//  @des              add new case
//  @method           post
//  @route            http://localhost:4000/api/v1/cases/newCase
// -----------------------------------------------------------------------------
const addNewCase = async (req, res, next) => {
  const user = req.user;
  const { number, theYear, plaintiff, defendant, typeCase } = req.body;
  try {
    const newCase = await caseModel.create({
      number,
      theYear,
      plaintiff,
      defendant,
      typeCase,
      user,
    });
    res.status(200).json(newCase);
  } catch (err) {
    next(new ApiError(`فشل في إضافة الدعوى ${err}`, 500));
  }
};
// -----------------------------------------------------------------------------
//  @des              get cases for the day selected
//  @method           get
//  @route            http://localhost:4000/api/v1/cases/getCases/:date
// -----------------------------------------------------------------------------
const getCasesDaySelected = async (req, res, next) => {
  const userId = req.user._id.toString();
  const { pageDate } = req.params;
  try {
    const cases = (
      await caseModel
        .find()
        .populate({ path: "user", select: "_id" })
        .populate({ path: "sessions" })
    ).filter((item) => item.user._id.toString() === userId);
    const filterCases = cases.map((item) => {
      const result = item.sessions
        .map((sessionItem) => {
          if (sessionItem.sessionDate.toString() === pageDate.toString()) {
            return item;
          }
        })
        .filter((item) => item != null)[0];
      return result;
    });
    const finalResult = filterCases
      .filter((item) => item != null)
      .filter((item) => item.length != 0);
    res.status(200).json(finalResult);
  } catch (err) {
    next(new ApiError(`فشل في الوصول إلى الدعاوى المقيدة ${err}`, 500));
  }
};
// -----------------------------------------------------------------------------
//  @des              update case
//  @method           patch
//  @route            http://localhost:4000/api/v1/cases/updateCase/:id
// -----------------------------------------------------------------------------
const updateCases = async (req, res, next) => {
  const { id } = req.params;
  const { number, theYear, plaintiff, defendant, typeCase } = req.body;
  try {
    const caseUpdate = await caseModel.findByIdAndUpdate(
      id,
      {
        number,
        theYear,
        plaintiff,
        defendant,
        typeCase,
      },
      { new: true }
    );
    res.status(200).json(caseUpdate);
  } catch (err) {
    next(new ApiError(`فشل في تعديل البيانات ${err}`, 500));
  }
};
// -----------------------------------------------------------------------------
//  @des              delete case
//  @method           delete
//  @route            http://localhost:4000/api/v1/cases/deleteCase/:id
// -----------------------------------------------------------------------------
const deleteCase = async (req, res, next) => {
  const { id } = req.params;
  // const sessionsCase = (await sessionModel.find().populate({path: "cases"})).filter((item)=> item.caseId === id)

  try {
    const deleteCase = await caseModel.findByIdAndDelete(id);
    const deleteSessionsCase = await sessionModel.deleteMany({ caseId: id });
    res.status(200).json(deleteCase);
  } catch (err) {
    next(new ApiError(`فشل في حذف الدعوى ${err}`, 500));
  }
};
// -----------------------------------------------------------------------------
//  @des              delete all user cases
//  @method           delete
//  @route            http://localhost:4000/api/v1/cases/deleteUserCases
// -----------------------------------------------------------------------------
const deleteUserCases = async (req, res, next) => {
  const user = await req.user._id;
  // const findUserCases = await caseModel.find({user: user})
  try {
    const deleteAllUserCases = await caseModel.deleteMany({ user: user });
    res.status(200).json(deleteAllUserCases);
  } catch (err) {
    next(new ApiError(`فشل في حذف الدعوى ${err}`, 500));
  }
};

// -----------------------------------------------------------------------------
//  @des              delete case
//  @method           delete
//  @route            http://localhost:4000/api/v1/cases/oneCase/:id
// -----------------------------------------------------------------------------
const getOneCase = async (req, res, next) => {
  const { id } = req.params;
  try {
    const OneCase = await caseModel.findById(id);
    res.status(200).json(OneCase);
  } catch (err) {
    next(new ApiError(`فشل في الوصول إلى بيانات الدعوى ${err}`, 500));
  }
};

// -----------------------------------------------------------------------------
//  @des              search cases
//  @method           post
//  @route            http://localhost:4000/api/v1/cases/search
// -----------------------------------------------------------------------------
const searchCases = async (req, res, next) => {
  const userId = req.user._id.toString();
  const { plaintiff, defendant } = req.body;
  try {
    const cases = (
      await caseModel
        .find({ $or: [{ plaintiff: plaintiff }, { defendant: defendant }] })
        .populate({ path: "user", select: "_id" })
        .populate({ path: "sessions" })
    ).filter((item) => item.user._id.toString() === userId);

    res.status(200).json(cases);
  } catch (err) {
    next(new ApiError(`فشل في الوصول إلى الدعاوى المقيدة ${err}`, 500));
  }
};

module.exports = {
  addNewCase,
  getCasesDaySelected,
  updateCases,
  deleteCase,
  getOneCase,
  deleteUserCases,
  searchCases,
};
