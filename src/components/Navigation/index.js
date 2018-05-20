import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';

const Navigation = ({ authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>

const NavigationAuth = () =>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand">Projet X</a>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
          <Link to={routes.HOME}><a class="nav-link">Home</a></Link>
      </li>
      <li class="nav-item">
          <Link to={routes.ACCOUNT}><a class="nav-link">Mon compte</a></Link>
      </li>
      <li class="nav-item">
          <Link to={routes.UPLOAD_VIDEO}><a class="nav-link">Upload une vidéo</a></Link>
      </li>
      <li class="nav-item">
          <SignOutButton />
      </li>
    </ul>
  </div>
</nav>

const NavigationNonAuth = () =>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand">Projet X</a>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
          <Link to={routes.LANDING}><a class="nav-link">Public Home</a></Link>
      </li>
      <li class="nav-item">
          <Link to={routes.SIGN_IN}><a class="nav-link">Connexion</a></Link>
      </li>
    </ul>
  </div>
</nav>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
