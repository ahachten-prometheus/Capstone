import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa";

/** defaultImages
 * An array of file path strings to files in `/public`
 * Resources that do not have a value in the Image_URL field in the Airtable will take a file from this list instead
 */
var defaultImages = ["/womenWithClipboard.jpg", "/womenSitting.jpg"];

export default function ResourceTiles({ resource, tileIdx }) {
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
    <div className='flex-col bg-teal-500 w-[265px]'>
      <img
        className='w-[265px] h-[187px]'
        src={Image_URL ?? defaultImages[tileIdx % defaultImages.length]}
      />
      <h3 className='font-bold mt-[15px] mx-[3px]'>{Name}</h3>
      {Status !== "Active" && (
        <div className='font-bold bg-red-300 text-red-500'>
          <p>{Status}</p>
        </div>
      )}
      <p className='font-thin mx-[3px]'>{Resources_Type}</p>
      <p className='mt-[5px] mx-[3px]'>{Description}</p>

      {/* Contact Section */}
      <ContactContent
        Name={Name}
        URL={URL}
        Contact_Email={Contact_Email}
        Contact_Phone={Contact_Phone}
        Contact_Name={Contact_Name}
      />
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
        <span className='hover:text-purple-600 transition-colors cursor-default'>
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
              className='hover:text-green-600 transition-colors'
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
              className='hover:text-blue-600 transition-colors'
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
        <div className='flex justify-center-safe content-center'>
          <a
            href={URL.startsWith("https://") ? URL : "https://".concat(URL)}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Visit ${Name} website`}
            title={`Visit ${URL}`}>
            <button className='mt-[3px] mx-[3px] bg-[#C96C86] border-[2px] border-[#C96C86] rounded-2xl w-[134px]'>
              Learn More
            </button>
          </a>
        </div>
      )}
    </div>
  );
}
