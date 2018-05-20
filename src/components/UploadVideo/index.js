import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import withAuthorization from '../Session/withAuthorization';

class UploadVideoPage extends Component {
    
    uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      { cloud_name: 'projet-react',
        upload_preset: 'sio8able',
        tags: ['official'],
        sources: ['local']
      },
      function(error, result) {
          console.log("This is the result of the last upload", result);
      });
  }

  render() {

    return (
        <div>
        <h3 class="title-page">Cliquez ci-dessous pour upload une vidéo</h3>
        <hr/>

        <div className="col-sm-12">
          <div className="jumbotron text-center">
            <button onClick={this.uploadWidget} className="btn btn-lg btn-info"> Upload Video</button>
          </div>
        </div>
      </div>
    );
  }
}

//const UserList = ({ users }) => /* A SUPPRIMER !*/
/*  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>*/

const mapStateToProps = (state) => ({
  users: state.userState.users,
});

const mapDispatchToProps = (dispatch) => ({
  onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(UploadVideoPage);
