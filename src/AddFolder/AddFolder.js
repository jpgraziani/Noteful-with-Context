import React from 'react';
import NotefulContext from '../NotefulContext';

import './AddFolder.css'

export default class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameValid: false,
      formValid: false,
      validMsgs: {
        name: ''
      }
    }
  }

  static defaultProps = {
    history: {
      push: () => {},
      goBack: () => {}
    }
  }

  static contextType = NotefulContext;

  updateName(name) {
    this.setState({name}, 
      () => {this.validateName(name)})
  }

  validateName(nameValue) {
    let fieldErrors = {...this.state.validMsgs}
    let hasError = false;

    nameValue = nameValue.trim();
    if(nameValue.length === 0) {
     fieldErrors.name = 'Folder name is required';
     hasError = true;
    }

    this.setState({
      validMsgs: fieldErrors,
      nameValid: !hasError
    }, this.formValid )
  }

  formValid() {
    this.setState({
      formValid: this.state.nameValid 
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    const API_ENDPOINT = 'http://localhost:9090';
    const folder = {
      name: this.state.name
    } 

    fetch(`${API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(folder)
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(e = Promise.reject(e));
      }
      return res.json();
    })
    .then(folder => {
      this.context.addFolder(folder)
      this.props.history.push(``)
    })
    .catch(error => {
      console.error({error})
    })
  }

  render() {
    return (
      <section 
        id='addFolder-section'>
        <form
          id='addfolder-form' 
          onSubmit={e => this.handleSubmit(e)}>
          <div>
            <h2>Add Folder</h2>
          </div>
          <label htmlFor='name'>Folder Name: 
            <span 
              className='requiredField'>
              * required
            </span> 
          </label>
          <input 
            type='text' 
            id='name' 
            name='name' 
            aria-label='name'
            aria-required='true'
            aria-describedby='nameRequirement'
            placeholder='folder name' 
            onChange={e => this.updateName(e.target.value)}/>

          <div id='nameRequirement'>
            <p>Name must not be blank, must not start or end with a space</p>
          </div>
          <div id='btn-group'>
            <button
              className='subBtn'
              type='submit' 
              disabled={!this.state.formValid}>
              Submit
            </button>
            <button 
            className='backBtn'
            onClick={() => this.props.history.goBack()}>
            Back
            </button>
          </div>
        </form>
      </section>
    )
  }
}