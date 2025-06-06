//measured by human, so it's not exact
//tile ratio w/h 361/577
//ratio of each section by height, so out of 577is 345/577 ~59.8%
//image:text:button 345:150:82 ~59.8:26:14.2%
//ratio of the button base on button section
//width 180/360 height 52/82 

  export default function EventTile({ event }) {
    const {
      id,
      "Name": name,
      "Description": description,
      "URL": detailsurl,
      "Address": location,
      "Start Date and Time": timeStart,
      "End Date and Time": timeEnd,
      "Image URL": imgUrl,
    } = event;

  //parse ISO strings into Date objects (guard against missing values)
  const startDateObj = timeStart ? new Date(timeStart) : null;
  const endDateObj   = timeEnd   ? new Date(timeEnd)   : null;

  let dateTimeDisplay = "TBD";
  if (startDateObj && endDateObj) {
    //check if same calendar date (year, month, and day all match)
    const sameYear  = startDateObj.getFullYear() === endDateObj.getFullYear();
    const sameMonth = startDateObj.getMonth() === endDateObj.getMonth();
    const sameDay   = startDateObj.getDate()  === endDateObj.getDate();

    if (sameYear && sameMonth && sameDay) {
      //if start and end on the same day:
      //[Month day, year] [h:mm AM/PM – h:mm AM/PM]
      const dateOnly = startDateObj.toLocaleDateString(undefined, {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
      const startTimeOnly = startDateObj.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
      });
      const endTimeOnly = endDateObj.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
      });

      // Use a line break between the date and the time‐range
      dateTimeDisplay = (
        <>
          {dateOnly}
          <br />
          {startTimeOnly} – {endTimeOnly}
        </>
      );
    } else if (sameYear) {
      //if different days but same year, format “Jun 06 – 07, 2025” or if different months “Jun 30 – Jul 01, 2025”
      //extract [Month DD] for each, then append “, YYYY” once.
      const optsMonthDay = { month: "short", day: "2-digit" };
      const startMonthDay = startDateObj.toLocaleDateString(undefined, optsMonthDay);
      const endMonthDay   = endDateObj.toLocaleDateString(undefined, optsMonthDay);
      const fullYear      = startDateObj.getFullYear();

      dateTimeDisplay = `${startMonthDay} – ${endMonthDay}, ${fullYear}`;
    } else {
      //if the event actually spans different years, show both full dates “Dec 31, 2025 – Jan 01, 2026”
      const fullStart = startDateObj.toLocaleDateString(undefined, {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
      const fullEnd = endDateObj.toLocaleDateString(undefined, {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
      dateTimeDisplay = `${fullStart} – ${fullEnd}`;
    }
  }    

    return (
      // <div className="aspect-[360/575] grid grid-rows-[60%_25%_15%] w-full rounded-lg overflow-hidden bg-white shadow-md">
      //   {/* Image (takes ~60% of height) */}
      //   <div className="row-span-1">
      //     <img
      //       src={imgUrl}
      //       alt={name}
      //       className="w-full h-full object-cover"
      //     />
      //   </div>
  
      //   {/* Text (takes ~25% of height) */}
      //   <div className="row-span-1 p-2 text-sm text-center">
      //     <p className="font-semibold text-xs text-gray-600">
      //     {dateTimeDisplay}
      //     </p>
      //     <p className="text-sm">{location}</p>
      //     <p className="font-medium">{name}</p>
      //   </div>
  
      //   {/* Button (takes ~15% of height) */}
      //   <div className="row-span-1 flex justify-center items-center">
      //     <a href={detailsurl}>
      //       <button className="px-4 py-2 bg-[#D96B91] text-white rounded-md text-sm">
      //         Details
      //       </button>
      //     </a>
      //   </div>
      // </div>
    <div className="aspect-[360/575] flex flex-col w-full rounded-lg overflow-hidden bg-white shadow-md">
    {/* Image takes 60% */}
    <div className="h-[60%]">
      <img
        src={imgUrl}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Text can expand and be centered */}
    <div className="flex flex-1 flex-col justify-center items-center text-center p-2 text-sm">
       <p className="font-semibold text-xs text-gray-600">{dateTimeDisplay}</p>
       <p className="text-sm">{location}</p>
       <p className="font-medium">{name}</p>
    </div>

    {/* Button has fixed/padded area */}
    <div className="h-[15%] flex justify-center items-center">
      <a href={detailsurl}>
        <button className="px-4 py-2 bg-[#D96B91] text-white rounded-md text-sm">
          Details
        </button>
      </a>
    </div>
    </div>

    );
  }
    