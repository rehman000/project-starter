import React, { Component } from 'react';
import SideBar from '../components/sidebar-component';
import TopBar from '../components/topbar-component';
import Cards from '../components/card-component';
import TableLight from '../components/table-light-component';
import TableDark from '../components/table-dark-component';


export default class DashboardPage extends Component {
    constructor(props) {
        super(props);

        this.deleteItems = this.deleteItems.bind(this)

        this.state = { 
            Loggedin: true, 
            AuthToken: "Authentication Token",
            username: "",
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
        this.setState({ items: response.data.items })
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
        items: this.state.items.filter(el => el._id !== id)
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

>>>>>>> Stashed changes
    }
  


    render() {
      return (
            <div>
                <SideBar/>          {/* This is the side bar navbar component */}
                <TopBar/>           {/* This is the top bar navbar component it also contains the modal-component*/}
                <Cards />           {/* This is the Cards component */}
                <TableLight />      {/* This is the table light component */}
                <TableDark />       {/* This is the table dark component */}    
                
<<<<<<< Updated upstream
=======
                <Cards />           {/* This is the Cards component */}         
                <TableDark />
                <TableLight />
               
                

>>>>>>> Stashed changes
            </div>
        );
    }
}


