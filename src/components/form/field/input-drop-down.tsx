"use client";

import { UseFormReturn } from "react-hook-form";

import {
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
import { Capitalize } from "@/lib/utils";

interface InputDropDownFieldProps {
  form: UseFormReturn<
    {
      [x: string]: string;
    },
    any,
    undefined
  >;
  name: string;
  label: string;
  options: {
    [x: string]: string;
  };
  disabled: boolean;
  placeholder: string;
}

export const InputDropDownField = (
  props: Readonly<InputDropDownFieldProps>
) => {
  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={props.form.getValues(props.name)}
          >
            <FormControl>
              <SelectTrigger disabled={props.disabled}>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.values(props.options).map((option: string) => {
                return (
                  <SelectItem key={option} value={option}>
                    {Capitalize(option)}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
