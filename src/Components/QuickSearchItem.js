import React from "react";
import '../Styles/home.css';
import {withRouter} from "react-router-dom";

class QuickSearchItem extends React.Component{
    handelNavigate=(mealtypeId)=>{
        const locationId = sessionStorage.getItem('locationId');
        if(locationId){
            this.props.history.push(`/filter?mealtype=${mealtypeId}&location=${locationId}`);
        }
        else{
            this.props.history.push(`/filter?mealtype=${mealtypeId}`);
        }
        
    }
    render(){
        const {QSItemData}=this.props;
        return(
           
                <div key={QSItemData._id}className="home-dish-box col-lg-4 col-md-6 col-sm-12 " onClick={()=> this.handelNavigate(QSItemData.meal_type)}>
                        <div className="home-dish-img"><img src={`./${QSItemData.image}`} alt="Image Not Found" width="100%" height="160px"/></div>
                        <div className="home-dish-info">
                            <div className="home-dish-type">{QSItemData.name}</div>
                            <div className="home-dish-type-info">{QSItemData.content}</div>
                        </div>
                    </div>
            
        )
    }
}
export default withRouter(QuickSearchItem);