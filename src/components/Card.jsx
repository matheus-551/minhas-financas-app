import React from 'react';

export function Card(props) {

    return (
        <div className="card md-3">
            <h3 className="card-header">
                {props.title}
            </h3>
            <div className="card-body">
                {props.children}
            </div>
        </div>
    )
}