import { 
	Box,
	Button,
	Container,
	Flex,
	HStack,
	IconButton,
	Image,
	Input,
	Text,
	useToast,
	useColorMode,
	useColorModeValue,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlusSquareIcon, DeleteIcon } from "@chakra-ui/icons";
import { Minus, Plus } from '@chakra-icons/typicons';
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useCart } from "../store/cart.js";

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { fetchCart, cart } = useCart();
	const { updateCart, removeCart } = useCart();

	const [productList, setProductList] = useState();
	const [amount, setAmount] = useState(0);
	const [total, setTotal] = useState(0.00);

	const toast = useToast();
	const btnRef = React.useRef();
	const textColor = useColorModeValue("gray.800", "gray.200");

	useEffect(() => {
		fetchCart();
	}, []);

	useEffect(() => {
		setTotal(cart?.map((c, i) => {return c.price * c.quantity}).reduce((p, c) => (p + c), 0));
	}, [cart]);

	useEffect(() => {
		setProductList(cart);
		setAmount(cart.length);
	}, [cart]);
	
	const subQuantity = (product) => {
		product.quantity > 1 ? productList?.map((p, i) => p._id == product._id ? handleUpdateCart({...p, quantity: p.quantity - 1}) : {} ) : {};
	}

	const addQuantity = (product) => {
		product.quantity < 99 ? productList?.map((p, i) => p._id == product._id ? handleUpdateCart({...p, quantity: p.quantity + 1}) : {} ) : {};
	}

	const handleUpdateCart = async (product) => {
		console.log("product: ", product);
		const { success, message } = await updateCart(product._id, product);
		if (!success) {
			console.log("could not update");
		} else {
			console.log("successfully updated");
		}
		fetchCart();
	};

	const handleRemoveCart = async (product) => {
		const { success, message } = await removeCart(product._id);
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
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
		fetchCart();
	};

	return (
		<Container maxW={"1300px"} px={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bg={"green"}
					bgClip={"text"}
				>
					<Link to={"/"}>Supermarket App 🛒</Link>
				</Text>

				<HStack spacing={2} alignItems={"center"}>
					<Link to={"/create"}>
						<Button>
							<PlusSquareIcon fontSize={20} />
						</Button>
					</Link>
					<Button ref={btnRef} colorScheme='green' onClick={onOpen}>
							🛒
						</Button>
						<Drawer
							isOpen={isOpen}
							placement='right'
							onClose={onClose}
							finalFocusRef={btnRef}
						>
							<DrawerOverlay />
							<DrawerContent>
							<DrawerCloseButton />
							<DrawerHeader>Cart ({amount})</DrawerHeader>

							<DrawerBody>
							{productList?.map((product, i) => (
								<Box p={2} bg='white' h='fit-content' display='flex' bgColor='transparent' borderBottom='solid gray 1px' transition='background-color .3s' _hover={{ bgColor: 'rgba(220,220,220,.1)', transition: 'background-color .3s' }}>
									<Image src={product.image} alt={product.name} h='fit-content' w='30%' objectFit='contain' 
										border='solid 10px'
										borderColor='white'
										borderRadius='2px'
										margin='auto'
									/>
									<Box p={2} h='fit-content' w='50%' >
										<Text
											fontSize={{ base: "22", sm: "18" }}
											fontWeight={"bold"}
											bg={"green"}
											bgClip={"text"}
											margin='auto 0'
											padding='0'
										>
											{product.name}
										</Text>
										<Box p={2} h='fit-content' display='flex' padding='var(--chakra-space-2) 0' >
											<Button h='auto' minW='auto' padding='4px' opacity={product.quantity > 1 ? 1 : .3} onClick={() => subQuantity(product)}>
												<Minus fontSize={12} />
											</Button>
											<Text
												fontSize={{ base: "22", sm: "15" }}
												fontWeight={"bold"}
												bg={textColor}
												bgClip={"text"}
												margin='auto 5px'
												w='20%'
												textAlign='center'
											>
												{product.quantity}
											</Text>
											<Button h='auto' minW='auto' padding='4px' opacity={product.quantity < 99 ? 1 : .3} onClick={() => addQuantity(product)}>
												<Plus fontSize={12} />
											</Button>
										</Box>
									</Box>
										<Text
											fontSize={{ base: "22", sm: "15" }}
											bg={textColor}
											bgClip={"text"}
											w='27%'
											margin='auto'
										>
											${(product.price * product.quantity).toFixed(2)}
										</Text>
										<Button h='fit-content' minW='fit-content' padding='5px' margin='auto 0 auto 10px' colorScheme='gray' onClick={() => handleRemoveCart(product)}>
											<DeleteIcon fontSize={15} />
										</Button>
								</Box>
							))}
							</DrawerBody>
							<Text
								fontSize={{ base: "22", sm: "22" }}
								fontWeight={"bold"}
								textAlign={"right"}
								bg={"green"}
								bgClip={"text"}
								padding={"25px"}
							>
								${total.toFixed(2)}
							</Text>
							<DrawerFooter>
								<Button variant='outline' mr={3}>
								Update
								</Button>
								<Link to={"/cart"}>
									<Button colorScheme='green' onClick={onClose}>Checkout</Button>
								</Link>
							</DrawerFooter>
							</DrawerContent>
						</Drawer>
					<Button onClick={toggleColorMode}>
						{colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
					</Button>
				</HStack>
			</Flex>
		</Container>
	);
};

export default Navbar;