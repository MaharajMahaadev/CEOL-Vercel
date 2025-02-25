import React, { useState } from 'react';

function App() {
  const [base64Images, setBase64Images] = useState([]);
  const [ vid, setVid ] = useState('https://www.youtube.com/embed/4HOk8gcRzKo?si=tbYnNanE83in5bnl');

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

  

  async function checkBack(){
    try{
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({img_base64: JSON.stringify({ img: base64Images })})
      });
      
      const result = await response.json();
      console.log(result);
    }
    catch(error){
      throw new Error("error to fetch");
    }
  }

  function setVidFunc(){
    if(vid==='https://www.youtube.com/embed/4HOk8gcRzKo?si=tbYnNanE83in5bnl'){
      setVid('https://www.youtube.com/embed/CFG_Cih-wZY?si=Q99Vq8ChV7K0Kt0B')
    }
    else{
      setVid('https://www.youtube.com/embed/4HOk8gcRzKo?si=tbYnNanE83in5bnl')
    }
  }
  
  // Call sendImagesToBackend after images are uploaded, for example with a button click
  

  return (
    <div>
      <input type="file" multiple onChange={handleImageUpload} />
      <button onClick={() => console.log(base64Images)}>Log Base64 Images</button>
      {/* Here you can also call your fetch function to send the images to the backend */}
      <button>Call</button>
      <button onClick={() => checkBack()}>Click me</button>
      <iframe width="560" height="315" src={vid} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <button onClick={() => setVidFunc()}>Change Video</button>
    </div>
  );
}

export default App;
