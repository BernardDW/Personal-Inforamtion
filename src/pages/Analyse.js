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

class Analyse extends Component {
  constructor(props){
    super(props);
    this.state = {
      success: false,
      doneAnalize: false
    };
  }

  componentDidMount() {
    console.log(this.props.location.state.fileExtension)
    this.handleAnalyse();
  }

  handleAnalyse = (ev) => {
    let apiUrl = "https://2imdj98e48.execute-api.us-east-2.amazonaws.com/1/extract?extension=" + this.props.location.state.fileExtension;

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
    <div>
      <center>
        <h1>ANALYZING</h1>
        {this.state.success ? <Success_message/> : null}
        <button onClick={this.handleRouting}>Route</button>
        
      </center>
    </div>
  );
  }
}
export default Analyse;