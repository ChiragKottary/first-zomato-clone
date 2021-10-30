import React from "react";
import '../Styles/home.css';
import QuickSearchItem from "./QuickSearchItem";

class QuickSearch extends React.Component{
    render(){
        const{quickSearchItemsData} = this.props;
        return(
            <div>
                <div className="container home-background ">
            <div className="home-title">Quick Searches</div>
            <div className="home-sub-title">Discover restaurants by type of meal</div>

            <div>
                <div className="row">
                    {quickSearchItemsData.map((item,)=>{
                        return <QuickSearchItem  QSItemData={item}/>
                    })}
                    
                    
                    
                </div>
            </div>
        </div>
            </div>
        )
    }
}
export default QuickSearch;