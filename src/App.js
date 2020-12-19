import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom';

import SidebarNav from './Navigation/SidebarNav/SidebarNav';
import ActiveNoteNav from './Navigation/ActiveNoteNav/ActiveNoteNav';
import NoteList from './NoteComponents/NoteList/NoteList';
import NotePage from './NoteComponents/NotePage/NotePage';

import dummyStore from './dummyStore';
import { getNotesForFolder, findNote, findFolder } from './functionHelpers';

import './App.css';

class App extends React.Component {
  state = {
    notes: [],
    folders: []
  }

  componentDidMount() {
    this.setState(dummyStore)
  }

  renderNavRoutes() {
    const { notes, folders } = this.state;
    return (
      <Fragment>
        {['/', '/folder/:folderId'].map(path => (
          <Route 
            exact
            key= {path}
            path={path}
            render={routeProps => (
              <SidebarNav
                notes={notes}
                folders={folders} 
                {...routeProps}
              />
            )}
          />
        ))}
        <Route 
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <ActiveNoteNav {...routeProps} folder={folder} />;
          }}
        />
      </Fragment>
    );
  }

  renderMainRoutes() {
    const { notes } = this.state;
    return (
      <Fragment>
        {['/', '/folder/:folderId'].map(path => (
          <Route 
            exact
            key={path}
            path={path}
            render={routeProps => {
              const { folderId } = routeProps.match.params;
              const notesForFolder = getNotesForFolder(notes, folderId);
              return (
                <NoteList 
                 {...routeProps}
                 notes={notesForFolder}
                 folder={folderId} 
                />
              );
            }}
          />
        ))}
        <Route 
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId);
            return <NotePage {...routeProps} note={note} />
          }}
        />
      </Fragment>
    );
  }

  render() {
    return (
      <div className='app'>
        <nav className='app-nav'>
          {this.renderNavRoutes()}
        </nav>
        <header className='app-header'>
          <h1>
            <Link to='/'>Noteful</Link>
          </h1>
        </header>
        <main>
          {this.renderMainRoutes()}
        </main>
      </div>
    );
  }
}

export default App;