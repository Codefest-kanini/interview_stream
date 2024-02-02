import React from 'react';
import { useMediaRecorder } from 'react-media-recorder';
const AudioRecorder = () => {
    const { status, startRecording, stopRecording, mediaBlobUrl } = useMediaRecorder({
        audio: true,
    });
    return (
        <div>
            {status === 'ready' && <button onClick={startRecording}>Start Recording</button>}
            {status === 'recording' && <button onClick={stopRecording}>Stop Recording</button>}
            {mediaBlobUrl && <audio src={mediaBlobUrl} controls />}
        </div>
    );
};
export default AudioRecorder;