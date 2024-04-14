"use client";

import * as z from "zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OTP } from "@/const/label";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { OTPSchema } from "@/schemas/auth";
import { PROCESS_MODE } from "@/config/site";
import { Button } from "@/components/ui/button";
import { NAVIGATION } from "@/const/navigation";
import { CardWrapper } from "@/components/card-wrapper";
import { BtnProceed } from "@/components/button/proceed";
import { BtnNavigation } from "@/components/button/navigation";

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-center space-y-4">
            <FormField
              control={form.control}
              name={OTP.OTP.NAME}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{OTP.OTP.LABEL}</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={4} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="w-[244px] sm:w-full">
                    {OTP.OTP.DESCRIPTION}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <BtnProceed disabled={isPending} />
        </form>
      </Form>
      <div className="mt-1 flex justify-between">
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
