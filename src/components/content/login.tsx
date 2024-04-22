"use client";

import * as z from "zod";
import { toast } from "sonner";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LOGIN } from "@/const/label";
import { PORTAL } from "@/const/portal";
import { LoginSchema } from "@/schemas/auth";
import { PROCESS_MODE } from "@/config/site";
import { NAVIGATION } from "@/const/navigation";
import { AuthForm } from "@/components/form/auth";
import { CardWrapper } from "@/components/card/card-wrapper";
import { BtnNavigation } from "@/components/button/navigation";
import { ContentFooter } from "@/components/content/content-footer";
import { InputRegularField } from "@/components/form/field/input-regular";
import { InputDropDownField } from "@/components/form/field/input-drop-down";
import { login } from "@/action/login";
import { URL } from "@/config/env";

export const LoginForm = (props: any) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      [LOGIN.EMAIL.NAME]: "",
      [LOGIN.PASSWORD.NAME]: "",
      [LOGIN.PORTAL.NAME]: PORTAL.DASHBOARD,
    },
  });

  const promise = async (values: z.infer<typeof LoginSchema>) => {
    const res = await login(values);
    return res;
  };

  const selectPortalLink = (portal: string): string => {
    switch (portal) {
      case PORTAL.DASHBOARD:
        return URL.DASHBOARD;
      case PORTAL.TRADING:
        return URL.TRADING;
      default:
        return "";
    }
  };

  const onSuccess = (data: string, portal: string) => {
    console.log("🚀 ~ success ~ data:", data);
    console.log("🚀 ~ success ~ portal:", portal);
    const url = selectPortalLink(portal);
    window.location.replace(`${url}?data=${data}`);
  };

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      try {
        toast.promise(promise(values), {
          loading: "Loading...",
          success: (data: string) => {
            onSuccess(data, values.portal);
            return `Login successfully`;
          },
          error: (data) => {
            return `${data.message}`;
          },
        });

        if (props.process.flow === PROCESS_MODE.LOGIN) {
          props.setForm(PROCESS_MODE.OTP);
        }
      } catch (error) {
        console.log("🚀 ~ startTransition ~ error:", error);
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
          options={PORTAL}
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
