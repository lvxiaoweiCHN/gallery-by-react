import React from 'react';
import ReactDOM from 'react-dom';

require('styles/App.scss');
import Stage from 'components/stage/Stage.js';

class AppComponent extends React.Component {

	constructor(props) {
		super(props)
		this.positionScope = {
			center: {},
			left: {},
			right: {},
			top: {}
		};
		this.imagesData = require('data/imagesData.json')

		// 图片信息中添加imageURL
		let imagesInfo = (imagesData => {
			for (let i = imagesData.length - 1; i >= 0; i--) {
				imagesData[i].imageURL = require('images/' + imagesData[i].fileName)
				imagesData[i].pos = {
					left: 0,
					top: 0
				}
				imagesData[i].isInverse = false
				imagesData[i].click = (() => {})
			}
			return imagesData
		})(this.imagesData)
		this.state = {
			imagesInfo: imagesInfo
		}
	}

	// 获取图片旋转的样式
	get30DegRandom() {
		return 'rotate(' + ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30)) + 'deg)'
	}

	// 图片反转
	inverse(index) {
		return (
			() => {
				let imagesInfo = this.state.imagesInfo;
				imagesInfo[index].isInverse = !imagesInfo[index].isInverse
				this.setState({
					imagesInfo: imagesInfo
				})
			}
		)
	}

	center(index) {
		return (
			() => {
				this.imgPostion(index)
			}
		)
	}

	// 获取区间内的随机值
	getRangeRandom(low, high) {
		return Math.ceil(Math.random() * (high - low) + low);
	}

	imgPostion(centerIndex) {
		let imagesInfo = this.state.imagesInfo

		// 在 this.state.imagesInfo 中取出中心图片
		let imgCenter = imagesInfo.splice(centerIndex, 1);

		// 设置居中图片的位置
		imgCenter[0].pos = this.positionScope.center;
		imgCenter[0].pos['zIndex'] = 11;
		imgCenter[0].click = this.inverse.bind(this)

		// 布局上边图片的数量
		let topImgNum = Math.ceil(Math.random() * 2)

		// 随机生成取图片的索引位置
		let topImgSpliceIndex = Math.floor(Math.random() * (imagesInfo.length - topImgNum));

		// 取出上边布局图片的信息
		let imgsTop = imagesInfo.splice(topImgSpliceIndex, topImgNum)

		//给取出来的图片计算位置
		imgsTop.forEach((value, index) => {
			imgsTop[index].pos = {
				top: this.getRangeRandom(this.positionScope.top.top[0], this.positionScope.top.top[1]),
				left: this.getRangeRandom(this.positionScope.top.left[0], this.positionScope.top.left[1]),
				transform: this.get30DegRandom()
			}
			imgsTop[index].click = (index) => this.center(index)
		});

		// 布局左右两侧的图片状态信息
		let len = imagesInfo.length
		for (let i = len - 1; i >= 0; i--) {
			if (i % 2 == 0) {
				imagesInfo[i].pos = {
					top: this.getRangeRandom(this.positionScope.left.top[0], this.positionScope.left.top[1]),
					left: this.getRangeRandom(this.positionScope.left.left[0], this.positionScope.left.left[1]),
					transform: this.get30DegRandom()
				}

			} else {
				imagesInfo[i].pos = {
					top: this.getRangeRandom(this.positionScope.right.top[0], this.positionScope.right.top[1]),
					left: this.getRangeRandom(this.positionScope.right.left[0], this.positionScope.right.left[1]),
					transform: this.get30DegRandom()
				}
			}
			imagesInfo[i].click = (index) => this.center(index)
		}

		// 将图片信息合并在一起
		imagesInfo.splice(topImgSpliceIndex, 0, ...imgsTop)
		imagesInfo.splice(centerIndex, 0, imgCenter[0])
		this.setState({
			imagesInfo: imagesInfo
		})

	}

	// 获取舞台的大小
	getStageSize() {
		// 拿到舞台大小
		let stageDom = ReactDOM.findDOMNode(this.refs.stage);
		let stageW = stageDom.scrollWidth;
		let stageH = stageDom.scrollHeight;
		let halfStageW = Math.ceil(stageW / 2);
		let halfStageH = Math.ceil(stageH / 2);
		return {
			stageW: stageW,
			stageH: stageH,
			halfStageW: halfStageW,
			halfStageH: halfStageH
		};
	}

	// 获取图片的大小
	getImgSize(instance) {
		//拿到imgFigure的大小
		let imgDom = ReactDOM.findDOMNode(instance)
		let imgW = imgDom.scrollWidth;
		let imgH = imgDom.scrollHeight;
		let halfImgW = Math.ceil(imgW / 2);
		let halfImgH = Math.ceil(imgH / 2);
		this.imgSize = {
			imgW: imgW,
			imgH: imgH,
			halfImgW: halfImgW,
			halfImgH: halfImgH
		};
	}

	setPositionScope() {
		const {
			stageW,
			stageH,
			halfStageW,
			halfStageH
		} = this.getStageSize();
		const {
			imgW,
			_imgH,
			halfImgW,
			halfImgH
		} = this.imgSize;
		this.positionScope.center = {
			left: halfStageW - halfImgW,
			top: halfStageH - halfImgH
		}
		this.positionScope.left = {
			left: [-halfImgW, halfStageW - halfImgW * 3],
			top: [-halfImgH, stageH - halfImgH]
		}
		this.positionScope.right = {
			left: [halfStageW + halfImgW, stageW - halfImgW],
			top: [-halfImgH, stageH - halfImgH]
		}
		this.positionScope.top = {
			left: [halfStageW - imgW, halfStageW],
			top: [-halfImgH, halfStageH - halfImgH * 3]
		}
	}

	componentDidMount() {
		// 设置位置范围
		this.setPositionScope()

		// 重设图片位置
		this.imgPostion(0)
	}

	render() {
		return (<Stage className = "stage" ref = "stage"
				imgRefCallback = { (instance) => this.getImgSize(instance) }
				imagesInfo = {this.state.imagesInfo}
			/>);
	}
}

export default AppComponent;