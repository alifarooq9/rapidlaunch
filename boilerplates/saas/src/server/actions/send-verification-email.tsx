"use server";

import { type SendVerificationRequestParams } from "next-auth/providers/email";
import { resend } from "@/server/resend";
import { siteConfig } from "@/config/site";
import VerficationEmailTemplate from "@/emails/verification-email";
import { render } from "@react-email/components";

interface SendVerificationEmailProps {
    params: SendVerificationRequestParams;
}

// Send a verification email to the user
export async function sendVerificationEmail({
    params,
}: SendVerificationEmailProps) {
    try {
        //send email to user via resend
        await resend.emails.send({
            from: siteConfig.noReplyEmail,
            to: params.identifier,
            subject: `Verify your email address | ${siteConfig.name}`,
            html: render(
                VerficationEmailTemplate({
                    url: params.url,
                }),
            ),
        });
    } catch (error) {
        throw new Error("Failed to send verification email");
    }
}
