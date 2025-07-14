import { FaEnvelope, FaPhone } from "react-icons/fa";

export default function ResourceHighlightedTiles({ resource }) {
  const {
    Name,
    ["Resources Type"]: Resources_Type,
    URL,
    ["Contact Email"]: Contact_Email,
    ["Contact Phone"]: Contact_Phone,
    ["Contact Name"]: Contact_Name,
    ["Image URL"]: Image_URL,
  } = resource;

  return (
    <>
    <div
      className='grid grid-flow-col justify-center relative w-screen h-[407px] overflow-hidden mb-[20px]'
      id='parent-div'>

      {/* image  */}
      <div id="image-div" className="relative after:absolute after:inset-0 after:bg-[#C96C86] after:opacity-30">
        <img
          className='object-fit object-bottom z-0 bg-local'
          src={Image_URL ?? "/resource-banner-2.webp"}
          alt='Three young beautiful black girls leaning against a pink wall, posing together and smiling.'
        />
        </div>
      
      {/* header title */}
      <h1 className="w-full absolute text-center my-[200px] text-center text-white text-4xl absolute z-1"> Resources </h1>
      
      {/* highlighted resource contact info banner */}
    
        <ContactInfo
          Name={Name}
          Resources_Type={Resources_Type}
          URL={URL}
          Contact_Email={Contact_Email}
          Contact_Phone={Contact_Phone}
          Contact_Name={Contact_Name}
        />
    
    </div>
    </>
  );
}

function ContactInfo({
  Name,
  Resources_Type,
  URL,
  Contact_Email,
  Contact_Phone,
  Contact_Name,
}) {
  return (
    <div
      className='absolute text-black bg-[#FEFEFE] w-[495px] h-[107px] pl-[20px] pr-[25px] py-[10px] border rounded-r-lg shadow-lg z-1 bottom-0 left-0'
      id='highlighted-resource-box'>
      <p className='font-extrabold'>{Resources_Type}</p>
      <p>{Name}</p>

      {/** Intended hyperlink logic below:
       * If URL, display "Learn More"
       * Else, if Contact Phone, display "Icon + Call Now"
       * Else, if Contact Email, display "Icon + Email"
       *  */}

      {
        // URL Section
        (URL && (
          <a
            href={URL.startsWith("https://") ? URL : "https://".concat(URL)}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Visit ${Name} website`}
            title={`Visit ${URL}`}
            className='flex self-end justify-self-end-safe mb-[4px] mr-[2px] '>
            <div className='hover:underline left-5'>Learn More {">"}</div>
          </a>
        )) ||
          // Contact Phone Section
          (Contact_Phone && (
            <a
              href={`tel:${Contact_Phone}`}
              aria-label={`Call ${Contact_Name || Name}`}
              title={`Call: ${Contact_Phone}`}>
              <div className='flex gap-2'>
                <FaPhone size={20} />
                Call Now {">"}
              </div>
            </a>
          )) ||
          // Contact Email Section
          (Contact_Email && (
            <a
              href={`mailto:${Contact_Email}`}
              aria-label={`Email ${Contact_Name || Name}`}
              title={`Email: ${Contact_Email}`}>
              <div className='flex gap-2'>
                <FaEnvelope size={25} />
                Send Email {">"}
              </div>
            </a>
          ))
      }
    </div>
  );
}
