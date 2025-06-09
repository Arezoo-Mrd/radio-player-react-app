import type { SuccessResponse } from "~/types/api.types";

export const fetchInstance = async <T>(opt: {
 path: string | URL;
 options: RequestInit;
 isRetry?: boolean;
 baseUrl?: string;
 isFormData?: boolean;
}): Promise<T | undefined> => {
 const modifiedOptions: RequestInit = {
  ...opt.options,
  headers: {
   ...(opt.options.headers || {}),
   "Content-Type": "application/json",
   Accept: "application/json",
  },
 };

 const baseUrl = opt.baseUrl || import.meta.env.VITE_BASE_URL;

 try {
  if (!baseUrl) throw new Error("Base URL is not defined");

  const response = await fetch(`${baseUrl}${opt.path}`, modifiedOptions);
  const contentType = response.headers.get("Content-Type");
  const isJson = contentType?.includes("application/json");

  if (!response.ok) {
   throw new Error("An error occurred");
  }

  const responseData: SuccessResponse<T> | string = isJson
   ? ((await response.json()) as SuccessResponse<T>)
   : ((await response.text()) as string);

  if (typeof responseData === "string") {
   throw new Error(responseData);
  }

  return responseData.data;
 } catch (error: any) {
  console.log("error");
  throw error;
 }
};
