import React from 'react';
import Note from '../Note/Note';
import { getNotesForFolder } from '../../functionHelpers';
import './NoteList.css';

function NoteList(props) {
  const { folderId } = props.match.params;
  const notes = props.notes
  const notesForFolder = getNotesForFolder(notes, folderId);
  return (
    <section className='noteList'>
      <ul>
        {notesForFolder.map(note =>
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
