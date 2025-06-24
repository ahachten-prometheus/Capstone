import ResourceTiles from "./ResourceTiles";

export default function ResourceTileGrid({ resources }) {
  return (
    <>
    <div>
      {resources.length > 0 ? (
        <div className='grid mx-auto justify-items-center grid-cols-4 gap-4 max-w-[1200px]'>
          {resources.map(data => (
            <ResourceTiles
              key={data.id}
              resource={data}
            />
          ))}
        </div>
      ) : (
        <p>no resource ;-;</p>
      )}
    </div>
    </>
  );
}
