import React, { Component } from 'react';
import S3 from 'react-aws-s3';

/* By directly uploading these files to Amazon S3, I can avoid proxying these requests through my application server. 
This can significantly reduce network traffic and server CPU usage, and enable my application server to handle other requests during busy periods. 
S3 also is highly available and durable, making it an ideal persistent store for user uploads. */

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