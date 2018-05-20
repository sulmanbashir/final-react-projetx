import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import PasswordChangeForm from '../PasswordChange';
import withAuthorization from '../Session/withAuthorization';

const AccountPage = ({ authUser }) =>
  <div>
    <h2>Bonjour : {authUser.email}</h2>
    <br /><br />
    <h4>Mot de passe oublié ? Réinitialiser-le</h4>
    <br />
    <br />
    <PasswordChangeForm />
  </div>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(AccountPage);