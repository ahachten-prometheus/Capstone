import Image from "next/image";

export default function Home() {
  return <div className="flex flex-col">
    {/* first Section */}
    <section className="flex flex-col items-center justify-center gap-3 relative h-165">
      <div className="bg-black w-screen h-screen z-1 opacity-50 relative">
        <Image src="/womenSitting.jpg" alt="Women Sitting" fill={true} className="object-none max-sm:object-cover max-sm:object-left max-xl:object-cover" priority={true} />
      </div>

      <div className="flex flex-col absolute z-2 items-center justify-center">
        <h1 className="text-wrap font-bold text-4xl w-150 text-center tracking-wide max-sm:text-base max-sm:w-70">Find the right support, from providers who understand you</h1>
        <a href="/question/1" className="bg-[#C96C86] text-xl py-3 px-26 rounded-3xl translate-y-8 cursor-pointer transition-transform duration-300 hover:scale-105 max-sm:text-sm max-sm:px-16">Start My Search</a>
      </div>
    </section>

    {/* second Section */}
    <section className="flex flex-col justify-center items-center h-180 bg-[#FFF5EA] gap-10 max-sm:gap-7 max-xl:gap-6">
      <div>
        <h1 className="text-black text-center font-bold text-4xl max-sm:text-sm max-xl:text-xl">Care rooted in our stories, made for us</h1>
      </div>

      <div className="flex justify-center items-center gap-50 border-t-1 border-black p-10 max-sm:flex-wrap max-sm:gap-10 max-sm:p-5 max-xl:gap-5 max-xl:p-5 max-xl:flex-wrap">
        <div className="flex flex-col gap-10 items-center justify-center max-sm:gap-3 max-xl:gap-3">
          <div className="flex justify-center w-30 h-30 rounded-[50%] border-[#C96C86] border-3 max-sm:w-20 max-sm:h-20 max-sm:border-transparent max-xl:w-20 max-xl:h-20 max-xl:border-transparent">
            <Image src="/volumeIcon.png" alt="Volume-Icon" width={200} height={150} className="object-cover max-sm:w-40 max-sm:h-20 max-xl:w-40 max-xl:h-20" />
          </div>
          <div className="flex items-center justify-center ">
            <p className="w-75 text-center text-black text-2xl max-sm:text-sm max-xl:text-sm">
              You deserve a space where your voice, identity, and healing matter.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-17 items-center justify-center max-sm:gap-3 max-xl:gap-3">
          <div className="flex justify-center w-30 h-30 rounded-[50%] border-[#C96C86] border-3 max-sm:w-20 max-sm:h-20 max-sm:border-transparent max-xl:w-20 max-xl:h-20 max-xl:border-transparent">
            <Image src="/handShakeIcon.png" alt="Handshake-Icon" width={200} height={150} className="object-cover max-sm:w-40 max-sm:h-20 max-xl:w-40 max-xl:h-20" />
          </div>
          <div className="flex align-center justify-center">
            <p className="w-75 text-center text-black text-2xl max-sm:text-sm max-xl:text-sm">
              Connect with providers who understand your story
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-10 max-sm:gap-3 max-xl:gap-3">
          <div className="flex justify-center w-30 h-30 rounded-[50%] border-[#C96C86] border-3 max-sm:w-20 max-sm:h-20 max-sm:border-transparent max-xl:w-20 max-xl:h-20 max-xl:border-transparent">
            <Image src="/healingIcon.png" alt="Healing-Icon" width={200} height={200} className="object-cover max-sm:w-40 max-sm:h-20 max-xl:w-40 max-xl:h-20" />
          </div>
          <div className="flex align-center justify-center">
            <p className="w-65 text-center text-black text-2xl max-sm:text-sm max-xl:text-sm">
              Healing starts with being heard—find your therapist today.
            </p>
          </div>

        </div>
      </div>
    </section>

    {/* third section */}
    <section className="flex flex-row justify-center h-180 bg-[#C96C86] items-center gap-40 max-sm:flex-wrap max-sm:gap-20 max-xl:flex-wrap max-xl:gap-20">
      <div className="max-sm:flex max-sm:flex-col max-xl:flex max-xl:flex-col">
        <div className="flex flex-col gap-10">
          <h1 className="pb-1 text-4xl font-bold max-sm:flex max-sm:justify-center max-sm:text-xl max-sm:pt-10 max-xl:flex max-xl:justify-center max-xl:text-xl max-xl:pt-10">PROVIDERS</h1>
          <p className="text-wrap font-light w-120 leading-6 text-[18px] max-sm:text-xs max-sm:w-70 max-sm:text-center max-xl:text-xs max-xl:w-70 max-xl:text-center">
            {`Find culturally responsive, affirming therapists who understand the unique experiences of Black women and girls.
            Whether you’re seeking individual support or family counseling, these providers are here to walk with you on your mental wellness journey.`}
          </p>
        </div>
        <div className="max-sm:flex max-sm:justify-center max-xl:flex max-xl:justify-center">
          <button type="button" className="transition-transform duration-300 hover:scale-105 bg-[#DCAD27] text-black font-bold py-2 px-9 rounded-3xl translate-y-20 cursor-pointer max-sm:px-5 max-sm:text-sm max-sm:translate-y-10 max-xl:px-5 max-xl:text-sm max-xl:translate-y-10">Explore</button>
        </div>

      </div>
      <div className="flex align-center justify-center w-80 h-97 max-sm:w-100 max-sm:h-90">
        <Image src="/womenWithClipboard.jpg" alt="Women-With-Clipboard" width={550} height={500} className="object-none object-[25%_75%] border-[#DCAD27] border-4 max-sm:w-150 max-sm:h-60 max-sm:object-[25%_25%] max-sm:object-cover" />
      </div>
    </section>

    {/* fourth section */}
    <section className="flex flex-row justify-center items-center bg-[#FFF5EA] h-180 gap-40 max-sm:flex max-sm:flex-col max-sm:gap-10 max-xl:flex max-xl:flex-col max-xl:gap-10">
      <div className="flex justify-center w-90 h-120 max-sm:w-50 max-sm:h-70 max-xl:w-50 max-xl:h-70">
        <Image src={"/landing_page_resources2.jpg"} alt="Women hand heart" height={100} width={300} className="object-cover border-[#C96C86] border-4" />
      </div>
      <div className="max-xl:flex max-xl:justify-center max-xl:flex-col">
        <div className="flex flex-col gap-5 max-sm:gap-5 max-sm:flex max-sm:flex-col max-sm:items-center max-xl:gap-5 max-xl:flex max-xl:flex-col max-xl:items-center">
          <h1 className="text-black max-sm:flex max-sm:text-sm max-sm:justify-center max-xl:flex max-xl:text-sm max-xl:justify-center">RESOURCES</h1>
          <h2 className="text-black w-120 font-bold text-2xl max-sm:text-center max-sm:text-lg max-sm:w-90 max-sm:flex max-sm:justify-center max-sm:text-xs max-xl:text-center max-xl:text-lg max-xl:w-90 max-xl:flex max-xl:justify-center max-xl:text-xs">Curated support for your mental wellness journey</h2>
          <p className="text-black w-100 max-sm:text-xs max-sm:text-center max-xl:w-70 max-xl:text-xs max-xl:text-center max-xl:w-70">
            Our resource library is designed with you in mind—offering culturally relevant, gender-responsive tools that speak to the unique experiences of
            Black girls, young women, and gender-expansive youth. From mental health toolkits and journal prompts to videos, worksheets,
            and trusted guides, everything here is created or selected to empower your everyday wellness.
          </p>
          <p className="flex font-bold text-black w-100 max-sm:text-xs max-sm:text-center max-sm:w-70 max-xl:text-xs max-xl:text-center max-xl:w-70">
            Explore resources that affirm, inform, and uplift.
          </p>
        </div>
        <div className="max-sm:flex max-sm:justify-center max-xl:flex max-xl:justify-center">
          <button type="button" className="transition-transform duration-300 hover:scale-105 bg-black text-white font-bold py-2 px-9 rounded-3xl translate-y-20 cursor-pointer max-sm:translate-y-5 max-sm:text-xs max-sm:px-5 max-xl:translate-y-5 max-xl:text-xs max-xl:px-5">Explore</button>
        </div>
      </div>
    </section>

    {/* fifth section */}
    <section className="flex flex-row justify-center items-center bg-[#DCAD27] h-180 gap-10 max-sm:flex max-sm:flex-col max-sm:pt-10 max-sm:gap-15 max-xl:flex max-xl:flex-col max-xl:gap-10">
      <div className="max-xl:flex max-xl:justify-center max-xl:flex-col">
        <div className="flex flex-col gap-5 max-sm:gap-5 max-sm:flex max-sm:flex-col max-sm:items-center max-xl:gap-5 max-xl:flex max-xl:flex-col max-xl:items-center">
          <h1 className="flex text-black max-sm:flex max-sm:text-sm max-sm:justify-center max-xl:flex max-xl:text-sm max-xl:justify-center">EVENTS</h1>
          <h2 className="flex text-black w-120 font-bold text-2xl max-sm:text-center max-sm:text-lg max-sm:w-90 max-sm:flex max-sm:justify-center max-sm:text-xs max-xl:text-center max-xl:text-lg max-xl:w-90 max-xl:flex max-xl:justify-center max-xl:text-xs">Space to heal, grow, and connect</h2>
          <p className="flex text-black w-100 max-sm:text-xs max-sm:text-center max-sm:w-70 max-xl:w-70 max-xl:text-xs max-xl:text-center max-xl:w-70">
            Join us for live and virtual gatherings that center joy, rest, and mental wellness for
            Black girls and gender-expansive youth. From safe space circles and creative workshops to community conversations and self-care pop-ups,
            our events are designed to build connection and community.
          </p>
          <p className="flex font-bold text-black w-100 max-sm:text-xs max-sm:text-center max-sm:w-70 max-xl:text-xs max-xl:text-center max-xl:w-70">
            Find upcoming spaces where your voice matters and your well-being is the priority.
          </p>
        </div>
        <div className="max-sm:flex max-sm:justify-center max-xl:flex max-xl:justify-center">
          <button type="button" className="transition-transform duration-300 hover:scale-105 bg-[#C96C86] text-white font-bold py-2 px-9 rounded-3xl translate-y-20 cursor-pointer max-sm:translate-y-5 max-sm:text-xs max-sm:px-5 max-xl:translate-y-5 max-xl:text-xs max-xl:px-5">Explore</button>
        </div>

      </div>
      <div className="flex justify-center w-100 h-120 max-sm:w-50 max-sm:h-70  max-xl:w-50 max-xl:h-70">
        <Image src={"/landing_page_events.jpg"} alt="Women Doing Yoga" width={300} height={200} className="object-cover object-[65%_25%] border-[#FFF5EA] border-4" />
      </div>
    </section>
  </div>;
}