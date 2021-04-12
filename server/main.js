import { Meteor } from 'meteor/meteor';
import '../imports/api/Users';
import '../imports/api/Vehicles';
import '../imports/api/Machines';
import '../imports/api/Offices';

Meteor.startup(() => {
    console.log('Server Started...')
});
