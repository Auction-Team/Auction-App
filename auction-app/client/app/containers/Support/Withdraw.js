/*
 *
 * Withdraw
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import SubPage from '../../components/Manager/SubPage';
import WithdrawMoney from '../../components/Manager/Support/Withdraw';

class Withdraw extends React.PureComponent {
  render() {
    const { history, user } = this.props;

    return (
      <SubPage
        title="Withdraw Money"
        actionTitle="Cancel"
        handleAction={() => history.goBack()}
      >
        <WithdrawMoney history={history}/>
      </SubPage>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.account.user,
    // productFormData: state.product.productFormData,
    // formErrors: state.product.formErrors,
  };
};

export default connect(mapStateToProps, actions)(Withdraw);
