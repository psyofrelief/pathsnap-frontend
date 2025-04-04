import useSWR from "swr";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { AxiosError } from "axios";

interface AuthProps {
  middleware?: "auth" | "guest";
  redirectIfAuthenticated?: string;
}

interface AuthError {
  [key: string]: string[];
}

interface AuthFunctionProps {
  setErrors: (errors: AuthError) => void;
  setLoading: (loading: boolean) => void;
  setStatus: (status: string | null) => void;
  remember?: boolean;
  email?: string;
  password?: string;
  password_confirmation?: string;
}

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: AuthProps = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", async () => {
    try {
      // If the user is undefined (no session data), start the loading state
      if (user === undefined) {
        setIsLoading(true);
      }

      // Check if CSRF token is available in cookies (if it's already fetched previously)
      const csrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN"))
        ?.split("=")[1];

      // If the CSRF token is not set, fetch it
      if (!csrfToken) {
        await axios.get("/sanctum/csrf-cookie");
      }

      // Now proceed to fetch the user data
      const res = await axios.get("/api/user");
      return Object.keys(res.data).length ? res.data : null;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status !== 409) throw error;
        router.push("/verify-email");
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  });

  const forgotPassword = async ({
    setErrors,
    setLoading,
    setStatus,
    email,
  }: AuthFunctionProps & { email: string }) => {
    await csrf();
    setLoading(true);

    setErrors({});
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
  }: AuthFunctionProps) => {
    setLoading(true);
    await csrf();

    setErrors({});
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

  const resendEmailVerification = ({
    setStatus,
    setLoading,
  }: Omit<AuthFunctionProps, "setErrors">) => {
    setStatus(null);
    setLoading(true);
    axios
      .post("/email/verification-notification")
      .then((response) => setStatus(response.data.status))
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = async () => {
    if (!error) {
      await axios.post("/logout").then(() => mutate());
    }
    window.location.pathname = "/login";
  };

  interface UpdateUserProps extends AuthFunctionProps {
    name: string;
  }
  const updateUser = async ({
    setLoading,
    setErrors,
    name,
  }: UpdateUserProps) => {
    setLoading(true);
    await csrf();
    axios
      .put("/api/user", name)
      .then(() => mutate())
      .catch((error) => {
        setErrors(error.response.data.errors);
        if (error.response.status !== 422) throw error;
      })
      .finally(() => setLoading(false));
  };

  const deleteUser = async ({ setLoading }: AuthFunctionProps) => {
    setLoading(true);
    await csrf();
    try {
      await axios.delete("/api/user");
      mutate(null);
      window.location.pathname = "/login";
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const register = async ({
    setErrors,
    setLoading = () => {},

    ...props
  }: AuthFunctionProps) => {
    await csrf();
    setLoading(true);
    setErrors({});

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

  const login = async ({
    setErrors,
    setStatus,
    setLoading = () => {},

    ...props
  }: AuthFunctionProps) => {
    setLoading(true);
    setErrors({});
    setStatus(null);

    await csrf();
    axios
      .post("/login", props)
      .then(() => mutate())
      .catch((error) => {
        setErrors(error.response.data.errors);
        console.log(error);
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

    if (
      window.location.pathname === "/verify-email" &&
      redirectIfAuthenticated &&
      user?.email_verified_at
    )
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
