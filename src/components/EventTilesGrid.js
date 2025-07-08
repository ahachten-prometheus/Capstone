import EventTile from './EventTile';

export default function EventTilesGrid({ eventList }) {
	return (
		<div className="grid gap-10 px-6 sm:px-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'}}>
			{eventList?.length > 0 ? (
				eventList.map((theEvent) => (
					<EventTile key={theEvent.id} event={theEvent} />
				))
			) : (
				<p className="col-span-full text-center text-gray-500">
					No upcoming events...
				</p>
			)}
		</div>
	);
}
