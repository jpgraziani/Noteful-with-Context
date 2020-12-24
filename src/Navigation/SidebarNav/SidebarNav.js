import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import NotefulContext from '../../NotefulContext';
import PropTypes from 'prop-types';

import './SidebarNav.css';

class SidebarNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => {}
    },
    match: {
      params: {}
    }
  } 

  static contextType = NotefulContext;

  render() {
    const { folders=[] } = this.context;
    return (
      <div className='sidebarNav'>
        <ul className='sidebarNav-ul'>
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink
                className='sb-navLink'
                to={`/folder/${folder.id}`}
              >
                {folder.name}
              </NavLink>
            </li>
            )}
        </ul>
        <div>
          <Link 
            to='/add-folder'
            className='addBtn'>
            Add Folder
          </Link>
        </div>
        
      </div>
    );
  }
}

SidebarNav.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    'id': PropTypes.string.isRequired,
    'name': PropTypes.string.isRequired,
    'modified': PropTypes.string.isRequired,
    'folderId': PropTypes.string.isRequired,
    'content': PropTypes.string.isRequired
  })),
  folders: PropTypes.arrayOf(PropTypes.shape({
    'id': PropTypes.string.isRequired,
    'name': PropTypes.string.isRequired,
  })),
}

export default SidebarNav;