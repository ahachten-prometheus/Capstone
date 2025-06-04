"use client";

export default function Events() {

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
      
      </main>

  </>;
}