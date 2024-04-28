"use server";

import { URL } from "@/config/env";
import axios from "axios";

export const createPassword = async (values: any) => {
  try {
    const data: any = values;
    const method: string = "POST";
    const url: string = `${URL.GATEWAY}/api/create`;
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
