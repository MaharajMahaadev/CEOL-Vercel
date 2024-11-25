import React, { useState, useRef, useEffect } from 'react'
import './componentCSS/Predict.css'
import Webcam from 'react-webcam'

function Predict() {
  const [showDiv, setShowDiv] = useState(true);
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [isLoading, useIsLoading] = useState(1);

  function capture() {
    const file = webcamRef.current.getScreenshot({ width: 600, height: 400 });
    setImgSrc(file);
    setBase64Image(file);
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFile(files[0]);
  };

  const handleFile = (file) => {
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
      console.log(result);
      sessionStorage.setItem('result', result.emotion);
      sessionStorage.setItem('probability', result.probability);
    }
    catch (error) {
      val = 2;
    }
    useIsLoading(val);
  }

  function showLoading() {

    if (isLoading === 3) {
      return (
        <div className='loading-div'>
          Detecting the emotion please wait. <br></br> In rare cases it might take upto 2 minutes.<br></br>  We will let you know if something goes wrong.
        </div>
      )
    }
    else if (isLoading === 2) {
      return (<div className='loading-div'>
        Error in Predicting. Make sure the image size is less or that the image is not corrupted.
        <button onClick={RemoveImage} className="remove-button">Remove Image</button>
      </div>)
    }
    else {
      return (
        null
      )
    }
  }

  useEffect(() => {
    console.log(base64Image);
  }, [base64Image]);

  useEffect(() => {

  }, [isLoading]);



  return (
    <section className="section-div">
      {showLoading()}
      <button className='button' onClick={() => setShowDiv(true)}>Upload</button>
      <button className='button' onClick={() => setShowDiv(false)}>Take Picture</button>
      <button hidden={showDiv} style={{ 'background-color': '#424949', 'color': '#e5e8e8', 'width': 'fit-content', 'height': 'fit-content', 'padding': '5px' }} onClick={() => capture()}>{imgSrc === null ? 'Capture photo' : 'Capture Again'}</button>
      <a className='button' onClick={CallBack} >Predict</a>
      <div>
        {
          showDiv === false ?
            <div className='camdiv'>
              <Webcam height={400} width={600} screenshotFormat="image/jpeg" ref={webcamRef} />
              {imgSrc && (<img src={imgSrc} />)}
            </div> :
            <div className='uploaddiv'>
              <div className="drag-drop" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                {imgSrc ? (
                  <>
                    <img src={imgSrc} alt="Uploaded" className="image-preview" />
                    <button onClick={RemoveImage} className="remove-button">
                      Remove Image
                    </button>
                  </>
                ) : (
                  <>
                    <p>Drag & drop an image here, or click to select a file</p>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="file-input"/>
                  </>
                )}
              </div>
              {!imgSrc && (
                <button className="upload-button">
                  <label>
                    Upload Image
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="file-input" />
                  </label>
                </button>
              )}
            </div>
        }
      </div>
    </section>
  )
}

export default Predict