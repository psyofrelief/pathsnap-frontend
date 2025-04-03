import useSWR from "swr";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", async () => {
    try {
      if (user === undefined) {
        setIsLoading(true);
      }
      const res = await axios.get("/api/user");
      return Object.keys(res.data).length ? res.data : null;
    } catch (error) {
      if (error.response?.status !== 409) throw error;
      router.push("/verify-email");
    } finally {
      setIsLoading(false);
    }
  });

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const forgotPassword = async ({
    setErrors,
    setLoading,
    setStatus,
    email,
  }) => {
    setLoading(true);
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/forgot-password", { email })
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const resetPassword = async ({
    setErrors,
    setLoading,
    setStatus,
    ...props
  }) => {
    setLoading(true);
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/reset-password", { token: params.token, ...props })
      .then((response) => {
        setStatus(response.data.status);
        setTimeout(() => {
          router.push(`/login?reset=${btoa(response.data.status)}`);
        }, 500);
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        setErrors(error.response.data.errors);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const resendEmailVerification = ({ setStatus, setLoading }) => {
    setLoading(true);
    axios
      .post("/email/verification-notification")
      .then((response) => setStatus(response.data.status))
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = async ({ setLoading }) => {
    setLoading(true);
    if (!error) {
      await axios.post("/logout").then(() => mutate());
    }

    window.location.pathname = "/login";
    setLoading(false);
  };
  const updateUser = async ({ setLoading, ...values }) => {
    setLoading(true);
    await csrf();
    try {
      const response = await axios.put("/api/user", values);
      mutate(); // Refresh user data
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async ({ setLoading }) => {
    setLoading(true);
    await csrf();
    try {
      await axios.delete("/api/user");
      mutate(null); // Clear user data
      window.location.pathname = "/login"; // Redirect to login
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const register = async ({ setErrors, setLoading, ...props }) => {
    setLoading(true);
    await csrf();
    setErrors([]);

    axios
      .post("/register", props)
      .then(() => {
        router.push("/verify-email");
        return mutate();
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
        if (error.response.status !== 422) throw error;
      })
      .finally(() => setLoading(false));
  };

  const login = async ({ setErrors, setStatus, setLoading, ...props }) => {
    setLoading(true);
    await csrf();
    setErrors([]);
    setStatus(null);

    axios
      .post("/login", props)
      .then(() => mutate())
      .catch((error) => {
        setErrors(error.response.data.errors);
        if (error.response.status !== 422) throw error;
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);

    if (middleware === "auth" && user && !user.email_verified_at) {
      router.push("/verify-email");
    }

    if (window.location.pathname === "/verify-email" && user?.email_verified_at)
      router.push(redirectIfAuthenticated);
    if (middleware === "auth" && error) logout();
  }, [user, error]);

  return {
    user,
    register,
    login,
    isLoading,
    updateUser,
    deleteUser,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
