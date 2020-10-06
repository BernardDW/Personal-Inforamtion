import React from 'react';
import * as XLSX from 'xlsx';

function Intro() {

  let fileReader;
  var fileContent = "";
//   var PdfReader = require("pdfreader").PdfReader;

  function getFileExtension(filename) {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
  }
  
  const handleFileRead = (e) => {
    const content = fileReader.result;
    console.log(content)
    // … do something with the 'content' …
  };
  
  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    var fileExtension = getFileExtension(file.name);
    console.log(fileExtension)
    switch (fileExtension) {
        // case '.pdf':
        //     new PdfReader().parseBuffer(filebuffer, function (err, item) {
        //     if (err) console.log(err);
        //     else if (!item) console.log(item);
        //     else if (item.text) {
        //         fileContent = fileContent + " " + item.text;
        //     }
        //     });
        // break;
        // case '.doc' || '.docx':
        //     fileContent.extract(filePath).then(function (res, err) {
        // if (err) {}
        // fileContent = res;
        // })
        // break;
        case 'xlsx' || 'xls':
          fileReader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, {type:'binary'});
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, {header:1});
            /* Update state */
            console.log("The data in the excel file: \n"+data);
          }
          fileReader.readAsBinaryString(file);
        break;
        case 'txt' || 'csv':
            fileReader.readAsText(file);
        break;
        default:
            fileContent = file.name;
            console.log(fileContent);
        }
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