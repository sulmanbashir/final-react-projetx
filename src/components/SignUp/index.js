import React, { Component } from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';

import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';

const SignUpPage = ({ history }) =>
  <div>
    <h1>SignUp</h1>
    <SignUpForm history={history} />
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {

        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(updateByPropertyName('error', error));
          });

      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      username === '' ||
      email === '';

    return (
    
        <form onSubmit={this.onSubmit}>
        <div class="form-group row">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Nom d'utilisateur</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" placeholder="Nom ou Prénom" value={username}
          onChange={event => this.setState(updateByPropertyName('username', event.target.value))} />
            </div>
        </div>
        <div class="form-group row">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
                <input type="email" class="form-control" placeholder="Email" value={email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))} />
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-2 col-form-label">Mot de passe</label>
            <div class="col-sm-10">
                <input type="password" class="form-control" placeholder="Password" value={passwordOne} onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}/>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-2 col-form-label">Confirmer votre mot de passe</label>
            <div class="col-sm-10">
                <input type="password" class="form-control" placeholder="Password" value={passwordTwo} onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}/>
            </div>
        </div>
        <center>
            <button disabled={isInvalid} type="submit" class="btn btn-primary">Je m'inscris</button>
        </center>
        <br />
        { 
            error && 
            <div class="alert alert-danger" role="alert">
                <strong>Something is wrong </strong>{error.message}
            </div> 
        }
      </form>
      /*<form onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        { error && <p>{error.message}</p> }
      </form>*/
    );
  }
}

const SignUpLink = () =>
  <p align="center">
    Vous voulez créer un compte ?
    {' '}
    <Link to={routes.SIGN_UP}> Inscription</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};