const mongoose = require("mongoose")

const CaseSchema = new mongoose.Schema({
    number: {
        type: String
    },
    theYear: {
        type: String
    },
    plaintiff: {
        type: String
    },
    defendant: {
        type: String
    },
    typeCase: {
        type: String
    },
    toSession: {
        type: String
    },
    fromSession: {
        type: String
    },
    decision: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, {timestamps: true})

const caseModel = mongoose.model("cases", CaseSchema)
module.exports = caseModel