import { useState, useEffect } from 'react';

const useSiteConfig = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/site-config')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setConfig(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching site config:', err);
        setLoading(false);
      });
  }, []);

  return { config, loading };
};

export default useSiteConfig;