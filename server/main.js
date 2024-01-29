import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Loans } from '../imports/api/loans';
Meteor.startup(() => {
   
  Roles.createRole('borrower');
  Roles.createRole('lender');
  Meteor.methods({
    'loans.request'() {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      Loans.insert({
        borrowerId: this.userId,
        status: 'requested',
      });
    },
  });
});
Meteor.methods({
  checkAdminRole() {
      if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
        Roles.createRole('admin');
      }
    },
});
Meteor.methods({
  checkLenderRole() {
      if (!Roles.userIsInRole(Meteor.userId(), 'lender')) {
        Roles.createRole('lender');
      }
    },
});
Meteor.methods({
  checkBorrowerRole() {
      if (!Roles.userIsInRole(Meteor.userId(), 'borrower')) {
        Roles.createRole('borrower');
      }
    },
});

Meteor.methods({
  'loans.confirmPayment'() {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'lender')) {
      throw new Meteor.Error('not-authorized');
    }

    const loan = Loans.findOne({ lenderId: this.userId, status: 'requested' });
    if (loan) {
      Loans.update(loan._id, { $set: { status: 'paid' } });
    }
  },
});

