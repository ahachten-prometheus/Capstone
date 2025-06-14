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
        <a href={URL.startsWith("https://") ? URL : "https://".concat(URL)}>
          <button className='mt-[3px] mx-[3px] bg-[#C96C86] border-[2px] border-[#C96C86] rounded-2xl w-[134px]'>
            Learn More
          </button>
        </a>
      </div>
    </>
  );
}
