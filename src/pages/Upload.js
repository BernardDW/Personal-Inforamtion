import React, { Component } from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom';

class Upload extends Component {
  constructor(props){
    super(props);
    this.state = {
      load: false,
      fileExt: "asd"
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  
  getFileExtension = (filename) => {
    var ext = /^.+\.([^.]+)$/.exec(filename);
    return ext == null ? "" : ext[1];
  }

  handleChange = (ev) => {
    this.setState({success: false});
    let file = this.uploadInput.files[0];
    let ext = this.getFileExtension(file.name);
    this.setState({fileExt: ext}, () => {
      console.log(this.state.fileExt)
    });
  }

  // Perform the upload
  handleUpload = (ev) => {
    let file = this.uploadInput.files[0];
    
    let link ="";
    let headers = "";

    if (this.state.fileExt === "txt"){
      link = "https://0nc3lkfsx0.execute-api.us-east-2.amazonaws.com/default/getPreSignedTXT";
      headers = "text/plain";
    }else if(this.state.fileExt === "xlsx"){
      link = "https://sv5xm4lg4l.execute-api.us-east-2.amazonaws.com/default/getPreSignedXLSX";
      headers = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    }else if(this.state.fileExt === "json"){
      link = "https://61o0lv1btb.execute-api.us-east-2.amazonaws.com/default/getPresSignedJSON";
      headers = "application/json";
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
        this.handleRouting();
      })
      .catch(error => {
        alert("ERROR " + JSON.stringify(error));
      })
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
    
  };

  handleRouting=()=> {
    this.props.history.push('/analyse', {
      fileExtension: this.state.fileExt
    })
  } 
  
  render() {
    return (
      <div>
        <center>
          <h1>PERSONAL INFORMATION IDENTIFICATION APP</h1>
          {this.state.load ? <p>Loading</p> : null}
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
export default Upload;