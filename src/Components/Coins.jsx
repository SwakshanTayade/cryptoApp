import { Container, Stack, VStack, Heading, Button, Radio, RadioGroup, Select } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Global } from '@emotion/react'
import axios from 'axios'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'
import CoinCard from './CoinCard'

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

const Coins = () => {


    const [coins, setCoins] = useState([]);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(false);
    const [value, setValue] = useState('inr');
    const [changePage, setChangePage] = useState(1);

    const decrement = (changePage) => {
        if (changePage <= 1) {
            setLoader(false)
        }
        else {
            setChangePage(changePage - 1)
            setLoader(true)
        }

    }

    const currencySymbol = value === "inr" ? "₹" : value === "usd" ? "$" : "€"
    useEffect(() => {


        const fetchData = async () => {
            try {
                const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${value}&page=${changePage}&per_page=20`)
                console.log(data);
                setCoins(data)
                setLoader(false)
            } catch (error) {
                setError(true)
                setLoader(false);
            }
        }
        fetchData()

    }, [value, currencySymbol, changePage])

    const bts = new Array(700).fill(1);

    if (error) return <ErrorComponent />
    return (
        <>
            <Globalstyles />
            <RadioGroup alignItems={"center"} justifyContent={"center"} display={"flex"} gap={"20px"} value={value} onChange={setValue}>
                <Radio value='inr'>INR(₹)</Radio>
                <Radio value='usd'>USD($)</Radio>
                <Radio value='eur'>EURO(€)</Radio>
            </RadioGroup>
            {
                loader ? <Loader /> : <Container p={10} overflowY={"auto"} color={'black'} maxW={"Container.xl"} bgColor={"whitesmoke"} height={"100vh"} position={"relative"}>

                    <Select value={changePage} onChange={(e) => setChangePage(e.target.value)} w={"80px"} backgroundColor={"blue.300"}>
                        {
                            bts.map((item, index) => (
                                <option value={index + 1}>{index + 1}</option>
                            ))
                        }
                    </Select>
                    <Stack flexWrap={"wrap"} justifyContent={"center"} direction={['column', 'row']} position={"relative"}>

                        {
                            coins.map((item, index) => (
                                <CoinCard key={item.id} id={item.id} rank={item.market_cap_rank} name={item.name} image={item.image} current_price={item.current_price} symbol={item.symbol} currencySymbol={currencySymbol} />
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

export default Coins