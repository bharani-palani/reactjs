import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from './actions/postactions';
import PropTypes from 'prop-types';

class ReduxTuts extends Component {
    componentWillMount() {
        this.props.fetchPosts();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.newPost) {
            this.props.posts.unshift(nextProps.newPost);
        }
    }
    render() {
        const postItems = this.props && this.props.posts.length > 0 ? this.props.posts.map(post => 
            <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </div> 
        ) : <span></span>
        return (
            <div>{postItems}</div>
        )
    }
}

ReduxTuts.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    newPost: PropTypes.object
}

const mapStateToProps = state => ({
    posts: state.posts.items,
    newPost: state.posts.item
})

export default connect(mapStateToProps, { fetchPosts })(ReduxTuts);
