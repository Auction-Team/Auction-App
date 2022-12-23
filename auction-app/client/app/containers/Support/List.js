/*
 *
 * List
 *
 */

import axios from 'axios';
import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import SubPage from '../../components/Manager/SubPage';
import ReconcileList from '../../components/Manager/Support/ReconcicleList';

var paypal;
var reRender = 0;
class List extends React.PureComponent {
  componentDidMount() {
    reRender+=1
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
      axios
        .post(`/api/paypal/success`, {
          paymentId: paypal[0].paymentId,
          PayerID: paypal[1].PayerID,
          transactionalMoney: money,
        })
        .then((res) => {
          localStorage.removeItem('moneyPaypal');
          reRender = 0;
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
      >
        <ReconcileList paypal={paypal} />
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
