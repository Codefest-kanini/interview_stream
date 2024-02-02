import React from "react";
import Webcam from "react-webcam";
import supabase from "../../supabase.config";

export default function WebcamComponent  ()  {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);

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
            console.log(data)
            alert('Image uploaded successfully')
        }
    }

    

    return (
        <div className="container">
            {imgSrc ? (
                <img src={imgSrc} alt="webcam" />
            ) : (
                <Webcam height={600} width={600} ref={webcamRef} />
            )}
            <div className="btn-container">
                {imgSrc ? (
                    <div style={{display:'flex', flexDirection:'row', gap:'5px'}}>
                        <button type="button" onClick={retake}>Retake photo</button>
                        <button type="button" onClick={submit}>Submit photo</button>
                    </div>
                ) : (
                    <button type="button" onClick={capture}>Capture photo</button>
                )}
            </div>
        </div>
    );
};

// export default WebcamComponent;