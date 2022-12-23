/*
 *
 * Support
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import actions from '../../actions';
import Page404 from '../../components/Common/Page404';
import Add from './Add';
import List from './List'
import Withdraw from './Withdraw';

class Support extends React.PureComponent {
  render() {
    // const { user } = this.props;

    return (
      <div className='reconcile-dashboard'>
      <Switch>
        <Route exact path='/dashboard/reconcile' component={List} />
        <Route exact path='/dashboard/reconcile/add' component={Add} />
        <Route exact path='/dashboard/reconcile/withdraw' component={Withdraw} />
        <Route exact path='/dashboard/reconcile/:status' component={List} />
        <Route path='*' component={Page404} />
      </Switch>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // user: state.account.user,
    // resetFormData: state.resetPassword.resetFormData,
    // formErrors: state.resetPassword.formErrors,
  };
};

export default connect(mapStateToProps, actions)(Support);
