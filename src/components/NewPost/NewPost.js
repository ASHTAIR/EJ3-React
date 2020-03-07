import React from 'react';
// import axios from 'axios';
import axios from '../../axios';

import './NewPost.css';

class NewPost extends React.Component {
    state = {
        title: '',
        content: '',
        author: 'Max'
    }

    postDataHandler = () => {
        const data = {
            titulo: this.state.title,
            comentario: this.state.content,
            autor: this.state.author
        };
        axios.post('/comentarios.json', data)
            .then(response => {
                alert('Saved order');
                //console.log(response);
            });
    }

    render () {
        return (
            <div className="NewPost">
                <h1>Añade un comentario</h1>
                <label>Título</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Comentario</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Autor</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                    <option value="Carlos">Carlos</option>
                </select>
                <button onClick={this.postDataHandler}>Añadir comentario</button>
            </div>
        );
    }
}

export default NewPost;