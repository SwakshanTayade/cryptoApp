import { Box, Text, Stack, HStack } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
// import { CgDanger } from 'react-icons/cg'
// import { FaExclamationTriangle } from 'react-icons/fa'
// import { MdError } from 'react-icons/md'

const ErrorComponent = () => {
    return (
        <Stack position={"relative"} h={"50vh"}>
            <Box bgColor={"rgb(235, 58, 87)"} position={"absolute"} p={5} left={"40vmax"} bottom={"0"}>
                <HStack>
                    <AiOutlineExclamationCircle size={"50px"} />
                    <Text color={"white"} textAlign={"center"}>Error in Getting the API Request</Text>
                </HStack>
            </Box>
        </Stack>
    )
}

export default ErrorComponent