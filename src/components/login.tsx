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
import { LoginSchema } from "@/schemas/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/card-wrapper";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    // setError("");
    // setSucces("");

    startTransition(async () => {
      // await login(values)
      //   .then((data: any | undefined) => {
      //     if (data?.error) {
      //       // form.reset();
      //       setError(data.error);
      //       if (show2FA && data.error === "Invalid credentials!") {
      //         // setShow2FA(false);
      //       } else {
      //         setError(data.error);
      //       }
      //     }
      //     if (data?.success) {
      //       // form.reset();
      //       setSucces(data.success);
      //     }
      //     if (data?.twoFactor) {
      //       setShow2FA(true);
      //     }
      //   })
      //   .catch((error: any) => {
      //     setError(error.message);
      //   });
    });
  };

  return (
    <CardWrapper headerLabel="Welcome back">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      disabled={isPending}
                      placeholder="john.doe@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="portal"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Login to</FormLabel> */}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={"dashboard"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select portal to login" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="dashboard">
                        Next Dashboard Portal
                      </SelectItem>
                      <SelectItem defaultChecked value="trading">
                        Next Trading Portal
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {false && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        maxLength={6}
                        disabled={isPending}
                        placeholder="123456"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <Button type="submit" disabled={isPending} className="w-full">
            Proceed
          </Button>
        </form>
      </Form>
      <div className="mt-1 flex justify-between">
        <Button size="sm" variant="link" className="p-0 font-normal">
          Create new account?
        </Button>
        <Button size="sm" variant="link" className="p-0 font-normal">
          Forgot password?
        </Button>
      </div>
    </CardWrapper>
  );
};
