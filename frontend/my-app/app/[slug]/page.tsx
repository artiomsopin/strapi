import fetchData from '../utils/fetchData';

interface Zone {
  id: number;
  title: string;
  text?: string; 
  __component: "components.first-component" | "components.second-component";
}

interface PageItem {
  id: number;
  title: string;
  slug: string;
  zone?: Zone[]; 
}

export default async function PageDetails({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    return <p className="text-center text-red-500">No member found</p>;
  }

  const data = await fetchData(params.slug);
  console.log("Fetched Data:", data.data);

  if (!data) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Page Details</h1>

      {data.data.map((item: PageItem) => (
        <div key={item.id} className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm bg-white">
          <p className="text-lg font-semibold text-gray-800">ID: {item.id}</p>
          <p className="text-lg font-semibold text-blue-600">Title: {item.title}</p>
          <p className="text-gray-600">Slug: {item.slug}</p>

          {/* Handle zones */}
          {item.zone && (
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-700">Zones:</p>
              <ul className="list-disc list-inside text-gray-600">
                {item.zone.map((zone) => (
                  <li key={zone.id} className="ml-4">
                    {zone.__component === "components.second-component" && (
                      <>
                        <strong>Second Component - Title:</strong> {zone.title}
                      </>
                    )}
                    {zone.__component === "components.first-component" && (
                      <>
                        <strong>First Component - Title:</strong> {zone.title} <br />
                        <strong>Text:</strong> {zone.text}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}