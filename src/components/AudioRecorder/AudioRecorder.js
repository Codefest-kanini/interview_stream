import React from 'react';
import { useReactMediaRecorder } from 'react-media-recorder'
import supabase from '../../supabase.config';
// import Audio from '../../assets/hello.m4a'

export default function AudioRecorder  ()  {
    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
        audio: true,
    });
    const [isloading, setIsloading] = React.useState(false)
    // alert(status)  
    const [isuploaded, setIsuploaded] = React.useState(false)
    const uploadAudio = async () => {
        // Convert mediaBlobUrl to a Blob
        setIsloading(true)
        const response = await fetch(mediaBlobUrl);
        const blob = await response.blob();
        const randomName = Math.random().toString(36).substring(7)
        // Create a File object
        const audioFile = new File([blob], `recorded_audio_${randomName}.mp3`, { type: "audio/mp3" });

        // Upload the File object to Supabase
        const { data: ddata, error } = await supabase
            .storage
            .from('voices')
            .upload(audioFile.name, audioFile);

        if (error) {
            console.error('Error uploading audio: ', error);
        } else {
            console.log(ddata)

            console.log('Successfully uploaded audio.');
            const url = 'https://speaker-verification1.p.rapidapi.com/Verification';
            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X-RapidAPI-Key': 'b18c979036msh4665c6e9f40dd4cp110e5ejsnc91399e4bebe',
                    'X-RapidAPI-Host': 'speaker-verification1.p.rapidapi.com'
                },
                body: new URLSearchParams({
                    linkFile1: 'https://qgdfgcbsrpfyugknxorv.supabase.co/storage/v1/object/public/voices/recorded_audio_a49xqn.mp3',
                    linkFile2: 'https://qgdfgcbsrpfyugknxorv.supabase.co/storage/v1/object/public/voices/recorded_audio_a49xqn.mp3'
                })
            };

            try {
                const response2 = await fetch(url, options);
                const result = await response2.text();
                console.log(result);
                setIsuploaded(true)
            } catch (error2) {
                console.error(error2);
            }
        }
        setIsloading(false)
    };
    
    return (
        <div style={{display:"flex", flexDirection:'row', gap:'5px', margin:'5px'}}>
            {status === 'idle' && <button type='button' onClick={startRecording}>Start Recording</button>}
            {isuploaded? <p>✔️</p>: <p>❌</p> }
            {status === 'recording' && <button type='button' onClick={stopRecording}>Stop Recording</button>}
            {mediaBlobUrl && <audio src={mediaBlobUrl} controls /> }
            {mediaBlobUrl && <button disabled={isloading} type='button' onClick={() => uploadAudio()}>upload</button> }
        </div>
    );
};
