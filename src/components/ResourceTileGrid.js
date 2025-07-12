import ResourceTiles from "./ResourceTiles";

export default function ResourceTileGrid({ resources }) {
  return (
    <>
      <div>
        {resources.length > 0 ? (
          <div className='grid mx-auto justify-items-center md:grid-cols-4 gap-4 max-w-[1200px]'>
            {resources.map((data, idx) => (
              <ResourceTiles
                key={data.id}
                resource={data}
                tileIdx={idx}
              />
            ))}
          </div>
        ) : (
          <p>No Resources Available</p>
        )}
      </div>
    </>
  );
}
