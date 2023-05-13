import React from 'react'
import { HStack, Avatar, Text, } from '@chakra-ui/react';
const Message = ({ text, uri, self }) => {
  return (
    <HStack w={"80%"} alignSelf={self === true ? "flex-end" : "flex-start"} marginLeft={'2'} marginRight={'2'}>
      {self === false && <Avatar src={uri} alignSelf={"flex-start"} />}
      <HStack shadow={"base"} borderRadius={"3xl"} borderTopLeftRadius={self === false ? "0" : "3xl"} borderBottomRightRadius={self === true ? "0" : "3xl"} bg={self === true ? "blue.500" : 'white'} color={self === true ? "white" : "black"} padding={"4"}><Text>{text}</Text></HStack>

    </HStack>
  )
}

export default Message;
