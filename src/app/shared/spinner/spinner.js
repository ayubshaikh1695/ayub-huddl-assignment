import React from 'react';
import './spinner.css';

function Spinner() {
    return (
        <div className="spinner-container">
            <i className="fas fa-circle-notch fa-spin spinner-ico"></i>
        </div>
    );
}

export default Spinner;