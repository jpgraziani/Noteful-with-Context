import React from 'react';
import { findFolder, findNote } from '../../functionHelpers';
import './ActiveNoteNav.css';

function ActiveNoteNav(props) {
  const { noteId } = props.match.params;
  const notes = props.notes
  const folders = props.folders
  const note = findNote(notes, noteId) || {};
  const folder = findFolder(folders, note.folderId);
  return (
    <section>
      <h3 className='folderName'>
        {folder.name}
      </h3>
      <button
        className='backBtn'
        onClick={() => props.history.goBack()}>
        go back
      </button>
    </section>
  );
}

export default ActiveNoteNav;