/*
 * Display Avatar
 * This component uses Material UI to style the avatars
 * Great example of conditionnal rendering in React
 */

import React, { Component } from "react";
import Avatar from '@material-ui/core/Avatar';
import "./index.css";

class UserAvatar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {hasAvatar: localStorage.getItem('Uavatar')}; // User's Avatar is previously saved in localStorage
  }
  
  render() {
    const hasAvatar = this.state.hasAvatar;
	let userAvatar;
	
	// User name
	let UserFirstName = localStorage.getItem('Ufirstname');
	let UserLastName = localStorage.getItem('Ulastname');
	
	let UserFirstNameLetter = UserFirstName.charAt(0);
	let UserLastNameLetter = UserLastName.charAt(0);
	
	// If Use has an avatar, display it, else display his initials
	if (hasAvatar != null) {
	  userAvatar = <Avatar alt="" src={localStorage.getItem('Uavatar')} />;
	} else {
	  userAvatar = <Avatar>{UserFirstNameLetter}{UserLastNameLetter}</Avatar>;
	}
    
    return (
	    <div>
		  {userAvatar}
		</div>
	);
  }

}

export default UserAvatar;
