const caseModel = require("../models/cases.model")


// -----------------------------------------------------------------------------
//  @des              add new case
//  @method           post
//  @route            http://localhost:4000/api/v1/cases/newCase
// -----------------------------------------------------------------------------
const addNewCase = async(req, res, next)=>{
    const user = req.user
    const {
        number, plaintiff, defendant, typeCase, toSession, fromSession, decision
    } = req.body
    try{
        const newCase = await caseModel.create({
            number, plaintiff, defendant, typeCase, toSession, fromSession, decision, user
        })
        res.status(200).json(newCase)
    }catch(err){
        console.log(err)
    }
}
// -----------------------------------------------------------------------------
//  @des              get cases for the day selected
//  @method           get
//  @route            http://localhost:4000/api/v1/cases/getCases/:date
// -----------------------------------------------------------------------------
const getCasesDaySelected = async(req, res, next)=>{
    const {date} = await req.params
    const cases = await caseModel.find().populate({path: "user", select: "_id"} )
    const verifyUser = cases.filter((item)=>req.user._id == item.user._id  )
    try{
        if(verifyUser.length > 0){
            const casesByDate = verifyUser.filter((item)=>item.toSession == date.toString() || item.fromSession == date.toString() )
            if(casesByDate.length > 0){
                res.status(200).json(casesByDate)
            }else{
                res.status(200).json("لا يوجد قضايا مسجلة في هذا اليوم")
            }
            
        }else{
            res.status(400).json("ليس مصرح لك")
        }
    }catch(err){
            console.log(err)
    }
}
// -----------------------------------------------------------------------------
//  @des              update case
//  @method           patch
//  @route            http://localhost:4000/api/v1/cases/updateCase/:id
// -----------------------------------------------------------------------------
const updateCase = async(req, res, next)=>{
    const {id} = req.params.toString()
    const {
        number, plaintiff, defendant, typeCase, toSession, fromSession, decision
    } = req.body
    try{
        const caseUpdate = await caseModel.findOneAndUpdate(
            id,
            {
                number,
                plaintiff, 
                defendant, 
                typeCase, 
                toSession, 
                fromSession, 
                decision,
            },{new: true})
            res.status(200).json(caseUpdate)
    }catch(err){
        console.log(err)
    }
}
// -----------------------------------------------------------------------------
//  @des              delete case
//  @method           delete
//  @route            http://localhost:4000/api/v1/cases/deleteCase/:id
// -----------------------------------------------------------------------------
const deleteCase = async(req, res ,next)=>{
    const {id} = req.params.toString()
    try{
        const deleteCase = await caseModel.findByIdAndDelete(id)
        res.status(200).json(deleteCase)
    }catch(err){
        console.log(err)
    }
}

// -----------------------------------------------------------------------------
//  @des              delete case
//  @method           delete
//  @route            http://localhost:4000/api/v1/cases/oneCase/:id
// -----------------------------------------------------------------------------
const getOneCase = async(req, res, next)=>{
    const {id} = req.params.toString()
    try{
        const OneCase = await caseModel.findById(id)
        res.status(200).json(OneCase)
    }catch(err){
        console.log(err)
    }
}
module.exports = {
    addNewCase,
    getCasesDaySelected,
    updateCase,
    deleteCase,
    getOneCase
}