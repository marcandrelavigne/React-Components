import React, { Component } from 'react';
import style from './Comments.css'; // Import the Comments style sheet.

var firebase = require('firebase'); // Firebase should be installed from npm first (npm install --save firebase)
var uuid = require('uuid');  // UUID should be installed from npm first (npm install --save uuid)

var config = {
    apiKey: "API_KEY_HERE",
    authDomain: "yourapp.firebaseapp.com",
    databaseURL: "https://yourappc.firebaseio.com",
    projectId: "yourapp",
    storageBucket: "yourapp.appspot.com",
    messagingSenderId: "646168834646"
};

firebase.initializeApp(config);

class Comments extends Component {

  constructor(props){
      super(props);
      this.state = {
        id:uuid.v1(),
        name:'',
        comment: '',
        date: '',
        submitted: false
      }

      this.handleFormChange = this.handleFormChange.bind(this);
  }

  // Submit the data to Firebase
  handleFormSubmit(event){

	// Get the date
	var today = new Date();
	var now = '';
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var hours = today.getHours();
	var minutes =today.getMinutes();
	if(dd<10) {
	    dd = '0'+dd
	}
	if(mm<10) {
	    mm = '0'+mm
	}
	today = mm + '/' + dd + '/' + yyyy;
	now = hours + ':' + minutes;


	// Save the name
	var name = this.refs.name.value;
    this.setState({name:name}, function(){
      console.log(this.state);
    });

	// Save data to firebase
    firebase.database().ref('test/'+this.state.id).set({
      name: this.state.name,
      comment:this.state.comment,
      date:today,
      time:now,
    });

    this.setState({submitted:true}, function(){
      console.log('Form Submitted...');
    });
    event.preventDefault();
  }

  // On change, the value will be saved in the state so we can send it later
  handleFormChange(event){

    var comment = this.state.comment;
    var name = document.getElementById('userName').value;

    if(event.target.name === 'comment'){
      comment = event.target.value;
      name = document.getElementById('userName').value;
    }

    this.setState({comment:comment, name:name},function(){
      console.log('Data saved');
    });
  }

  // Feed the comment table
  commentTable() {

  	var database = firebase.database();
    database.ref('test').once('value', function(snapshot){

        if(snapshot.exists()){
            var content = '';
            snapshot.forEach(function(data){
	            var name = data.val().name;
	            var comment = data.val().comment;
	            var date = data.val().date;
	            var time = data.val().time;

	            content += '<tr>';
	            content += '<td>' + date + ' @ ' + time + '</td>'; //column0
	            content += '<td>' + name + '</td>'; //column1
	            content += '<td>' + comment + '</td>';//column2
	            content += '</tr>';
            });
            var results = document.getElementById('commentsTable');
			results.innerHTML = content;

        }
    });
  }

  render() {
	  this.commentTable();

    var user;
    var questions;
    if(this.state.submitted === false){
      questions = <span>
        <form onSubmit={this.handleFormSubmit.bind(this)}>
          <div>
            <label>Your name</label><br />
            <input type="text" id="userName" placeholder="Enter Name..." ref="name" />
          </div>
           <div>
            <label>Your comment</label><br />
          	<input type="text" placeholder="Enter Comment..." name="comment" ref="comment" onBlur={this.handleFormChange} />
          </div>

          <input type="submit" value="Submit" />
        </form>
      </span>
    } else if(this.state.submitted === true){
      user = <h2>Your comment has been sent</h2>
    }
    return (
      <div className="Comments">
      	<div className="comments__table">
      		<h2>Comments</h2>
	        <table id="commentsTable">
		        <tbody>
				</tbody>
			</table>
		</div>
		<div className="comments__form">
			<h2>Leave a comment</h2>
	        {user}
	        {questions}
        </div>
      </div>
    );
  }
}

export default Comments;