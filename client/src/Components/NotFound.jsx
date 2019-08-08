import React, {Component} from 'react';

class NotFound extends Component {
	componentDidMount() {
		document.body.classList.add('main404');
	}

	componentWillUnmount() {
		document.body.classList.remove('main404');
	}

	render() {
		return (
			<>
				<div id="clouds">
					<div className="cloud x1" />
					<div className="cloud x1_5" />
					<div className="cloud x2" />
					<div className="cloud x3" />
					<div className="cloud x4" />
					<div className="cloud x5" />
				</div>
				<div className="c">
					<div className="_404">404</div>
					<hr className="hr404" />
					<div className="_1">THE PAGE</div>
					<div className="_2">WAS NOT FOUND</div>
				</div>
			</>
		);
	}
}

export default NotFound;
