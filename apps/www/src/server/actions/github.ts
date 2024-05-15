import { siteConfig } from "@/config/site";

export async function getGithubRepoStars() {
    const response = await fetch(
        `https://api.github.com/repos/${siteConfig.githubOwner}/${siteConfig.githubRepo}`,
    );

    const data: unknown = await response.json();
    const stars: number = (data as { stargazers_count?: string })
        ?.stargazers_count
        ? Number((data as { stargazers_count?: string }).stargazers_count)
        : 0;

    return stars;
}
