import { useState, useEffect } from 'react';
import PhotoGallery from './PhotoGallery';

import running from "../../photos/gallery/5k.jpg";
import Drone from "../../photos/gallery/drone.jpg";
import lucy from "../../photos/gallery/lucy-running.jpg";
import marathon from "../../photos/gallery/marathon-run.jpg";
import myself from "../../photos/gallery/myself.jpg";
import peace from "../../photos/gallery/peace-sign.jpg";
import race from "../../photos/gallery/race.jpg";
import mar2 from "../../photos/gallery/run-mar.jpg";
import mar3 from "../../photos/gallery/run-pink.jpg";
import tri from "../../photos/gallery/running-tri.jpg";
import run2 from "../../photos/gallery/running.jpg";


const Photos = () => {
  const photos = [running, Drone,lucy,marathon,myself,peace,race,mar2,mar3,tri,run2]; 
  return (
    <div>
      <h2>Photo Gallery</h2>
      <div className="photo-grid">
        {photos.map((photo, index) => (
          <img key={index} src={photo} alt={`Photo ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};
export default Photos;
