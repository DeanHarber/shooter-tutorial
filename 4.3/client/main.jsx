import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { AppWithTracker } from '/imports/ui/App';

import '/imports/api/game.collection';
import '/imports/api/game.methods';

FlowRouter.route('/', {
    name: 'root',
    action(params, queryParams) {
        Meteor.call("game.create", (err, gameId) => {
            if(!err) FlowRouter.go('game', { gameId });
        });
    }
});

FlowRouter.route('/:gameId', {
    name: 'game',
    action(params, queryParams) {
        render(<AppWithTracker gameId={params.gameId} />, document.getElementById('react-target'));
    }
});