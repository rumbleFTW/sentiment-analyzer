import React from 'react';
import ReactDOM from 'react-dom/client';
import Panel from './Panel';
import Switch from './Switch';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Switch/>
        <Panel/>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
