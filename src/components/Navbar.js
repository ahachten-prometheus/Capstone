import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import Image from "next/image";

const LINKS = [
  { href: "/", text: "Home" },
  { href: "/resources", text: "Find Resources" },
  { href: "/providers", text: "Find Providers" },
  { href: "/events", text: "Attend an Event" },
];

// Barebones Navbar. Will be at the top of every page

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-[#FFF5EA] shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Image src="/BGS-Logo-nav.png" alt="Black-Girls-Smile-Logo" width={250} height={200} />

          {/* Desktop nav links */}
          <div className="hidden sm:flex space-x-6">
            {LINKS.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-black hover:underline text-sm"
              >
                {link.text}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
              <HiBars3 className="block size-6 group-data-[open]:hidden" />
              <HiXMark className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <DisclosurePanel className="sm:hidden px-4 pb-3 pt-2 space-y-2">
        {LINKS.map((link, idx) => (
          <DisclosureButton
            as="a"
            key={idx}
            href={link.href}
            className="block text-black text-base hover:underline"
          >
            {link.text}
          </DisclosureButton>
        ))}
      </DisclosurePanel>
    </Disclosure>
  );
}
