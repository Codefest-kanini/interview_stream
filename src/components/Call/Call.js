import React, { useState, useCallback } from 'react';
import {
  useParticipantIds,
  useScreenShare,
  useDailyEvent,
  useLocalSessionId,
} from '@daily-co/daily-react';

import './Call.css';
import Tile from '../Tile/Tile';
import UserMediaError from '../UserMediaError/UserMediaError';

export default function Call() {
  /* If a participant runs into a getUserMedia() error, we need to warn them. */
  const [getUserMediaError, setGetUserMediaError] = useState(false);

  /* We can use the useDailyEvent() hook to listen for daily-js events. Here's a full list
   * of all events: https://docs.daily.co/reference/daily-js/events */
  useDailyEvent(
    'camera-error',
    useCallback(() => {
      setGetUserMediaError(true);
    }, []),
  );

  /* This is for displaying remote participants: this includes other humans, but also screen shares. */
  const { screens } = useScreenShare();
  const remoteParticipantIds = useParticipantIds({ filter: 'remote' });

  /* This is for displaying our self-view. */
  const localSessionId = useLocalSessionId();
  const isAlone = remoteParticipantIds.length < 1 || screens.length < 1;

  const sharelink = async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Join my video call',
                url: window.location.href
            });
            console.log('Successfully shared');
        } catch (error) {
            console.log('Error sharing', error);
        }
    } else {
        console.log('Web Share API is not supported in your browser');
    }
}

  const renderCallScreen = () => (
    <div className={screens.length > 0 ? 'is-screenshare' : 'call'}>
      {/* Your self view */}
      {localSessionId && (
        <Tile
          id={localSessionId}
          isLocal
          isAlone={isAlone}
        />
      )}
      {/* Videos of remote participants and screen shares */}
      {remoteParticipantIds.length > 0 || screens.length > 0 ? (
        <>
          {remoteParticipantIds.map((id) => (
            <Tile key={id} id={id} />
          ))}
          {screens.map((screen) => (
            <Tile key={screen.screenId} id={screen.session_id} isScreenShare />
          ))}
        </>
      ) : (
        // When there are no remote participants or screen shares
        <div className="info-box">
          <h1>Waiting for others?</h1>
          <p>Invite someone by sharing this link:</p>
          <span className="room-url">{window.location.href}</span>
          <button onClick={sharelink} type="button">
            Share link
          </button>
        </div>
      )}
    </div>
  );

  return getUserMediaError ? <UserMediaError /> : renderCallScreen();
}
