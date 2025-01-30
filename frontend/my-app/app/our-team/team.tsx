async function getTeamMembers() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const path = "/api/team-members";

  const url = new URL(path, baseUrl);

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch team members");

  const data = await res.json();
  console.log(data);

  return data;
}

export default async function OurTeam() {
  const teamMembers = await getTeamMembers();
  console.log(teamMembers);

  return (
    <div>
      <h1>Our Team</h1>
      <pre>{JSON.stringify(teamMembers, null, 2)} </pre>
    </div>
  );
}