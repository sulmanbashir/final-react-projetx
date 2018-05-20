import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { CloudinaryContext, Video } from 'cloudinary-react';
import axios from 'axios';
import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';

class HomePage extends Component {
    
    state = { videos: [] };

    getVideos() {
        axios.get('https://res.cloudinary.com/projet-react/video/list/official.json')
            .then(res => {
                console.log(res.data.resources);
                this.setState({videos: res.data.resources});
            });    
    }
    
  componentDidMount() {
    const { onSetUsers } = this.props;

    db.onceGetUsers().then(snapshot =>
      onSetUsers(snapshot.val())
    );
      
    this.getVideos();
  }

  render() {
    const { videos }  = this.state;

    return (
        <div class="container-fluid">
        <h3 class="title-page"> Les vidéos du moment </h3>
        <hr/>
        <div class="row">
          <CloudinaryContext cloudName="projet-react">
            { videos.map((data, index) => (
                <div class="home-content" key={index}>
                    <Video publicId={data.public_id} width="800" height="500" controls></Video>
                  <div> Ajouté le {data.created_at} </div>
                <br />
                </div>
              ))
            }
          </CloudinaryContext>
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
)(HomePage);
