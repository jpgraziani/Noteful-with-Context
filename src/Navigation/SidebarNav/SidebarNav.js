import React from 'react';
import { NavLink } from 'react-router-dom';

import './SidebarNav.css';

function SidebarNav(props) {
  return (
    <div className='sidebarNav'>
      <ul className='sidebarNav-ul'>
        {props.folders.map(folder =>
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

export default SidebarNav;