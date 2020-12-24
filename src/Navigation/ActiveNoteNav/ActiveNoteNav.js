import React from 'react';
import PropTypes from 'prop-types'
import { findFolder, findNote } from '../../functionHelpers';
import NotefulContext from '../../NotefulContext';
import './ActiveNoteNav.css';


class ActiveNoteNav extends React.Component {
  static contextType = NotefulContext;

  render() {
    const { noteId } = this.props.match.params;
    const { notes, folders } = this.context;
    const note = findNote(notes, noteId) || {};
    const folder = findFolder(folders, note.folderId);
    return (
      <section>
        <h3 className='folderName'>
          {folder.name}
        </h3>
        <button
          className='backBtn'
          onClick={() => this.props.history.goBack()}>
          go back
        </button>
      </section>
    );
  }
}

ActiveNoteNav.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.shape({
    'id': PropTypes.string.isRequired,
    'name': PropTypes.string.isRequired,
  })),
}

export default ActiveNoteNav;