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
		const nav = document.querySelector('nav')
		const nav_height = nav.offsetHeight
		const add_class_on_scroll = () => nav.classList.add('is-sticked')
		const remove_class_on_scroll = () => nav.classList.remove('is-sticked')

		scrollpos = window.scrollY;
		if (scrollpos >= nav_height) {
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
