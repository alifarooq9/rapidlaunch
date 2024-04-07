"use server";

export async function getRepoStars() {
    const response = await fetch(
        "https://api.github.com/repos/afarooq-oss/rapidlaunch",
        {
            next: {
                revalidate: 86400,
            },
        },
    );

    const data: unknown = await response.json();
    const stars: number = (data as { stargazers_count?: number })
        ?.stargazers_count
        ? Number((data as { stargazers_count?: number }).stargazers_count)
        : 0;

    return stars;
}
