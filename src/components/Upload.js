import React from 'react';

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
        // case '.xlsx' || '.xls':
        // var result = {};
        // file = new Uint8Array(file);
        // var workbook = XLSX.read(file, {
        // type: 'array'
        // });
        // workbook.SheetNames.forEach(function (sheetName) {
        // var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        // header: 1
        // });
        // if (roa.length) result[sheetName] = roa;
        // });
        // filecontent = JSON.stringify(result);
        // break;
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