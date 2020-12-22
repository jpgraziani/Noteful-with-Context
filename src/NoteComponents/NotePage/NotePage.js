import React from 'react';
import Note from '../Note/Note';
import { findNote } from '../../functionHelpers.js';
import './NotePage.css';
import NotefulContext from '../../NotefulContext'

class NotePage extends React.Component {
  static contextType = NotefulContext;

  render() {
    const { noteId } = this.props.match.params;
    const { notes=[] } = this.context
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
}

export default NotePage;