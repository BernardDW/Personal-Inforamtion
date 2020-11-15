import React, { Component } from "react";
import axios from "axios";
import {BrowserRouter as Router, Redirect} from 'react-router-dom';

export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
          loggedIn: false,
          userUUID: []
        };
      }

    login=()=> {
        var user = document.getElementById("usernameLogin").value;
        var pass = document.getElementById("passLogin").value;

        if(user === "" | pass ==="") {
            alert("Username or password is empty")
        }else{
            let apiUrl = "https://2imdj98e48.execute-api.us-east-2.amazonaws.com/3/users?user="+user+"&pass="+pass;

            axios.get(apiUrl)
            .then(response => {
                if(response.data.statusCode === 200){
                    localStorage.setItem('uuid',response.data.body);
                    this.setState({loggedIn: true});
                }else if(response.data.statusCode === 500) {
                    alert(response.data.body);
                }
            })
                .catch(error => {
                alert(JSON.stringify(error));
            })
        }
    } 

    async signUp() {
        var username = document.getElementById("usernameSign").value;
        var password = document.getElementById("passSign").value;
        var confirm = document.getElementById("passConfirm").value;

        if(username === "" | password ==="") {
            alert("Username or password is empty.");
        }else if(password !== confirm){
            alert("Passwords does not match.");
        }else{
            let apiUrl = "https://2imdj98e48.execute-api.us-east-2.amazonaws.com/3/register?username="+username+"&password="+password;
            console.log(apiUrl);

            let res = await axios.post(apiUrl)
    
            if (res.data.statusCode === 200) {
                alert("You have succesfully registered");
                document.getElementById("usernameSign").value = "";
                document.getElementById("passSign").value = "";
                document.getElementById("passConfirm").value = "";
            }else if(res.data.statusCode === 500){
                alert(res.data.body);
            }

            console.log(res);
        }
    } 

    render() {
        if (this.state.loggedIn === true) {
            return <Redirect to='/' />
        }
        return (
            <Router>
                <div>
                    <div className="form"> 

                        <h1>LOG IN</h1>

                        <div className="form-group">
                            <label>Username:</label><label style={{marginLeft: "3.8em"}}></label>
                            <input id="usernameLogin" type="text" className="form-control" placeholder="Enter username" />
                        </div>

                        <div className="form-group">
                            <label>Password:</label><label style={{marginLeft: "4em"}}></label>
                            <input id="passLogin" type="password" className="form-control" placeholder="Enter password" />
                        </div>

                        <button className="btn btn-dark btn-lg btn-block" onClick={this.login}>Sign in</button>
                    </div>
                    <h3 style={{marginTop: "2.5em"}}>OR</h3>
                    <div className="form">

                        <h1>SIGN UP</h1>

                        <div className="form-group">
                            <label>Username:</label><label style={{marginLeft: "3.4em"}}></label>
                            <input id="usernameSign" type="text" className="form-control" placeholder="Enter username" />
                        </div>

                        <div className="form-group">
                            <label>Password:  </label><label style={{marginLeft: "3.8em"}}></label>
                            <input id="passSign" type="password" className="form-control" placeholder="Enter password" />
                        </div>
                        <div className="form-group">
                            <label>Confirm password:</label>
                            <input id="passConfirm" type="password" className="form-control" placeholder="Enter password again" />
                        </div>

                        <button className="btn btn-dark btn-lg btn-block" onClick={this.signUp}>Sign up</button>
                    </div>
                </div>
                
            </Router>
            
        );
    }
}