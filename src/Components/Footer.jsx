import { Avatar, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import img6 from '../assests/img6.jpg'
const Footer = () => {
  return (
    <Stack minHeight={"25vh"} bgColor={"black"} direction={["column","row"]} justifyContent={"space-between"} pl={"4"} pr={"4"}>
        <VStack>
        <Heading>Crypto-Swak</Heading>
        <Text p={"2"} textAlign={"center"}>Greetings I am Swakshan, created this cryptoApp with ❤️</Text>
        </VStack>
        <VStack p={"2"} h={"20vh"}>
            <Avatar size={"2xl"} src={img6} objectFit={"contain"}/>
            <Text>swakshan tayade</Text>
        </VStack>
        
    </Stack>
  )
}

export default Footer