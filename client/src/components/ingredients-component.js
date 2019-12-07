import React, {Component} from 'react';
import Post from '../components/Post';
import Loading from '../components/Loading';
import { Component } from 'react';
import Axios from 'axios';

class IngredientsListPage extends Component {
    state = {
        items:[],
        loading: true,
    }

    componentDidMount() {
        Axios.get("/api/posts")
            .then(res => res.json())
            .then(post => {
                this.setState({
                    loading: false,
                    items: items.map((p,ii) => <Post {...p} key={ii} />)
                });
            })
            .catch(err => console.log("API ERROR: ", err));
    }


    render() {
        if(this.state.loading) {
            return <Loading />
        }

        return (
            <div className="container-fluid text-center">
                <div className="row justify-content-center">
                    {  this.state.items  }
                </div>
            </div>
        );
    }
}


export default IngredientsListPage;