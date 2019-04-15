import React, { Component } from 'react';

class StickyNav extends Component {

	componentDidMount() {
	    window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
	    window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll(event) {
	    let scrollpos = window.scrollY
		const header = document.querySelector('nav')
		const header_height = header.offsetHeight
		const add_class_on_scroll = () => header.classList.add('is-sticked')
		const remove_class_on_scroll = () => header.classList.remove('is-sticked')

		scrollpos = window.scrollY;
		if (scrollpos >= header_height) {
		  add_class_on_scroll()
		} else {
		  remove_class_on_scroll()
		}
		console.log(scrollpos)
	}

	render() {
	    return (
	      <nav>
	      	Your Sticky Nav Here
	      </nav>
	    )
	}

}

export default StickyNav;
