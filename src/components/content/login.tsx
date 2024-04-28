"use client";

import * as z from "zod";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LOGIN } from "@/const/label";
import { PORTAL } from "@/const/portal";
import { login, sendOTP } from "@/action";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

    if ("verification" in res.data && res.data.verification) {
      const otpRes = await sendOTP({
        email: values.email,
        portal: values.portal,
      });

      const obj = {
        user_id: res.data.userId,
        portal: res.data.portal,
        relay_id: otpRes.data.relay_id,
        expires_after: otpRes.data.expires_after,
      };
      props.setHeap((prev: any) => {
        return { ...prev, ...obj };
      });

      if (props.process.flow === PROCESS_MODE.LOGIN) {
        props.setForm(PROCESS_MODE.OTP);
      }
      return "2FA email sent successfully";
    }
    return res;
  };

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      try {
        setIsLoading(true);
        toast.promise(promise(values), {
          loading: "Loading...",
          success: (data: any) => {
            return data;
          },
          error: (data) => {
            return data.message;
          },
        });
      } catch (error) {
        console.log("🚀 ~ startTransition ~ error:", error);
      } finally {
        setIsLoading(false);
      }
    });
  };

  return (
    <CardWrapper headerLabel={LOGIN.HEADER}>
      <AuthForm
        form={form}
        onSubmit={onSubmit}
        disabled={isPending || isLoading}
      >
        <InputRegularField
          form={form}
          disabled={isPending || isLoading}
          name={LOGIN.EMAIL.NAME}
          type={LOGIN.EMAIL.TYPE}
          label={LOGIN.EMAIL.LABEL}
          placeholder={LOGIN.EMAIL.PLACEHOLDER}
        />
        <InputRegularField
          form={form}
          disabled={isPending || isLoading}
          name={LOGIN.PASSWORD.NAME}
          type={LOGIN.PASSWORD.TYPE}
          label={LOGIN.PASSWORD.LABEL}
          placeholder={LOGIN.PASSWORD.PLACEHOLDER}
        />
        <InputDropDownField
          form={form}
          options={PORTAL}
          disabled={isPending || isLoading}
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
