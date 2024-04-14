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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LOGIN } from "@/const/label";
import { LoginSchema } from "@/schemas/auth";
import { PROCESS_MODE } from "@/config/site";
import { Input } from "@/components/ui/input";
import { NAVIGATION } from "@/const/navigation";
import { CardWrapper } from "@/components/card-wrapper";
import { BtnProceed } from "@/components/button/proceed";
import { BtnNavigation } from "@/components/button/navigation";

export const LoginForm = (props: any) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      [LOGIN.EMAIL.NAME]: "",
      [LOGIN.PASSWORD.NAME]: "",
      [LOGIN.PORTAL.NAME]: "dashboard",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
    startTransition(() => {
      if (props.process.flow === PROCESS_MODE.LOGIN) {
        props.setForm(PROCESS_MODE.OTP);
      }
    });
  };

  return (
    <CardWrapper headerLabel={LOGIN.HEADER}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name={LOGIN.EMAIL.NAME}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{LOGIN.EMAIL.LABEL}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={LOGIN.EMAIL.TYPE}
                      disabled={isPending}
                      placeholder={LOGIN.EMAIL.PLACEHOLDER}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={LOGIN.PASSWORD.NAME}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{LOGIN.PASSWORD.LABEL}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={LOGIN.PASSWORD.TYPE}
                      disabled={isPending}
                      placeholder={LOGIN.PASSWORD.PLACEHOLDER}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={LOGIN.PORTAL.NAME}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{LOGIN.PORTAL.LABEL}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={"dashboard"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={LOGIN.PORTAL.PLACEHOLDER} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="dashboard">Dashboard</SelectItem>
                      <SelectItem value="trading">Trading</SelectItem>
                    </SelectContent>
                  </Select>
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
          label={NAVIGATION.FORGOT}
          onClick={() =>
            props.setProcess((prev: any) => ({
              ...prev,
              flow: PROCESS_MODE.RESET,
            }))
          }
        />
      </div>
    </CardWrapper>
  );
};
