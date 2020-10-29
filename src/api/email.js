import Req from './request';

export const sendEmail = data =>
  Req.POST({
    url: '/email',
    data,
  });
