// src/components/Board.js

import React, { useState, useEffect } from 'react';
import Column from './Column';
import DisplayDropdown from './DisplayDropdown';
import axios from 'axios';
import './css/Board.css';

// Import status icons
import backlogIcon from '../assets/images/column-icons/Backlog.svg';
import todoIcon from '../assets/images/column-icons/To-do.svg';
import inProgressIcon from '../assets/images/column-icons/in-progress.svg';
import doneIcon from '../assets/images/column-icons/Done.svg';
import cancelledIcon from '../assets/images/column-icons/Cancelled.svg';

// Import priority icons
import noPriorityIcon from '../assets/images/priority-icons/No-priority.svg';
import urgentIcon from '../assets/images/priority-icons/urgent.svg';
import highIcon from '../assets/images/priority-icons/high.svg';
import mediumIcon from '../assets/images/priority-icons/medium.svg';
import lowIcon from '../assets/images/priority-icons/low.svg';

// Define priority labels and image mappings
const priorityLabels = {
  0: 'No Priority',
  1: 'Urgent',
  2: 'High',
  3: 'Medium',
  4: 'Low',
};

const priorityImages = {
  'No Priority': noPriorityIcon,
  'Urgent': urgentIcon,
  'High': highIcon,
  'Medium': mediumIcon,
  'Low': lowIcon,
};

// Define status images mapping
const statusImages = {
  Backlog: backlogIcon,
  Todo: todoIcon,
  "In progress": inProgressIcon,
  Done: doneIcon,
  Cancelled: cancelledIcon,
};

// Custom priority order for sorting
const priorityOrder = ['No Priority', 'Urgent', 'High', 'Medium', 'Low'];

const Board = () => {
  const [columns, setColumns] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('priority');

  useEffect(() => {
    const apiUrl = 'https://api.quicksell.co/v1/internal/frontend-assignment';

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const tickets = response.data.tickets;
        const users = response.data.users;

        setUsers(users);
        organizeData(tickets);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [groupBy, sortBy]);

  const organizeData = (tickets) => {
    let groupedColumns = [];

    if (groupBy === 'status') {
      // Define each status as a column, even if no tickets are assigned
      const statuses = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
      groupedColumns = statuses.map((status) => ({
        title: status,
        image: statusImages[status],
        cards: tickets.filter((ticket) => ticket.status === status),
      }));
    } else if (groupBy === 'priority') {
      // Define each priority as a column based on custom order
      groupedColumns = priorityOrder.map((priorityLabel) => ({
        title: priorityLabel,
        image: priorityImages[priorityLabel],
        cards: tickets.filter((ticket) => priorityLabels[ticket.priority] === priorityLabel),
      }));
    } else if (groupBy === 'user') {
      // Sort users alphabetically by name
      groupedColumns = users
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((user) => ({
          title: user.name,
          image: null,
          cards: tickets.filter((ticket) => ticket.userId === user.id),
        }));
    }

    // Sort cards within each column
    groupedColumns = groupedColumns.map((column) => ({
      ...column,
      cards: column.cards.sort(
        sortBy === 'priority'
          ? (a, b) => b.priority - a.priority
          : (a, b) => a.title.localeCompare(b.title)
      ),
    }));

    setColumns(groupedColumns);
  };

  return (
    <div className="board-container">
      <div className="controls">
        <DisplayDropdown
          groupBy={groupBy}
          setGroupBy={setGroupBy}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      <div className="board">
        <div className="columns">
          {columns.map((column) => (
            <Column key={column.title} title={column.title} image={column.image} cards={column.cards} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
