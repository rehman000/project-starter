import React, { 
    Component, 
    Link,
} from 'react';

import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../components/sidebar-component';
import TopBar from '../components/topbar-component';
import Cards from '../components/card-component';
import TableLight from '../components/table-light-component';
import TableDark from '../components/table-dark-component';

const Ingredients = props => (
    <tr>
      <td>{props.ingredients.name}</td>
      <td>{props.ingredients.quantity}</td>
      <td>{new Date(props.medication.expireDate).toLocaleDateString()}</td>
      <td>
        <Link to={{pathname: "/edit/"+props.ingredients._id, state : {id: props.ingredients._id}}}>edit</Link> | <a href="#" onClick={() => { props.deleteItems(props.ingredients._id) }}>delete</a>
      </td>
      <td>{props.ingredients._id}</td>
    </tr>
  )


export default class DashboardPage extends Component {
    constructor(props) {
        super(props);

        this.deleteItems = this.deleteItems.bind(this)


        this.state = { 
            Loggedin: true, 
            AuthToken: "Authentication Token",
            username: "",

            items: []
        };
    }

    // Get Token from database store it here, if the user is logged in for too long, 
    // Reset the Authentication Token on the back end 
    // If the old token doesn't match with the new one (which it shouldn't) 
    // Then redirect to sign in page

    componentDidMount() {
        axios.get('api/items/items', {
            "headers" : {"authorization" : "bearer " + localStorage.getItem("token")}
        })
        .then(response => {
        this.setState({ item: response.data.items })
        })
        .catch((error) => {
        console.log(error);
        })
    }


    deleteItems(id) {
    axios.delete('api/items/delete/'+id, {
        "headers" : {"authorization" : "bearer " + localStorage.getItem("token")}
    })
        .then(response => { console.log(response.data)});

    this.setState({
        medication: this.state.medication.filter(el => el._id !== id)
    })
    }

    ingredientsList() {
    return this.state.items.map(currentitems => {
        return <Ingredients ingredients={currentitems} deleteItems={this.deleteItems} key={currentitems._id}/>;
    })
    }

    onSubmit(e) {
        console.log("This function has been called! ... ");
        console.log("===================================");

        e.preventDefault();

        const pantryTable = document.getElementById("Ingredients");        
        let formData = new FormData(pantryTable);
        let items = {};
        for (let key of formData.keys()){
            items[key] = formData.get(key);
        }
        
        var value = this.value;
        console.log(value);

        console.log(formData[0]);

    }




    render() {

        if(this.state.Loggedin === false) return <Redirect to="/login" />  // Safety Pre-Caution against hackers! ;)



        return (
            <div>
                <SideBar/>              {/* This is the side bar navbar component */}   
                <TopBar/>               {/* This is the top bar navbar component it also contains the modal-component*/}    
                
                <Cards />           {/* This is the Cards component */}         
                
                <h3>Ingredients Cabinet: </h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Expiration Date</th>
                            <th>Actions</th>
                            <th>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.ingredientsList() }
                    </tbody>
                </table>
               
                

            </div>
        );
    }
}


