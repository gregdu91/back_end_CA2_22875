import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Axios is a lightweight HTTP client based on the $http service within Angular.js
// Axios provides support for request and response interceptors, transformers and auto-conversion to JSON
// Use "npm install axios" command to install
import axios from 'axios';

// Create Clothe component that will create a new clothe card
class CreateClothes extends Component {
  constructor(props) {
    super(props);
    // the form fields are stored in a state
    this.state = {
      name: '',
      quantity: '',
      price: '',
      picture: ''
    };

    // this binding is necessary to make `this` work in the callback
    // generally, if you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // once the input boxes are changed, update the state to match the value
  handleChange(event) {
    // name of the input boxes must match the property names in the state
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    // preventDefault() is called on the event when it occurs to prevent a browser reload/refresh
    event.preventDefault();

    // use axios to send a POST request to the server which includes the state information for the new clothe to be created
    axios.post('/api/clothes', this.state)
    // on success go to home
      .then(res => this.props.history.push('/'))
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // remember that the name of the input fields should match the state
    return (
      <div className="container">
        {/* on form submit call handleSubmit()*/}
        <form onSubmit={this.handleSubmit}>
          <h2 className="title is-1 has-text-primary">Create New Clothes</h2>
          <hr />
          {/* main container for input fields*/}
          <div className="container">
                <div className="field">
                  <label className="form-label"> Name: </label>
                  <div className="control">
                    <input className="form-control" type="text" name="name" value={this.state.name} onChange={this.handleChange} id="form" />
                  </div>
                </div>
                <div className="field">
                  <label className="form-label"> Quantity: </label>
                  <div className="control">
                    <input className="form-control" type="text" name="quantity" value={this.state.quantity} onChange={this.handleChange} id="form" />
                  </div>
                </div> 
                <div className="field">
                  <label className="form-label"> Picture (put the irl of the picture): </label>
                  <div className="control">
                    <input className="form-control" type="text" name="picture" value={this.state.picture} onChange={this.handleChange} id="form" />
                  </div>
                </div>
                <div className="field">
                  <label className="form-label"> Price: </label>
                  <div className="control">
                    <input className="form-control" type="text" name="price" value={this.state.price} onChange={this.handleChange} id="form" />
                  </div>
                </div>
            <input className="btn btn-primary" type="submit" value="Submit" />
              </div>
        </form>
      </div>
    );
  }
}

export default CreateClothes;
