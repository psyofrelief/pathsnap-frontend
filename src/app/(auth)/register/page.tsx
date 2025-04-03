"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { useState } from "react";
import RegisterForm from "@/components/forms/RegisterForm";
import Brief from "@/components/ui/Brief";
import Section from "@/components/ui/Section";

const Page = () => {
  const { register } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);

  const submitForm = (event) => {
    event.preventDefault();

    register({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
    });
  };

  return (
    <Section className="items-center justify-center flex-1 gap-y-sm sm:!py-md relative">
      <Brief>Sign up for an account</Brief>
      <RegisterForm />
      <p className="z-[1]">
        Already have an account?{" "}
        <span>
          <Link className="underline underline-offset-4" href={"/login"}>
            Login
          </Link>
        </span>
      </p>
    </Section>
  );
};

export default Page;
