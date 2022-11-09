const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const {config} = require('../сonfigs');
const emailTemplatesObj = require('../emails');
const {ApiError} = require('../errors');
// const { applicantController} = require('../controllers');
// const {Applicant} = require('../dataBase');
// const {getAllApplicant} = require("../controllers/applicant.controller");


// const {applicants} = applicantController.getAllApplicant();

// const all = Applicant.find({level: 'junior'});
// console.log(res.json(all));

const sendEmail = async (emailAction,locals= {}) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.NO_REPLY_EMAIL,
      pass: config.NO_REPLY_PASSWORD,
    }
  });
  
  const templateParser = new EmailTemplates({
    view: {
      root: path.join(process.cwd(),'email-templates')
    }
  });

  const emailInfo = emailTemplatesObj[emailAction];
  
  if (!emailInfo) {
    throw new ApiError('Wrong template name', 500);
  }
  
  const html = await templateParser.render(emailInfo.templateName,{...locals});

  return transporter.sendMail({
    from: 'test test', // sender's name
    to: 'n.suninfire@gmail.com',
    subject: emailInfo.subject,
    html
  });
};

module.exports = {
  sendEmail
};
