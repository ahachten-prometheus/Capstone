import Image from "next/image";

export default function Home() {
  return <div className="flex flex-col">
    {/* first Section */}
    <section className="flex flex-col items-center justify-center gap-3 relative h-165">
      <div className="bg-black w-screen h-screen z-1 opacity-50 relative">
        <Image src="/womenSitting.jpg" alt="Women Sitting" fill={true} className="object-none max-sm:object-cover max-sm:object-left" priority={true} />
      </div>

      <div className="flex flex-col absolute z-2 items-center justify-center">
        <h1 className="text-wrap font-bold text-4xl w-150 text-center tracking-wide max-sm:text-lg max-sm:w-100">Find the right support, from providers who understand you</h1>
        <a href="/question/1" className="bg-[#C96C86] text-xl py-3 px-26 rounded-3xl translate-y-8 cursor-pointer animate-bounce hover:animate-none max-sm:text-sm max-sm:px-16">Start My Search</a>
      </div>
    </section>
    {/* second Section */}
    <section className="flex flex-col justify-center items-center h-180 bg-[#FFF5EA] gap-10 max-sm:gap-7">
      <div>
        <h1 className="text-black text-center font-bold text-4xl max-sm:text-sm">Care rooted in our stories, made for us</h1>
      </div>

      <div className="flex justify-center items-center gap-50 border-t-1 border-black p-10 max-sm:flex-wrap max-sm:gap-10 max-sm:p-5">
        <div className="flex flex-col gap-10 items-center justify-center max-sm:gap-3">
          <div className="flex justify-center w-30 h-30 rounded-[50%] border-[#C96C86] border-3 max-sm:w-20 max-sm:h-20 max-sm:border-transparent">
            <Image src="/volumeIcon.png" alt="Volume-Icon" width={200} height={150} className="object-cover max-sm:w-40 max-sm:h-20" />
          </div>
          <div className="flex items-center justify-center ">
            <p className="w-75 text-center text-black text-2xl max-sm:text-sm">
              You deserve a space where your voice, identity, and healing matter.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-17 items-center justify-center max-sm:gap-3">
          <div className="flex justify-center w-30 h-30 rounded-[50%] border-[#C96C86] border-3 max-sm:w-20 max-sm:h-20 max-sm:border-transparent">
            <Image src="/handShakeIcon.png" alt="Handshake-Icon" width={200} height={150} className="object-cover max-sm:w-40 max-sm:h-20" />
          </div>
          <div className="flex align-center justify-center">
            <p className="w-75 text-center text-black text-2xl max-sm:text-sm">
              Connect with providers who understand your story
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-10 max-sm:gap-3">
          <div className="flex justify-center w-30 h-30 rounded-[50%] border-[#C96C86] border-3 max-sm:w-20 max-sm:h-20 max-sm:border-transparent">
            <Image src="/healingIcon.png" alt="Healing-Icon" width={200} height={200} className="object-cover max-sm:w-40 max-sm:h-20" />
          </div>
          <div className="flex align-center justify-center">
            <p className="w-65 text-center text-black text-2xl max-sm:text-sm">
              Healing starts with being heard—find your therapist today.
            </p>
          </div>

        </div>
      </div>
    </section>

    {/* third section */}
    <section className="flex flex-row justify-center h-180 bg-[#C96C86] items-center gap-40 max-sm:flex-wrap max-sm:gap-20">
      <div className="max-sm:flex max-sm:flex-col">
        <div className="flex flex-col gap-10">
          <h1 className="pb-1 text-4xl font-bold max-sm:flex max-sm:justify-center max-sm:text-xl max-sm:pt-10">PROVIDERS</h1>
          <p className="text-wrap font-light w-120 leading-6 text-[18px] max-sm:text-[14px] max-sm:w-100 max-sm:text-center">
            {`Find culturally responsive, affirming therapists who understand the unique experiences of Black women and girls.
            Whether you’re seeking individual support or family counseling, these providers are here to walk with you on your mental wellness journey.`}
          </p>
        </div>
        <div className="max-sm:flex max-sm:justify-center">
          <button type="button" className="bg-[#DCAD27] text-black font-bold py-2 px-9 rounded-3xl translate-y-20 cursor-pointer max-sm:px-5 max-sm:text-sm max-sm:translate-y-10">Explore</button>
        </div>

      </div>
      <div className="flex align-center justify-center w-80 h-97 max-sm:w-100 max-sm:h-90">
        <Image src="/womenWithClipboard.jpg" alt="Women-With-Clipboard" width={550} height={500} className="object-none object-[25%_75%] border-[#DCAD27] border-4 max-sm:w-150 max-sm:h-60 max-sm:object-[25%_25%] max-sm:object-cover" />
      </div>
    </section>

    {/* fourth section */}
    <section className="flex flex-row justify-center items-center bg-[#FFF5EA] h-180 gap-40 max-sm:flex max-sm:flex-col max-sm:pt-10 max-sm:gap-15">
      <div className="bg-[#7B7B7B] w-100 h-120 max-sm:w-50 max-sm:h-70"></div>
      <div>
        <div className="flex flex-col gap-5 max-sm:gap-5 max-sm:flex max-sm:flex-col max-sm:items-center">
          <h1 className="text-black max-sm:flex max-sm:text-sm max-sm:justify-center">RESOURCES</h1>
          <h2 className="text-black w-120 font-bold text-2xl max-sm:text-center max-sm:text-lg max-sm:w-90 max-sm:flex max-sm:justify-center max-sm:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
          <p className="text-black w-100 max-sm:text-sm max-sm:text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
          </p>
        </div>
        <div className="max-sm:flex max-sm:justify-center">
          <button type="button" className="bg-black text-white font-bold py-2 px-9 rounded-3xl translate-y-20 cursor-pointer max-sm:translate-y-5 max-sm:text-xs max-sm:px-5">Explore</button>
        </div>
      </div>
    </section>

    {/* fifth section */}
    <section className="flex flex-row justify-center items-center bg-[#DCAD27] h-180 gap-40 max-sm:flex max-sm:flex-col max-sm:pt-10 max-sm:gap-15">
      <div>
        <div className="flex flex-col gap-5 max-sm:gap-5 max-sm:flex max-sm:flex-col max-sm:items-center">
          <h1 className="text-black max-sm:flex max-sm:text-sm max-sm:justify-center">EVENTS</h1>
          <h2 className="text-black w-120 font-bold text-2xl max-sm:text-center max-sm:text-lg max-sm:w-90 max-sm:flex max-sm:justify-center max-sm:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
          <p className="text-black w-100 max-sm:text-sm max-sm:text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
          </p>
        </div>
        <div className="max-sm:flex max-sm:justify-center">
          <button type="button" className="bg-[#C96C86] text-white font-bold py-2 px-9 rounded-3xl translate-y-20 cursor-pointer max-sm:translate-y-5 max-sm:text-xs max-sm:px-5">Explore</button>
        </div>

      </div>
      <div className="bg-[#7B7B7B] w-100 h-120 max-sm:w-50 max-sm:h-70"></div>
    </section>
  </div>;
}