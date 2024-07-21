import { Box, Heading, Image, VStack } from '@chakra-ui/react'
import React from 'react'
import bitc from "../assests/bitc.png"
import {motion} from 'framer-motion'
const Home = () => {
  return (  
        <Box height={"90vh"} w={"full"} >
          <motion.div style={{
            height:"89vh",
          }}
            animate={{
              translateY:"20px"
            }}
            transition={{
              duration:1.2,
              repeat:Infinity,
              repeatType:"reverse",
            }}
          >
            <Image w={"full"} h={"full"} objectFit={"contain"} src={bitc}/>
          </motion.div>

        </Box>


  )
}

export default Home