import { Icons } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { siteUrls } from "@/config/urls";
import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";

interface SendVerificationEmailTemplateProps {
    url: string;
}

export default function VerificationEmailTemplate({
    url,
}: SendVerificationEmailTemplateProps) {
    return (
        <Html>
            <Tailwind>
                <Head />
                <Preview>Log in with this magic link.</Preview>

                <Body className="bg-white font-sans text-black dark:bg-black dark:text-white">
                    <Container>
                        <Link
                            href={siteUrls.publicUrl}
                            className="flex items-center gap-2"
                        >
                            <Icons.logo className="h-6 w-6 fill-[#0041DD]" />
                            <span className="text-xl font-semibold text-black dark:text-white">
                                {siteConfig.name}
                            </span>
                        </Link>
                        <Heading>🪄 Your magic link</Heading>
                        <Section>
                            <Text>
                                <Link
                                    href={url}
                                    className="rounded-md bg-[#0041DD] px-4 py-2 text-white"
                                >
                                    Click here to sign in
                                </Link>
                            </Text>
                            <Text>
                                Or copy and paste the following link into your
                                browser:
                            </Text>
                            <Link href={url}>{url}</Link>
                            <Text>
                                If you didn&apos;t request this, please ignore
                                this email.
                            </Text>
                        </Section>
                        <Text>
                            Best,
                            <br />- {siteConfig.name} Team
                        </Text>
                        <Hr className="border-gray-500" />

                        <Text>{siteConfig.name}</Text>
                        <Link href={siteUrls.publicUrl} className="text-sm">
                            {siteUrls.publicUrl}
                        </Link>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
