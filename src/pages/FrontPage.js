import React, { Component } from 'react'
import axios from 'axios'

import MushroomImage from '../components/MushroomImage'

import images from '../img'

const API_URL = process.env.REACT_APP_API_URL
// const API_URL = 'https://teekoivi.users.cs.helsinki.fi/deep-shrooms'

const mushrooms = [
  {
    name_latin: 'Boletus edulis',
    name_fin: 'Herkkutatti',
    edibility: 'edible',
    url_wiki: 'https://en.wikipedia.org/wiki/Boletus_edulis',
    src: images.boletus_edulis
  },
  {
    name_latin: 'Cantharellus cibarius',
    name_fin: 'Kanttarelli',
    edibility: 'edible',
    url_wiki: 'https://en.wikipedia.org/wiki/Chanterelle',
    src: images.cantharellus_cibarius
  },
  {
    name_latin: 'Amanita virosa',
    name_fin: 'Valkokärpässieni',
    edibility: 'lethally poisonous',
    url_wiki: 'https://en.wikipedia.org/wiki/Amanita_virosa',
    src: images.amanita_virosa
  },
  {
    name_latin: 'Agaricus arvensis',
    name_fin: 'Peltoherkkusieni',
    edibility: 'edible',
    url_wiki: 'https://en.wikipedia.org/wiki/Agaricus_arvensis',
    src: images.agaricus_arvensis
  },
  {
    name_latin: 'Amanita muscaria',
    name_fin: 'Punakärpässieni',
    edibility: 'poisonous',
    url_wiki: 'https://en.wikipedia.org/wiki/Amanita_muscaria',
    src: images.amanita_muscaria
  },
  {
    name_latin: 'Cortinarius rubellus',
    name_fin: 'Suippumyrkkyseitikki',
    edibility: 'lethally poisonous',
    url_wiki: 'https://en.wikipedia.org/wiki/Cortinarius_rubellus',
    src: images.cortinarius_rubellus
  },
  {
    name_latin: 'Paxillus involutus',
    name_fin: 'Pulkkosieni',
    edibility: 'poisonous',
    url_wiki: 'https://en.wikipedia.org/wiki/Paxillus_involutus',
    src: images.paxillus_involutus
  },
]

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

  async handleImageClick(src, e) {
    const localFile = await this.fetchLocalFile(src)
    const form = new FormData()
    form.append('file', localFile)
    this.sendImage(form)
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
      <div className="main__container">
        <h1>DeepShrooms</h1>
        <p>
          Click a mushroom picture or upload a picture and send it to server for prediction!
        </p>
        <p>
          Server returns prediction as float between 0 and 1 where 0 means poisonous and 1 edible.
        </p>
        <p>
          Prediction: { prediction }
        </p>
        <form onSubmit={this.handleSubmit}>
          <input type="file" onChange={this.handleFileChange}/>
          <button type="submit">Submit</button>
        </form>
        <div>
          <p>Note: links open in a new window</p>
          <div className="mushrooms__container">
            { mushrooms.map(mushroom => 
              <MushroomImage key={mushroom.name_fin} {...mushroom}
                handleImageClick={this.handleImageClick.bind(this, mushroom.src)}/>
            )}
          </div>
        </div>

      </div>
    )
  }
}

export default FrontPage