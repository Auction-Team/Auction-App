import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotFound from '../../Common/NotFound';

const ReconcileList = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    let onDestroy = false;

    axios.get(`/api/paypal/all-transaction`).then((res) => {
      if (!onDestroy) {
        setList(res.data.reconcileList);
      }
    });

    return () => {
      onDestroy = true;
    };
  }, []);

  return (
    <>
      {list?.length > 0 ? (
        <>
          {list.map((item, index) => {
            return (
              <div key={index} className="p-list">
                <div className="d-flex flex-row align-items-center mx-0 mb-3 product-box" style={{border: '1px solid #eceef3', padding: '12px'}}>
                  <div className="d-flex flex-column justify-content-center px-3 text-truncate">
                    <h4 className="text-truncate">{item.action}</h4>
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
  );
};

export default ReconcileList;
