const {Applicant} = require('../dataBase');

module.exports = {
  getAll: (filter = {}) => Applicant.find(filter),

  createApplicant: (applicantObject) => Applicant.create(applicantObject),

  updateApplicant: (applicantId,newApplicantBody) => Applicant.findOneAndUpdate({_id: applicantId},newApplicantBody,{new: true}),

  deleteApplicant: (applicantId) => Applicant.deleteOne({_id:applicantId})
};
