import React, { Component } from 'react'
import Webcam from 'react-webcam'

export default class CameraPage extends Component {

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
      <div>
        <h1>Webcam</h1>
        <p>
          This is an experimental page on which you can take a picture with your camera and send it to 
          server for mushroom prediction.
        </p>
        <p>
          NOTE: you should close this page on your mobile phone or laptop after you're done since the camera 
          will stay otherwise running.
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
