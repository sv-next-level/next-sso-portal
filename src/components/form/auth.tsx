"use client";

import { SubmitHandler, UseFormReturn } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { BtnProceed } from "@/components/button/proceed";

interface AuthProps {
  form: UseFormReturn<
    {
      [x: string]: string;
    },
    any,
    undefined
  >;
  disabled: boolean;
  children: React.ReactNode;
  onSubmit: SubmitHandler<{ [x: string]: string }>;
}

export const AuthForm = (props: Readonly<AuthProps>) => {
  return (
    <Form {...props.form}>
      <form
        onSubmit={props.form.handleSubmit(props.onSubmit)}
        className="space-y-6"
      >
        <div className="space-y-4">{props.children}</div>
        <BtnProceed disabled={props.disabled} />
      </form>
    </Form>
  );
};
