/*
 *
 * Add
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import SubPage from '../../components/Manager/SubPage';
import AddReconcile from '../../components/Manager/Support/Add';

class Add extends React.PureComponent {
  render() {
    const { history } = this.props;

    return (
      <SubPage
        title="Add Reconcile"
        actionTitle="Cancel"
        handleAction={() => history.goBack()}
      >
        <AddReconcile history={history}/>
      </SubPage>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // user: state.account.user,
    // productFormData: state.product.productFormData,
    // formErrors: state.product.formErrors,
  };
};

export default connect(mapStateToProps, actions)(Add);
