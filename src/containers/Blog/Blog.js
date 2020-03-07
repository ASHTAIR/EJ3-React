import React from 'react';
// import axios from 'axios';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import Comentarios from '../../components/Comentarios/Comentarios'
import './Blog.css';

class Blog extends React.Component {
    state = {
        posts: [],
        comentarios: [],
        selectedPostId: null,
        selectedcomid: null,
        muestracoment: false,
        error: false
    }

    componentDidMount() {
        axios.get('/Libros.json')
            .then(response => {
                let posts = [];
                for (let key in response.data) {
                    posts.push({
                        ...response.data[key],
                        idb: key
                    });
                }
                posts = posts.slice(0, 4);
                //console.log(posts);
                this.setState({ posts: posts });
            }).catch(error => {
                this.setState({ error: true });
            });

        axios.get('/comentarios.json')
            .then(response => {
                let comentarios = [];
                for (let key in response.data) {
                    comentarios.push({
                        ...response.data[key],
                        idb2: key
                    });
                }
                comentarios = comentarios.slice(0, 4);
                //console.log(comentarios);
                this.setState({ comentarios: comentarios });
            }).catch(error => {
                this.setState({ error: true });
            });
    }

    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id });
    }

    commSelectedHandler = (id) => {
        this.setState({ selectedcomid: id });
    }


    render() {
        let posts = <p style={{ textAlign: 'center' }}>Problema con los libros</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post
                    key={post.idb}
                    nombre={post.nombre}
                    autor={post.autor}
                    clicked={() => this.postSelectedHandler(post.idb)} />;
            });
        }

        let comentarios = <p style={{ textAlign: 'center' }}>Problema con los comentarios</p>;
        if (!this.state.error) {
            comentarios = this.state.comentarios.map(comentario => {
                return <Comentarios
                    key={comentario.idb2}
                    titulo={comentario.titulo}
                    autor={comentario.autor}
                    comentario={comentario.comentario}
                    id = {comentario.idb2}
                    clicked={() => this.commSelectedHandler(comentario.idb2)} />;
            });
        }

        return (
            <div>
                <h1 style={{ textAlign: 'center' }}> Libros</h1>

                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    {comentarios}
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;