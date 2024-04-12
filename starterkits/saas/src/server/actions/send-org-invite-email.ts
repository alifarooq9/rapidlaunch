"use server";

import { resend } from "@/server/resend";
import { siteConfig } from "@/config/site";
import { siteUrls } from "@/config/urls";
import { z } from "zod";

const sendOrgInviteEmailProps = z.object({
    email: z.string().email("Please enter a valid email address"),
    orgName: z.string(),
    invLink: z.string(),
});

type sendOrgInviteEmailProps = z.infer<typeof sendOrgInviteEmailProps>;

// Send a verification email to the user

export async function sendOrgInviteEmail({
    email,
    orgName,
    invLink,
}: sendOrgInviteEmailProps) {
    const { success } = sendOrgInviteEmailProps.safeParse({
        email,
        orgName,
        invLink,
    });

    if (!success) {
        throw new Error("Invalid email");
    }

    try {
        //send email to user via resend
        await resend.emails.send({
            from: siteConfig.noReplyEmail,
            to: email,
            subject: `You have been Inited to a Team | ${siteConfig.name}`,
            html: `
                <div>
                    <a href="${siteUrls.rapidlaunch}">${siteConfig.name}</a>
                    <h1>🪄 Your Invite to ${orgName}</h1>
                    <p>
                        You have been invited to join ${orgName}
                        Click the link below to verify to join ${orgName} on ${siteConfig.name}.
                    </p>
                    <a href="${invLink}">Join Organisation</a>

                    <p> or </p>

                    <p>
                        Copy and paste the following link in your browser:
                        <br />
                        ${invLink}
                    </p>

                    <hr />
                    <p>
                        If you didn't request this email, you can ignore it.
                    </p>
                </div>`,
            text: `Click the link below to join the orgaisation. ${invLink}`,
            tags: [
                {
                    name: "category",
                    value: "confirm_email",
                },
            ],
        });
    } catch (error) {
        throw new Error("Failed to send verification email");
    }
}
