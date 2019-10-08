import React from 'react';
import {Button} from 'react-bootstrap';

const Sidebar = (props) => {
    return (
        <div className="sidebar">
            <Button onClick={props.onClick} variant="primary">Add a Tinkamo!</Button>
        </div>
    )
}
export default Sidebar;
