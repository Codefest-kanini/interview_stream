import React from 'react';
import { useReactMediaRecorder } from 'react-media-recorder'
import supabase from '../../supabase.config';

export default function AudioRecorder  ()  {
    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
        audio: true,
    });
    alert(status)  
    
    const uploadAudio = async () => {
        // Convert mediaBlobUrl to a Blob
        const response = await fetch(mediaBlobUrl);
        const blob = await response.blob();
        const randomName = Math.random().toString(36).substring(7)
        // Create a File object
        const audioFile = new File([blob], `recorded_audio_${randomName}.webm`, { type: "audio/webm" });

        // Upload the File object to Supabase
        const { data, error } = await supabase
            .storage
            .from('voices')
            .upload(audioFile.name, audioFile);

        if (error) {
            console.error('Error uploading audio: ', error);
        } else {
            console.log(data)
            console.log('Successfully uploaded audio.');
        }
    };
    
    return (
        <div style={{display:"flex", flexDirection:'row', gap:'5px', margin:'5px'}}>
            {status === 'idle' && <button type='button' onClick={startRecording}>Start Recording</button>}
            {status === 'recording' && <button type='button' onClick={stopRecording}>Stop Recording</button>}
            {mediaBlobUrl && <audio src={mediaBlobUrl} controls /> }
            {mediaBlobUrl && <button type='button' onClick={() => uploadAudio()}>upload</button> }
        </div>
    );
};
