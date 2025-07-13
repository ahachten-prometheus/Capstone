'use client';
import { useState, useEffect } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import EventTilesGrid from '../../components/EventTilesGrid';
import eventsBanner from '../../../public/eventsBanner.png';
import default1 from '../../../public/default1.jpg';
import default2 from '../../../public/default2.jpg';
import default3 from '../../../public/default3.jpg';
import default4 from '../../../public/default4.jpg';
import default5 from '../../../public/default5.jpg';
import default6 from '../../../public/default6.jpg';
import default7 from '../../../public/default7.jpg';
import default8 from '../../../public/default8.jpg';
import default9 from '../../../public/default9.jpg';
import default10 from '../../../public/default10.jpg';
import default11 from '../../../public/default11.jpg';

export default function Events() {
	const [events, setEvents] = useState([]); // holds only the events currently shown
	const [hasMore, setHasMore] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const PAGE_SIZE = 6;
	const [offset, setOffset] = useState(''); // tracking # of events displayed
	const [search, setSearch] = useState('');
	const [imageIndex, setImageIndex] = useState(0);

	async function fetchEvents(nextOffset = '', searchParam = search) {
		if (isLoading || !hasMore) return;
		setIsLoading(true);

		try {
			const params = new URLSearchParams({
				pageSize: PAGE_SIZE,
				...(nextOffset && { offset: nextOffset }),
				...(searchParam && { search: searchParam }),
			});

			const res = await fetch(`/api/events?${params.toString()}`);
			const [data, error] = await res.json();
			console.log('API Response:', data);

			if (Array.isArray(data?.records)) {
				let currentIndex = imageIndex;

				// Add default images to events that don't have one
				const eventsWithImages = data.records.map((event) => {
					const withImage = {
						...event,
						'Image URL':
							event['Image URL'] ||
							defaultImages[currentIndex % defaultImages.length].src,
					};
					currentIndex++;
					return withImage;
				});

				setImageIndex(currentIndex);
				setEvents((prev) =>
					nextOffset ? [...prev, ...eventsWithImages] : eventsWithImages
				);
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
		setEvents([]);
		setOffset('');
		setHasMore(true);
		setImageIndex(0);
		fetchEvents('', search);
	}, [search]);

	const defaultImages = [
		default1,
		default2,
		default3,
		default4,
		default5,
		default6,
		default7,
		default8,
		default9,
		default10,
		default11,
	];
	return (
		<>
			{/* Header */}
			<section
				className="w-screen aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/9] lg:aspect-[32/9] flex items-center justify-center bg-cover bg-top bg-no-repeat"
				style={{
					backgroundImage: `url(${eventsBanner.src})`,
					backgroundPosition: 'center 10%',
				}}
			>
				<h1
					id="events-hero-header"
					className="text-[2.5rem] font-bold text-white"
				>
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

				{/* Shared Wrapper - Both your search bar and your cards will start at the same left edge */}
				<section className="w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[130px]">
					{/* Search Box */}
					<div className="mt-4 mb-6">
						<div className="relative max-w-sm">
							<span className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
								<HiMagnifyingGlass className="h-4 w-4 text-black" />
							</span>

							<input
								type="text"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="block w-full pl-8 pr-2 py-1.5 text-sm bg-white border focus:outline-none focus:ring-1 focus:ring-pink-500"
								aria-label="Search for events"
							/>
						</div>
					</div>

					{/* Tiles */}
					<section
						id="events-display"
						className="py-10"
						aria-labelledby="events-tiles-header"
					>
						{events.length === 0 && !isLoading ? (
							<div className="text-center text-gray-500 py-8">
								No events found
							</div>
						) : (
							<EventTilesGrid eventList={events} />
						)}
					</section>
				</section>
				{/* Load More Button*/}
				{/* hides button if hasMore is not true */}
				{hasMore && (
					<button
						id="more-events"
						className=" bg-[#B36078] hover:bg-[#C96C86B0] text-white font-bold py-2 px-4 rounded-full m-6"
						onClick={() => fetchEvents(offset, search)}
						disabled={isLoading}
						aria-label="Load more events"
					>
						{isLoading ? 'Loading more events..' : 'Load More'}
					</button>
				)}
			</main>
		</>
	);
}
