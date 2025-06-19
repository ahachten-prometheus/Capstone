export default function ProvidersDisplayCard({ provider }) {
  const { name, licenses, virtualOnly, address } = provider;

  return (
    <div className='w-[269px] h-[197px] bg-white rounded-xl shadow-md p-4 flex flex-col justify-between'>
      <div className="space-y-1">

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
        <button className="w-[134px] h-[35px] bg-[#C96C86] text-white rounded-[33px] border border-black text-sm">
          <a href='https://www.blackgirlssmile.org/'>
            Details
          </a>
        </button>
      </div>

    </div>
  )
}
