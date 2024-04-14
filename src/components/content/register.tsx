"use client";

import * as z from "zod";
import { useTransition } from "react";
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

export const RegisterForm = (props: any) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      [REGISTER.FIRST_NAME.NAME]: "",
      [REGISTER.LAST_NAME.NAME]: "",
      [REGISTER.EMAIL.NAME]: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
    startTransition(() => {
      if (props.process.flow === PROCESS_MODE.REGISTER) {
        props.setForm(() => PROCESS_MODE.OTP);
      }
    });
  };

  return (
    <CardWrapper headerLabel={REGISTER.HEADER}>
      <AuthForm form={form} onSubmit={onSubmit} disabled={isPending}>
        <InputRegularField
          form={form}
          disabled={isPending}
          name={REGISTER.FIRST_NAME.NAME}
          type={REGISTER.FIRST_NAME.TYPE}
          label={REGISTER.FIRST_NAME.LABEL}
          placeholder={REGISTER.FIRST_NAME.PLACEHOLDER}
        />
        <InputRegularField
          form={form}
          disabled={isPending}
          name={REGISTER.LAST_NAME.NAME}
          type={REGISTER.LAST_NAME.TYPE}
          label={REGISTER.LAST_NAME.LABEL}
          placeholder={REGISTER.LAST_NAME.PLACEHOLDER}
        />
        <InputRegularField
          form={form}
          disabled={isPending}
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
      </ContentFooter>
    </CardWrapper>
  );
};
