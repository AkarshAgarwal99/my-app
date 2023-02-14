import React, { useState } from "react";
import axios, * as others from 'axios';
const get_voices = async () => {
  return [
       { Id: "voice1", LanguageName: "English", Name: "Joanna" },
       { Id: "voice2", LanguageName: "Spanish", Name: "Miguel" },
       { Id: "voice3", LanguageName: "German", Name: "Hans" }
 ]
  // var voices_output;
  // var config = {
  //   method: 'get',
  //   maxBodyLength: Infinity,
  //   url: 'http://127.0.0.1:5000/',
  //   headers: {}
  // };
  // return await axios(config)
  //   .then(function (response) {
  //     //  console.log(JSON.stringify(response.data));
  //     voices_output = JSON.stringify(response.data.voices);
  //     // console.log("mylog",voices_output);
  //     return voices_output
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
    // return voices_output
}
const PDFToAudioConverter = () => {
  // get all voices list
  // const [voices, setVoices] = useState([
  //   { Id: "voice1", LanguageName: "English", Name: "Joanna" },
  //   { Id: "voice2", LanguageName: "Spanish", Name: "Miguel" },
  //   { Id: "voice3", LanguageName: "German", Name: "Hans" }
  // ]);
  const [voices, setVoices] = useState(get_voices());

  const [selectedVoice, setSelectedVoice] = useState("voice1");
  const [file, setFile] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState(null);

  const handleFileChange = event => {
    setFile(event.target.files[0]);
  };

  const handleVoiceChange = event => {
    setSelectedVoice(event.target.value);
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

  const pauseAudio = () => {
    setAudioBuffer(null);
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
};

export default PDFToAudioConverter;
