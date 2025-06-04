// Super barebones Footer. Will be at the bottom of every page

export default function Footer() {
  return (
    <footer className="bg-white text-black border-t">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          {/* Left Column */}
          <div>
            <p className="font-semibold">Black Girls Smile</p>
          </div>

          {/* Middle Column */}
          <div>
            <p className="font-semibold mb-2">Quick Links</p>
            <ul className="space-y-1">
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
            <p className="font-semibold mb-2">Learn More</p>
            <ul className="space-y-1">
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
