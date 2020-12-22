import React from 'react';
import Note from '../Note/Note';
import { findNote } from '../../functionHelpers.js';
import './NotePage.css';

function NotePage(props) {
  const { noteId } = props.match.params;
  const notes = props.notes
  const note = findNote(notes, noteId);
  return (
    <section className='notePage'>
      <Note 
        id={note.id}
        name={note.name}
        modified={note.modified}
      />
    <div className='notePage-content'>
      <p>{note.content}</p>
    </div>
    </section>
  );
}

export default NotePage;