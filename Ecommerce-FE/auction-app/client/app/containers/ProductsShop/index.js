/**
 *
 * ProductsShop
 *
 */

import React from "react";

import { connect } from "react-redux";

import actions from "../../actions";

import ProductList from "../../components/Store/ProductList";
import NotFound from "../../components/Common/NotFound";
import LoadingIndicator from "../../components/Common/LoadingIndicator";
import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { QueryClientHook } from "react-query-class-component";
class ProductsShop extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.filterProducts(slug);
  }

  render() {
    const { products, isLoading, authenticated, updateWishlist } = this.props;

    const displayProducts = products && products.length > 0;

    return (
      <div className="products-shop">
        <QueryClientHook
          hook={useQuery} // react query hook
          params={[
            "products", // keyName
            () => {
              // query function
              const response = axios.get("/api/product/search");
              return response;
            },
            // ...options
          ]}
        >
          {({ data, isLoading }) => {
            if (isLoading) return <LoadingIndicator />;
            if (data.data.productList.datas.length === 0) {
              <NotFound message="no products found." />;
            }
            return (
              <ProductList
                products={data.data.productList.datas}
                authenticated={authenticated}
                updateWishlist={updateWishlist}
              />
            );
          }}
        </QueryClientHook>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.product.products,
    isLoading: state.product.isLoading,
    authenticated: state.authentication.authenticated,
  };
};

export default connect(mapStateToProps, actions)(ProductsShop);
