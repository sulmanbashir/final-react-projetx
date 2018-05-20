import React, { Component } from 'react';

import { auth } from '../../firebase';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div class="form-group row">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Nouveau mot de passe</label>
            <div class="col-sm-10">
                <input type="password" class="form-control" placeholder="Nouveau mot de passe" value={passwordOne}
          onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))} />
            </div>
        </div>
        <div class="form-group row">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Confirmation</label>
            <div class="col-sm-10">
                <input type="password" class="form-control" placeholder="Confirmer votre nouveau mot de passe" value={passwordTwo}
          onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))} />
            </div>
        </div>
        <center>
            <button disabled={isInvalid} type="submit" class="btn btn-primary">Réinitialiser</button>
        </center>
        { error && <p>{error.message}</p>}
         </form>
      /*<form onSubmit={this.onSubmit}>
        <input
          value={passwordOne}
          onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
          type="password"
          placeholder="New Password"
        />
        <input
          value={passwordTwo}
          onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        { error && <p>{error.message}</p> }
      </form>*/
    );
  }
}

export default PasswordChangeForm;