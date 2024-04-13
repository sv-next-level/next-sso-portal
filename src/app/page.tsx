"use client";

import { useEffect, useState } from "react";

import { OTPForm } from "@/components/otp";
import { PROCESS_MODE } from "@/config/site";
import { LoginForm } from "@/components/login";
import { RegisterForm } from "@/components/register";
import { ResetPasswordForm } from "@/components/reset";
import { CreatePasswordForm } from "@/components/password";

export default function Home() {
  const [process, setProcess] = useState<{ flow: PROCESS_MODE }>({
    flow: PROCESS_MODE.LOGIN,
  });
  const [form, setForm] = useState<PROCESS_MODE>(PROCESS_MODE.LOGIN);
  const [currentForm, setCurrentForm] = useState<JSX.Element | null>(null);

  const loginForm: JSX.Element = (
    <LoginForm setForm={setForm} process={process} setProcess={setProcess} />
  );

  const registerForm: JSX.Element = (
    <RegisterForm setForm={setForm} process={process} setProcess={setProcess} />
  );

  const resetPasswordForm: JSX.Element = (
    <ResetPasswordForm
      setForm={setForm}
      process={process}
      setProcess={setProcess}
    />
  );

  const OtpForm: JSX.Element = (
    <OTPForm setForm={setForm} process={process} setProcess={setProcess} />
  );

  const createPasswordForm: JSX.Element = (
    <CreatePasswordForm
      setForm={setForm}
      process={process}
      setProcess={setProcess}
    />
  );

  const current = (mode: PROCESS_MODE) => {
    switch (mode) {
      case PROCESS_MODE.LOGIN:
        return loginForm;
      case PROCESS_MODE.REGISTER:
        return registerForm;
      case PROCESS_MODE.RESET:
        return resetPasswordForm;
      case PROCESS_MODE.OTP:
        return OtpForm;
      case PROCESS_MODE.PASSWORD:
        return createPasswordForm;
      default:
        return loginForm;
    }
  };

  useEffect(() => {
    console.log("🚀 ~ Home ~ process:", process);
    setCurrentForm(current(process.flow));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [process]);

  useEffect(() => {
    console.log("🚀 ~ Home ~ form:", form);
    setCurrentForm(current(form));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  return (
    <main className="container flex min-h-screen flex-col items-center justify-center border-4 border-red-500">
      {currentForm}
    </main>
  );
}
