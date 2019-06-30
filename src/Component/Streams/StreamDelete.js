import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../Actions';

class StreamDelete extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	renderActions() {
		const { id } = this.props.match.params;
		return (
			<React.Fragment>
				<button
					onClick={() => this.props.deleteStream(id)}
					className="ui button negative">
					DELETE
				</button>
				<Link to="/" className="ui button">
					CANCEL
				</Link>
			</React.Fragment>
		);
	}

	render() {
		return (
			<Modal
				title="Delete Stream"
				content={
					!this.props.stream
						? 'Are you sure you want to delete the stream?'
						: `Are you sure you want to delete the stream with title: ${
								this.props.stream.title
						  }?`
				}
				actions={this.renderActions()}
				onDismiss={() => history.push('/')}
			/>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id]
	};
};

export default connect(
	mapStateToProps,
	{ fetchStream, deleteStream }
)(StreamDelete);
