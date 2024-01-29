import { Template } from 'meteor/templating';

import './main.tpl.html';

Template.dashboard.helpers({
  currentUser() {
    return Meteor.user();
  },
});

Template.dashboard.events({
  'click #requestLoan'(event) {
    event.preventDefault();
    Meteor.call('loans.request', (error, result) => {
      if (error) {
        alert(error.reason);
      } else {
        alert('Loan requested successfully!');
      }
    });
  },
});

Template.roleSelection.events({
  'click #selectBorrower'() {
    Roles.addUsersToRoles(Meteor.userId(), 'borrower');
  },
  'click #selectLender'() {
    Roles.addUsersToRoles(Meteor.userId(), 'lender');
  },
});

Template.dashboard.events({
  'click #confirmPayment'(event) {
    event.preventDefault();
    Meteor.call('loans.confirmPayment', (error, result) => {
      if (error) {
        alert(error.reason);
      } else {
        alert('Payment confirmed successfully!');
      }
    });
  },
});


Template.adminView.helpers({
  allLoans() {
    return Loans.find();
  },
});

