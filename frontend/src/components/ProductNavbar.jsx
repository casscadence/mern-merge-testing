import { 
    Container,
    useColorMode,
    ListItem,
    UnorderedList,
} from "@chakra-ui/react";

const ProductNavbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Container px={4}>
            <UnorderedList>
            <ListItem>Fruit</ListItem>
            <ListItem>Vegetables</ListItem>
            <ListItem>Grains</ListItem>
            <ListItem>Dairy</ListItem>
            </UnorderedList>
		</Container>
	);
};
export default ProductNavbar;
