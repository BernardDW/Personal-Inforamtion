import React from 'react';

function Intro() {

  let fileReader;
  
  const handleFileRead = (e) => {
    const content = fileReader.result;
    console.log(content)
    // … do something with the 'content' …
  };
  
  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    
  };
  
  return <div className='upload-expense'>
    <h1>Choose file to detect Personal Information</h1>
    <input
      type='file'
      id='file'
      className='input-file'
      accept='.csv, .txt, .doc, .docx, .xls, .xlsx, .pdf'
      onChange={e => handleFileChosen(e.target.files[0])}
    />
  </div>;

}

export default Intro;