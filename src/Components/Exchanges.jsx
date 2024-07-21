import { Card, Container, Stack, VStack, Image, HStack, Heading, Text, Button, Select, Avatar } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Global } from '@emotion/react'
import axios from 'axios'
import ExchangeCard from './ExchangeCard'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'

const Globalstyles = () => {


    return (
        <Global
            styles={`
            
            ::-webkit-scrollbar{
                width:5px;
            }
            ::-webkit-scrollbar-track{
                background:transparent;
            }    
            ::-webkit-scrollbar-thumb{
                background:lightblue;
                border-radius:10px;
            }
            ::-webkit-scrollbar-thumb:hover{
                background: #b3b3b3;
            }
        `}
        />
    )

}

const Exchanges = () => {


    const [exchanges, setExchanges] = useState([]);
    const [changePage, setChangePage] = useState(1);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {


        const fetchData = async () => {
            try {
                const { data } = await axios.get(`https://api.coingecko.com/api/v3/exchanges?page=${changePage}&per_page=20`)
                console.log(data);
                setExchanges(data)
                setLoader(false)
            } catch (error) {
                setError(true)
                setLoader(false);
            }
        }
        fetchData()

    }, [changePage])

    const decrement = (changePage) => {
        if (changePage <= 1) {
            setLoader(false)
        }
        else {
            setChangePage(changePage - 1)
            setLoader(true)
        }

    }

    const btns = new Array(45).fill(1)

    if (error) return <ErrorComponent />
    return (
        <>
            <Globalstyles />
            {
                loader ? <Loader /> : <Container p={10} overflowY={"auto"} color={'black'} maxW={"Container.xl"} bgColor={"whitesmoke"} height={"100vh"} position={"relative"}>
                    <Select value={changePage} onChange={(e) => setChangePage(e.target.value)} w={"80px"} backgroundColor={"blue.300"}>
                        {
                            btns.map((item, index) => (
                                <option value={index + 1}>{index + 1}</option>
                            ))
                        }
                    </Select>
                    <Stack flexWrap={"wrap"} justifyContent={"center"} direction={['column', 'row']} position={"relative"}>
                        {
                            exchanges.map((item, index) => (
                                <ExchangeCard key={item.id} rank={item.trust_score_rank} name={item.name} image={item.image} year_established={item.year_established} description={item.description} url={item.url} country={item.country} />
                            ))
                        }
                    </Stack>
                    <Stack direction={['row']} justifyContent={"center"} w={"100%"}>
                        <Button onClick={() => {
                            decrement(changePage)
                        }} colorScheme='twitter' alignSelf={"center"} >Prev</Button>
                        <Heading>{changePage}</Heading>
                        <Button onClick={() => {
                            setChangePage(changePage + 1)
                            setLoader(true)
                        }} colorScheme='twitter' alignSelf={"center"} >Next</Button>
                    </Stack>
                </Container>
            }
        </>
    )
}

export default Exchanges