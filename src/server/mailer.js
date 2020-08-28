import mailgun from 'mailgun-js';
import util from 'util';

import config from '../config';

const mailer = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: config.mailer.domain,
});

const list = mailer.lists(`${config.mailer.list}@${config.mailer.domain}`);

const messagesService = mailer.messages();
const members = list.members();

messagesService.send = util.promisify(messagesService.send);
members.create = util.promisify(members.create);

export default ({ from, to, subject, text, attachments, email, name }) =>
  Promise.all([
    members.create({
      name,
      address: email,
    }),
    messagesService.send({
      to,
      text,
      from,
      subject,
      attachment: attachments.map(
        file =>
          new mailer.Attachment({
            data: file.buffer,
            filename: file.originalname,
          })
      ),
    }),
  ]);
