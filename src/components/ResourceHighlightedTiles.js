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
      <img
        className='w-[265px] h-[187px]'
        src={Image_URL ?? "/womenSitting.jpg"}
      />
      <ContactInfo
        Name={Name}
        Resources_Type={Resources_Type}
        URL={URL}
        Contact_Email={Contact_Email}
        Contact_Phone={Contact_Phone}
        Contact_Name={Contact_Name}
      />
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
    <div>
      <p>{Resources_Type}</p>
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
            aria-label={`Visit ${Name} website`}
            title={`Visit ${URL}`}>
            <div>Learn More {">"}</div>
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
