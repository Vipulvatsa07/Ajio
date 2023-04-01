import React, { useState } from "react";
import axios from "axios";
import { Box, Text, Grid, Image, Button, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { SidebarContext } from "../context/SidebarContextProvider";
import { useMediaQuery } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Cart = ({check}) => {
  const [newCart,setNewCart]=useState([])
  const [showAlert, setShowAlert] = useState(false);


  const getNewCartData= async()=>{
      let res=await axios.get(`https://mockserver-rm4.onrender.com/data`)
      let data = res.data.filter((elem) => elem.quantity !== 0);
      // console.log(res.data)
        setNewCart(data)
        console.log(newCart,"newcart")
  }

  const {
    getCartItems,
    cartData,
    setCartData,
    cartLength,
    setCartLength,
    minPrice,
    maxPrice,
    maxDiscount,
    minDiscount,
  } = React.useContext(SidebarContext);

  const navigate = useNavigate();

  const [total, setTotal] = React.useState(0);
  const [totalActual, setTotalActual] = React.useState(0);

  const handleShipping = async (cartData) => {
    // alert("Your order has been placed!");
    // setShowAlert(showAlert?false:true)
    if(cartLength)
    {
      console.log(cartData.length)
      setShowAlert(true);
      for (const ele of newCart) {
        let res = await axios.patch(
          `https://mockserver-rm4.onrender.com/data/${ele.id}`,
          {
            quantity: 0,
          }
        );
  
       
        
      }
  
      setTimeout(() => {
        navigate("/");
      
      }, 4000);
      setTimeout(()=>{
        getCartItems()
      })
  
    }
    
 
    
   
  }

  const handleDelete = async (id) => {
    let res = await axios.patch(`https://mockserver-rm4.onrender.com/data/${id}`, {
      quantity: 0,
    });
    getCartItems()
    setCartLength((prev) => prev - 1);
    getNewCartData()
  };

  const handleQuantity = async (id, quant, value) => {
    cartData.map((elem) => (elem.id === id ? (quant = quant + value) : quant));

    let res = await axios.patch(`https://mockserver-rm4.onrender.com/data/${id}`, {
      quantity: quant,
    });
    getCartItems()

    calculateTotal();
    getNewCartData()
  };

  const calculateTotal = () => {
    console.log(cartData);
    setTotal(
      cartData.reduce(
        (accumulate, elem) => accumulate + elem.price * elem.quantity,
        0
      )
    );
    setTotalActual(
      cartData.reduce(
        (accumulate, elem) => accumulate + elem.original_price * elem.quantity,
        0
      )
    );
  };

  React.useEffect(() => {
    getCartItems();
    calculateTotal();
    getNewCartData()
  }, [cartLength,total,cartData]);

  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

  return (
    <Box>
    {showAlert && (
      <Alert
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Order Placed!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Thanks You <br />
          Your Order will be delivered soon
        </AlertDescription>
      </Alert>
    )}
    <Box
      display={isLargerThan900 ? "flex" : ""}
      width={{ base: "100%", md: "90%", "2xl": "70%" }}
      margin={"auto"}
      justifyContent="space-between"
      marginBottom={"5"}
    >
      <Box width={{ base: "100%", lg: "60%" }}>
        <Text as="b" fontSize={"2xl"}>
          My Bag ({cartLength} items){" "}
        </Text>
        <Box>
          {check?cartData.map((elem) => {
            return (
              <Box
                key={elem.id}
                fontSize={"xs"}
                display={"flex"}
                justifyContent="space-between"
                border={"1px solid gray"}
                marginTop="5"
              >
                
                <Image src={elem.image} height={"200px"} alt={elem.name} />
                <Box width={"300px"}>
                  <Box>
                    <Text> {elem.brand}</Text>

                    <Text> {elem.name}</Text>
                  </Box>
                  <Box display="flex" justifyContent={"center"} margin="1">
                    <Button
                      size="sm"
                      onClick={() => handleQuantity(elem.id, elem.quantity, -1)}
                      isDisabled={elem.quantity === 1}
                    >
                      -
                    </Button>
                    <Text
                      as="b"
                      marginLeft={"1rem"}
                      marginRight="1rem"
                      alignSelf={"center"}
                    >
                      {elem.quantity}
                    </Text>
                    <Button
                      size="sm"
                      onClick={() => handleQuantity(elem.id, elem.quantity, 1)}
                    >
                      +
                    </Button>
                  </Box>
                  <Box>
                    <Text>
                      Savings : Rs.{" "}
                      {(elem.original_price - elem.price) * elem.quantity}{" "}
                    </Text>
                    <Box>
                      <Box display="flex" justifyContent={"center"}>
                        <Text textDecoration={"line-through"} color="gray.500">
                          Rs. {elem.original_price}.00
                        </Text>
                        <Text color="gray.500">({elem.discount}%)</Text>
                      </Box>
                      <Box
                        bg="blue.400"
                        width={"fit-content"}
                        paddingRight="10px"
                        display="flex"
                        margin={"auto"}
                      >
                        <Box
                          height={"100%"}
                          width="10px"
                          bg={"blue.900"}
                          marginRight="20px"
                        >
                          {"."}{" "}
                        </Box>
                        <Text as="b">Rs. {elem.price}.00</Text>
                      </Box>
                    </Box>
                    <Button
                      size="sm"
                      marginTop={"1"}
                      onClick={() => handleDelete(elem.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              </Box>
            );
          }):< h1 style={{fontSize:"30px",marginTop:"70px",fontWeight:"bolder"}}>PLEASE LOGIN TO PLACE ORDER</h1>}
          
        </Box>
      </Box>
      {check?<Box width={isLargerThan900 ? "25%" : "100%"} >
        <Box
          bg="#fafafa"
          height={"fit-content"}
          margin="auto"
        >
          <Box
            marginLeft={"3"}
            marginRight="3"
            marginBottom={"10px"}
            display="flex"
            alignItems={"left"}
          >
            <Text as="b">Order Details</Text>
          </Box>
          <Box>
            <Box>
              <Box
                marginLeft={"3"}
                marginRight="3"
                display={"flex"}
                justifyContent="space-between"
              >
                <Text>Bag Total</Text>
                <Text>₹{totalActual}</Text>
              </Box>
              <Box
                marginLeft={"3"}
                marginRight="3"
                display={"flex"}
                justifyContent="space-between"
              >
                <Text>Bag discount</Text>
                <Text color={"#B09975"}>-₹{totalActual - total}</Text>
              </Box>
              <Box
                marginLeft={"3"}
                marginRight="3"
                display={"flex"}
                justifyContent="space-between"
              >
                <Text>Delivery Fee</Text>
                <Text textDecoration={"line-through"}>₹99.00</Text>
              </Box>
              <Box
                marginLeft={"3"}
                marginRight="3"
                display={"flex"}
                justifyContent="space-between"
              >
                <Text as="b">Order Total</Text>
                <Text as="b">₹{total}.00</Text>
              </Box>
              <Button
                width={"100%"}
                borderRadius="0"
                marginTop={"5"}
                bg="#D5A249"
                color="white"
                onClick={handleShipping}
              >
                PROCEED TO SHIPPING
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>:""}
    </Box>
    </Box>
  );
};

export default Cart;
