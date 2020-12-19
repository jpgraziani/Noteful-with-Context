import React from 'react';
import { Link } from 'react-router-dom';
import './Note.css';

function Note(props) {
  return(
    <div className='note'>
      <h2 className='note-title'>
        <Link to={`/note/${props.id}`}>
          {props.name}
        </Link>
      </h2>
      <div>
        <p>Modified on {props.modified}</p>
      </div>
      <button className='deleteBtn' type='button'>
        remove
      </button>
    </div>
  );
}

export default Note;