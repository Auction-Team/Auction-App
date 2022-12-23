/*
 *
 * List
 *
 */

import axios from 'axios';
import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

import SubPage from '../../components/Manager/SubPage';
import ReconcileList from '../../components/Manager/Support/ReconcicleList';

var paypal;
var reRender = 0;
class List extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }
  componentDidMount() {
    reRender += 1;
    if (this.props.match.params.status == 'success') {
      paypal = this.props.location.search
        .substring(1)
        .split('&')
        .map((x) => {
          var y = x.split('=');
          return {
            [y[0]]: y[1],
          };
        })
        .filter((x) => !x.token);
    }

    var money = parseInt(localStorage.getItem('moneyPaypal'));

    if (money && reRender == 1) {
      this.state.loading = true;
      axios
        .post(`/api/paypal/success`, {
          paymentId: paypal[0].paymentId,
          PayerID: paypal[1].PayerID,
          transactionalMoney: money,
        })
        .then((res) => {
          localStorage.removeItem('moneyPaypal');
          reRender = 0;
          this.state.loading = false;
        });
    }
  }
  render() {
    const { history, user } = this.props;

    return (
      <SubPage
        title="Reconcile"
        actionTitle="Add"
        handleAction={() => history.push('/dashboard/reconcile/add')}        
        subActionTitle="Withdraw"
        handleSubAction={() => history.push('/dashboard/reconcile/withdraw')} 
      >
        {this.state.loading ? (
          <LoadingIndicator inline />
        ) : (
          <ReconcileList reRender={reRender}/>
        )}
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
