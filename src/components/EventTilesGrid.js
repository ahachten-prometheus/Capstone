import EventTiles from "./EventTiles";

export default function EventTilesGrid({ eventList }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-8">
      {eventList?.length > 0 ? (
        eventList.map((theEvent) => (
          <EventTiles key={theEvent.id} event={theEvent} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">No upcoming events...</p>
      )}
    </div>
  );
}
