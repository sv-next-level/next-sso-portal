"use client";

import * as z from "zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { OTP } from "@/const/label";
import { OTPSchema } from "@/schemas/auth";
import { PROCESS_MODE } from "@/config/site";
import { Button } from "@/components/ui/button";
import { NAVIGATION } from "@/const/navigation";
import { AuthForm } from "@/components/form/auth";
import { CardWrapper } from "@/components/card/card-wrapper";
import { BtnNavigation } from "@/components/button/navigation";
import { InputOTPField } from "@/components/form/field/input-otp";
import { ContentFooter } from "@/components/content/content-footer";

export const OTPForm = (props: any) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof OTPSchema>>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      [OTP.OTP.NAME]: "",
    },
  });

  const onSubmit = (values: z.infer<typeof OTPSchema>) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
    startTransition(() => {
      if (props.process.flow === PROCESS_MODE.LOGIN) {
        props.setForm(() => PROCESS_MODE.LOGIN);
      } else if (props.process.flow === PROCESS_MODE.REGISTER) {
        props.setForm(() => PROCESS_MODE.PASSWORD);
      } else if (props.process.flow === PROCESS_MODE.RESET) {
        props.setForm(() => PROCESS_MODE.PASSWORD);
      }
    });
  };

  return (
    <CardWrapper headerLabel={OTP.HEADER}>
      <AuthForm form={form} onSubmit={onSubmit} disabled={isPending}>
        <InputOTPField
          form={form}
          name={OTP.OTP.NAME}
          label={OTP.OTP.LABEL}
          length={OTP.OTP.LENGTH}
          description={OTP.OTP.DESCRIPTION}
        />
      </AuthForm>
      <ContentFooter>
        {props.process ? (
          <Button size="sm" variant="link" className="p-0 font-normal">
            00:30
          </Button>
        ) : (
          <Button size="sm" variant="link" className="p-0 font-normal">
            {NAVIGATION.OTP_AGAIN}
          </Button>
        )}
        <BtnNavigation
          label={NAVIGATION.LOGIN}
          flow={PROCESS_MODE.LOGIN}
          setProcess={props.setProcess}
        />
      </ContentFooter>
    </CardWrapper>
  );
};
