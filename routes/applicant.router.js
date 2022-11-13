const {Router} = require('express');

const { applicantController } = require('../controllers');
const { commonMdlwr} = require('../middlewares');
const {newApplicantValidator,updateApplicantValidator} = require('../validators/applicant.validator');

const applicantRouter = Router();

applicantRouter.get(
  '/',
  applicantController.getAllApplicant
);

applicantRouter.post(
  '/',
  commonMdlwr.checkIsBodyValid(newApplicantValidator),
  applicantController.createApplicant
);

applicantRouter.put(
  '/:applicantId',
  commonMdlwr.checkIsIdValid('applicantId' ),
  commonMdlwr.checkIsBodyValid(updateApplicantValidator),
  applicantController.updateApplicantById
);

applicantRouter.delete(
  '/:applicantId',
  commonMdlwr.checkIsIdValid('applicantId' ),
  applicantController.deleteApplicantById
);

module.exports = applicantRouter;

