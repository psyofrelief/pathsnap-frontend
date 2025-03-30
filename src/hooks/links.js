import useSWR from "swr";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const useLinks = () => {
  const router = useRouter();
  // Fetch links
  const { data: links, error, mutate } = useSWR("/api/short-links", fetcher);

  const getLinks = async (setLinks) => {
    try {
      const response = await axios.get("/api/short-links");
      setLinks(response.data); // Update state with fetched links
      mutate(); // Refresh the links list
      return response.data;
    } catch (error) {
      console.error("Error fetching links:", error);
      throw error;
    }
  };

  // Create a new link
  const createLink = async (linkData) => {
    try {
      const response = await axios.post("/api/short-links", linkData);
      console.log(response);
      mutate(); // Refresh the links list
      window.location.href = "/links";
      return response.data;
    } catch (error) {
      console.error("Error creating link:", error);
      throw error;
    }
  };

  // Update an existing link
  const updateLink = async (id, updatedData) => {
    try {
      const response = await axios.put(`/api/short-links/${id}`, updatedData);
      mutate(); // Refresh the links list
      return response.data;
    } catch (error) {
      console.error("Error updating link:", error);
      throw error;
    }
  };

  // Delete a link
  const deleteLink = async (id) => {
    try {
      await axios.delete(`/api/short-links/${id}`);
      mutate(); // Refresh the links list
    } catch (error) {
      console.error("Error deleting link:", error);
      throw error;
    }
  };

  return { links, error, getLinks, createLink, updateLink, deleteLink };
};
