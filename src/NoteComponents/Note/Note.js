import React from 'react';
import { Link } from 'react-router-dom';
import './Note.css';
import NotefulContext from '../../NotefulContext';

class Note extends React.Component {
  static contextType = NotefulContext;

  handleClickDelete = (event) => {
    event.preventDefault();
    const noteId = this.props.id

    fetch(`http://localhost:9090/notes/${noteId}`,
    {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(() => {
      this.context.deleteNote(noteId)
      this.props.onDeleteNote(noteId)
    })
    .catch(error => {
      console.error({error})
    })
  }

  render() {
    const { name, id, modified } = this.props;
    return(
      <div className='note'>
        <h2 className='note-title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <div>
          <p>Modified on {modified}</p>
        </div>
        <button 
          className='deleteBtn' 
          type='button'
          onClick={this.handleClickDelete}
          >
          remove
        </button>
      </div>
    );
  }
  }

export default Note;