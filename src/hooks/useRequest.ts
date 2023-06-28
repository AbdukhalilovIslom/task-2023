import { useCallback } from "react";
import { baseUrl } from "../data";

type method = "POST" | "GET" | "PUT" | "DELETE";

export const useHttp = () => {
  const request = useCallback(
    async (
      url: string,
      method: method = "GET",
      headers: {} = {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: string | null = null
    ) => {
      try {
        const response = await fetch(baseUrl + url, {
          method,
          headers,
          body,
        });
        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    []
  );
  return { request };
};
