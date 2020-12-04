import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { AppWithTracker } from '/imports/ui/App';

import '/imports/api/game.collection';
import '/imports/api/game.methods';

Meteor.startup(() => {
  render(<AppWithTracker />, document.getElementById('react-target'));
});
