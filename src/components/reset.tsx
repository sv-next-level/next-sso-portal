"use client";

import * as z from "zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RESET } from "@/const/label";
import { PROCESS_MODE } from "@/config/site";
import { Input } from "@/components/ui/input";
import { NAVIGATION } from "@/const/navigation";
import { ResetPasswordSchema } from "@/schemas/auth";
import { CardWrapper } from "@/components/card-wrapper";
import { BtnProceed } from "@/components/button/proceed";
import { BtnNavigation } from "@/components/button/navigation";

export const ResetPasswordForm = (props: any) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      [RESET.EMAIL.NAME]: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
    startTransition(() => {
      if (props.process.flow === PROCESS_MODE.RESET) {
        props.setForm(() => PROCESS_MODE.OTP);
      }
    });
  };

  return (
    <CardWrapper headerLabel={RESET.HEADER}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name={RESET.EMAIL.NAME}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{RESET.EMAIL.LABEL}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={RESET.EMAIL.TYPE}
                      disabled={isPending}
                      placeholder={RESET.EMAIL.PLACEHOLDER}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <BtnProceed disabled={isPending} />
        </form>
      </Form>
      <div className="mt-1 flex justify-between">
        <BtnNavigation
          label={NAVIGATION.REGISTER}
          onClick={() =>
            props.setProcess((prev: any) => ({
              ...prev,
              flow: PROCESS_MODE.REGISTER,
            }))
          }
        />
        <BtnNavigation
          label={NAVIGATION.LOGIN}
          onClick={() =>
            props.setProcess((prev: any) => ({
              ...prev,
              flow: PROCESS_MODE.LOGIN,
            }))
          }
        />
      </div>
    </CardWrapper>
  );
};
