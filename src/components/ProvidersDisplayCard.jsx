import React from 'react'

const ProvidersDisplayCard = () => {
  return (
    // Card
    <div className='w-[269px] h-[197px] bg-white rounded-xl shadow-md p-4 flex flex-col justify-between'>
        {/* Info inside the card, replace with what the api fetches */}
        <div className="space-y-1">

            <h1 className="font-inter font-bold text-[20px] leading-[100%] text-black w-[233px]">
                Provider Title(Name/text from api)
            </h1>

            <p className="font-inter font-light text-[13px] leading-[100%] text-black w-[239px] h-[29px]">
                License(Not sure from api)
            </p>


            <p className="font-bricolage text-[15px] font-normal leading-[100%] text-black h-[20px]">
                Virtual Only(Not sure from api)
            </p>

            <p className="font-bricolage text-[15px] font-normal leading-[100%] text-black h-[20px]">
                Location(Not sure from api)
            </p>
        </div>

        {/* Button for details that takes users to another page with a href */}
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

export default ProvidersDisplayCard