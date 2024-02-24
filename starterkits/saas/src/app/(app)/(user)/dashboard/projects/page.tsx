import { getUser } from "@/server/auth";

export default async function ProjectsPage() {
    const user = await getUser();

    return (
        <div>
            <h1>Projects</h1>
            <p>{JSON.stringify(user)}</p>
        </div>
    );
}
