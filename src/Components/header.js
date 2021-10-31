import React from 'react';
import '../Styles/header.css';
import Modal from 'react-modal';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import alert from 'alert';
import{withRouter} from 'react-router-dom';
import { NavLink } from "react-router-dom";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius:'6px',
      
    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            isLoggedIn: false,
            loggedInUser: '',
            googleloggedInUser:'',
            AccModalIsOpen: false,
            ANOTHERModalIsOpen: false,
            email:'',
            password:'',
            firstname:'',
            lastname:'',
            phNumber:'',
            address:'',
            user:[],
            profileObj: []

        }
    }



   handleaccountDetail =(email) =>{
    this.props.history.push(`/account?email=${email}`);
    }


    handleCloseModal = (state, value) => {
        this.setState({ [state]: value });
    }




    handleInputChange = (event,state)=>{
        this.setState({[state] : event.target.value});
    }
    handleSignUp = ()=>{
        const {  email, password, firstname, lastname,phNumber,address, } = this.state;
        const signUpObj = {
            email:email,
            password:password,
            firstname:firstname,
            lastname:lastname,
            phNumber:phNumber,
            address:address,
        };
           axios({
            url:'https://peaceful-falls-09725.herokuapp.com/usersignup',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: signUpObj

        })
        .then(response => {
            if (response) {
                this.setState({

                    email: email,
                    password: password,
                    firstname: firstname,
                    lastname: lastname,
                    phNumber:phNumber,
                    address:address,
                    });
                    alert(response.data.message)

            }

        })
        .catch(err => console.log(err))

        this.setState({  AccModalIsOpen: false,
            ANOTHERModalIsOpen:true})

    }
    responseGoogle = (response) => {
        console.log(response)
        this.setState({ isLoggedIn: true, googleloggedInUser: response.profileObj.name, loginModalIsOpen: false })
    }

    responseFacebook=(response)=> {
         this.setState({ loggedInUser: response.name,email: response.email, isLoggedIn: true, loginModalIsOpen: false })
        console.log(response)
      }

      handleANOTHER = () => {
        this.setState({ ANOTHERModalIsOpen: true, loginModalIsOpen: false, AccModalIsOpen: false,isLoggedIn: true })
    }

    handleAcc = () => {
        this.setState({ AccModalIsOpen: true });
    }

    userLogout = () => {
        this.setState({ isLoggedIn: false, loggedInUser: '' });
        this.props.history.push('/');
    }

    handleLogedin = (event) => {

        const { email, password} = this.state;
        const loginObj = {
            email: email,
            password: password,


        };
        axios({
            method: 'POST',
            url: 'https://peaceful-falls-09725.herokuapp.com/login',
            headers: { 'Content-Type': 'application/json' },
            data: loginObj
        })
            .then(response => {
                this.setState({
                    isLoggedIn: response.data.isauthenticateduser,
                    email: email,
                    password: password,
                    loggedInUser: email,
                    ANOTHERModalIsOpen: false,
                    email:email,
                    isLoggedIn: true


                });

                alert(response.data.message);


            })
            .catch(err => console.log(err))

    }

    handleLogin = () => {
        this.setState({ loginModalIsOpen: true ,});
    }



    render() {
        const { loginModalIsOpen,isLoggedIn, loggedInUser, AccModalIsOpen,ANOTHERModalIsOpen,user,googleloggedInUser } = this.state;
        return (
            <div className="filter-header">
            
            <NavLink to="/"><a href="#" className="filter-logo" >e!</a> </NavLink>

                <div >
                    {isLoggedIn ? <div className="user-button-gp">

                         <div className="user-head">

                         <div className="user-signup" ><button type="button" className="btn btn-outline-dark" >{loggedInUser}{googleloggedInUser}</button></div>

                            <div className="user-login " onClick={this.userLogout}><button type="button" className="btn btn-outline-dark">Logout</button></div>
                            <button></button>

                        </div>


                    </div> :
                        <div className="user-button-gp">
                            <div className="user-head">
                                <div className="user-login" onClick={this.handleLogin}><button type="button" className="btn btn-outline-dark">Login</button></div>
                                <div className="user-signup" onClick={this.handleAcc}><button type="button" className="btn btn-outline-dark">Create an account</button></div>
                                
                            </div>

                        </div>}
                </div>

                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <div >

                        <div className="loginModal">Login</div>
                        <div className="fas fa-times close-btnH"  onClick={() => this.handleCloseModal('loginModalIsOpen', false)}></div>
                       <br/>
                        <div style={{ textAlign:'center',padding:' 5px 29px 5px 2px', color:'white'}}>
                        <GoogleLogin
                            clientId="622176405680-tib5fm5gcjl02rb6mfbdj2b2qvhn2hv2.apps.googleusercontent.com"
                            buttonText="Continue with Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            className="googlebtn"
                        />
                         <br/>
                        <div>
                        <FacebookLogin
                            appId="808139453265589"
                            autoLoad={false}
                            fields="name,email,picture"
                            onClick={this.componentClicked}
                            callback={this.responseFacebook}
                        />     
                        </div>
                        </div>

                        <div className="Path"></div>
                        <div>
                            <span className="haveaccountL">Already have an account?<span style={{color:'orange'}}  onClick={this.handleANOTHER}>Login</span></span>
                        </div>
                    </div>
                </Modal>
                <Modal
                    isOpen={AccModalIsOpen}
                    style={customStyles}
                >
                    <div >
                        <div className="fas fa-times close-btnH" style={{ marginTop: '5px', marginRight: '5px', float: 'right' }} onClick={() => this.handleCloseModal('AccModalIsOpen', false)}></div>
                        <div style={{ padding: '5px' }}  >
                            <h3 className="Acc-name">Create An Account</h3>
                            <span className="NameHa"> <label className="NameH">firstname</label>
                            <input type="text" placeholder="enter your name" className="form-control" onChange={(event) => this.handleInputChange(event, 'firstname')} /></span>
                          <span className="NameHa">  <label className="NameH">lastname</label>
                            <input type="text" placeholder="enter your name" className="form-control" onChange={(event) => this.handleInputChange(event, 'lastname')} /></span>
                            <label className="NameH">E-mail</label>
                            <input type="email" placeholder="enter your name" className="form-control" required onChange={(event) => this.handleInputChange(event, 'email')} />
                            <label className="NameH">password</label>
                            <input type="password" placeholder="enter your password" className="form-control" required onChange={(event) => this.handleInputChange(event, 'password')} />
                            <label className="NameH">Ph.number</label>
                            <input type="tel" placeholder="enter your number" className="form-control" onChange={(event) => this.handleInputChange(event, 'phNumber')} />
                            <label className="NameH">Address</label>
                            <textarea type="text" placeholder="enter your address" className="form-control text-areaH" onChange={(event) => this.handleInputChange(event, 'address')} />
                            <button className="btn btn-danger PROCEED" onClick={this.handleSignUp}>Register </button>

                        </div>
                        <div className="Path"></div>
                        <div>
                            <span className="haveaccount">Already have an account?<span style={{color:'orange'}}  onClick={this.handleANOTHER}>Login</span></span>
                        </div>

                    </div>
                </Modal>
                <Modal
                    isOpen={ANOTHERModalIsOpen}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <div>
                    <div className="loginModal">Login</div>
                    <div className="fas fa-times close-btnH" style={{ marginTop: '5px', marginRight: '5px', float: 'right' }} onClick={() => this.handleCloseModal('ANOTHERModalIsOpen', false)}></div>
                    <div>
                    <label className="NameH">E-mail</label>
                            <input type="email" placeholder="enter your name" className="form-control" required onChange={(event) => this.handleInputChange(event, 'email')} />
                            <label className="NameH">password</label>
                            <input type="password" placeholder="enter your password" className="form-control" required onChange={(event) => this.handleInputChange(event, 'password')} />
                            <button className="btn btn-danger PROCEED" onClick={this.handleLogedin}>Login </button>
                    </div>
                    </div>
                    
                    </Modal>

            </div>)}
}
export default withRouter(Header);