"use server";

import axios from "axios";
import { URL } from "@/config/env";

export const sendOTP = async (values: any) => {
  try {
    const data: any = values;
    const method: string = "POST";
    const url: string = `${URL.GATEWAY}/api/otp/send`;
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await axios(url, {
      data: data,
      method: method,
      headers: headers,
    });

    const res = response.data;

    if (res.error) {
      throw res.error;
    }

    return res;
  } catch (error: any) {
    if ("error" in error) {
      throw new Error(error.error);
    }
    throw new Error(error.message);
  }
};

export const resendOTP = async (values: any) => {
  try {
    const data: any = values;
    const method: string = "POST";
    const url: string = `${URL.GATEWAY}/api/otp/resend`;
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await axios(url, {
      data: data,
      method: method,
      headers: headers,
    });

    const res = response.data;

    if (res.error) {
      throw res.error;
    }

    return res;
  } catch (error: any) {
    if ("error" in error) {
      throw new Error(error.error);
    }
    throw new Error(error.message);
  }
};

export const verifyOTP = async (values: any) => {
  try {
    const data: any = values;
    const method: string = "POST";
    const url: string = `${URL.GATEWAY}/api/otp/verify`;
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await axios(url, {
      data: data,
      method: method,
      headers: headers,
    });

    const res = response.data;

    if (res.error) {
      throw res.error;
    }

    return res;
  } catch (error: any) {
    if ("error" in error) {
      throw new Error(error.error);
    }
    throw new Error(error.message);
  }
};
