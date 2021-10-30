import{ BrowserRouter,Route} from 'react-router-dom';
import home from './home';
import filter from './filter';
import details from './details';
import Header from './header';
 
function Router(){
    return(
        <BrowserRouter>
        <Header/>
        <Route exact path="/" component={home}/>
        <Route exact path="/filter" component={filter}/>
        <Route path="/details" component={details}/>
        
        
        </BrowserRouter>
    )
}
export default Router;