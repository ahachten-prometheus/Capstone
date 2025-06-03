export default function EventTiles({ event }) {
    const { id, name, description, status, detailsurl, location, timeStart, timeEnd, imgUrl } = event;
  
    return (
      <div
        style={{
          aspectRatio: '360 / 575', // tile ratio w/h 361/577
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#fff',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Image 345/577 ~59.8%, measured by human may have a bit of error */}
        <div style={{ flex: '59.8' }}>
          <img
            src={imgUrl}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
  
        {/* Text 150/577 ~26%, */}
        <div style={{ flex: '26', padding: '0.5rem', overflow: 'hidden', fontSize: '0.85rem' }}>
          <p>{timeStart}</p>
          <p>{name}</p>
        </div>
  
        {/* Button 82/577 ~14.2% */}
        <div style={{ flex: '14.2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <a href={detailsurl}>
            <button
                style={{
                    width: '50%', // 180 / 360
                    height: '63.4%', // 52 / 82 ≈ 0.634
                    backgroundColor: '#D96B91',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                }}
            >
                Details
            </button>
          </a>
        </div>
      </div>
    );
  }
  