require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//let yeomanImage = require('../images/yeoman.png');

let imagesData = require('../data/imageData.json');

imagesData = (imagesDataArr => {
	for (let i = imagesDataArr.length - 1; i >= 0; i--) {
		let oneImage = imagesDataArr[i];
		oneImage.imageURL = require('../images/' + oneImage.fileName)
	}
})(imagesData)


class AppComponent extends React.Component {
	render() {
		return (
			<section className="stage">
				<section className="img-sec"></section>
				<nav className="controller-nav"></nav>
			</section>
		);
	}
}

AppComponent.defaultProps = {};

export default AppComponent;