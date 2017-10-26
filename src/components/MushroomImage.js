import React, { Component } from 'react'

export default class MushroomImage extends Component {

  onImageClick = (e) => {
    this.props.handleImageClick()
  }

  render() {
    const { name_latin, name_fin, edibility, url_wiki, src, prediction } = this.props
    return (
      <div>
        <h3>
          <a href={url_wiki} target="_blank" rel="noopener noreferrer">
            { name_latin }</a>
          <span> ({ name_fin })</span>
        </h3>
        <p>{ edibility }</p>
        { prediction !== undefined ? 
          <p>prediction: { prediction }</p>
          :
          null
        }
        <img onClick={this.onImageClick} src={src} alt={name_latin} width="480" height="480" />
      </div>
    );
  }
}
