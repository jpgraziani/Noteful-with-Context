import React from 'react';
import Note from '../Note/Note';
import './NotePage.css';

function NotePage(props) {
  return (
    <section className='notePage'>
      <Note 
        id={props.note.id}
        name={props.note.name}
        modified={props.note.modified}
      />
    <div className='notePage-content'>
      <p>{props.note.content}</p>
    </div>
    </section>
  );
}

export default NotePage;