import React, { Component } from 'react';
import S3 from 'react-aws-s3';

const config = {
  bucketName: process.env.REACT_APP_BUCKET,
  region: process.env.REACT_APP_S3_REGION,
  headers: {'Access-Control-Allow-Origin': '*'},
  accessKeyId: process.env.REACT_APP_AWSACCESSID,
  secretAccessKey: process.env.REACT_APP_AWSSECRETKEY,
}
const ReactS3Client = new S3(config);

class Intro extends Component {
  constructor(props){
    super(props);
    this.state = {
      success : false,
      url : ""
    }
  }

  handleChange = (ev) => {
    this.setState({success: false, url : ""});
    
  }
  // Perform the upload
  handleUpload = (ev) => {
    let file = this.uploadInput.files[0];
    console.log("Preparing the upload");
    
    ReactS3Client
  
    .uploadFile(file, "temp")
    .then(data => console.log(data))
    .catch(err => console.error(err))
    
  };
  
  
  render() {
    const Success_message = () => (
      <div style={{padding:50}}>
        <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
        <a href={this.state.url}>Access the file here</a>
        <br/>
      </div>
    )
    return (
      <div className="App">
        <center>
          <h1>UPLOAD A FILE</h1>
          {this.state.success ? <Success_message/> : null}
          <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
          <br/>
          <button onClick={this.handleUpload}>UPLOAD</button>
        </center>
      </div>
    );
  }
}
export default Intro;