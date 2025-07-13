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
    <div
      className='grid grid-flow-col justify-center relative'
      id='parent-div'>
      <img
        className='w-[530px] h-[374px] border-[#C1DF1F] border-[8px] z-0 bg-local my-[50px]'
        src={Image_URL ?? "/resource-banner-2.webp"}
        alt=''
      />
      <div
        id='contact-info-flag'
        className='absolute top-[250px] left-[450px]'>
        <ContactInfo
          Name={Name}
          Resources_Type={Resources_Type}
          URL={URL}
          Contact_Email={Contact_Email}
          Contact_Phone={Contact_Phone}
          Contact_Name={Contact_Name}
        />
      </div>
    </div>
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
      className='text-black bg-[#FEFEFE] w-[495px] h-[107px] p-[10px] border rounded-lg shadow-lg z-1'
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
            <div className='hover:underline'>Learn More {">"}</div>
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
