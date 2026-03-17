import { useState, useEffect } from "react";
import axios from "axios";

const useSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/settings");
      if (response.data.success) {
        setSettings(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { settings, loading, error };
};

export default useSettings;
