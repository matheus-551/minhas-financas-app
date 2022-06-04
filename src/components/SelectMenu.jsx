import React from 'react';

export function SelectMenu(props) {

    const options = props.list.map( (op, index) => {
        return (
            <option key={index} value={op.value}>{op.label}</option>
        )
    })

    return (
        <select {...props}>
            {options}
        </select>
    )
}