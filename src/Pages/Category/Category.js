import React, { useEffect, useState } from "react";

import ProductCard from "../../component/ProductCard/ProductCard";
import Page from "../../component/Paging/Paging";
import TopBanner from "../../component/Top Banner/TopBanner";

import "./Category.scss";
import categoryimg from "../../assets/banner-girls.png";
import { connect } from "react-redux";

function Category(props) {
	const [productcard, setproductcard] = useState([]);
	const { CategoryAdd, Products } = props;

	useEffect(() => {
		var p = [];
		Products.map((product, i) =>
			p.push(
				<ProductCard
					id={product.Product_id} 
					index={i}
					key={i}
					img={JSON.parse(product.Image)[i] !== undefined ? `http://localhost:5000/${JSON.parse(product.Image)[i][0]}`: null} 
					name={product.Name} 
					category={product.Category.Name} 
					price={JSON.parse(product.Price)[i] !== undefined ? JSON.parse(product.Price)[i][0]: null}
					color={JSON.parse(product.Color)[i] !== undefined ? JSON.parse(product.Color)[i]: null}
					size={JSON.parse(product.Size)[i] !== undefined ? JSON.parse(product.Size)[i][0]: null}
				/>
			)
		);
		setproductcard(p);
	}, [Products]);

	const categ = (val) => {
		var p = [];
		productcard.map(pro => 
			val === pro.props.category
			? p.push(pro)
			: null
		)
		return <Page todos={p} totalnumber={3} itemDisplay={15} />
	};

	return (
		<div className="category">
			<TopBanner img={categoryimg} name="SHOP NOW" />
			<div className="product-display">
				<ul className="nav nav-pills" role="tablist">
				<li className="nav-item">
					<a className="nav-link active" data-toggle="pill" href="#all">All</a>
				</li>
					{
						CategoryAdd?.map((cate, i) => (
							<li className="nav-item" key={i}>
							<a className="nav-link" data-toggle="pill" href={`#${cate.Name}`}>
								{cate.Name}
							</a>
							</li>
						))
					}
				</ul>

				<div className="tab-content">
					<div id="all" className="container-fluid tab-pane active">
						<br />
						<Page todos={productcard} totalnumber={3} itemDisplay={15} />
					</div>
					{
						CategoryAdd?.map((cate, i) => (
							<div id={cate.Name} key={i} className="container-fluid tab-pane fade">
								<br />
								{categ(cate.Name)}
							</div>
						))
					}
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		CategoryAdd: state.CategoryAdd,
		Products: state.Products,
	};
};

export default connect(mapStateToProps)(Category);
