import { Meteor } from 'meteor/meteor';
import {GameCollection} from "./game.collection";
import _ from 'lodash';

Meteor.methods({

    "game.create"() {

        GameCollection.insert({
            targets: [
                { _id: 3, x: 500, y: 500, size: 200 },
                { _id: 2, x: 500, y: 300, size: 150 },
                { _id: 1, x: 300, y: 300, size: 100 },
                { _id: 4, x: 300, y: 500, size: 300 }
            ]
        });

    },

    "game.targetHit"(targetId) {

        const game = GameCollection.findOne({});

        const i = _.findIndex(game.targets, { _id: targetId });
        game.targets.splice(i, 1);

        GameCollection.update({ _id: game._id }, { $set: { targets: game.targets } });
    }

});