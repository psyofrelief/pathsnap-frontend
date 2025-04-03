"use client";

import LoginForm from "@/components/forms/LoginForm";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthSessionStatus from "@/app/(auth)/AuthSessionStatus";
import Section from "@/components/ui/Section";
import Brief from "@/components/ui/Brief";

export default function Login() {
  const router = useRouter();

  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState<string | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("reset")) {
      setStatus("Password has been reset, please login.");
    }
    console.log(searchParams.has("reset"));
  }, [searchParams]);

  const submitForm = async (event) => {
    event.preventDefault();

    login({
      email,
      password,
      setErrors,
      setLoading,
      setStatus,
    });
  };

  // return (
  //   <>
  //     <AuthSessionStatus className="mb-4" status={status} />
  //     <form onSubmit={submitForm}>
  //       {/* Email Address */}
  //       <div>
  //         <Label htmlFor="email">Email</Label>

  //         <Input
  //           id="email"
  //           type="email"
  //           value={email}
  //           className="block mt-1 w-full"
  //           onChange={(event) => setEmail(event.target.value)}
  //           required
  //           autoFocus
  //         />

  //         <InputError messages={errors.email} className="mt-2" />
  //       </div>

  //       {/* Password */}
  //       <div className="mt-4">
  //         <Label htmlFor="password">Password</Label>

  //         <Input
  //           id="password"
  //           type="password"
  //           value={password}
  //           className="block mt-1 w-full"
  //           onChange={(event) => setPassword(event.target.value)}
  //           required
  //           autoComplete="current-password"
  //         />

  //         <InputError messages={errors.password} className="mt-2" />
  //       </div>

  //       {/* Remember Me */}
  //       <div className="block mt-4">
  //         <label htmlFor="remember_me" className="inline-flex items-center">
  //           <input
  //             id="remember_me"
  //             type="checkbox"
  //             name="remember"
  //             className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  //             onChange={(event) => setShouldRemember(event.target.checked)}
  //           />

  //           <span className="ml-2 text-sm text-gray-600">Remember me</span>
  //         </label>
  //       </div>

  //       <div className="flex items-center justify-end mt-4">
  //         <Link
  //           href="/forgot-password"
  //           className="underline text-sm text-gray-600 hover:text-gray-900"
  //         >
  //           Forgot your password?
  //         </Link>

  //         <Button className="ml-3">Login</Button>
  //       </div>
  //     </form>
  //   </>
  // );
  return (
    <Section className="items-center justify-center flex-1 gap-y-sm sm:!py-md relative">
      <Brief>Login to your account</Brief>
      {status && <AuthSessionStatus className="" status={status} />}
      <LoginForm />
      <p className="z-[1]">
        Dont have an account?{" "}
        <span>
          <Link className="underline   underline-offset-4" href={"/register"}>
            Sign Up
          </Link>
        </span>
      </p>
    </Section>
  );
}
