export default function Providers() {

  // have what the user selects here, filter what provider tiles are shown 
  // const providerState = (event) => {

  // }

  return <>
    {/* hero header */}
    <h1>Providers</h1> 

    <main>
      {/* above the tiles section */}
      <h3>Find a Provider</h3>
      <section id="providers-filters">
        {/* <select id="provider-state" onChange={providerState()} aria-labelledby="filtering-state"> */}
        <select id="provider-state" aria-labelledby="filtering-state">
          {/* use .map() on these?  */}
          <option value="State">State?</option>
          <option value="State1">State1</option>
          <option value="State2">State2</option>
          <option value="State3">State3</option>
        </select>
        
        {/* <select id="provider-mode" onChange={providerMode()} aria-labelledby="filtering-mode"> */}
        <select id="provider-mode" aria-labelledby="filtering-mode">
          <option value="Virtual Only" selected>Virtual Only?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </section>
      
      {/* tiles section */}
      <section id="providers-display">

      </section>

      <button>Load More</button>
    </main>

  </>;
}