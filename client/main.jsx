import React from 'react';
import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import '../imports/startup/client/index.js';
import MainPage from "../imports/ui/pages/MainPage.jsx";
import {BrowserRouter} from "react-router-dom";

renderRoutes = () => (
    <BrowserRouter>
        <MainPage/>
    </BrowserRouter>
);

Meteor.startup(() => {
    ReactDOM.render(renderRoutes(), document.getElementById('render-target'));
});