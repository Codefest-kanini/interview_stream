import React from 'react';
import './HomeScreen.css';

export default function HomeScreen({ createCall, startHairCheck }) {
  const startDemo = () => {
    createCall().then((url) => {
      startHairCheck(url);
    });
  };

  return (
    <div className="home-screen">
      <h1>Binay EnterPrise Presents the better way to interview</h1>
      <p>Start the meeting with a new unique room by clicking the button below.</p>
      <button onClick={startDemo} type="button">
        Click to start a meeting
      </button>
      <p className="small">Select “Allow” to use your camera and mic for this call if prompted</p>
    </div>
  );
}
