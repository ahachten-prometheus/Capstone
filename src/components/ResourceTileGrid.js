import ResourceTiles from "./ResourceTiles";

export default function ResourceTileGrid({resources}) {


  return (
  <>
    <div className="grid grid-cols-4 gap-4">
      {resources.length > 0 ? (
        resources.map((data) => (
        <ResourceTiles key={data.id} resource={data} />
      ))
      ) : (
      <p>no resource ;-;</p>
      )}
    </div>
  </>
)
}