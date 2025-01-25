import React, { useState, useRef, useEffect } from 'react'
import './componentCSS/Predict.css'
import Webcam from 'react-webcam'
import { Camera, ImageIcon, LoaderPinwheel, LucideUpload } from 'lucide-react';

function Predict() {
  const [showDiv, setShowDiv] = useState(true);
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [isLoading, useIsLoading] = useState(1);

  function capture() {
    const file = webcamRef.current.getScreenshot({ width: 400, height: 300 });
    if (file) {
      const MAX_SIZE = 500 * 1024; 
      if (file.size > MAX_SIZE) {
        alert("The image size exceeds 500 KB. Please upload a smaller image.");
        return;
      }
    }
    setImgSrc(file);
    setBase64Image(file);
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFile(files[0]);
  };

  const handleFile = (file) => {
    if (file) {
      const MAX_SIZE = 500 * 1024; 
      if (file.size > MAX_SIZE) {
        alert("The image size exceeds 500 KB. Please upload a smaller image.");
        return;
      }
    }

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setBase64Image(reader.result); 
        console.log(reader.result);
        setImgSrc(reader.result); 
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      handleFile(file);
    }
  };

  const RemoveImage = () => {
    if (imgSrc) {
      URL.revokeObjectURL(imgSrc);
      setImgSrc(null);
    }
    useIsLoading(1);
  };

  const CallBack = async () => {
    var val = 3;
    useIsLoading(val);
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ img_base64: JSON.stringify({ img: base64Image }) })
      });

      const result = await response.json();      
      sessionStorage.setItem('result', result.data[0].emotion ?? "Happy");
      sessionStorage.setItem('probability', result.data[0].probability ?? 0.0);
      window.location.href = '/play';
    }
    catch (error) {
      alert("Sorry! There was an issue with the server! ");
      console.log(error);
      val = 1;
    }
    useIsLoading(val);
  }

  useEffect(() => {
    console.log(base64Image);
  }, [base64Image]);

  useEffect(() => {

  }, [isLoading]);



  return (
    <section className="section-div">
      <button className='button' style={showDiv===true?{'backgroundColor':'#e5e8e8', 'color':'#424949'}:{'backgroundColor':'#424949', 'color':'#e5e8e8'}} onClick={() => setShowDiv(true)}><ImageIcon size={16} /> Upload</button>
      <button className='button' style={showDiv===false?{'backgroundColor':'#e5e8e8', 'color':'#424949'}:{'backgroundColor':'#424949', 'color':'#e5e8e8'}} onClick={() => setShowDiv(false)}>< Camera size={16} /> Take Picture</button>
      <button disabled={isLoading===1?imgSrc===null?true:false:true} className='button' onClick={CallBack} ><LoaderPinwheel size={16}/> Predict <span style={isLoading===1?{'display':'none'}:{}} className='spinner'></span></button>
      <div>
        {
          showDiv === false ?
            <div className='camdiv'>
              <div className='camdiv-inner'>
                <div className='camdiv-cam'>
                  <p>Camera</p>
                  <Webcam className='camdiv-cam1' screenshotFormat="image/jpeg" ref={webcamRef} />
                </div>
                {imgSrc && 
                <div className='camdiv-img'>
                  <p>Captured Image</p>
                <img src={imgSrc} />
                </div>}
              </div>
              <button hidden={showDiv} style={{'margin': '5px'}} className='button' onClick={() => capture()}>{imgSrc === null ? 'Capture photo' : 'Capture Again'}</button>
            </div> :
            <div className='uploaddiv'>
              <div className="drag-drop" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                {imgSrc ?
                    <img src={imgSrc} alt="Uploaded" className="image-preview" /> 
                    : (
                  <>
                    <p><LucideUpload size={16} /> Drag & drop an image here, or click to select a file</p>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="file-input"/>
                  </>
                )}
              </div>
              { imgSrc ? <button onClick={RemoveImage} className="remove-button">
                      Remove Image
                    </button>:null}
            </div>
        }
      </div>
    </section>
  )
}

export default Predict