const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const {config} = require('../сonfigs');
const emailTemplatesObj = require('../emails');
const {ApiError} = require('../errors');
const {Applicant} = require('../dataBase');

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

  let language;
  if (locals.japaneseRequired === true){
    language = true;
  } else if (locals.japaneseRequired === false) {
    language = [
      true,
      false
    ];
  }

  const applicants = await Applicant.find({
    categories:{$in: locals.category},
    level:{$in: locals.level},
    japaneseKnowledge: {$in: language }
  });

  const html = await templateParser.render(emailInfo.templateName,locals);
  
  await applicants.forEach(applicant =>
    transporter.sendMail({
      from: 'test test', // sender's name
      to: applicant.email,
      subject: emailInfo.subject,
      html
    }));

};

module.exports = {
  sendEmail
};
