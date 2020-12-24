import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom';

import SidebarNav from './Navigation/SidebarNav/SidebarNav';
import ActiveNoteNav from './Navigation/ActiveNoteNav/ActiveNoteNav';
import NoteList from './NoteComponents/NoteList/NoteList';
import NotePage from './NoteComponents/NotePage/NotePage';
import AddNote from './AddNotePage/AddNote';
import AddFolder from './AddFolder/AddFolder';
import ErrorBoundary from './ErrorBoundary';

import NotefulContext from './NotefulContext';

import './App.css';

class App extends React.Component {
  state = {
    notes: [],
    folders: []
  }

  componentDidMount() {
    Promise.all([
      fetch(`http://localhost:9090/notes`),
      fetch(`http://localhost:9090/folders`)
    ])
    .then(([notesRes, foldersRes]) => {
      if (!notesRes.ok)
        return notesRes.json().then(err => Promise.reject(err));
      if (!foldersRes.ok)
        return foldersRes.json().then(err => Promise.reject(err));

      return Promise.all([notesRes.json(), foldersRes.json()]);
    })
    .then(([notes, folders]) => {
      this.setState({
        notes, 
        folders
      });
    })
    .catch(error => {
      console.error({error})
    })
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  }

  handleAddFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }
 
  renderNavRoutes() {
    const pathRoute = ['/', '/folder/:folderId'];
    return (
      <Fragment>
        {pathRoute.map(path => (
          <ErrorBoundary key={path}>
            <Route 
              exact
              key= {path}
              path={path}
              component={SidebarNav}
            />
          </ErrorBoundary>
        ))}
        <ErrorBoundary>
          <Route 
            path='/note/:noteId'
            component={ActiveNoteNav}
          />
        </ErrorBoundary>
      </Fragment>
    );
  }

  renderMainRoutes() {
    const pathRoute = ['/', '/folder/:folderId'];
    return (
      <Fragment>
        {pathRoute.map(path => (
          <ErrorBoundary key={path}>
            <Route 
              exact
              key={path}
              path={path}
              component={NoteList}
            />
          </ErrorBoundary>
        ))}
        <ErrorBoundary>
          <Route 
            path='/note/:noteId'
            component={NotePage}
          />
          <Route 
            path='/add-folder'
            component={AddFolder}
          />
          <Route 
            path='/add-note'
            component={AddNote}
          />
        </ErrorBoundary>
      </Fragment>
    );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote
    }
    return (
      <NotefulContext.Provider value={value}>
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
      </NotefulContext.Provider>
    );
  }
}

export default App;