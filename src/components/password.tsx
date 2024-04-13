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
import { PROCESS_MODE } from "@/config/site";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreatePasswordSchema } from "@/schemas/auth";
import { CardWrapper } from "@/components/card-wrapper";

export const CreatePasswordForm = (props: any) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreatePasswordSchema>>({
    resolver: zodResolver(CreatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CreatePasswordSchema>) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
    startTransition(() => {
      if (props.process.flow === PROCESS_MODE.REGISTER) {
        props.setForm(() => PROCESS_MODE.LOGIN);
      } else if (props.process.flow === PROCESS_MODE.RESET) {
        props.setForm(() => PROCESS_MODE.LOGIN);
      }
    });
  };

  return (
    <CardWrapper headerLabel="Create new password">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      disabled={isPending}
                      placeholder="******"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      disabled={isPending}
                      placeholder="******"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isPending} className="w-full">
            Proceed
          </Button>
        </form>
      </Form>
      <div className="mt-1 flex justify-between">
        <Button
          size="sm"
          variant="link"
          className="p-0 font-normal"
          onClick={() =>
            props.setProcess((prev: any) => ({
              ...prev,
              flow: PROCESS_MODE.REGISTER,
            }))
          }
        >
          Create new account?
        </Button>
        <Button
          size="sm"
          variant="link"
          className="p-0 font-normal"
          onClick={() =>
            props.setProcess((prev: any) => ({
              ...prev,
              flow: PROCESS_MODE.LOGIN,
            }))
          }
        >
          Back to login?
        </Button>
      </div>
    </CardWrapper>
  );
};
