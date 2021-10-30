import React from "react";
import axios from "axios";
import Wallpaper from "./Wallpaper";
import QuickSearch from "./QuickSearch";

class home extends React.Component{
    constructor(){
        super();
        this.state ={
            location:[],
            quickSearchItems :[]
        }
    }
    componentDidMount(){
        sessionStorage.clear();
axios({
    url:'https://peaceful-falls-09725.herokuapp.com/locations',
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
})
    .then(res =>{
        this.setState({ location: res.data.locations })
    })
    .catch()

    axios({
        url:'https://peaceful-falls-09725.herokuapp.com/mealtypes',
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
        .then(res =>{
            this.setState({ quickSearchItems: res.data.mealTypes })
        })
        .catch()
    }
    
    render(){
        const{location,quickSearchItems}=this.state;
        return(
            <div>
               <Wallpaper locationsData={location}/>
               <QuickSearch quickSearchItemsData={quickSearchItems}/>
        
            </div>
        )
    }
}
export default home;