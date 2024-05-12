import { AuthForm } from "@/app/auth/_components/auth-form";
import { signupPageConfig } from "@/app/auth/signup/_constants/page-config";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: signupPageConfig.title,
    description: signupPageConfig.description,
};

export default function Signup() {
    return <AuthForm type="signup" />;
}
