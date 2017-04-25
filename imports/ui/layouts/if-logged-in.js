import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.If_Logged_In.helpers({
  authInProcess: () => Meteor.loggingIn(),
  canShow: () => !!Meteor.user(),
});
