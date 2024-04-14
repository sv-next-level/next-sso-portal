"use client";

import * as z from "zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LOGIN } from "@/const/label";
import { PORTAl } from "@/const/portal";
import { LoginSchema } from "@/schemas/auth";
import { PROCESS_MODE } from "@/config/site";
import { NAVIGATION } from "@/const/navigation";
import { AuthForm } from "@/components/form/auth";
import { CardWrapper } from "@/components/card/card-wrapper";
import { BtnNavigation } from "@/components/button/navigation";
import { ContentFooter } from "@/components/content/content-footer";
import { InputRegularField } from "@/components/form/field/input-regular";
import { InputDropDownField } from "@/components/form/field/input-drop-down";

export const LoginForm = (props: any) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      [LOGIN.EMAIL.NAME]: "",
      [LOGIN.PASSWORD.NAME]: "",
      [LOGIN.PORTAL.NAME]: PORTAl.DASHBOARD,
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
    startTransition(() => {
      if (props.process.flow === PROCESS_MODE.LOGIN) {
        props.setForm(PROCESS_MODE.OTP);
      }
    });
  };

  return (
    <CardWrapper headerLabel={LOGIN.HEADER}>
      <AuthForm form={form} onSubmit={onSubmit} disabled={isPending}>
        <InputRegularField
          form={form}
          disabled={isPending}
          name={LOGIN.EMAIL.NAME}
          type={LOGIN.EMAIL.TYPE}
          label={LOGIN.EMAIL.LABEL}
          placeholder={LOGIN.EMAIL.PLACEHOLDER}
        />
        <InputRegularField
          form={form}
          disabled={isPending}
          name={LOGIN.PASSWORD.NAME}
          type={LOGIN.PASSWORD.TYPE}
          label={LOGIN.PASSWORD.LABEL}
          placeholder={LOGIN.PASSWORD.PLACEHOLDER}
        />
        <InputDropDownField
          form={form}
          options={PORTAl}
          name={LOGIN.PORTAL.NAME}
          label={LOGIN.PORTAL.LABEL}
          placeholder={LOGIN.PORTAL.PLACEHOLDER}
        />
      </AuthForm>
      <ContentFooter>
        <BtnNavigation
          label={NAVIGATION.REGISTER}
          flow={PROCESS_MODE.REGISTER}
          setProcess={props.setProcess}
        />
        <BtnNavigation
          label={NAVIGATION.FORGOT}
          flow={PROCESS_MODE.RESET}
          setProcess={props.setProcess}
        />
      </ContentFooter>
    </CardWrapper>
  );
};
