"use server";

import { URL } from "@/config/env";
import { LoginSchema } from "@/schemas/auth";
import axios from "axios";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  const url: string = `${URL.GATEWAY}/auth/login`;
  const data: any = values;
  const method: string = "POST";
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await axios(url, {
    data: data,
    method: method,
    headers: headers,
  });

  console.log("🚀 ~ authorize ~ res:", response);
  const res = response.data;

  if ("status" in res) {
    console.log("🚀 ~ login ~ res:", res.message);
    throw new Error(res.message);
  }
  return res;
};
