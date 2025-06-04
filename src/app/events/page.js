"use client";
import { useState, useEffect } from "react";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch('/api/events');
      const data = await res.json();
      console.log(data);
      setEvents(data)
    }
  
    fetchEvents();
  }, []);

  const handleLoadMore = (event) => {
    console.log("Load More was clicked on");
  }

  return <>
    {/* Header */}
    <section 
      className="w-screen, w-[1440px], h-[407px] flex items-center justify-center"
      style={{ backgroundColor: '#C96C86B0' }}>
      <h1 id="events-hero-header" className="text-[2.5rem] font-bold text-white"> Upcoming Events</h1> 
    </section>

    {/* Main Body */}
    <main 
      className=" text-black, flex flex-col items-center justify-center" 
      style={{ backgroundColor: '#FFF5EA' }}>

      {/* Tiles Header */}
      <h3 
      id="events-tiles-header" 
      className=" w-4/5 mx-auto, border-b-1 border-black, text-2xl font-bold text-black , flex justify-center pt-8">
      Upcoming Events & Webinar </h3>

      {/* Tiles*/}
      <section 
      id="events-display" 
      className="pt-10 pb-10 pl-130 pr-130">
        <p>--Tiles here--</p>

      {/* Testing API*/}
        <ul>
      {events.map(event => (
        <li key={event.id}>{event.Name} - {event.Description} </li>
      ))}
        </ul>
      </section>

      {/* Load More Button*/}
      <button 
      id="more-events"
      className=" bg-[#B36078] hover:bg-[#C96C86B0], text-white font-bold, py-2 px-4 rounded-full, m-6"
      onClick={handleLoadMore}>
        Load More
      </button>

      </main>

  </>;
}