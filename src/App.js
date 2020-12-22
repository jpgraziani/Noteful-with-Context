import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom';

import SidebarNav from './Navigation/SidebarNav/SidebarNav';
import ActiveNoteNav from './Navigation/ActiveNoteNav/ActiveNoteNav';
import NoteList from './NoteComponents/NoteList/NoteList';
import NotePage from './NoteComponents/NotePage/NotePage';

import dummyStore from './dummyStore';


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
    const pathRoute = ['/', '/folder/:folderId'];
    return (
      <Fragment>
        {pathRoute.map(path => (
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
            return (
              <ActiveNoteNav 
                {...routeProps} 
                notes={notes}
                folders={folders} />);
          }}
        />
      </Fragment>
    );
  }

  renderMainRoutes() {
    const { notes } = this.state;
    const pathRoute = ['/', '/folder/:folderId'];
    return (
      <Fragment>
        {pathRoute.map(path => (
          <Route 
            exact
            key={path}
            path={path}
            render={routeProps => {
              return (
                <NoteList 
                 {...routeProps}
                 notes={notes}
                />);
            }}
          />
        ))}
        <Route 
          path='/note/:noteId'
          render={routeProps => {
            return (
              <NotePage 
              {...routeProps} 
              notes={notes} />);
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