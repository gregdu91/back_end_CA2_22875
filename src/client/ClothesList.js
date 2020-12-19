import React, { Component } from 'react';
// import the Link component to handle React Router
import { Link } from 'react-router-dom';
import Clothes from './Clothes';
// Axios is a lightweight HTTP client based on the $http service within Angular.js
// Axios provides support for request and response interceptors, transformers and auto-conversion to JSON
// Use "npm install axios" command to install
import axios from 'axios';
import './app.css';
// import stylesheet 
// MAKE SURE TO INSTALL USING npm install bulma
import 'bulma/css/bulma.css';

// this component will handle all elements in the clothes array
class ClothesList extends Component {
  constructor(props) {
    super(props);
    // store the clothes array in the state
    this.state = { clothes: [] };

    // this binding is necessary to make `this` work in the callback
    // generally, if you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method
    this.updateClothes = this.updateClothes.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  // fetch all clothes data from the server when the component mounts
  componentDidMount() {
    this.updateClothes();
  }

  //
  updateClothes() {
    // get the clothers API using axios GET request to the server 
    axios.get('api/clothes')
      .then(response => {
        // store the response in the state
        this.setState({ clothes: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete(clothesId) {
    // make a DELETE request to the server which will handle the removal of the clothe with the specific clotheId
    axios
      .delete('api/clothes', {
        data: {
          id: clothesId
        }
      })
      .then(response => {
        // if the deletion was successful then re-render the list of clothes
        this.updateClothes();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // produce a Clothes component for each clothe object
    const clothesList = this.state.clothes.map(u => (
      // map through each element in the array and set to the value received from the server
      <Clothes
        key={u._id}
        id={u._id}
        name={u.name}
        price={u.price}
        quantity={u.quantity}
        image={u.picture}
        // you must include the handleDelete method to use in child components
        handleDelete={this.handleDelete}
      />
    ));


    // return the list of clothes
    return (
      <div className="is-fluid">
        {/* Navigation bar*/}
        <nav className="navbar">
          <h1 className="navbar-item title is-1 has-text-primary">List of Clothes</h1>
          {/* when this button is pressed, CreateClothes component will be rendered by using React Router*/}
          <Link to={'/create-clothes'} className="navbar-item navbar-end">
            <button className="button is-warning" type="button">Create new clothes</button>
          </Link>
        </nav>
        <hr />
        {/* CLOTHES LIST*/}
        <div>
          <div className="columns is-multiline">
            {clothesList}
          </div>
        </div>
        {/* FOOTER*/}
        <footer className="footer has-background-primary">
          <div className="content has-text-centered">
            <p className="has-text-white-bis"><strong>Random Clothes API</strong> styled with Bulma and Bootstrap</p>
          </div>
        </footer>
      </div>

    );
  }
}

export default ClothesList;
