const RaceInfo = () => {
  return (
    <div>
      <h2>Race Distances and Time Limits</h2>
      
      <h3>5K Distance:</h3>
      <p>
        The 5K race distance covers a total of 5 kilometers, equivalent to approximately 3.1 miles. Participants in the 5K race must complete the course within a maximum time limit of 2 hours.
      </p>
      
      <h3>10K Distance:</h3>
      <p>
        The 10K race distance spans a total of 10 kilometers, which is roughly 6.2 miles. Runners participating in the 10K race are required to finish the course within a maximum time limit of 4 hours.
      </p>
      
      <h3>Half Marathon (13.1 miles):</h3>
      <p>
        The half marathon race, also known as the 13.1-mile race, challenges participants to cover a distance of half a marathon. Runners in the half marathon category must complete the course within a maximum time limit of 6 hours.
      </p>
      
      <h3>Full Marathon (26.2 miles):</h3>
      <p>
        The full marathon race spans the traditional marathon distance of 26.2 miles. Participants undertaking the full marathon must finish the course within a maximum time limit of 8 hours.
      </p>
      
      <h2>Route Map for the 5K Race:</h2>
      <p>
        Below is a generic Google Map showcasing the route for the 5K race. Please note that this map is for illustrative purposes and may not represent the exact course of the event.
      </p>
      
      {/* Insert Google Map Embed Here */}
      
      {/* Replace the below div with the actual Google Map Embed code */}
      <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
        [Insert Google Map Embed Here]
      </div>
      
      <p>
        This information provides an overview of the various race distances offered and their corresponding time limits. Additionally, the map offers a visual representation of the 5K race route. Participants should familiarize themselves with the course and adhere to the specified time limits to ensure a safe and enjoyable racing experience.
      </p>
    </div>
  );
};

export default RaceInfo;
