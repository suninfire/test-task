const {statusCodes} = require('../constants');
const {Applicant} = require('../dataBase');

module.exports = {
  getAllApplicant: async (req, res, next) => {
    try {
      const applicants = await Applicant.find(req.body);
      res.json(applicants);
    } catch (e) {
      next(e);
    }
  },

  createApplicant: async (req, res, next) => {
    try {
      const applicant = await Applicant.create(req.body);

      res.status(statusCodes.CREATE).json(applicant);
    } catch (e) {
      next(e);
    }
  },

  updateApplicantById: async (req, res, next) => {
    try {
      const {applicantId} = req.params;

      const applicant = await Applicant.findOneAndUpdate({_id: applicantId}, req.body,{new: true});

      res.json(applicant);
    } catch (e) {
      next(e);
    }
  },

  deleteApplicantById: async (req, res, next) => {
    try {
      const {applicantId} = req.params;

      await Applicant.deleteOne({applicantId});

      res.sendStatus(statusCodes.NO_CONTENT);
    } catch (e) {
      next(e);
    }
  },

};
