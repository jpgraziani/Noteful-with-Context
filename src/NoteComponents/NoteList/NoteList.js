import React from 'react';
import Note from '../Note/Note';
import './NoteList.css';

function NoteList(props) {
  return (
    <section className='noteList'>
      <ul>
        {props.notes.map(note =>
          <li key={note.id}>
            <Note 
              id={note.id}
              name={note.name}
              modified={note.modified}
            />
          </li>
          )}
      </ul>
      <button className='addNoteBtn'>
        Add Note
      </button>
    </section>
  );
}

export default NoteList;
