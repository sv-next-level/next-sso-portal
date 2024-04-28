"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RESET } from "@/const/label";
import { PROCESS_MODE } from "@/config/site";
import { NAVIGATION } from "@/const/navigation";
import { AuthForm } from "@/components/form/auth";
import { ResetPasswordSchema } from "@/schemas/auth";
import { CardWrapper } from "@/components/card/card-wrapper";
import { BtnNavigation } from "@/components/button/navigation";
import { ContentFooter } from "@/components/content/content-footer";
import { InputRegularField } from "@/components/form/field/input-regular";
import { forgotPassword, sendOTP } from "@/action";
import { toast } from "sonner";
import { PORTAL } from "@/const/portal";

export const ResetPasswordForm = (props: any) => {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      [RESET.EMAIL.NAME]: "",
    },
  });
  const promise = async (values: z.infer<typeof ResetPasswordSchema>) => {
    const res = await forgotPassword(values);

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

      if (props.process.flow === PROCESS_MODE.RESET) {
        props.setForm(PROCESS_MODE.OTP);
      }
      return "2FA email sent successfully";
    }
    return res;
  };

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
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
    <CardWrapper headerLabel={RESET.HEADER}>
      <AuthForm
        form={form}
        onSubmit={onSubmit}
        disabled={isPending || isLoading}
      >
        <InputRegularField
          form={form}
          disabled={isPending || isLoading}
          name={RESET.EMAIL.NAME}
          type={RESET.EMAIL.TYPE}
          label={RESET.EMAIL.LABEL}
          placeholder={RESET.EMAIL.PLACEHOLDER}
        />
      </AuthForm>
      <ContentFooter>
        <BtnNavigation
          label={NAVIGATION.REGISTER}
          flow={PROCESS_MODE.REGISTER}
          setProcess={props.setProcess}
        />
        <BtnNavigation
          label={NAVIGATION.LOGIN}
          flow={PROCESS_MODE.LOGIN}
          setProcess={props.setProcess}
        />
      </ContentFooter>
    </CardWrapper>
  );
};
