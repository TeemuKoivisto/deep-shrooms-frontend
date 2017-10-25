import React, { Component } from 'react'
import axios from 'axios'

import herkkutatti from '../img/herkkutatti.jpg'

const API_URL = process.env.REACT_APP_API_URL

class FrontPage extends Component {

  state = {
    form: undefined,
    prediction: undefined,
  }

  async fetchLocalFile(fileName) {
    return fetch(window.location.origin + fileName)
      .then(res => res.blob())
      .then(blob => new File([blob], fileName))
  }

  sendImage(form) {
    console.log(form)
    axios({
      method: 'POST',
      url: API_URL + '/predict',
      data: form
    })
    .then(res => {
      console.log(res)
      this.setState({
        prediction: res.data.prediction
      })
    })
    .catch(err => {
      console.error(err)
    })
  }

  async handleImageClick(mushroom, e) {
    if (mushroom === 'herkkutatti') {
      const localFile = await this.fetchLocalFile(herkkutatti)
      const form = new FormData()
      form.append('file', localFile)
      this.sendImage(form)
    }
  }
  
  handleFileChange = (e) => {
    const file = e.target.files[0]
    const form = new FormData()
    form.append('file', file)
    this.setState({ form })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.sendImage(this.state.form)
  }

  render() {
    const { prediction } = this.state
    return (
      <div>
        <h1>DeepShrooms</h1>
        <p>
          Click a mushroom picture or upload a picture and send it to server for prediction!
          Server returns prediction as float between 0 and 1 where 0 means poisonous and 1 edible.
        </p>
        <p>
          Prediction: { prediction }
        </p>
        <form onSubmit={this.handleSubmit}>
          <input type="file" onChange={this.handleFileChange}/>
          <button type="submit">Submit</button>
        </form>
        <img onClick={this.handleImageClick.bind(this, 'herkkutatti')}
          src={herkkutatti} alt="Herkkutatti" width="480" height="480" />
      </div>
    )
  }
}

export default FrontPage