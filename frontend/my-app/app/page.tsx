import fetchData from './utils/fetchData';
import Link from 'next/link';

interface Conference {
  id: number;
  title: string;
  slug: string;
}

export default async function HomePage() {
  const data = await fetchData();
  
  if (!data) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">All Conferences</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {data.data.map((conference: Conference) => (
          <Link key={conference.id} href={`/${conference.slug}`}>
            <div className="rounded-lg p-4 shadow-sm bg-blue-500 hover:shadow-md transition cursor-pointer">
              <h2 className="text-xl font-semibold text-white">{conference.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}