'use client';
import { useState, useEffect } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';

export default function Events() {
	const [visibleEvents, setVisibleEvents] = useState([]); // holds only the events currently shown
	const [hasMore, setHasMore] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const PAGE_SIZE = 6;
	const [offset, setOffset] = useState(''); // tracking # of events displayed
	const [search, setSearch] = useState('')
	
	// this is the filtered search events based on the users input
	const filteredEvents = visibleEvents.filter(event =>
		event.Description.toLowerCase().includes(search.toLowerCase()) || 
		event.Name.toLowerCase().includes(search.toLowerCase())
	)

	async function fetchEvents(nextOffset = '') {
		if (isLoading || !hasMore) return;
		setIsLoading(true);
	

		//URlSearchParams auto converts values to string
		try {
			const params = new URLSearchParams({
				pageSize: PAGE_SIZE,
				...(nextOffset && { offset: nextOffset }),
				...(search && { search }) //adds the searched term to the parameteres if it exists
			});

			const res = await fetch(`/api/events?${params.toString()}`);
			const [data, error]  = await res.json();
			console.log('API Response:', data);
			// If the API returns an array directly
			if (Array.isArray(data)) {
				setVisibleEvents((prev) => [...prev, ...data]);
				setHasMore(data.length === PAGE_SIZE);
			}
			// If the API returns an object with records
			else if (Array.isArray(data?.records)) {
				setVisibleEvents((prev) => [...prev, ...data.records]);
				setOffset(data.offset || '');
				setHasMore(Boolean(data.offset));
			} else {
				console.error('Unexpected API response structure:', data);
			}
		} catch (error) {
			console.error('Error fetching events:', error);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchEvents();
	}, []);

	useEffect(() => {
		console.log(search, filteredEvents)
	}, [search])

	return (
		<>
			{/* Header */}
			<section
				className="w-screen w-[1440px] h-[407px] flex items-center justify-center"
				style={{ backgroundColor: '#C96C86B0' }}
			>
				<h1
					id="events-hero-header"
					className="text-[2.5rem] font-bold text-white"
				>
					{' '}
					Upcoming Events
				</h1>
			</section>

			{/* Main Body */}
			<main
				className=" text-black flex flex-col items-center justify-center"
				style={{ backgroundColor: '#FFF5EA' }}
			>
				{/* Tiles Header */}
				<h3
					id="events-tiles-header"
					className=" w-4/5 mx-auto border-b-1 border-black text-2xl font-bold text-black flex justify-center pt-8"
				>
					Upcoming Events & Webinar{' '}
				</h3>

				 {/* Search Box */}
            <div className="max-w-[360px] mt-4 mb-6 px-6 self-start">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none ">
                        <HiMagnifyingGlass className="h-4 w-4 text-black" />
                        </span>
                        
                        <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="block w-full pl-8 pr-2 py-1.5 text-sm bg-white border focus:outline-none focus:ring-1 focus:ring-pink-500"
                        />
                </div>
            </div>

				{/* Tiles*/}
				<section id="events-display" className="py-10 px-[130px]">
					<p>--Tiles here--</p>

					<ul>
					{filteredEvents.length === 0 ? ( // if the filtered events function has nothing
						<li>No events found</li> // return "No events found'
					) : (
						filteredEvents.map((event) => ( // else display the name and description
							<li key={event.id}>
								{event.Name} - {event.Description}
							</li>
						))
					)}
					</ul>
				</section>

				{/* Load More Button*/}
				{/* hides button if hasMore is not true */}
				{hasMore && (
					<button
						id="more-events"
						className=" bg-[#B36078] hover:bg-[#C96C86B0] text-white font-bold py-2 px-4 rounded-full m-6"
						onClick={() => fetchEvents(offset)}
					>
						{isLoading ? 'Loading more events..' : 'Load More'}
					</button>
				)}
			</main>
		</>
	);
}
