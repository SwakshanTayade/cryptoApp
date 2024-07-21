import React from 'react'
import { Card, VStack, HStack, Image, Heading, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
const CoinCard = (props) => {

    const { rank, name, image, current_price, currencySymbol, id } = props

    return (
        <Link to={`/coin/${id}`}>
            <Card cursor={"pointer"} mb={"20px"} w={["40vmax", "20vmax"]} position={"relative"} transition={"all 1s"}  >
                <VStack >
                    <HStack>
                        <Image css={{
                            "&:hover": {
                                transform: "scale(1.1)"
                            }
                        }} position={"relative"} top={"-20px"} src={image}
                            width={["80px", "100px"]}
                            height={["80px", "100px"]}
                            objectFit="cover"
                            borderRadius="full"
                            boxShadow={"1px 1px 20px lightblue"}
                        />
                        <Heading>{rank}</Heading>
                    </HStack>
                    <Heading fontSize={"medium"} textAlign={"center"}>{name}</Heading>
                    <HStack alignItems={"center"}>
                        <Text>{currencySymbol}</Text>
                        <Text>
                            {current_price ? current_price : "NA"}
                        </Text>
                    </HStack>
                </VStack>
            </Card>
        </Link>

    )
}

export default CoinCard