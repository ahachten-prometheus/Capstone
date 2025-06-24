export default function ProvidersDisplayCard({ provider }) {
  const { name, licenses, virtualOnly, address } = provider;

  return (
    <div className="w-[269px] h-fit bg-white rounded-xl shadow-md p-4 flex flex-col justify-between">
      <div className="space-y-1 pb-5">
        <h1 className="font-inter font-bold text-[20px] leading-[100%] text-black w-[233px]">
          {name ?? "Name Not Available"}
        </h1>

        <p className="font-inter font-light text-[13px] leading-[100%] text-black w-[239px] h-[29px]">
          {licenses ?? ''}
        </p>

        <p className="font-bricolage text-[15px] font-normal leading-[100%] text-black h-[20px]">
          {(virtualOnly === "Yes") ? 'Virtual Only' : 'In-Person Available'}
        </p>

        <p className="font-bricolage text-[15px] font-normal leading-[100%] text-black h-[20px]">
          {address ? address : 'Address Not Available'}
        </p>
      </div>

      <div className="flex justify-center">
        <a href="https://www.blackgirlssmile.org/">
          <button className="w-[134px] h-[35px] bg-[#B36078] hover:ring-4 hover:ring-[#DCAD27] text-white rounded-[33px] text-sm">
              Details
          </button>
        </a>
      </div>

    </div>
  )
}
