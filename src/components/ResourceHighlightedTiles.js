export default function ResourceHighlightedTiles({ resource }) {
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
      <img
        className='w-[265px] h-[187px]'
        src={Image_URL ?? "/womenWithClipboard.jpg"}
      />
      <h3 className='font-bold mt-[15px] mx-[3px]'>{Name}</h3>
      <p className='font-thin mx-[3px]'>{Resources_Type}</p>
      <p className='mt-[5px] mx-[3px]'>{Description}</p>
      <ContactInfo
        URL={URL}
        Contact_Email={Contact_Email}
        Contact_Phone={Contact_Phone}
        Contact_Name={Contact_Name}
      />
    </>
  );
}

function ContactInfo({ URL, Contact_Email, Contact_Phone, Contact_Name }) {
  return <></>;
}
