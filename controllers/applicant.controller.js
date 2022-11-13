const {statusCodes} = require('../constants');
const {applicantService} = require('../services');

module.exports = {
  getAllApplicant: async (req, res, next) => {
    try {
      const applicants = await applicantService.getAll(req.body);
      res.json(applicants);
    } catch (e) {
      next(e);
    }
  },

  createApplicant: async (req, res, next) => {
    try {
      const applicant = await applicantService.createApplicant(req.body);

      res.status(statusCodes.CREATE).json(applicant);
    } catch (e) {
      next(e);
    }
  },

  updateApplicantById: async (req, res, next) => {
    try {
      const {applicantId} = req.params;

      const applicant = await applicantService.updateApplicant(applicantId, req.body);

      res.json(applicant);
    } catch (e) {
      next(e);
    }
  },

  deleteApplicantById: async (req, res, next) => {
    try {
      const {applicantId} = req.params;

      await applicantService.deleteApplicant(applicantId);

      res.sendStatus(statusCodes.NO_CONTENT);
    } catch (e) {
      next(e);
    }
  },
};
