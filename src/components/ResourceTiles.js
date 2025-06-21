import { FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';

function ContactContent({Name, URL, Contact_Email, Contact_Phone, Contact_Name} ){
  return (
    <>
    {/* Contact Info Section */}
    <div id="Contact-Section">

{/* check if there's contact information at all */}
{/* If there's an email address present */}

{Contact_Email && (
  <a 
  href={`mailto:${Contact_Email}`}
  className="hover:text-blue-600 transition-colors"
  aria-label={`Email ${Contact_Name || Name}`}
  title={`Email: ${Contact_Email}`}
  ><FaEnvelope className="mr-2" ></FaEnvelope>
  </a>
)}

{Contact_Phone && (
  <a 
    href={`tel:${Contact_Phone}`}
    className="hover:text-green-600 transition-colors"
    aria-label={`Call ${Contact_Name || Name}`}
    title={`Call: ${Contact_Phone}`}
  >
    <p>Call: </p>
    <FaPhone size={20} />
  </a>
)}

{Contact_Name && (
  <span 
    className="hover:text-purple-600 transition-colors cursor-default"
    title={`Contact: ${Contact_Name}`}
  >
    <FaUser size={20} />
  </span>
)}
 {URL && (
          <a href={URL.startsWith("https://") ? URL : "https://".concat(URL)}>
            <button className='mt-[3px] mx-[3px] bg-[#C96C86] border-[2px] border-[#C96C86] rounded-2xl w-[134px]'>
              Learn More
            </button>
          </a>
        )}
</div>
    </>
  )
}
export default function ResourceTiles({ resource }) {
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
    <>
      <div className='flex-col bg-teal-500 w-[265px]'>
        <img
          className='w-[265px] h-[187px]'
          src={Image_URL ?? "/womenWithClipboard.jpg"}
        />
        <h3 className='font-bold mt-[15px] mx-[3px]'>{Name}</h3>
        <p className='font-thin mx-[3px]'>{Resources_Type}</p>
        <p className='mt-[5px] mx-[3px]'>{Description}</p>

        {/* Contact Section */}
        <ContactContent Name = {Name} URL = {URL} Contact_Email = {Contact_Email} Contact_Phone = {Contact_Phone} Contact_Name = {Contact_Name}/>
      </div>
    </>
  );
}
