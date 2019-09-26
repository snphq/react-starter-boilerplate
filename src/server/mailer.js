import mailgun from 'mailgun-js';
import util from 'util';

import sharedConfig from '../config/shared';

const mailer = mailgun({
  apiKey: sharedConfig.mailer.apiKey,
  domain: sharedConfig.mailer.domain,
});

const messagesService = mailer.messages();
messagesService.send = util.promisify(messagesService.send);

export default ({ from, to, subject, text, attachments }) =>
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
  });
