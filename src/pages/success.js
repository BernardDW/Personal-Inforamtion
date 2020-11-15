import React, { Component } from "react";

export default class Success extends Component {

    componentDidMount() {
        localStorage.clear();
    }
    
    render() {
        return (
            <div>
                <h1>SUCCESS</h1>
            </div>
        );
    }
}