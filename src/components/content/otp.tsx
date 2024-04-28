"use client";

import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { OTP } from "@/const/label";
import { OTPSchema } from "@/schemas/auth";
import { PROCESS_MODE } from "@/config/site";
import { Button } from "@/components/ui/button";
import { NAVIGATION } from "@/const/navigation";
import { AuthForm } from "@/components/form/auth";
import { CardWrapper } from "@/components/card/card-wrapper";
import { BtnNavigation } from "@/components/button/navigation";
import { InputOTPField } from "@/components/form/field/input-otp";
import { ContentFooter } from "@/components/content/content-footer";
import { toast } from "sonner";
import { resendOTP, token, verifyOTP } from "@/action";
import { PORTAL } from "@/const/portal";
import { URL } from "@/config/env";

export const OTPForm = (props: any) => {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [time, setTime] = useState<number>(
    (new Date(props.heap.expires_after).getTime() - new Date().getTime()) / 1000
  );
  const [minutes, setMinutes] = useState<number>(Math.floor(time / 60));
  const [seconds, setSeconds] = useState<number>(Math.floor(time % 60));

  const form = useForm<z.infer<typeof OTPSchema>>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      [OTP.OTP.NAME]: "",
    },
  });

  // https://stackoverflow.com/questions/40885923/countdown-timer-in-react
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const submit = async (values: any) => {
    const obj = {
      data: values.otp,
      relayId: props.heap.relay_id,
    };
    const res = await verifyOTP(obj);

    if ("verification" in res.data && res.data.verification) {
      if (props.process.flow === PROCESS_MODE.LOGIN) {
        const tokenRes = await token({
          userId: props.heap.user_id,
          portal: props.heap.portal,
        });

        if ("token" in tokenRes.data && tokenRes.data.token) {
          let url: string;
          switch (props.heap.portal) {
            case PORTAL.DASHBOARD:
              url = String(`${URL.DASHBOARD}?token=${tokenRes.data.token}`);
              break;
            case PORTAL.TRADING:
              url = String(`${URL.TRADING}?token=${tokenRes.data.token}`);
              break;
            default:
              return "Invalid portal";
          }

          window.location.href = url;
          return `Redirecting to ${props.heap.portal.toLowerCase()}`;
        } else {
          props.setForm(() => PROCESS_MODE.LOGIN);
          throw new Error("Failed to generate token");
        }
      } else {
        props.setForm(() => PROCESS_MODE.PASSWORD);
        return "OTP Verified";
      }
    }
    throw new Error("Invalid OTP");
  };

  const resend = async (values: any) => {
    const res = await resendOTP(values);

    const obj = {
      relay_id: res.data.relay_id,
      expires_after: res.data.expires_after,
    };
    props.setHeap((prev: any) => {
      return { ...prev, ...obj };
    });

    setTime(
      (new Date(res.data.expires_after).getTime() - new Date().getTime()) / 1000
    );
    setMinutes(Math.floor(time / 60));
    setSeconds(Math.floor(time % 60));

    return "2FA email resent successfully";
  };

  const onSubmit = (values: z.infer<typeof OTPSchema>) => {
    startTransition(() => {
      try {
        setIsLoading(true);
        toast.promise(submit(values), {
          loading: "Loading...",
          success: (data: any) => {
            return data;
          },
          error: (data) => {
            return data.message;
          },
        });
      } catch (error) {
        console.log("🚀 ~ startTransition ~ error:", error);
      } finally {
        setIsLoading(false);
      }
    });
  };

  const onResend = () => {
    const values = {
      relayId: props.heap.relay_id,
    };
    startTransition(() => {
      try {
        setIsLoading(true);
        toast.promise(resend(values), {
          loading: "Loading...",
          success: (data: any) => {
            return data;
          },
          error: (data) => {
            return data.message;
          },
        });
      } catch (error) {
        console.log("🚀 ~ startTransition ~ error:", error);
      } finally {
        setIsLoading(false);
      }
    });
  };

  return (
    <CardWrapper headerLabel={OTP.HEADER}>
      <AuthForm
        form={form}
        onSubmit={onSubmit}
        disabled={isPending || isLoading}
      >
        <InputOTPField
          form={form}
          disabled={isPending || isLoading}
          name={OTP.OTP.NAME}
          label={OTP.OTP.LABEL}
          length={OTP.OTP.LENGTH}
          description={OTP.OTP.DESCRIPTION}
        />
      </AuthForm>
      <ContentFooter>
        {minutes || seconds ? (
          <Button
            size="sm"
            variant="link"
            className="cursor-default p-0 font-normal"
          >
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </Button>
        ) : (
          <Button
            size="sm"
            variant="link"
            onClick={onResend}
            disabled={isPending || isLoading}
            className="p-0 font-normal"
          >
            {NAVIGATION.OTP_AGAIN}
          </Button>
        )}
        <BtnNavigation
          label={NAVIGATION.LOGIN}
          flow={PROCESS_MODE.LOGIN}
          setProcess={props.setProcess}
        />
      </ContentFooter>
    </CardWrapper>
  );
};
