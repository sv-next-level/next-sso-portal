"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { REGISTER } from "@/const/label";
import { PROCESS_MODE } from "@/config/site";
import { NAVIGATION } from "@/const/navigation";
import { RegisterSchema } from "@/schemas/auth";
import { AuthForm } from "@/components/form/auth";
import { CardWrapper } from "@/components/card/card-wrapper";
import { BtnNavigation } from "@/components/button/navigation";
import { ContentFooter } from "@/components/content/content-footer";
import { InputRegularField } from "@/components/form/field/input-regular";
import { register, sendOTP } from "@/action";
import { toast } from "sonner";
import { PORTAL } from "@/const/portal";

export const RegisterForm = (props: any) => {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      [REGISTER.FIRST_NAME.NAME]: "",
      [REGISTER.LAST_NAME.NAME]: "",
      [REGISTER.EMAIL.NAME]: "",
    },
  });

  const promise = async (values: z.infer<typeof RegisterSchema>) => {
    const res = await register(values);

    if ("userId" in res.data && res.data.userId) {
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

      if (props.process.flow === PROCESS_MODE.REGISTER) {
        props.setForm(PROCESS_MODE.OTP);
      }
      return "2FA email sent successfully";
    }
    return res;
  };

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      try {
        setIsLoading(true);
        toast.promise(
          promise({
            ...values,
            portal: PORTAL.DASHBOARD,
          }),
          {
            loading: "Loading...",
            success: (data: any) => {
              return data;
            },
            error: (data) => {
              return data.message;
            },
          }
        );
      } catch (error) {
        console.log("🚀 ~ startTransition ~ error:", error);
      } finally {
        setIsLoading(false);
      }
    });
  };

  return (
    <CardWrapper headerLabel={REGISTER.HEADER}>
      <AuthForm
        form={form}
        onSubmit={onSubmit}
        disabled={isPending || isLoading}
      >
        <InputRegularField
          form={form}
          disabled={isPending || isLoading}
          name={REGISTER.FIRST_NAME.NAME}
          type={REGISTER.FIRST_NAME.TYPE}
          label={REGISTER.FIRST_NAME.LABEL}
          placeholder={REGISTER.FIRST_NAME.PLACEHOLDER}
        />
        <InputRegularField
          form={form}
          disabled={isPending || isLoading}
          name={REGISTER.LAST_NAME.NAME}
          type={REGISTER.LAST_NAME.TYPE}
          label={REGISTER.LAST_NAME.LABEL}
          placeholder={REGISTER.LAST_NAME.PLACEHOLDER}
        />
        <InputRegularField
          form={form}
          disabled={isPending || isLoading}
          name={REGISTER.EMAIL.NAME}
          type={REGISTER.EMAIL.TYPE}
          label={REGISTER.EMAIL.LABEL}
          placeholder={REGISTER.EMAIL.PLACEHOLDER}
        />
      </AuthForm>
      <ContentFooter>
        <BtnNavigation
          label={NAVIGATION.LOGIN}
          flow={PROCESS_MODE.LOGIN}
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
