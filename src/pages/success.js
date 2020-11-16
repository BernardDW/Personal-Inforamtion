import React, { Component } from "react";

export default class Success extends Component {

    componentDidMount() {
        localStorage.clear();
    }
    
    render() {
        return (
            <div>
                <h1 style={{marginTop: "2em", marginBottom: "2em"}}>SUCCESS</h1>
                <img src="https://i.pinimg.com/originals/e8/06/52/e80652af2c77e3a73858e16b2ffe5f9a.gif" alt="Success gif"/>
            </div>
        );
    }
}