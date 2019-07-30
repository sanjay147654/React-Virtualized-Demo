import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component{

  constructor(props){
    super(props);

    this.state = { data: "no data" };

  }

  handleClick(){

    let that = this;

    fetch('http://localhost:3001/get_report',{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function(Response) {

      return Response.json();
      
		}).then(function(json) {

      that.setState({
        data : json.data
      });

    });

  }

  render(){

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.data}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={() => this.handleClick()}>Click this</button>
        </header>
      </div>
    );

  }

}

export default App;
