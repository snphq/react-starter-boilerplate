import mailgun from 'mailgun-js';
import util from 'util';

import config from '../config';

const mailer = mailgun({
  apiKey: process.env.MAILGUN_API_KEY || 'api_key',
  domain: config.mailer.domain,
});

const messagesService = mailer.messages();

messagesService.send = util.promisify(messagesService.send);

export default ({
  from,
  to,
  subject,
  html,
  attachments = [],
  email,
  name,
  mailingList,
}) => {
  const list = mailer.lists(
    `${mailingList || config.mailer.list}@${config.mailer.domain}`
  );
  const members = list.members();
  members.create = util.promisify(members.create);

  members.create({
    name,
    address: email,
  });

  return messagesService.send({
    to,
    html,
    from,
    subject,
    attachment: attachments.map(
      file =>
        new mailer.Attachment({
          data: file.buffer,
          filename: file.originalname,
        })
    ),
  });
};
