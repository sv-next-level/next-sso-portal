"use client";

import * as z from "zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PASSWORD } from "@/const/label";
import { PROCESS_MODE } from "@/config/site";
import { NAVIGATION } from "@/const/navigation";
import { AuthForm } from "@/components/form/auth";
import { CreatePasswordSchema } from "@/schemas/auth";
import { CardWrapper } from "@/components/card/card-wrapper";
import { BtnNavigation } from "@/components/button/navigation";
import { ContentFooter } from "@/components/content/content-footer";
import { InputRegularField } from "@/components/form/field/input-regular";

export const CreatePasswordForm = (props: any) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreatePasswordSchema>>({
    resolver: zodResolver(CreatePasswordSchema),
    defaultValues: {
      [PASSWORD.PASSWORD.NAME]: "",
      [PASSWORD.CONFIRM.NAME]: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CreatePasswordSchema>) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
    startTransition(() => {
      if (
        props.process.flow === PROCESS_MODE.RESET ||
        props.process.flow === PROCESS_MODE.REGISTER
      ) {
        props.setForm(() => PROCESS_MODE.LOGIN);
      }
    });
  };

  return (
    <CardWrapper headerLabel={PASSWORD.HEADER}>
      <AuthForm form={form} onSubmit={onSubmit} disabled={isPending}>
        <InputRegularField
          form={form}
          disabled={isPending}
          name={PASSWORD.PASSWORD.NAME}
          type={PASSWORD.PASSWORD.TYPE}
          label={PASSWORD.PASSWORD.LABEL}
          placeholder={PASSWORD.PASSWORD.PLACEHOLDER}
        />
        <InputRegularField
          form={form}
          disabled={isPending}
          name={PASSWORD.CONFIRM.NAME}
          type={PASSWORD.CONFIRM.TYPE}
          label={PASSWORD.CONFIRM.LABEL}
          placeholder={PASSWORD.CONFIRM.PLACEHOLDER}
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
