import React from 'React';

require('./ImgFigure.scss');

class ImgFigure extends React.Component {

	constructor(props) {
		super(props);
	}

	eventHandler(e) {
		this.props.data.click(this.props.index)()
		e.stopPropagation()
		e.preventDefault()
	}

	render() {
		let imgFigureClassName = 'img-figure';
		imgFigureClassName += this.props.data.isInverse ? ' is-inverse' : '';
		return (
			<figure className={imgFigureClassName} style={this.props.data.pos} onClick={(e) => this.eventHandler(e)}>
				<img
					src={this.props.data.imageURL}
					alt={this.props.data.title}
				/>
				<figcaption>
					<h2 className='img-title'>{this.props.data.title}</h2>
					<div className='img-back' onClick={(e) => this.eventHandler(e)}>
						<p>
							{this.props.data.desc}
						</p>
					</div>
				</figcaption>
			</figure>
		)
	}
}

export default ImgFigure;