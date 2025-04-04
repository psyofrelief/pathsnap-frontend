import axios from "@/lib/axios";
import type { Link } from "@/types/link";
import useSWR from "swr";

interface LinkData {
  original_url: string;
}

interface UpdateLinkData {
  id: string;
  updatedData: Partial<Link>;
}

interface DeleteLinkData {
  id: string;
}

interface LoadingProps {
  setLoading: (loading: boolean) => void;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useLinks = () => {
  const {
    data: links,
    error,
    mutate,
  } = useSWR<Link[]>("/api/short-links", fetcher); // Use the updated Link type here

  const isLoading = !links && !error;

  const createLink = async ({
    linkData,
    setLoading,
  }: { linkData: LinkData } & LoadingProps) => {
    setLoading(true);
    try {
      const response = await axios.post<Link>("/api/short-links", linkData);
      await mutate();
      return response.data;
    } catch (err) {
      console.error("Error creating link:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateLink = async ({
    id,
    updatedData,
    setLoading,
  }: UpdateLinkData & LoadingProps) => {
    setLoading(true);
    try {
      const response = await axios.put<Link>(
        `/api/short-links/${id}`,
        updatedData,
      );
      await mutate();
      return response.data;
    } catch (err) {
      console.error("Error updating link:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteLink = async ({
    id,
    setLoading,
  }: DeleteLinkData & LoadingProps) => {
    setLoading(true);
    try {
      await axios.delete(`/api/short-links/${id}`);
      await mutate();
    } catch (err) {
      console.error("Error deleting link:", err);
      throw err;
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
