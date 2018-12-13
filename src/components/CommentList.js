import React, {Component} from 'react'
import Comment from './Comment'
import PropTypes from 'prop-types'
import ToggleOpen from '../decorators/toggleOpen'
import CommentForm from './CommentForm'
import {connect} from 'react-redux';
import {loadComments} from '../actionCreators';
import Loader from './Loader';

class CommentList extends Component{
	componentWillReceiveProps({isOpen, loadComments, article}){
		if(isOpen && !article.loadingComments && !article.loadedComments) loadComments(article.id);
	}
	getBody(){
		const {isOpen, article} = this.props;
		
		if(!isOpen) return null;
		if(article.loadingComments) return <Loader/>;
		if(!article.loadedComments) return null;
		const commentList = article.comments.map( (id) => <li key={id}><Comment id={id} /></li>);
		return (
			<div>
				<CommentForm articleId = {article.id} />
				{commentList}
			</div>
		);
	}
	render(){
		console.log("render commentList");
		const {isOpen, toggleOpen} = this.props;
		return (
			<div>
				<button onClick={toggleOpen}>{ isOpen ? "Закрыть комментарии" : "Открыть комментарии"}</button>
				{this.getBody()}
			</div>
		)
	}
}
export default connect(null, {loadComments})( ToggleOpen(CommentList) );

