import { OTPForm } from "@/components/otp";
import { LoginForm } from "@/components/login";
import { RegisterForm } from "@/components/register";
import { ResetPasswordForm } from "@/components/reset";
import { CreatePasswordForm } from "@/components/password";

export default function Home() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-between border-4 border-red-500 p-24">
      <LoginForm />
      <RegisterForm />
      <OTPForm />
      <ResetPasswordForm />
      <CreatePasswordForm />
    </main>
  );
}
