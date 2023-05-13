
import { Box, Button, ChakraProvider, Input, VStack, Container, HStack, Menu, Icon, MenuButton, MenuList, MenuItem, IconButton, Text, Avatar, } from '@chakra-ui/react';
import { RepeatIcon, EditIcon, ArrowBackIcon, PhoneIcon, AttachmentIcon } from '@chakra-ui/icons';
import { IoEllipsisVertical, IoSend, IoPeopleOutline, IoVideocamOutline, IoDocumentTextOutline, IoCameraOutline } from "react-icons/io5";
import Message from './components/Message';
import React, { useEffect, useState } from "react"
import axios from 'axios';


function App() {
  const [isLoading, setLoading] = useState(true);
  const [Data, setData] = useState([])
  useEffect(() => {
    setTimeout(() => {
      async function fetchData() {
        try {
          const response = await axios.get("https://3.111.128.67/assignment/chat?page=0")
          setData(response.data)
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false)
        }
      }

      fetchData();
    }, 3000);
  }, [])
  const users = Data
  console.log(users)
  if (isLoading) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}>Loading the data {console.log("loading state")}</div>
    );
  }
  return (
    <ChakraProvider>
      <Box bg={"red.100"}>
        <Container h={"100vh"} bg={"#FFFAF4"}>
          <VStack h={"full"} paddingY={"4"} >
            <HStack colorScheme={"red"} w={"full"}><ArrowBackIcon /><HStack w={"full"}><Text as='b'>{users.name}</Text></HStack><EditIcon /></HStack>
            <HStack w={"full"}>
              <Avatar />
              <VStack w={"full"}><HStack w={"full"}><Text>From</Text><Text as='b' color='black' s>{users.from}</Text></HStack><HStack w={"full"}><Text>To</Text><Text as='b' color='black'>{users.to}</Text></HStack></VStack>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label='Options'
                  icon={<Icon as={IoEllipsisVertical} />}
                  variant='outline'
                />
                <MenuList>
                  <MenuItem icon={< IoPeopleOutline />} >
                    Members
                  </MenuItem>
                  <MenuItem icon={<PhoneIcon />}>
                    Share Number
                  </MenuItem>
                  <MenuItem icon={<RepeatIcon />}>
                    Report
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
            <VStack w={"full"} h={"full"} overflow={'auto'} bg={"#FFFAF4"} >
              {
                users.chats.map(chat => (
                  <Message key={chat.id} text={chat.message} uri={chat.sender.image} self={chat.sender.self} />))

              }

            </VStack>
            <form style={{ width: "100%" }}>
              <HStack>
                <Input placeholder='enter a message...' />
                <Menu maxWidth={"50%"}>
                  <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    icon={<Icon as={AttachmentIcon} />}
                    variant='outline'
                  />
                  <MenuList minWidth={"5rem"} display={"flex"} flexDirection={"row"} bg={"green"} borderRadius={"2xl"}>
                    <MenuItem w={"1"} bg={"green"} icon={< IoCameraOutline color='white' />} >
                    </MenuItem>
                    <MenuItem w={"1"} bg={"green"} icon={<IoVideocamOutline color='white' />}>

                    </MenuItem>
                    <MenuItem w={"1"} bg={"green"} icon={<IoDocumentTextOutline color='white' />}>
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Button type='submit'  ><Icon as={IoSend} /></Button>
              </HStack>
            </form>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider >
  );
}

export default App;
