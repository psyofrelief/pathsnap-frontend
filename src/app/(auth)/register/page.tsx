"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import InputError from "@/components/InputError";
import Label from "@/components/Label";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { useState } from "react";
import RegisterForm from "@/components/forms/RegisterForm";
import Brief from "@/components/ui/Brief";
import Section from "@/components/ui/Section";

const Page = () => {
  const { register } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
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
    <Section className="items-center justify-center flex-1 gap-lg relative">
      <Brief>Login to your account</Brief>
      <RegisterForm />
      <p>
        Dont have an account?{" "}
        <span>
          <Link className="underline underline-offset-4" href={"/register"}>
            Sign Up
          </Link>
        </span>
      </p>
    </Section>
  );
};

export default Page;
