import fetchData from "../utils/fetchData";

interface Zone {
  id: number;
  header: string;
  description?: string;
  __component:
    | "components.header"
    | "components.description"
    | "components.image";
}

interface PageItem {
  id: number;
  title: string;
  slug: string;
  zone?: Zone[];
}

export default async function PageDetails({
  params,
}: {
  params: { slug: string };
}) {
  if (!params.slug) {
    return <p className="text-center text-red-500">No member found</p>;
  }

  const data = await fetchData(params.slug);
  console.log("Fetched Data:", data.data);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      {data.data.map((item: PageItem) => (
        <div key={item.id}>
          {item.zone && (
            <>
              {item.zone.map((zone) => (
                <div key={zone.id}>
                  {zone.__component === "components.header" && (
                    <div className="bg-blue-500 py-6">
                      <h1 className="text-4xl font-bold text-center">{zone.header}</h1>
                    </div>
                  )}

                  {zone.__component === "components.description" && (
                    <div className="container mx-auto px-4 py-6">
                      <p className="text-lg break-words">{zone.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
}