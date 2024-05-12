import { AuthForm } from "@/app/auth/_components/auth-form";
import { loginPageConfig } from "@/app/auth/login/_constants/page-config";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: loginPageConfig.title,
    description: loginPageConfig.description,
};

export default function Login() {
    return <AuthForm type="login" />;
}
