import React, { Component } from 'react';
import firebaseConf from './firebase';

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form: [],
      alert: false,
      alertData: {}
    };
  }

  showAlert(type, message) {
    this.setState({
      alert: true,
      alertData: { type, message }
    });
    setTimeout(() => {
      this.setState({ alert: false });
    }, 4000)
  }

  resetForm() {
    this.refs.contactForm.reset();
  }

  componentWillMount() {
    let formRef = firebaseConf.database().ref('subscriptions').orderByKey().limitToLast(6);
    formRef.on('child_added', snapshot => {
      const { name, email } = snapshot.val();
      const data = { name, email };
      this.setState({ form: [data].concat(this.state.form) });
    })
  }

  sendMessage(e) {
    e.preventDefault();
    const params = {
      name: this.inputName.value,
      email: this.inputEmail.value,
    };
    if (params.name && params.email ) {
      firebaseConf.database().ref('subscriptions').push(params).then(() => {
        this.showAlert('success', 'Your message was sent successfull');
      }).catch(() => {
        this.showAlert('danger', 'Your message could not be sent');
      });
      this.resetForm();
    } else {
      this.showAlert('warning', 'Please fill the form');
    };
  }

  render() {
    return (
      <div>
        {this.state.alert && <div className={`alert alert-${this.state.alertData.type}`} role='alert'>
          <div className='container'>
            {this.state.alertData.message}
          </div>
        </div>}
        <div className='_container'>
          <div className='_row'>
            <div className='_col--xl-6'>
              <form onSubmit={this.sendMessage.bind(this)} ref='contactForm' >
                <div className='form-group'>
                  <label htmlFor='name'>Name</label>
                  <input type='text' className='form-control' id='name' placeholder='Name' ref={name => this.inputName = name} />
                </div>
                <div className='form-group'>
                  <label htmlFor='exampleInputEmail1'>Email</label>
                  <input type='email' className='form-control' id='email' placeholder='Email' ref={email => this.inputEmail = email} />
                </div>
                <button type='submit' className='btn'>Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
