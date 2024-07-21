import React from 'react'
import {Container, Stack, Card, VStack, HStack, Text, Heading, Image } from '@chakra-ui/react'
const ExchangeCard = (props) => {

    const { image, name, year_established, country, description, url,rank } = props

    return (
    
            <Card cursor={"pointer"} mb={"20px"} w={["40vmax","20vmax"]} position={"relative"} transition={"all 1s"}  >
                <VStack >
                    <HStack>
                    <Image css={{
                "&:hover":{
                    transform:"scale(1.1)"
                }
            }} position={"relative"} top={"-20px"} src={image}
                    width={["80px", "100px"]} // Adjust the width as needed
                    height={["80px", "100px"]} // Adjust the height as needed
                    objectFit="cover" // Ensure the image covers the dimensions
                    borderRadius="full" // Optionally, make the image circular
                    boxShadow={"1px 1px 20px lightblue"}
                    />
                    <Heading>{rank}</Heading>
                    </HStack>
                    <Heading textAlign={"center"}>{name}</Heading>
                    <HStack>
                        <Text>{year_established}</Text>
                        <Text>{country}</Text>
                    </HStack>
                    <Text fontSize={"small"} p={2} h={"15vh"} overflowY={"auto"}>
                    {description?description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat, quam laudantium modi facere soluta numquam voluptatem animi incidunt, dolorem nulla natus itaque doloribus expedita? Ab fuga illum minima, maxime quasi perferendis excepturi? Natus illum fugiat rem obcaecati id expedita harum tempore necessitatibus distinctio provident? Eveniet."}
                    </Text>
                    <a href={url} target='blank' rel="noopener noreferrer">{
                        url?"Link to Website":""
                        }</a>
                </VStack>
            </Card>
  )
}

export default ExchangeCard