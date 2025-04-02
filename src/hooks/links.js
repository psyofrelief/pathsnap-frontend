import useSWR from "swr";
import axios from "@/lib/axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const useLinks = () => {
  const { data: links, error, mutate } = useSWR("/api/short-links", fetcher);

  const isLoading = !links && !error;

  const createLink = async ({ linkData, setLoading }) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/short-links", linkData);
      await mutate();
      return response.data;
    } catch (error) {
      console.error("Error creating link:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateLink = async ({ id, updatedData, setLoading }) => {
    setLoading(true);
    try {
      const response = await axios.put(`/api/short-links/${id}`, updatedData);
      mutate();
      return response.data;
    } catch (error) {
      console.error("Error updating link:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteLink = async ({ id, setLoading }) => {
    setLoading(true);
    try {
      await axios.delete(`/api/short-links/${id}`);
      mutate();
    } catch (error) {
      console.error("Error deleting link:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    links,
    isLoading,
    error,
    createLink,
    updateLink,
    deleteLink,
  };
};
