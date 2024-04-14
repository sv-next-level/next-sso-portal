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
import { PASSWORD } from "@/const/label";
import { PROCESS_MODE } from "@/config/site";
import { Input } from "@/components/ui/input";
import { NAVIGATION } from "@/const/navigation";
import { CreatePasswordSchema } from "@/schemas/auth";
import { CardWrapper } from "@/components/card-wrapper";
import { BtnProceed } from "@/components/button/proceed";
import { BtnNavigation } from "@/components/button/navigation";

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name={PASSWORD.PASSWORD.NAME}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{PASSWORD.PASSWORD.LABEL}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={PASSWORD.PASSWORD.TYPE}
                      disabled={isPending}
                      placeholder={PASSWORD.PASSWORD.PLACEHOLDER}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={PASSWORD.CONFIRM.NAME}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{PASSWORD.CONFIRM.LABEL}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={PASSWORD.CONFIRM.TYPE}
                      disabled={isPending}
                      placeholder={PASSWORD.CONFIRM.PLACEHOLDER}
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
