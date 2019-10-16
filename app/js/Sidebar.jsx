import React from 'react';
import {Button} from 'react-bootstrap';
import './Sidebar.css';


const Sidebar = (props) => {
    return (
        <div className="sidebar">
            <Button onClick={props.onClick} variant="primary"> + New Tinka</Button>
        </div>
    )
}
export default Sidebar;