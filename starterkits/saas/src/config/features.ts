/**
 * This file contains the features data for the features page.
 *
 * @add a new feature, add a new object to the `features` array.
 * 1. Add id to the features object then use it as the id of the new feature object.
 * 2. Add title and inludedIn to the new feature object. (inludedIn is an array of pricing plan ids that include this feature)
 * 3. Add description to the new feature object.
 * 4. Add image to the new feature object.
 * 5. Add imageDark to the new feature object. (optional)
 */

export type Feature = {
    title: string;
    description: string;
    image: string;
    imageDark?: string;
};

export const features: Feature[] = [
    {
        title: "Dashboard",
        description:
            "Rapidlaunch provides a powerful dashboard that allows you to manage your SaaS project. With our starterkits, components, and building guides, you can quickly set up a robust dashboard for your project.",
        image: "https://utfs.io/f/43bbc3c8-cf3c-4fae-a0eb-9183f1779489-294m81.png",
        imageDark:
            "https://utfs.io/f/fddea366-51c6-45f4-bd54-84d273ad9fb9-1ly324.png",
    },
    {
        title: "Authentication",
        description:
            "Rapidlaunch provides a secure authentication system that allows users to sign up and log in to your SaaS. With our starterkits, components, and building guides, you can quickly set up a robust authentication system for your project.",
        image: "https://utfs.io/f/805616c1-22b8-4508-9890-9ba9e2867a41-p24dnn.png",
        imageDark:
            "https://utfs.io/f/9074c0de-d9ea-4c0b-9d49-55dca1253a3f-6ig3yq.png",
    },
    {
        title: "Organizational level Payments",
        description:
            "Rapidlaunch provides a flexible payment system that allows you to manage your SaaS project's payments. With our starterkits, components, and building guides, you can quickly set up a robust payment system for your project.",
        image: "https://utfs.io/f/43bbc3c8-cf3c-4fae-a0eb-9183f1779489-294m81.png",
        imageDark:
            "https://utfs.io/f/fddea366-51c6-45f4-bd54-84d273ad9fb9-1ly324.png",
    },
    {
        title: "User Management",
        description:
            "Rapidlaunch provides a user management system that allows you to manage your SaaS project's users. With our starterkits, components, and building guides, you can quickly set up a robust user management system for your project.",
        image: "https://utfs.io/f/72a2c035-69e0-46ca-84a8-446e4dabf77c-3koi6e.png",
        imageDark:
            "https://utfs.io/f/89099112-4273-4375-9e44-1b3394600e21-c6ikq1.png",
    },
];
