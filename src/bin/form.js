import React, {Component} from 'react';
import {Field, reduxForm,reset} from 'redux-form';
import _ from 'lodash';
import {emailRegex, upload} from './shared';
import Dropzone from 'react-dropzone';

class MainForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      error: "",
      processing: false,
      accepted: [],
      rejected: []
    }

    _.bindAll(this,['onDrop','onSubmit'])
  }

  onDrop(accepted, rejected) {
    this.setState({
      accepted,
      rejected
    });
  }


  onSubmit(values){
    var {accepted} = this.state;
    var fileArray = [];
    const reader = new FileReader();
    accepted.map((file) => {
      reader.readAsDataURL(file);
      reader.onload = function () {
         upload({
           file: {
             filename:file.name,
             data_uri: reader.result,
             filetype: file.type
           },
           name: encodeURI(values.name.toLowerCase().replace(/ /g,'-'))
         })
         .then((res) => {
           console.log(res)
         })
      };
    });
  }

  renderField(field) {
    const { meta: {touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''} `;
    return(
      <div className={className}>
        <input type={field.type}
               className={`form-control ${field.namedClass || ""}`}
               placeholder={field.label}
               {...field.input}/>
             <div className="text-danger">
               {touched ? error : ''}
             </div>
      </div>
    );
  }
  render(){
    const {handleSubmit} = this.props;
    if(!this.state.processing){
      return(
        <div className="form-container">
          <form className="contact-form" onSubmit={ handleSubmit(this.onSubmit) }>
            <label className="text-danger">{this.state.error}</label>
            <label className="text-info">{this.state.success ? "Successfully submitted!" : ""}</label>
            <Field
              name="name"
              type="text"
              namedClass="input-light"
              component={this.renderField}
              label="Name:"
              autocapitalize="off"/>

            <Field
              name="email"
              type="text"
              namedClass="input-light"
              component={this.renderField}
              label="Email:"
              autocapitalize="off"/>
            <section>
              <div className="dropzone">
                <Dropzone
                  accept="image/jpeg, image/png"
                  onDrop={this.onDrop}>
                  <p>Try dropping some files here, or click to select files to upload.</p>
                </Dropzone>
              </div>
              <aside>
                <h2>Dropped files</h2>
                <ul>
                  {
                    this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                  }
                </ul>
              </aside>
            </section>
            <div className="action-buttons">
              <button type="submit" className="standard-button login login-submit">
                  Send
              </button>
            </div>
          </form>
        </div>
      )
    }
  }
}

function validate(values) {
  const errors = {};

  return errors;
}

export default reduxForm({
  validate,
  form: 'MainForm'
})(MainForm);
