import React from 'react';
// import axios from 'axios';
import axios from '../../axios';

import './FullPost.css';

class FullPost extends React.Component {
    state = {
        loadedPost: null
    }

    componentDidUpdate() {
        if (this.props.id) {
            if (!this.state.loadedPost || this.state.loadedPost.idb !== this.props.id) {
                //axios.get('/posts.json?orderBy="id"&equalTo="' + this.props.id + '"')
                axios.get('/Libros.json?orderBy="$key"&equalTo="' + this.props.id + '"')
                    .then(response => {
                        //console.log(response);
                        const posts = [];
                        for (let key in response.data) {
                            posts.push({
                                ...response.data[key],
                                idb: key
                            });
                        }
                        //console.log(posts);
                        this.setState({ loadedPost: posts[0] });
                    });
            }
        }

    }

    deleteUpdatePostHandler = () => {
        axios.delete('/Libros/' + this.props.id + '.json')
            .then(response => {
                console.log(response);
            });
        // axios.put('/posts/' + this.props.id + '.json', {
        //     ...this.state.loadedPost,
        //     author: "new author added " + new Date()
        // })
        //     .then(response => {
        //         console.log(response);
        //     });
    }


    render() {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.nombre}</h1>
                    <img src={this.state.loadedPost.imagen} alt="Imagen libro"></img>
                    <p>{this.state.loadedPost.descripción}</p>
                    <div className="Edit">
                        <button onClick={this.deleteUpdatePostHandler} className="Delete">Delete or Update</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;