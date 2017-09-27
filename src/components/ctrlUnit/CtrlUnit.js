import React from 'React';

require('./CtrlUnit.scss');

class CtrlUnit extends React.Component {

	constructor(props) {
		super(props);
	}

	eventHandler(e) {
		this.props.data.click(this.props.index)()
		e.stopPropagation()
		e.preventDefault()
	}

	render() {
		var ctrlUnitClassName = 'ctrl-unit';

		// 如果图片居中，居中态按钮
		if (this.props.arrange.isCenter) {
			ctrlUnitClassName += ' is-center';
			// 如果同时是翻转图片，翻转态
			if (this.props.arrange.isInverse) {
				ctrlUnitClassName += ' is-inverse';
			}
		}
		return (
			<span
				className={ctrlUnitClassName}
				onClick={this.eventHandler}	
			></span>
		);
	}
}

export default CtrlUnit;