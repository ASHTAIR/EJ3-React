import React from 'react';

import './Post.css';

const post = (props) => (
    <article className="Post" onClick={props.clicked}>
        <h1>{props.nombre}</h1>
        <div className="Info">
            <div className="Author">{props.autor}</div>
        </div>
    </article>
);

export default post;