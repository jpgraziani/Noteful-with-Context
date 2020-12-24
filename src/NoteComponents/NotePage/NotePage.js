import React from 'react';
import PropTypes from 'prop-types';
import Note from '../Note/Note';
import { findNote } from '../../functionHelpers.js';
import './NotePage.css';
import NotefulContext from '../../NotefulContext'

class NotePage extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  
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

NotePage.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    'id': PropTypes.string.isRequired,
    'name': PropTypes.string.isRequired,
    'modified': PropTypes.string.isRequired,
    'folderId': PropTypes.string.isRequired,
    'content': PropTypes.string.isRequired
  })),
  noteId: PropTypes.string
}

export default NotePage;