export const SiteConfig = {
  name: "Next Authentication",
  description: "Next level authentication.",
};

export const LoginLink = {
  title: "Login",
  href: "/login",
  description: "Login page",
};

export const RegisterLink = {
  title: "Register",
  href: "/register",
  description: "Register page",
};

export const ForgotLink = {
  title: "Forgot",
  href: "/forgot",
  description: "Forgot page",
};

export const OTPLink = {
  title: "OTP",
  href: "/otp",
  description: "OTP page",
};

export const PasswordLink = {
  title: "Password",
  href: "/password",
  description: "Password page",
};

export const AllLinks = [
  LoginLink,
  RegisterLink,
  ForgotLink,
  PasswordLink,
  OTPLink,
];

export enum PROCESS_MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET = "RESET",
  OTP = "OTP",
  PASSWORD = "PASSWORD",
}
