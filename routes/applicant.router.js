const {Router} = require('express');

const { applicantController } = require('../controllers');
const { commonMdlwr,applicantMdlwr} = require('../middlewares');

const applicantRouter = Router();

applicantRouter.get(
  '/',
  applicantController.getAllApplicant
);

applicantRouter.post(
  '/',
  applicantMdlwr.checkIsApplicantBodyValid,
  applicantController.createApplicant
);

applicantRouter.put(
  '/:applicantId',
  commonMdlwr.checkIsIdValid('applicantId' ),
  applicantController.updateApplicantById
);

applicantRouter.delete(
  '/:applicantId',
  commonMdlwr.checkIsIdValid('applicantId' ),
  applicantController.deleteApplicantById
);

module.exports = applicantRouter;

