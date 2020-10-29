import React, { useState, useCallback } from 'react';

import { sendEmail } from 'api/email';

const Home = () => {
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();

      try {
        setStatus('Pending');
        await sendEmail({
          email,
          subject: 'Contact me',
          html: `
          <p>Hi! You email is ${email}</p>
          `,
          mailingList: 'contact_me',
        });
        setStatus('success');
      } catch (e) {
        setStatus('Failure');
      }
    },
    [email]
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <br />
      <button type="submit">Send Email</button>
      <div>{status}</div>
    </form>
  );
};

export default Home;
