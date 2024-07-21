import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <HStack bgColor={"blue.400"} p={4}>
        <Button variant={"outline"}>
            <Link to={"/"}>Home</Link>
        </Button>
        <Button variant={"outline"}>
        <Link to={"/coins"}>Coins</Link>
        </Button>
        <Button variant={"outline"}>
        <Link to={"/exchanges"}>Exchanges</Link>
        </Button>

    </HStack>
  )
}

export default Header