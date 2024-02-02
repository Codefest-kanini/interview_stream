import React from "react";
import Webcam from "react-webcam";
import supabase from "../../supabase.config";

export default function WebcamComponent  ()  {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const [cameraOpen, setCameraOpen] = React.useState(false);
    const [isuploaded, setIsuploaded] = React.useState(false);
    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImgSrc(imageSrc);
        },
        [webcamRef]
    );

    const retake = () => {
        setImgSrc(null);
    }

    const submit = async() => {

        const response = await fetch(imgSrc);
        const blob = await response.blob();

        const avatarFile = new File([blob], "avatar.png", { type: "image/png" });
        const randomName = Math.random().toString(36).substring(7)
        const { data, error } = await supabase
        .storage
        .from('faces')
        .upload(`/${randomName}.png`, avatarFile, {
            cacheControl: '3600',
            upsert: false
        })
        if(data && !error) {
            console.log(data);
            setIsuploaded(true);
            alert('Image uploaded successfully');
    
            // Retrieve the public URL of the uploaded file
            const { publicURL, error: urlError } = supabase
                .storage
                .from('faces')
                .getPublicUrl(`${randomName}.png`);
    
            if (urlError) {
                console.error('Error retrieving public URL: ', urlError);
            } else {
                console.log('Public URL: ', publicURL);
            }
        }
    }

    

    return (
        <div className="container">
            {imgSrc ? (
                <img src={imgSrc} alt="webcam" />
            ) : (
                <>
                    <button type="button" onClick={() => setCameraOpen(true)}>Open Camera</button> 
                    {cameraOpen && <Webcam ref={webcamRef} height={600} width={600} screenshotFormat="image/jpeg" />} 
                    
                </>
            )}
            <div className="btn-container" style={{display:'flex', flexDirection:'row', gap:'8px'}}>
                {imgSrc ? (
                    <div style={{display:'flex', flexDirection:'row', gap:'5px'}}>
                        <button type="button" onClick={retake}>Retake photo</button>
                        <button type="button" onClick={submit}>Submit photo</button>
                    </div>
                ) : (
                    <button type="button" onClick={capture}>Capture photo</button>
                    )}
                {isuploaded? <p>✔️</p>: <p>❌</p> }
            </div>
        </div>
    );
};

// export default WebcamComponent;