const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const {config} = require('../сonfigs');
const emailTemplatesObj = require('../emails');
const {ApiError} = require('../errors');


const sendEmail = async (userMail, emailAction,locals ={}) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.NO_REPLY_EMAIL, //sender's email
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
  
  const html = await templateParser.render(emailInfo.templateName, {...locals, frontendURL: config.FRONTEND_URL});

  return transporter.sendMail({
    from: 'No reply mar-2022 ', // sender's name
    to: userMail ,
    subject: emailInfo.subject,
    html
  });
};

module.exports = {
  sendEmail
};
