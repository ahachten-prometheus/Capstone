import ResourceTiles from "./ResourceTiles";

export default function ResourceTileGrid({ resources }) {
  return (
    <>
      {resources.length > 0 ? (
        <div className='grid grid-cols-4 gap-4'>
          {resources.map(data => (
            <ResourceTiles
              key={data.id}
              resource={data}
            />
          ))}
        </div>
      ) : (
        <p>No Resources Available</p>
      )}
    </>
  );
}
