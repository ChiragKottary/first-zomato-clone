import React from "react";
import '../Styles/filter.css';
import  queryString  from "query-string";
import axios from "axios";

class filter extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurants: [],
            pageCount: [],
            locations: [],
            mealtype: undefined,
            location: undefined,
            cuisine: [],
            sort: undefined,
            lcost: undefined,
            hcost: undefined,
            page: undefined,
            
        }
    }

    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        const { mealtype, location } = qs;

        const filterObj = {
            mealtype: mealtype,
            location: location
        };
        console.log("hi",filterObj);
        axios({
            url: 'https://git.heroku.com/gentle-lake-83992.git/filter',
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            data: filterObj
        })
            .then(res => {
                this.setState({
                    restaurants: res.data.restaurants,
                    pageCount: res.data.pageCount,
                    mealtype,
                    location
                })    
            })
            .catch( err => console.log(err))
            
        axios({
            url: 'https://git.heroku.com/gentle-lake-83992.git/locations',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ locations: res.data.locations,
                                pageCount:res.data.pageCount
                             })
            })
            .catch()
    }

    handleLocationChange = (event) => {
        const { mealtype, cuisine, sort, page, lcost, hcost } = this.state;
        const locationId = event.target.value;

        const filterObj = {
            mealtype: mealtype,
            location: locationId,
            cuisine: cuisine.length > 0 ? cuisine : undefined,
            lcost,
            hcost,
            page,
            sort
        };

        axios({
            url: 'https://git.heroku.com/gentle-lake-83992.git/filter',
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            data: filterObj
        })
            .then(res => {
                this.setState({
                    restaurants: res.data.restaurants,
                    pageCount: res.data.pageCount,
                    location: locationId
                })
            })
            .catch()

         this.props.history.push(`/filter?mealtype=${mealtype}&location=${locationId}`);
    }

    handleSortChange = (sort) => {
        const { mealtype, cuisine, location, page, lcost, hcost } = this.state;

        const filterObj = {
            mealtype: mealtype,
            location: location,
            cuisine: cuisine.length > 0 ? cuisine : undefined,
            lcost,
            hcost,
            page,
            sort
        };

        axios({
            url: 'https://git.heroku.com/gentle-lake-83992.git/filter',
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            data: filterObj
        })
            .then(res => {
                this.setState({
                    restaurants: res.data.restaurants,
                    pageCount: res.data.pageCount,
                    sort: sort
                })
            })
            .catch( err => console.log(err))

        this.props.history.push(`/filter?mealtype=${mealtype}&location=${location}&sort=${sort}`);

    }

    handleCostChange = (lcost, hcost) => {
        const { mealtype, cuisine, location, page, sort } = this.state;

        const filterObj = {
            mealtype: mealtype,
            location: location,
            cuisine: cuisine.length > 0 ? cuisine : undefined,
            lcost,
            hcost,
            page,
            sort
        };

        axios({
            url: 'https://git.heroku.com/gentle-lake-83992.git/filter',
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            data: filterObj
        })
            .then(res => {
                this.setState({
                    restaurants: res.data.restaurants,
                    pageCount: res.data.pageCount,
                    lcost,
                    hcost
                })
            })
            .catch( err => console.log(err))

          this.props.history.push(`/filter?mealtype=${mealtype}&location=${location}&sort=${sort}`);
    }
    handelPageChange=(page)=>{

        const { mealtype,location,cuisine, sort,lcost,hcost } = this.state;
        const filterObj={
            mealtype:mealtype,
            location: location,
            cuisine: cuisine.length == 0 ? undefined : cuisine,
            sort,
            lcost,
            hcost,
            page
        };

        axios({
            url:'https://git.heroku.com/gentle-lake-83992.git/filter',
            method:'POST',
            headers:{'Content-Type' : 'application/json'},
            data:filterObj
        })
        .then(response =>{
            this.setState({restaurants: response.data.restaurants,page,pageCount:response.data.pageCount})
        })
        .catch( err => console.log(err))
    }

    handleCuisineChange = (cuisineId) => {
        const { mealtype, location, cuisine, page, sort, lcost, hcost } = this.state;

        const index = cuisine.indexOf(cuisineId);
        if (index >= 0) {
            cuisine.splice(index, 1);
        }
        else {
            cuisine.push(cuisineId);
        }

        const filterObj = {
            mealtype: mealtype,
            location: location,
            cuisine: cuisine.length > 0 ? cuisine : undefined,
            lcost,
            hcost,
            page,
            sort
        };

        axios({
            url: 'https://git.heroku.com/gentle-lake-83992.git/filter',
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            data: filterObj
        })
            .then(res => {
                this.setState({
                    restaurants: res.data.restaurants,
                    pageCount: res.data.pageCount,
                    cuisine
                })
            })
            .catch( err => console.log(err))
            this.props.history.push(`/filter?mealtype=${mealtype}&location=${location}&sort=${sort}&cuisine=${cuisine}`);
    }

    handleNavigate = (resId) => {
        this.props.history.push(`/details?restaurant=${resId}`);
    }

   

    render(){
        const {restaurants,pageCount,locations} = this.state;
        return(
            <div>
               <div className="container-fluid ">
            
        </div>
        <div className="container">
                    
            <div className="filter-heading">Best Restaurants Found</div>
            <div className="filter-main-content row">
                <div className="filter-box">Filters / Sort <span className="fas fa-angle-down filter-arrow" data-bs-toggle="collapse" data-bs-target="#fillter" ></span></div>
                <div className="filter-mob col-sm-12 collapse" id="fillter">
                    
                    <div>Filters</div>

                    <div className="filter-Select-Location">Select Location</div>

                <div><select id="city" onChange={this.handleLocationChange}>
                                        <option value="0" >Select</option>
                                        {locations.map((item, index) => {
                                            return <option key={index + 1} value={item.location_id} >{`${item.name}, ${item.city}`}</option>
                                        })}
                                    </select>
                </div>

                <div className="filter-Cuisine">Cuisine</div>
                <div className="filter-Cuisine-Price-Sort">
                    <input type="checkbox" name="Cuisine" onChange={() => this.handleCuisineChange(1)}/>North Indian <br/>
                    <input type="checkbox" name="Cuisine" onChange={() => this.handleCuisineChange(2)}/>South Indian<br/>
                    <input type="checkbox" name="Cuisine" onChange={() => this.handleCuisineChange(3)}/>Chinese<br/>
                    <input type="checkbox" name="Cuisine" onChange={() => this.handleCuisineChange(4)}/>Fast Food<br/>
                    <input type="checkbox" name="Cuisine" onChange={() => this.handleCuisineChange(5)}/>Street Food<br/>
                </div>

                <div className="filter-Cost-For-Two">Cost For Two</div>
                <div className="filter-Cuisine-Price-Sort">
                    <input type="radio" name="Price" id="Radio" onChange={() => this.handleCostChange(1, 500)}/>Less than ₹500<br/>
                    <input type="radio" name="Price" id="Radio" onChange={() => this.handleCostChange(500, 1000)}/>₹500 to ₹1000<br/>
                    <input type="radio" name="Price" id="Radio" onChange={() => this.handleCostChange(1000, 1500)}/>₹1000 to ₹1500<br/>
                    <input type="radio" name="Price" id="Radio" onChange={() => this.handleCostChange(1500, 2000)}/>₹1500 to ₹2000<br/>
                    <input type="radio" name="Price" id="Radio" onChange={() => this.handleCostChange(2000, 50000)}/>₹2000+<br/>
                    <input type="radio" name="Price" id="Radio" onChange={() => this.handleCostChange(1, 50000)}/>all<br/>
                </div>

                <div className="filter-Sort">Sort</div>
                <div className="filter-Cuisine-Price-Sort">
                    <input type="radio" name="Sort-price" id="Radio" onChange={() => this.handleSortChange(1)}/>Price low to high<br/>
                    <input type="radio" name="Sort-price" id="Radio" onChange={() => this.handleSortChange(-1)}/>Price high to low<br/>
                </div>
                </div>
                

                <div className="filter-pc col-lg-6">
                    
                    <div>Filters</div>

                    <div className="filter-Select-Location">Select Location</div>

                <div><select id="city" onChange={this.handleLocationChange}>
                                        <option value="0" >Select</option>
                                        {locations.map((item, index) => {
                                            return <option key={index + 1} value={item.location_id} >{`${item.name}, ${item.city}`}</option>
                                        })}
                                    </select>
                </div>

                <div className="filter-Cuisine">Cuisine</div>
                <div className="filter-Cuisine-Price-Sort">
                    <input type="checkbox" name="Cuisine" onChange={() => this.handleCuisineChange(1)}/>North Indian <br/>
                    <input type="checkbox" name="Cuisine" onChange={() => this.handleCuisineChange(2)}/>South Indian<br/>
                    <input type="checkbox" name="Cuisine" onChange={() => this.handleCuisineChange(3)}/>Chinese<br/>
                    <input type="checkbox" name="Cuisine" onChange={() => this.handleCuisineChange(4)}/>Fast Food<br/>
                    <input type="checkbox" name="Cuisine" onChange={() => this.handleCuisineChange(5)}/>Street Food<br/>
                </div>

                <div className="filter-Cost-For-Two">Cost For Two</div>
                <div className="filter-Cuisine-Price-Sort">
                    <input type="radio" name="Price" id="Radio" onChange={() => this.handleCostChange(1, 500)}/>Less than ₹500<br/>
                    <input type="radio" name="Price" id="Radio" onChange={() => this.handleCostChange(500, 1000)}/>₹500 to ₹1000<br/>
                    <input type="radio" name="Price" id="Radio" onChange={() => this.handleCostChange(1000, 1500)}/>₹1000 to ₹1500<br/>
                    <input type="radio" name="Price" id="Radio" onChange={() => this.handleCostChange(1500, 2000)}/>₹1500 to ₹2000<br/>
                    <input type="radio" name="Price" id="Radio" onChange={() => this.handleCostChange(2000, 50000)}/>₹2000+<br/>
                    <input type="radio" name="Price" id="Radio" onChange={() => this.handleCostChange(1, 50000)}/>all<br/>
                </div>

                <div className="filter-Sort">Sort</div>
                <div className="filter-Cuisine-Price-Sort">
                    <input type="radio" name="Sort-price" id="Radio" onChange={() => this.handleSortChange(1)}/>Price low to high<br/>
                    <input type="radio" name="Sort-price" id="Radio" onChange={() => this.handleSortChange(-1)}/>Price high to low<br/>
                </div>
                </div>
                <div className=" filter-con-breakfast col-lg-6">
                {  restaurants     &&restaurants.length  > 0 ?      restaurants.map((item)=>{
                    return  <div className="filter-dish-1  col-sm-12" onClick={() =>this.handleNavigate(item._id)}>
                        <div className="filter-Food-Img"><img src={`./${item.image}`} width="100%"  height="100%" style={ {borderRadius: "20%"}} /></div>
                    <div className="filter-Breakfast-info">
                        <div className="filter-Shop-name"> {item.name}</div>
                        <div className="filter-Place">{item.locality}</div>
                        <div className="filter-address">{item.city}</div>
                    </div><hr/>
                    <div>
                        <div className="filter-Bottom-part-1">
                            <div className="filter-CUISINES-COST-FOR-TWO">CUISINES: <br/> COST FOR TWO:</div>
                            
                        </div>
                        <div className="filter-Bottom-part-2">
                            <div className="filter-Bakery-Price" >{item.cuisine.map((cuisine)=>`${cuisine.name},`)} <br/> {item.min_price}</div>
                        </div>
                    </div>
                    </div>
                    
                    
                }):<div className="no-records">No Records Found !!!</div>}
                {restaurants.length > 0 ? <div className="col-lg-12 col-md-12 col-sm-12 text-center l my-5 ">
                    <button type="button" className="btn btn-outline-secondary mx-2 ">&lt;</button>
                    <span>{pageCount&& pageCount.map((pageNo)=>{
                        return  <button type="button" onClick={()=>this.handelPageChange(pageNo)} className="btn btn-outline-secondary mx-2">{pageNo}</button>
                    })}</span>
                    <button type="button" className="btn btn-outline-secondary mx-2">&gt;</button>
                </div>:null}
                
                    </div>
                
            </div>

        </div>
            </div>
        )
    }
}
export default filter;