import React, { Component } from 'react';
import axios from "axios";
import {Card, Button, CardDeck} from 'react-bootstrap'

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
      metaData: [],
      doneAnalise: false
    };
  }

  componentDidMount() {
    console.log(this.props.location.state.fileExtension)
    this.handleAnalyse();
  }

  handleAnalyse = (ev) => {
    let apiUrl = "https://2imdj98e48.execute-api.us-east-2.amazonaws.com/3/extract?extension=" + this.props.location.state.fileExtension;

    axios.get(apiUrl)
    .then(response => {
      var personalInfo = [];

      for(let i = 0; i < response.data.length; i++) {
        personalInfo.push(response.data[i])
      }

      this.setState({metaData: personalInfo, doneAnalise: true})
      console.log(this.state.metaData)

    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
  }

  removeItem = (id) => {
    let temp = this.state.metaData;
    temp.splice(id,1)
    this.setState({metaData: temp})
    console.log(this.state.metaData)
  }

  addItem() {
    var temp = this.state.metaData;
    temp.push(this.newText.value);
    this.setState({metaData: temp});
    console.log(this.state.metaData)
  }

  render() {
  return (
    <div>
      <center>
        <h1>ANALYSIS</h1>
        <br/>
        <hr/>
        <h2>CONFIRM THE LIST AT THE BOTTOM TO SAVE THE METADATA LIST IN THE DATABSE</h2>
        <hr/>
        <div className="form-group">
          <label htmlFor="example2">Medium input</label>
          <input type="text" id="example2" className="form-control form-control-md" ref={(ip) => {this.newText = ip}}/>
        </div>
        <Button className="btn btn-success" onClick={this.addItem.bind(this)} >Add metadata to list</Button>
        {this.state.doneAnalise ? 
          <CardDeck>
            {this.state.metaData.map((meta,i) => (
                <Card key={i}>
                    <Card.Body>
                        <Card.Title>{meta}</Card.Title>
                        <Button className="btn btn-danger" href={null} key={i} onClick={this.removeItem.bind(this, i)} >Remove</Button>
                    </Card.Body>
                </Card>
            ))}
          </CardDeck>

        : <h3>Loadddding ...</h3>}
        <Button className="btn btn-success" onClick={this.addItem.bind(this)} >Confirm</Button>
      </center>
    </div>
  );
  }
}
export default Analyse;