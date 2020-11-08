import React, { Component } from 'react';
import axios from "axios";
// import S3 from 'react-aws-s3';

// const config = {
//   bucketName: process.env.REACT_APP_BUCKET,
//   region: process.env.REACT_APP_S3_REGION,
//   headers: {'Access-Control-Allow-Origin': '*'},
//   accessKeyId: process.env.REACT_APP_AWSACCESSID,
//   secretAccessKey: process.env.REACT_APP_AWSSECRETKEY,
// }
// const ReactS3Client = new S3(config);

class Intro extends Component {
  constructor(props){
    super(props);
    this.state = {
      success: false,
      doneAnalize: false
    };
  }
  
  getFileExtension = (filename) => {
    var ext = /^.+\.([^.]+)$/.exec(filename);
    return ext == null ? "" : ext[1];
  }

  handleChange = (ev) => {
    this.setState({success: false, url : ""});
    
  }

  // Perform the upload
  handleUpload = (ev) => {
    let file = this.uploadInput.files[0];
    let link ="";
    let headers = "";

    if (this.getFileExtension(file.name) === "txt"){
      link = "https://0nc3lkfsx0.execute-api.us-east-2.amazonaws.com/default/getPreSignedTXT";
      headers = "text/plain";
    }else if(this.getFileExtension(file.name) === "xlsx"){
      link = "https://sv5xm4lg4l.execute-api.us-east-2.amazonaws.com/default/getPreSignedXLSX";
      headers = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    }else{
      throw new Error("Invalid file type");
    }
    
    console.log("Preparing the upload");

    axios.get(link)
    .then(response => {
      var url = response.data.uploadURL;
      console.log("Recieved a signed request " + url);

      var options = {
        headers: {
          'Content-Type': headers
        }
      };
      axios.put(url,file,options)
      .then(result => {
        console.log("Response from s3")
        this.setState({success: true});
      })
      .catch(error => {
        alert("ERROR " + JSON.stringify(error));
      })
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
    
  };

  handleAnalyse = (ev) => {
    let file = this.uploadInput.files[0];
    let apiUrl = "https://2imdj98e48.execute-api.us-east-2.amazonaws.com/1/extract?extension=" + this.getFileExtension(file.name);

    axios.get(apiUrl)
    .then(response => {
      var personalInfo = response.data;
      //this.setState({url: url})
      console.log("PI: \n=================\n" + personalInfo);
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
  }
  
  
  render() {
    const Success_message = () => (
      <div style={{padding:50}}>
        <h2 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h2>
        <br/>
        <button onClick={this.handleAnalyse}>Analyse my file</button>
      </div>
    )
    return (
      <div className="App">
        <center>
          <h1>PERSONAL INFORMATION IDENTIFICATION APP</h1>
          {this.state.success ? <Success_message/> : null}
          {this.state.success ? null :
            <div>
              <h2>Upload a file</h2>
              <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
              <br/>
              <button onClick={this.handleUpload}>UPLOAD</button>
            </div>
          }
          
        </center>
      </div>
    );
  }
}
export default Intro;