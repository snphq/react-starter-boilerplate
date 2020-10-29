import React, { useState, useCallback } from 'react';

import { sendEmail } from 'api/email';

const Home = () => {
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();

      try {
        setStatus('Pending');
        await sendEmail({
          name,
          email,
          subject: 'Contact us',
          html: `
            <div>
              Name: ${name} <br>
              Email: ${email} <br>
              <p> ${message} </p>
            </div>
          `,
          mailingList: 'contact_us',
        });
        setStatus('success');
      } catch (e) {
        setStatus('Failure');
      }
    },
    [email, message, name]
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <br />
      <button type="submit">Send Email</button>
      <div>{status}</div>
    </form>
  );
};

export default Home;
