import ProductList from "@/components/shared/product/product-list";
import { getLatestProduct } from "@/lib/actions/product.actions";

const Homepage = async () => {
	const latestProduct = await getLatestProduct();

	return (
		<>
			{/* <ProductList data={latestProduct} title="Newest Arrivals" /> */}
			<ProductList data={latestProduct} title="Newest Arrivals" />
		</>
	);
};

export default Homepage;
