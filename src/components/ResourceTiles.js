import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
import { useState } from "react";

/** defaultImages
 * An array of file path strings to files in `/public`
 * Resources that do not have a value in the Image_URL field in the Airtable will take a file from this list instead
 */
var defaultImages = ["/womenWithClipboard.webp", "/womenSitting.webp","/resource-banner-3.webp","/resource-banner-1.webp","/resource-banner-4.webp"];

export default function ResourceTiles({ resource, tileIdx}) {
  const [clicked,setClicked] = useState(true)
  const {
    Name,
    Status,
    ["Resources Type"]: Resources_Type,
    Description,
    URL,
    ["Contact Email"]: Contact_Email,
    ["Contact Phone"]: Contact_Phone,
    ["Contact Name"]: Contact_Name,
    ["Image URL"]: Image_URL,
  } = resource;

  return (
    <div className='flex flex-col justify-between w-[265px] px-[8px] py-[16px] m-px'>
    {clicked ? (
      <div>
        <div id="image-div" className="w-[265px] h-[187px] overflow-hidden">
          <img
            className='object-fit object-top border-[#C1DF1F] border-[3px]'
            src={Image_URL ?? defaultImages[tileIdx % defaultImages.length]}
            alt=''
          />
        </div>
      <h3 tabIndex="0" aria-label={"Resource Name: " + Name} className='font-extrabold mt-[15px] mx-[3px] text-black'>{Name}</h3>
      {Status !== "Active" && (
        <div className='mx-[3px] font-bold text-red-500'>
          <p aria-label={"This resource is "+ Status} tabIndex="0">{Status+'‼️'}</p>
        </div>
      )}
      <p className='font-thin mx-[3px] text-black'>{Resources_Type}</p>
      { Description &&
        <p className='mt-[5px] mx-[3px] text-black'>{Description.length > 150 ? Description.slice(0,147).concat('...') : Description}</p>
      }
</div>
    ) : (
      <div>
      <h3 tabIndex="0" aria-label={"Resource Name: " + Name} className='font-bold mt-[15px] mx-[3px] text-black'>{Name}</h3>
      {Status !== "Active" && (
        <div className='font-bold mx-[3px] text-red-500'>
          <p aria-label={"This resource is "+ Status} tabIndex="0">{Status+'‼️'}</p>
        </div>
      )}
      <p className='font-thin mx-[3px] text-black'>{Resources_Type}</p>
      {Description &&
      <p tabIndex="0" className='mt-[5px] mx-[3px] text-black'>{Description}</p>
      }
    {/* Contact Section */}
      <ContactContent
        Name={Name}
        URL={URL}
        Contact_Email={Contact_Email}
        Contact_Phone={Contact_Phone}
        Contact_Name={Contact_Name}
        />
    </div>
    )}
    <div className="flex justify-self-center justify-center">
      <button className='mt-[3px] mx-[3px] bg-[#C96C86] hover:bg-[#B55772] rounded-2xl w-[134px] hover:cursor-pointer' onClick={()=>setClicked(prev => !prev)}>Read {clicked ? "More" : "Less"}</button>
    </div>
    </div>
  );
}

function ContactContent({
  Name,
  URL,
  Contact_Email,
  Contact_Phone,
  Contact_Name,
}) {
  return (
    <div
      id='Contact-Section'
      className='flex flex-col gap-2'>
      {Contact_Name && (
        <span className='hover:text-purple-600 transition-colors cursor-default text-[#C96C86]'>
          <div className='flex gap-1 justify-center-safe content-center'>
            <FaUser size={20} />
            <p>{Contact_Name}</p>
          </div>
        </span>
      )}

      {(Contact_Phone || Contact_Email) && (
        <div className='flex flex-col md:flex-row md:flex-wrap gap-2 justify-center-safe content-center'>
          {Contact_Phone && (
            <a
              href={`tel:${Contact_Phone}`}
              className='hover:text-green-600 transition-colors text-[#C96C86]'
              aria-label={`Call ${Contact_Name || Name}`}
              title={`Call: ${Contact_Phone}`}>
              <div className='flex gap-1 justify-center-safe content-center'>
                <FaPhone size={20} />
                <p>{Contact_Phone}</p>
              </div>
            </a>
          )}

          {Contact_Email && (
            <a
              href={`mailto:${Contact_Email}`}
              className='hover:text-blue-600 transition-colors text-[#C96C86]'
              aria-label={`Email ${Contact_Name || Name}`}
              title={`Email: ${Contact_Email}`}>
              <div className='flex gap-1 justify-center-safe content-center'>
                <FaEnvelope size={20} />
                <p className='hidden md:flex'>
                  {Contact_Email.length > 10
                    ? Contact_Email.slice(0, 8).concat("...")
                    : Contact_Email}
                </p>
                <p className='md:hidden'>
                  {Contact_Email.length > 20
                    ? Contact_Email.slice(0, 15).concat("...")
                    : Contact_Email}
                </p>
              </div>
            </a>
          )}
        </div>
      )}

      {URL && (
        <div className='flex justify-center-safe content-center '>
          <a
            href={URL.startsWith("https://") ? URL : "https://".concat(URL)}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Visit ${Name} website`}
            title={`Visit ${URL}`}
            className="flex justify-self-center justify-center text-extrabold rounded-2xl w-[134px] bg-[#C96C86] before:color-[#FFF5EA] hover:bg-[#B55772] hover:cursor-pointer hover:color-[#FFFCFD] m-[50px]"
            > 
            Visit Site
          </a>
        </div>
      )}
    </div>
  );
}

