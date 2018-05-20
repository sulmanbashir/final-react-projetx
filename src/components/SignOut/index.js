import React from 'react';

import { auth } from '../../firebase';

const SignOutButton = () =>
    <a class="nav-link" onClick={auth.doSignOut}>Déconnexion</a>

export default SignOutButton;
