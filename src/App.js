import React, { Component } from 'react';
import Webcam from 'react-webcam';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    imageSrc: '',
  }

  setRef = (webcam) => {
    this.webcam = webcam
  }

  capture = () => {
    this.setState({
      imageSrc: this.webcam.getScreenshot()
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>Picture size: {this.state.imageSrc.length}</p>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
        />
        <button onClick={this.capture}>Capture photo</button>
      </div>
    );
  }
}

export default App;
