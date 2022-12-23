/**
 *
 * ProductsShop
 *
 */

import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import actions from "../../actions";
import ReactPaginate from "react-paginate";
import ProductList from "../../components/Store/ProductList";
import NotFound from "../../components/Common/NotFound";
import LoadingIndicator from "../../components/Common/LoadingIndicator";
import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { QueryClientHook } from "react-query-class-component";
import Pagination from "../../components/Common/Pagination";
import { useSocket } from "../../contexts/Socket";

function ProductShop(props) {
  const { authenticated } = props;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  useEffect(() => {
    setLoading(true);
    const fetchProduct = async () => {
      const response = await axios.get("/api/product/search", {
        params: {
          size: 6,
          page: currentPage,
        },
      });
      setProducts(response.data.productList.datas ?? []);
      setTotalPage(response.data.productList.totalData);
    };
    fetchProduct();
    setLoading(false);
  }, [currentPage]);
  console.log("current page: " + currentPage);
  console.log("product:", products);
  return (
    <div className="products-shop">
      {loading && <LoadingIndicator />}
      {products.length === 0 && <NotFound message="no products found." />}

      <>
        <ProductList products={products} authenticated={authenticated} />
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={totalPage / 6} // The total number of pages.
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination mt-4"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </>
    </div>
  );
}

export default ProductShop;
