import "./componentCSS/Songs.css"
import data from "../data"
import React, { useEffect, useState } from "react";
import { SkipForward } from "lucide-react";

function Songs() {
    const result = sessionStorage.getItem('result') || "Undefined";
    const probability = sessionStorage.getItem('probability') || 0.0;
    const [ytUrl, useYtUrl] = useState(data[0][0]);
    const [songCategory, useSongCategory] = useState(7);

    function UsechangeVideo() {
        var temp = Math.random() * 8;

        if (temp === 8) {
            temp -= 0.1;
        }

        temp = Math.floor(temp);


        useYtUrl(data[songCategory][temp]);

    }

    const ChangeCategory = (e) => {
        var val = 7;
        if (e === "Anger") {
            val = 0;
        }
        else if (e === "Disgust") {
            val = 1;
        }
        else if (e === "Fear") {
            val = 2;
        }
        else if (e === "Happy") {
            val = 3;
        }
        else if (e === "Sad") {
            val = 4;
        }
        else if (e === "Surprise") {
            val = 5;
        }
        else if (e === "Neutral") {
            val = 6;
        }
        else{
            val = 7;
        }
        useSongCategory(val);
        useYtUrl(data[val][0]);
    }

    useEffect(() => {
        ChangeCategory(String(result).charAt(0).toUpperCase() + String(result).slice(1));
    }, []);

    useEffect(() => {

    }, [ytUrl, songCategory]);

    return (
        <>
            <div className="song-div">
                <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + ytUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <div className="song-innerdiv">
                    <p>The recognised emotion is <i>{result}</i>, <br></br> with a confidence of <i>{(probability * 100).toFixed(2)}%</i>. <br></br> Remember based on detected emotion, the song which <br></br> would invoke positive emotions in relation to it is played.</p>
                    <button disabled={songCategory===7?true:false} onClick={() => UsechangeVideo()} className='button'>Skip Song <SkipForward size={16} /></button>
                    <select onChange={(e) => ChangeCategory(e.target.value)} className="button">
                        <option disabled selected>Change Song Category</option>
                        <option>Anger</option>
                        <option>Disgust</option>
                        <option>Fear</option>
                        <option>Happy</option>
                        <option>Sad</option>
                        <option>Surprise</option>
                        <option>Neutral</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export default Songs;