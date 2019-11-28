import { useEffect, useState } from 'react';

export default () => {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);

  return rendered;
};
