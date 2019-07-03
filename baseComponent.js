import React from 'react';
import './index.css'; // Component Style Sheet

class MyComponent extends React.Component {
  render() {
	  return (
	    <div className="MyComponent">
	      <h2>Title</h2>
	      {/* Component's Content Here */}
	    </div>
	  );
  }
  
  componentDidMount() {
	  // JS Stuff here
  }
  
}

export default MyComponent;
