// src/components/Column.js

import React from 'react';
import Card from './Card';
import plusIcon from '../assets/images/column-icons/add.svg';
import dotIcon from '../assets/images/column-icons/3_dot_menu.svg';
import './css/Column.css';

const Column = ({ title, image, cards = [] }) => {
  return (
    <div className="column">
      <div className="column-header">
        {image && <img src={image} alt={`${title} icon`} className="column-icon" />}
        <span className="column-title">{title}</span>
        <span className="item-count">{cards.length}</span>
        <div className="column-controls">
          <img src={plusIcon} alt="Add Icon" className="icon plus-icon" />
          <img src={dotIcon} alt="Options Icon" className="icon dot-icon" />
        </div>
      </div>
      <div className="cards">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Column;
