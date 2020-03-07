import React from 'react';
import axios from '../../axios';

import './Comentarios.css';

class Comentarios extends React.Component {
    state = {
        loadedPost: null
    }

    delete = () => {
        axios.delete('/comentarios/' + this.props.id + '.json')
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
        let comentario = <p style={{ textAlign: 'center' }}>Loading...!</p>;

        comentario = (
            <article className="Comentarios" onClick={this.props.clicked}>
                <h1>{this.props.titulo}</h1>
                <div className="Info">
                    <div className="Comentario">{this.props.comentario}</div>
                    <div className="Author">{this.props.autor}</div>
                </div>
                <div className="Edit">
                    <button onClick={this.delete} className="Delete">Eliminar</button>
                </div>
            </article>
        )
        return comentario;
    }
}
export default Comentarios;