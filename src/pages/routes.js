import React from 'react';
import {Switch, Route} from 'react-router-dom';
import GlobalFeed from '../pages/globalFeed'
import Article from '../pages/article'
import Auth from '../pages/auth';
import CreateArticle from './createArticle'

export default () => {
    return (
        <Switch>
            <Route path = "/" component={GlobalFeed} exact/>
            <Route path = "/article/:slug" component={Article}/>
            <Route path = "/login" component={Auth}/>
            <Route path = "/register" component={Auth}/>
            <Route path= "/articles/new" component={CreateArticle}/>
        </Switch>
    )
}