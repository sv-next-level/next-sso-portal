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
import { REGISTER } from "@/const/label";
import { PROCESS_MODE } from "@/config/site";
import { Input } from "@/components/ui/input";
import { NAVIGATION } from "@/const/navigation";
import { RegisterSchema } from "@/schemas/auth";
import { CardWrapper } from "@/components/card-wrapper";
import { BtnProceed } from "@/components/button/proceed";
import { BtnNavigation } from "@/components/button/navigation";

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name={REGISTER.FIRST_NAME.NAME}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{REGISTER.FIRST_NAME.LABEL}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={REGISTER.FIRST_NAME.TYPE}
                      disabled={isPending}
                      placeholder={REGISTER.FIRST_NAME.PLACEHOLDER}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={REGISTER.LAST_NAME.NAME}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{REGISTER.LAST_NAME.LABEL}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={REGISTER.LAST_NAME.TYPE}
                      disabled={isPending}
                      placeholder={REGISTER.LAST_NAME.PLACEHOLDER}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={REGISTER.EMAIL.NAME}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{REGISTER.EMAIL.LABEL}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={REGISTER.EMAIL.TYPE}
                      disabled={isPending}
                      placeholder={REGISTER.EMAIL.PLACEHOLDER}
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
