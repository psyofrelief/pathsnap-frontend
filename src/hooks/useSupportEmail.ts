"use client";
import { useState } from "react";
import axios from "@/lib/axios";

export const useSupportEmail = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendSupportEmail = async (formData: {
    name: string;
    email: string;
    message: string;
  }) => {
    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      const response = await axios.post("/api/support", formData);
      setStatus("Your message has been sent successfully.");
      return response.data;
    } catch (err) {
      setError("Failed to send support email.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendSupportEmail, loading, error, status };
};
