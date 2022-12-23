import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { success } from 'react-notification-system-redux';

import NotFound from '../../Common/NotFound';
import LoadingIndicator from '../../Common/LoadingIndicator';

const ReconcileList = (props) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    let onDestroy = false;
    axios.get(`/api/paypal/all-transaction`).then((res) => {
      if (!onDestroy) {
        if (res.data.reconcileList.length > 0) {
          setList(res.data.reconcileList);
        } else {
          setLoading(false);
        }
      }
    });

    if (
      window.location.search.substring(1).split('&').length == 3 &&
      props.reRender == 1
    ) {
      dispatch(
        success({
          title: `Deposit money into the system successfully!`,
          position: 'tr',
          autoDismiss: 1,
        })
      );
    }

    return () => {
      onDestroy = true;
      setLoading(false);
    };
  }, []);

  useEffect(() => {
    if (list?.length > 0) {
      setLoading(false);
    }
  }, [list]);

  return (
    <>
      {loading ? (
        <LoadingIndicator inline />
      ) : (
        <>
          {list?.length > 0 ? (
            <>
              {list.map((item, index) => {
                return (
                  <div key={index} className="p-list">
                    <div
                      className="d-flex flex-row align-items-center mx-0 mb-3 product-box"
                      style={{
                        border: '1px solid #eceef3',
                        padding: '12px',
                      }}
                    >
                      <div className="d-flex flex-column justify-content-center px-3 text-truncate">
                        <h4 className="text-truncate">
                          {item.action}
                        </h4>
                        <p className="mb-0 text-truncate">
                          Money: {item.transactionalMoney}
                        </p>
                        <p className="mb-0 text-truncate">
                          Type: {item.type}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <NotFound message="You Have No Reconcile Yet!" />
          )}
        </>
      )}
    </>
  );
};

export default ReconcileList;
