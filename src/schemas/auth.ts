import * as z from "zod";

import { ZOD } from "@/const/error";
import * as LABEL from "@/const/label";
import { emailBlacklistedCharsRegex, numbersOnlyRegex } from "@/const/regexp";

export const LoginSchema = z
  .object({
    [LABEL.LOGIN.EMAIL.NAME]: z
      .string()
      .min(1, {
        message: ZOD.EMAIL.REQUIRED,
      })
      .email({
        message: ZOD.EMAIL.INVALID,
      }),
    [LABEL.LOGIN.PASSWORD.NAME]: z.string().min(1, {
      message: ZOD.PASSWORD.REQUIRED,
    }),
    [LABEL.LOGIN.PORTAL.NAME]: z.string({
      required_error: ZOD.PORTAL.SELECT,
    }),
  })
  .refine(
    (data) => !emailBlacklistedCharsRegex.test(data[LABEL.LOGIN.EMAIL.NAME]),
    {
      message: ZOD.EMAIL.MODIFIER,
      path: [LABEL.LOGIN.EMAIL.NAME],
    }
  );

export const RegisterSchema = z
  .object({
    [LABEL.REGISTER.EMAIL.NAME]: z
      .string()
      .min(1, {
        message: ZOD.EMAIL.REQUIRED,
      })
      .email({
        message: ZOD.EMAIL.INVALID,
      }),
    [LABEL.REGISTER.FIRST_NAME.NAME]: z.string().min(1, {
      message: ZOD.NAME.REQUIRED.FIRST,
    }),
    [LABEL.REGISTER.LAST_NAME.NAME]: z.string().min(1, {
      message: ZOD.NAME.REQUIRED.LAST,
    }),
  })
  .refine(
    (data) => !emailBlacklistedCharsRegex.test(data[LABEL.REGISTER.EMAIL.NAME]),
    {
      message: ZOD.EMAIL.MODIFIER,
      path: [LABEL.REGISTER.EMAIL.NAME],
    }
  );

export const OTPSchema = z
  .object({
    [LABEL.OTP.OTP.NAME]: z.string().length(6, { message: ZOD.OTP.LENGTH_6 }),
  })
  .refine((data) => !numbersOnlyRegex.test(data[LABEL.OTP.OTP.NAME].trim()), {
    message: ZOD.OTP.NUM_ONLY,
    path: [LABEL.OTP.OTP.NAME],
  });

export const ResetPasswordSchema = z
  .object({
    [LABEL.RESET.EMAIL.NAME]: z
      .string()
      .min(1, {
        message: ZOD.EMAIL.REQUIRED,
      })
      .email({
        message: ZOD.EMAIL.INVALID,
      }),
  })
  .refine(
    (data) => !emailBlacklistedCharsRegex.test(data[LABEL.RESET.EMAIL.NAME]),
    {
      message: ZOD.EMAIL.MODIFIER,
      path: [LABEL.RESET.EMAIL.NAME],
    }
  );

export const CreatePasswordSchema = z
  .object({
    [LABEL.PASSWORD.PASSWORD.NAME]: z
      .string()
      .min(1, {
        message: ZOD.PASSWORD.REQUIRED,
      })
      .min(6, {
        message: ZOD.PASSWORD.MINIMUM_6,
      }),
    [LABEL.PASSWORD.CONFIRM.NAME]: z
      .string()
      .min(1, {
        message: ZOD.PASSWORD.REQUIRED,
      })
      .min(6, {
        message: ZOD.PASSWORD.MINIMUM_6,
      }),
  })
  .refine(
    (data) =>
      data[LABEL.PASSWORD.PASSWORD.NAME] === data[LABEL.PASSWORD.CONFIRM.NAME],
    {
      message: ZOD.PASSWORD.MATCH,
      path: [LABEL.PASSWORD.CONFIRM.NAME],
    }
  );
