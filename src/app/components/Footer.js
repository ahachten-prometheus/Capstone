// Super barebones Footer. Will be at the bottom of every page
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#FFF5EA] text-black border-t">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-20 text-center sm:text-left">
          {/* Left Column */}
          <div className="flex flex-col justify-center align-center gap-5">
            <div className="flex align-center justify-center">
              <Image src="/BGSLogo.png" alt="Black-Girls-Smile-Logo" width={150} height={100} />
            </div>
            <button type="button" className="bg-[#DCAD27] text-white rounded-full py-1 px-3 cursor-pointer text-[14px]">Contact Us</button>
          </div>

          {/* Middle Column */}
          <div className="flex flex-col align-center gap-2">
            <p className="font-semibold mb-2">Quick Links</p>
            <ul className="flex flex-col gap-2 space-y-1">
              <li>
                <a href="/membership" className="hover:underline">
                  Membership
                </a>
              </li>
              <li>
                <a href="/providers" className="hover:underline">
                  Providers
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div>
            <p className="flex flex-col align-center gap-2 font-semibold mb-2">Learn More</p>
            <ul className="flex flex-col gap-2 space-y-1">
              <li>
                <a href="/join" className="hover:underline">
                  Join Our Team
                </a>
              </li>
              <li>
                <a href="/faqs" className="hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/donate" className="hover:underline">
                  Donate
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
