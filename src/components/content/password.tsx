"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
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
import { PORTAL } from "@/const/portal";
import { toast } from "sonner";
import { createPassword } from "@/action";

export const CreatePasswordForm = (props: any) => {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof CreatePasswordSchema>>({
    resolver: zodResolver(CreatePasswordSchema),
    defaultValues: {
      [PASSWORD.PASSWORD.NAME]: "",
      [PASSWORD.CONFIRM.NAME]: "",
    },
  });

  const promise = async (values: z.infer<typeof CreatePasswordSchema>) => {
    const res = await createPassword(values);

    if (
      "userId" in res.data &&
      res.data.userId &&
      "passwordId" in res.data &&
      res.data.passwordId
    ) {
      if (
        props.process.flow === PROCESS_MODE.RESET ||
        props.process.flow === PROCESS_MODE.REGISTER
      ) {
        props.setProcess(() => PROCESS_MODE.LOGIN);
        props.setForm(() => PROCESS_MODE.LOGIN);
      }
      return "Password generated, please login.";
    }
    return res;
  };

  const onSubmit = (values: z.infer<typeof CreatePasswordSchema>) => {
    startTransition(() => {
      try {
        setIsLoading(true);
        toast.promise(
          promise({
            ...values,
            userId: props.heap.user_id,
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
    <CardWrapper headerLabel={PASSWORD.HEADER}>
      <AuthForm
        form={form}
        onSubmit={onSubmit}
        disabled={isPending || isLoading}
      >
        <InputRegularField
          form={form}
          disabled={isPending || isLoading}
          name={PASSWORD.PASSWORD.NAME}
          type={PASSWORD.PASSWORD.TYPE}
          label={PASSWORD.PASSWORD.LABEL}
          placeholder={PASSWORD.PASSWORD.PLACEHOLDER}
        />
        <InputRegularField
          form={form}
          disabled={isPending || isLoading}
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
