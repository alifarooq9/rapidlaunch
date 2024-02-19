import { env } from "@/env";
import { Resend } from "resend";

// Create a new instance of Resend
export const resend = new Resend(env.RESEND_API_KEY);
