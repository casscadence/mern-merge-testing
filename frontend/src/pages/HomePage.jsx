import { Container, SimpleGrid, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product.js";
import ProductCard from "../components/ProductCard.jsx";
import ProductNavbar from "../components/ProductNavbar.jsx";

const HomePage = () => {
	const { fetchProducts, products } = useProductStore();
	const textColor = useColorModeValue("gray.800", "gray.200");

	// invokes fetchProducts() on startup and whenever there is a change to fetchProducts
	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);
	console.log("products", products);

	return (
		<Container maxW='container.xl' py={12}>
			<Container maxW='container.xl' py={12} margin="0">
				<VStack spacing={8} alignItems="flex-start">
					<Text
						fontSize={"30"}
						fontWeight={"bold"}
						bg={textColor}
						bgClip={"text"}
						textAlign={"center"}
					>
						Produce
					</Text>

					<SimpleGrid
						columns={{
							base: 1,
							md: 2,
							lg: 3,
						}}
						spacing={10}
						w={"full"}
					>
						{products.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
					</SimpleGrid>

					{products.length === 0 && (
						<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
							No products found 😢{" "}
							<Link to={"/create"}>
								<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
									Create a product
								</Text>
							</Link>
						</Text>
					)}
				</VStack>
			</Container>
		</Container>
	);
};
export default HomePage;
