import React from 'react';

import './ActiveNoteNav.css';

function ActiveNoteNav(props) {
  return (
    <section>
      <h3 className='folderName'>
        {props.folder.name}
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