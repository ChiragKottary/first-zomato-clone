import React from "react";
import '../Styles/home.css';
import axios from "axios";
import { withRouter } from 'react-router-dom';


class Wallpaper extends React.Component{
    constructor() {
        super();
        this.state = {
            restaurantList: [],
            searchText: undefined,
            suggestions: []
        }
    }
    handleChangeLocation = (event)=>{
        const locationId = event.target.value;
        sessionStorage.setItem('locationId',locationId);
        axios({
            url:`https://git.heroku.com/gentle-lake-83992.git/restaurant/${locationId}`,
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then(res =>{
                this.setState({ restaurantList: res.data.restaurants })
            })
            .catch()
    }
    handleInputChange = (event) => {
        const { restaurantList } = this.state;
        const searchText = event.target.value;

        let searchRestaurants = [];
        if (searchText) {
            searchRestaurants = restaurantList.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
        }

        this.setState({ suggestions: searchRestaurants, searchText });
    }

    selectedText = (resObj) => {
        this.props.history.push(`/details?restaurant=${resObj._id}`);
    }

    renderSuggestions = () => {
        const { suggestions, searchText } = this.state;

        if (suggestions.length == 0 && searchText == "") {
            return <ul >
                <li>No Search Results Found</li>
            </ul>
        }
        return (
            <ul >
                {
                    suggestions.map((item, index) => (<li key={index} onClick={() => this.selectedText(item)}>{`${item.name} -   ${item.locality},${item.city}`}</li>))
                }
            </ul>
        );
    }
    render(){
        const {locationsData}= this.props;
        return(
            <div>
               <div className="home-wallpaper">
            <div>
                <img src="./Assets/homepage.png" width="100%" height="600px"/></div>
                {/*
                <div style={ {float: "right"}}>
                <div className="home-visible">
                    <span className="fas fa-bars home-new-login" data-bs-toggle="collapse" data-bs-target="#newlogincreate"></span>
                </div>
                <div id="newlogincreate" className="collapse content-login">
                    <div className="home-newsign"><button type="button" className="btn btn-outline-danger mob-ver-login">Login</button></div>
                    <div className="home-newsign"><button type="button" className="btn btn-outline-danger mob-ver-create" >Create an account</button></div>
                </div>
            <div className="home-top-logmenue position-absolute">
                <div className="home-Login"><button type="button" className="btn btn-danger ">Login</button></div>
                <div className="home-account"><button type="button" className="btn btn-danger">Create an account</button></div>
            </div>
            </div>
                */ }
            
            <div className="home-center-content position-absolute">
                <div className="home-logo">e!</div>
                <div className="home-logo-info">Find the best restaurants, cafés, and bars</div>
                <div className="row home-tot-box">
                <div className="col-lg-6 col-sm-12 home-rest-location" >
                    <select  className="home-rest-location" onChange={this.handleChangeLocation}>
                        <option className="home-rest-location" value="0">Select</option>
                        {locationsData.map((item,index)=>{
                            return <option className="home-rest-location" value={item.location_id} key={index+1}>{`${item.name},${item.city}`}</option>
                        })}
                        
                    </select>
                </div>
                <div className="col-lg-6 col-sm-12 home-search-rest" >
                    <span className="fas fa-search home-search-icon" >
                    </span>
                    <div id="books">
                                <input id="query" className="home-search-rest" type="text" placeholder="Please Enter Restaurant Name" onChange={this.handleInputChange} />
                                {this.renderSuggestions()}
                            </div>
                </div>
                </div>
            </div>
            
        </div> 
            </div>
        )
    }
}
export default withRouter(Wallpaper);