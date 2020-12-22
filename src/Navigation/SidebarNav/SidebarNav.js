import React from 'react';
import { NavLink } from 'react-router-dom';
import NotefulContext from '../../NotefulContext';

import './SidebarNav.css';

class SidebarNav extends React.Component {
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
        <button className='addBtn'>
            Add Folder
        </button>
      </div>
    );
  }
}

export default SidebarNav;