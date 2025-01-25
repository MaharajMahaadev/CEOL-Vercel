import './componentCSS/Home.css'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { MoveRight } from 'lucide-react'

function Home() {
    return (
        <section className="section-div">
            <div className='div-tables'>
                <div className='tables'>
                    <DotLottieReact className='back-img'
                        src="https://lottie.host/de03bf19-bb64-42e3-ba66-32b095c74130/zwAC4wYZy4.lottie"
                        loop
                        autoplay
                    />
                    <p className='heading'>Upload or Scan Images</p>
                    <p className='content'>Upload or use the web camera to take images of human faces to detect the emotions using AI. It supports 7 emotions as Anger, Disgust, Fear, Happy, Sad, Surprise and Neutral.</p>
                </div>
                <div className='tables'>
                    <DotLottieReact className='back-img'
                        src="https://lottie.host/4d3429e4-dabb-4654-a94d-b8869d87ced8/tTF5Ljshul.lottie"
                        loop
                        autoplay
                    />
                    <p className='heading'>Emotion Detection</p>
                    <p className='content'>The image is passed through a CNN model built using keras. It is trained using FER2013 datasets. The analysis and prediction of the model yields an accuracy of around 75.6%</p>
                </div>
                <div className='tables'>
                    <DotLottieReact className='back-img'
                        src="https://lottie.host/16ca3525-199c-48c2-af0d-43f41465f459/rNslTH91QC.lottie"
                        loop
                        autoplay
                    />
                    <p className='heading'>Song Recommendation</p>
                    <p className='content'>Depending on the emotion detected by the AI, a certain category of song is played. The recommendation is based on various existing research paper data investigating the correlation between songs and emotions.</p>
                </div>
            </div>
            <div style={{'display':'block'}}>
            <a className='button' href="/predict">Start <MoveRight /></a>
            </div>
        </section>
    )
}

export default Home