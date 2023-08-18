const caseModel = require("../models/cases.model")
const ApiError = require("../utilities/ApiError")


// -----------------------------------------------------------------------------
//  @des              add new case
//  @method           post
//  @route            http://localhost:4000/api/v1/cases/newCase
// -----------------------------------------------------------------------------
const addNewCase = async(req, res, next)=>{
    const user = req.user
    const {
        number, theYear, plaintiff, defendant, typeCase, toSession, fromSession, decision
    } = req.body
    try{
        const newCase = await caseModel.create({
            number, theYear, plaintiff, defendant, typeCase, toSession, fromSession, decision, user
        })
        res.status(200).json(newCase)
    }catch(err){
        next(new ApiError(`فشل في إضافة الدعوى ${err}`, 500))
    }
}
// -----------------------------------------------------------------------------
//  @des              get cases for the day selected
//  @method           get
//  @route            http://localhost:4000/api/v1/cases/getCases/:date
// -----------------------------------------------------------------------------
const getCasesDaySelected = async(req, res, next)=>{
    const {date} = req.params
    const cases = await caseModel.find().populate({path: "user", select: "_id"} )
    const verifyUser = cases.filter((item)=>req.user._id == item.user._id  )
    try{
        if(verifyUser.length > 0){
            const casesByDate = verifyUser.filter((item)=>item.toSession == date.toString() || item.fromSession == date.toString() )
            res.status(200).json(casesByDate)
        }else{
            res.status(400).json("ليس مصرح لك")
        }
    }catch(err){
            next(new ApiError(`فشل في الوصول إلى الدعاوى المقيدة ${err}`, 500))
    }
}
// -----------------------------------------------------------------------------
//  @des              update case
//  @method           patch
//  @route            http://localhost:4000/api/v1/cases/updateCase/:id
// -----------------------------------------------------------------------------
const updateCases = async(req, res, next)=>{
    const {id} = req.params
    const {
        number, theYear, plaintiff, defendant, typeCase, toSession, fromSession, decision
    } = req.body
    try{
        const caseUpdate = await caseModel.findByIdAndUpdate(
            id,
            {
                number,
                theYear,
                plaintiff, 
                defendant, 
                typeCase, 
                toSession, 
                fromSession, 
                decision,
            },{new: true})
            res.status(200).json(caseUpdate)
    }catch(err){
        next(new ApiError(`فشل في تعديل البيانات ${err}`, 500))
    }
}
// -----------------------------------------------------------------------------
//  @des              delete case
//  @method           delete
//  @route            http://localhost:4000/api/v1/cases/deleteCase/:id
// -----------------------------------------------------------------------------
const deleteCase = async(req, res ,next)=>{
    const {id} = req.params
    try{
        const deleteCase = await caseModel.findByIdAndDelete(id)
        res.status(200).json(deleteCase)
    }catch(err){
        next(new ApiError(`فشل في حذف الدعوى ${err}`, 500))
    }
}

// -----------------------------------------------------------------------------
//  @des              delete case
//  @method           delete
//  @route            http://localhost:4000/api/v1/cases/oneCase/:id
// -----------------------------------------------------------------------------
const getOneCase = async(req, res, next)=>{
    const {id} = req.params
    try{
        const OneCase = await caseModel.findById(id)
        res.status(200).json(OneCase)
    }catch(err){
        next(new ApiError(`فشل في الوصول إلى بيانات الدعوى ${err}`, 500))
    }
}
module.exports = {
    addNewCase,
    getCasesDaySelected,
    updateCases,
    deleteCase,
    getOneCase
}