// src/components/Card.js

import React from 'react';
import noPriorityIcon from '../assets/images/priority-icons/No-priority.svg';
import urgentIcon from '../assets/images/priority-icons/urgent.svg';
import highIcon from '../assets/images/priority-icons/high.svg';
import mediumIcon from '../assets/images/priority-icons/medium.svg';
import lowIcon from '../assets/images/priority-icons/low.svg';
import './css/Card.css';

const Card = ({ card }) => {
  const { title, tag = [], priority } = card;

  // Map priority levels to the correct icon paths
  const priorityIcons = {
    0: noPriorityIcon,
    1: urgentIcon,
    2: highIcon,
    3: mediumIcon,
    4: lowIcon,
  };

  return (
    <div className="card">
      <h4 className="card-title">{title}</h4>
      <div className="card-details">
        {priorityIcons[priority] && (
          <img src={priorityIcons[priority]} alt="Priority Icon" className="priority-icon" />
        )}
        <div className="card-tags">
          {tag.map((t, index) => (
            <span key={index} className="card-tag">{t}</span>  // Removed the tag icon here
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
