import React from "react";
import RaceEventCard from "./RaceEventCard";
import SplashBanner from "./SplashBanner";
import PhotoGallery from "./PhotoGallery";
import SocialMediaIcons from "./SocialMediaIcons";

function Home() {
  const raceEvents = [
    { id: 1, name: "5K Race", description: "Description of the 5K race event." },
    { id: 2, name: "10K Race", description: "Description of the 10K race event." },
    { id: 3, name: "Half Marathon", description: "Description of the half marathon race event." },
    { id: 4, name: "Full Marathon", description: "Description of the full marathon race event." },
  ];

  return (
    <div>
      <SplashBanner />
      <PhotoGallery />
      <SocialMediaIcons />
      <div className="race-event-cards">
        {raceEvents.map((raceEvent) => (
          <RaceEventCard key={raceEvent.id} raceEvent={raceEvent} />
        ))}
      </div>
    </div>
  );
}

export default Home;
