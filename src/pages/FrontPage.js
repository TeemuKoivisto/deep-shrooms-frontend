import React, { Component } from 'react'
import axios from 'axios'

import herkkutatti from '../img/herkkutatti.jpg'

const API_URL = process.env.REACT_APP_API_URL

class FrontPage extends Component {

  state = {
    form: undefined
  }

  handleImageClick(mushroom) {

  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.sendImage()
  }

  handleFileChange = (e) => {
    const file = e.target.files[0]
    const form = new FormData()
    form.append('file', file)
    this.setState({ form })
  }

  sendImage() {
    // const file = new File(herkkutatti, 'herkkutatti.jpg')
    // console.log(file)
    // console.log(herkkutatti)
    // const form = new FormData()
    // form.append('img', herkkutatti)
    const { form } = this.state
    console.log(form)
    axios({
      method: 'POST',
      url: API_URL + '/predict',
      data: form
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.error(err)
    })
  }

  render() {
    return (
      <div>
        <h1>DeepShrooms</h1>
        <p>
          Click a mushroom to send it to server and predict!
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