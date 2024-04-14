"use client";

import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface InputRegularFieldProps {
  form: UseFormReturn<
    {
      [x: string]: string;
    },
    any,
    undefined
  >;
  name: string;
  type: string;
  label: string;
  disabled: boolean;
  placeholder: string;
}

export const InputRegularField = (props: Readonly<InputRegularFieldProps>) => {
  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={props.type}
              disabled={props.disabled}
              placeholder={props.placeholder}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
