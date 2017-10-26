import React, { Component } from 'react'

export default class MushroomImage extends Component {

  onImageClick = (e) => {
    this.props.handleImageClick()
  }

  render() {
    const { name_latin, name_fin, edibility, url_wiki, src, prediction } = this.props
    const roundedPred = prediction ? Math.round(prediction * 100) : undefined
    return (
      <div className="mushroom__item__container">
        <h3>
          <a href={url_wiki} target="_blank" rel="noopener noreferrer">
            { name_latin }</a>
          <span> ({ name_fin })</span>
        </h3>
        <div className="twin__text">
          <p>{ edibility }</p>
          { prediction !== undefined ? 
            <p>prediction: { roundedPred }%</p>
            :
            null
          }
        </div>
        <img onClick={this.onImageClick} src={src} alt={name_latin} width="360" height="360" />
      </div>
    );
  }
}
