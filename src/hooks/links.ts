import axios from "@/lib/axios";
import type { Link } from "@/types/link";
import useSWR from "swr";

interface LinkData {
  title?: string;
  short_url?: string;
  url: string;
}

interface UpdateLinkData {
  id: string;
  updatedData: Partial<Link>;
}

interface DeleteLinkData {
  id: string;
}

interface AuthError {
  [key: string]: string[];
}
interface LinkFunctionProps {
  setLoading: (loading: boolean) => void;
  setErrors: (errors: AuthError) => void;
  onSuccess?: () => void; // Added onSuccess callback
  onError?: () => void; // Added onError callback
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
    setErrors,
  }: { linkData: LinkData } & LinkFunctionProps) => {
    setLoading(true);

    setErrors({});

    axios
      .post("/api/short-links", linkData)
      .then((response) => {
        mutate();
        return response.data;
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        setErrors(error.response.data.errors);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateLink = async ({
    id,
    updatedData,
    setLoading,
    setErrors,
  }: UpdateLinkData & LinkFunctionProps) => {
    setErrors({});
    setLoading(true);
    axios
      .post(`/api/short-links/${id}`, updatedData)
      .then((response) => {
        mutate();
        return response.data;
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        setErrors(error.response.data.errors);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteLink = async ({
    id,
    setLoading,
  }: DeleteLinkData & LinkFunctionProps) => {
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
