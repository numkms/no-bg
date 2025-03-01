import { useState } from 'react'
import { createCollage } from './core';
import './App.css'

function App() {
  const [files, setFiles] = useState(null);
  const [results, setResults] = useState([])

  const handleFileChange = (event) => {
      setFiles(event.target.files);
  };

  const convertFiles = async () => {
      if (files) {
        console.log(files)
        console.log("Started")
        const results = await createCollage(Array.from(files))
        setResults([results])
      } else {
          alert('Please select a HEIC file to convert.');
      }
  };
  

  return (
      <div className="App">
          <div className="converter">
              <h1>HEIC to MP4 Converter</h1>
              <input type="file" multiple="true" onChange={handleFileChange} />
              <button onClick={convertFiles}>Convert</button>
              {results.map ((result) => <a href={result}>result</a>)}
          </div>
      </div>
  );
}

export default App;