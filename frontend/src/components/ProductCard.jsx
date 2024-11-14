import { DeleteIcon, EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
	
} from "@chakra-ui/react";
import { useProductStore } from "../store/product.js";
import { useCart } from "../store/cart.js";
import { useState } from "react";

const ProductCard = ({ product }) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);

	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const { deleteProduct, updateProduct } = useProductStore();
	const { addCart, updateCart } = useCart();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleAddCart = async (product) => {
		const { success, message } = await addCart(product);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});
		} else {
			toast({
				title: "",
				description: message,
				status: "success",
				isClosable: true,
			});
		}
	};

	const handleUpdateCart = async (product) => {
		//console.log("product id: ", product._id);
		const { success, message } = await updateCart(product._id, product);
		if (!success) {
			handleAddCart(product);
		} else {
			toast({
				title: "",
				description: message,
				status: "success",
				isClosable: true,
			});
		}
	};

	const handleUpdateProduct = async (pid, updatedProduct) => {
		// passes the pid and updatedProduct to the updateProduct action and stores the resulting boolean and string
		const { success, message } = await updateProduct(pid, updatedProduct);
		// closes the modal
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Box p={4} bg='white'>
				<Image src={product.image} alt={product.name} h={48} w='100%' height='200px' objectFit='contain' 
					border='solid 10px'
					borderColor='white'
					borderRadius='2px'
					transition='border .3s'
					_hover={{ border: 'solid 0px', borderColor: 'white', transition: 'border .3s' }}
				/>
			</Box>

			<Box p={4} >
				<Text fontWeight='bold' fontSize='sm' color='green' mb={1}>
					Produce
				</Text>
				<Heading as='h3' size='lg' mb={2}>
					{product.name}
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					${product.price}
				</Text>

				<HStack spacing={2}>
					<IconButton icon={<PlusSquareIcon />} onClick={() => handleUpdateCart(product)} colorScheme='blue' />
					<IconButton icon={<PlusSquareIcon />} onClick={onOpen} colorScheme='green' />
					<IconButton
						icon={<DeleteIcon />}
						onClick={() => handleDeleteProduct(product._id)}
						colorScheme='red'
					/>
				</HStack>
			</Box>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Update Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Product Name'
								name='name'
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							/>
							<Input
								placeholder='Price'
								name='price'
								type='number'
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
							/>
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedProduct.image}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateProduct(product._id, updatedProduct)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};
export default ProductCard;
