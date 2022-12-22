/*
 *
 * List
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import SubPage from '../../components/Manager/SubPage';
import ReconcileList from '../../components/Manager/Support/ReconcicleList';

class List extends React.PureComponent {
  render() {
    const { history, user } = this.props;

    return (
      <SubPage
        title="Reconcile"
        actionTitle="Add"
        handleAction={() => history.push('/dashboard/reconcile/add')}
      >
        <ReconcileList />
      </SubPage>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // user: state.account.user,
  };
};

export default connect(mapStateToProps, actions)(List);
