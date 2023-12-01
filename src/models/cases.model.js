const mongoose = require("mongoose");

const CaseSchema = new mongoose.Schema(
  {
    number: {
      type: String,
    },
    theYear: {
      type: String,
    },
    plaintiff: {
      type: String,
    },
    defendant: {
      type: String,
    },
    typeCase: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
CaseSchema.virtual("sessions", {
  ref: "sessions",
  foreignField: "caseId",
  localField: "_id",
});

const caseModel = mongoose.model("cases", CaseSchema);
module.exports = caseModel;
