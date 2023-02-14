import React, { useState, useEffect } from "react";
import axios, * as others from 'axios';
function App() {

    const [voices, setVoices] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [file, setFile] = useState(null);
    const [audioBuffer, setAudioBuffer] = useState(null);
    const [selectedVoice, setSelectedVoice] = useState("voice1");

    useEffect(() => {
        getAllVoices();
    }, []);

    const handleVoiceChange = event => {
        setSelectedVoice(event.target.value);
    };
    const handleFileChange = event => {
        setFile(event.target.files[0]);
      };

    const getAllVoices = () => {
        axios.get("http://localhost:5000/").then((response) => {
            setVoices(response.data.voices);
            setLoading(false);
        });
    };

    const playAudio = () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("voice", selectedVoice);
    
        fetch("polly", {
          method: "POST",
          body: formData
        })
          .then(response => response.arrayBuffer())
          .then(arrayBuffer => {
            setAudioBuffer(arrayBuffer);
          });
      };
    
      const uploadfile = async () => {
        let formData = new FormData();
        formData.append("file", file);
        console.log("aagya");
        axios.post('3.111.29.114:5000/polly', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });
    
      };
    
      const pauseAudio = () => {
        setAudioBuffer(null);
      };

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }
    // return (
    //     <>
    //         <select name="voice" onChange={handleVoiceChange}>
    //             {
    //                 voices.map(voice => (
    //                     <option key={voice.Id} value={voice.Id}>
    //                         {voice.LanguageName} - {voice.Name}
    //                     </option>
    //                 ))
    //             }
    //         </select>
    //     </>

    // );
    return (
        <div>
          <h1>PDF to Audio Converter</h1>
          <form>
            <input type="file" name="file" onChange={handleFileChange} />
            <br />
            <br />
            <select name="voice" onChange={handleVoiceChange}>
              {
                // for(let i = 0; i<voices.length; i++){
                //               <option key={voice.Id} value={voice.Id}>
                //   {voice.LanguageName} - {voice.Name}
                // </option>
                // }
              //   () => {
              //   console.log("mylogsssss",voices)
              
               voices.map(voice => (
                <option key={voice.Id} value={voice.Id}>
                  {voice.LanguageName} - {voice.Name}
                </option>
              ))}
            </select>
            <br />
            <br />
            <input type="button" value="Play MP3" onClick={playAudio} />
            <input type="button" value="Pause MP3" onClick={pauseAudio} />
            <input type="button" value="Upload" onClick={uploadfile} />
          </form>
        </div>
    );
}
export default App;