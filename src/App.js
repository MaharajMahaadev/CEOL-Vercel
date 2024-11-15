import React, { useState } from 'react';

function App() {
  const [base64Images, setBase64Images] = useState([]);

  function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const base64Promises = Array.from(files).map(file => convertImageToBase64(file));

    try {
      const base64ImagesArray = await Promise.all(base64Promises);
      setBase64Images(base64ImagesArray);
      console.log(base64ImagesArray);  // ["data:image/jpeg;base64,...", "data:image/jpeg;base64,...", ...]
    } catch (error) {
      console.error("Error converting images to base64:", error);
    }
  };

  const sendImagesToBackend = async () => {
    const response = await fetch('https://ceol-model.onrender.com/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ img: base64Images })
    });
    
    const result = await response.json();
    console.log(result);
  };
  
  // Call sendImagesToBackend after images are uploaded, for example with a button click
  

  return (
    <div>
      <input type="file" multiple onChange={handleImageUpload} />
      <button onClick={() => console.log(base64Images)}>Log Base64 Images</button>
      <button onClick={sendImagesToBackend}>Send</button>
      {/* Here you can also call your fetch function to send the images to the backend */}
    </div>
  );
}

export default App;
