"use client";

import { UseFormReturn } from "react-hook-form";

import {
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

interface InputOTPField {
  form: UseFormReturn<
    {
      [x: string]: string;
    },
    any,
    undefined
  >;
  name: string;
  label: string;
  length: number;
  description: string;
}

export const InputOTPField = (props: Readonly<InputOTPField>) => {
  const inputOTPSlotList: JSX.Element[] = (() => {
    const slots: JSX.Element[] = [];
    for (let i = 0; i < props.length; i++) {
      slots.push(
        <InputOTPGroup key={i}>
          <InputOTPSlot index={i} />
        </InputOTPGroup>
      );
    }
    return slots;
  })();

  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <InputOTP maxLength={props.length} {...field}>
              {inputOTPSlotList}
            </InputOTP>
          </FormControl>
          <FormDescription className="w-[244px] sm:w-full">
            {props.description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
