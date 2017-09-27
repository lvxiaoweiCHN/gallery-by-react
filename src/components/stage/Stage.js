import React from 'react';
require('./Stage.scss');
import ImgFigure from 'components/imgFigure/ImgFigure.js';
//import CtrlUnit from 'components/ctrlUnit/CtrlUnit.js';

class Stage extends React.Component {

	constructor(props) {
		super(props);
	}


	componentDidMount() {
		this.props.imgRefCallback(this.refs.img)
	}

	getImgFigures() {
		let imgFigures = [];
		let ctrlUnits = [];
		this.props.imagesInfo.forEach((value, index) => {
			if (index == 0) {
				imgFigures.push(<ImgFigure key={index} index={index} data={value} ref="img" />)
			} else {
				imgFigures.push(<ImgFigure key={index} index={index} data={value} />)
			}
			//ctrlUnits.push(<CtrlUnit key={index} index={index} data={value} />)
		})
		return imgFigures
	}


	render() {
		return (
			<section className="stage" >
				<section className="img-sec">
				{this.getImgFigures()}
				</section>
				<nav className="ctrl-nav"></nav>
			</section>
		)
	}
}

export default Stage;