import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ErrorComponent from './ErrorComponent';
import Loader from './Loader';
import { BiArrowFromBottom } from "react-icons/bi"
import { Badge, Box, Button, Container, HStack, Heading, Image, Progress, Select, SelectField, Stack, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react';
import Chart from './Chart';
const CoinDetails = (params) => {

  const coin = useParams(params.id)
  const [coinDetail, setCoinDetail] = useState({})
  const [error, setError] = useState(false)
  const [loader, setLoader] = useState(true)
  const [currency, setCurrency] = useState('inr')
  const [days, setDays] = useState("24h")
  const [chartArray, setChartArray] = useState([])


  useEffect(() => {

    const fetchCoin = async () => {

      try {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}?tickers=true&market_data=true`)

        const {data:chartData} = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=inr&days=${days}`)

        // console.log(chartData.prices);
        // console.log(data);
        setChartArray(chartData.prices)
        setCoinDetail(data);
        setLoader(false)
      } catch (err) {
        setError(true)
        setLoader(false)
      }
    }

    fetchCoin()

  }, [currency,coin.id,days])

  if (error) return <ErrorComponent />
  // "₹" : value === "usd" ? "$" : "€"
  const currencySymbol = currency === "inr" ? "₹" : currency === "usd" ? "$" : currency === "eur" ? "€" : currency

  return (
    <>

      {
        loader ? <Loader /> : <Stack direction={['column', 'row']} h={"auto"}>
          <VStack w={["100%","30%"]}  alignItems={"flex-start"} padding={"4"}>
            <HStack w={"full"} justifyContent={"space-around"}>
              {/* coinDetail.image.large */}
              <Image src={coinDetail.image.small} />
              {/* coinDetail.name */}
              <Heading>{coinDetail.name}</Heading>
              <Select value={currency} onChange={(e) => setCurrency(e.target.value)} width={"max-content"}>
                <option value="inr">INR</option>
                <option value="usd">USD</option>
                <option value="eur">Eur</option>
                <option value="aed">AED</option>
                <option value="ars">ARS</option>
                <option value="aud">AUD</option>
                <option value="bch">BCH</option>
                <option value="bdt">BDT</option>
                <option value="bhd">BHD</option>
                <option value="bits">BITS</option>
                <option value="bmd">BMD</option>
                <option value="bnb">BNB</option>
                <option value="brl">BRL</option>
                <option value="btc">BTC</option>
                <option value="cad">CAD</option>
                <option value="chf">CHF</option>
                <option value="clp">CLP</option>
                <option value="cny">CNY</option>
                <option value="czk">CZK</option>
                <option value="dkk">DKK</option>
                <option value="dot">DOT</option>
                <option value="eos">EOS</option>
                <option value="eth">ETH</option>
                <option value="gbp">GBP</option>
                <option value="gel">GEL</option>
                <option value="hkd">HKD</option>
                <option value="huf">HUF</option>
                <option value="idr">IDR</option>
                <option value="ils">ILS</option>
                <option value="jpy">JPY</option>
                <option value="krw">KRW</option>
                <option value="kwd">KWD</option>
                <option value="link">LINK</option>
                <option value="lkr">LKR</option>
                <option value="ltc">LTC</option>
                <option value="mmk">MMK</option>
                <option value="mxn">MXN</option>
                <option value="myr">MYR</option>
                <option value="ngn">NGN</option>
                <option value="nok">NOK</option>
                <option value="nzd">NZD</option>
                <option value="php">PHP</option>
                <option value="pkr">PKR</option>
                <option value="pln">PLN</option>
                <option value="rub">RUB</option>
                <option value="sar">SAR</option>
                <option value="sats">SATS</option>
                <option value="sek">SEK</option>
                <option value="sgd">SGD</option>
                <option value="thb">THB</option>
                <option value="try">TRY</option>
                <option value="twd">TWD</option>
                <option value="uah">UAH</option>
                <option value="vef">VEF</option>
                <option value="vnd">VND</option>
                <option value="xag">XAG</option>
                <option value="xau">XAU</option>
                <option value="xdr">XDR</option>
                <option value="xlm">XLM</option>
                <option value="xrp">XRP</option>
                <option value="yfi">YFI</option>
                <option value="zar">ZAR</option>

              </Select>
            </HStack>
            <HStack>
              {/* coinDetail.symbol, coinDetail.last_updated  */}
              <Badge>{coinDetail.symbol} | Last Updated:</Badge>
              <Text>{Date(coinDetail.last_updated).split("G")[0]}</Text>
            </HStack>
            <Box w={"100%"}>
              <Stat>
                {/* coinDetail.market_data.current_price[currency]  */}
                <StatNumber textTransform={"uppercase"}>{coinDetail.market_data.current_price[currency]} ({currency})</StatNumber>
                {/* coinDetail.market_data.market_cap_change_percentage_24h>0?type="increase":type="decrease"  */}
                <StatHelpText fontWeight={"900"} color={coinDetail.market_data.market_cap_change_percentage_24h < 0 ? "red" : "green"}>
                  <StatArrow type={coinDetail.market_data.market_cap_change_percentage_24h > 0 ? "increase" : "decrease"} />
                  {coinDetail.market_data.market_cap_change_percentage_24h}%
                </StatHelpText>
              </Stat>
            </Box>
            <Box width={"100%"} >
              <HStack justifyContent={"space-between"}>
                <Text textTransform={"uppercase"} >{coinDetail.market_data.low_24h[currency]}({currencySymbol})</Text>
                <Heading>24Hr</Heading>
                <Text textTransform={"uppercase"}>{coinDetail.market_data.high_24h[currency]}({currencySymbol})</Text>
              </HStack>
              {/* ((coinDetail.market_data.high_24h[currency] - coinDetail.market_data.low_24h[currency]) / coinDetail.market_data.low_24h[currency]) * 100 */}
              {/* ((coinDetail.market_data.current_price[currency] - coinDetail.market_data.low_24h[currency])/(coinDetail.market_data.high_24h[currency] - coinDetail.market_data.low_24h[currency]))*100  */}
              <Progress value={((coinDetail.market_data.current_price[currency] - coinDetail.market_data.low_24h[currency]) / (coinDetail.market_data.high_24h[currency] - coinDetail.market_data.low_24h[currency])) * 100} colorScheme='green' size={"sm"} borderRadius={"10px"} width={"100%"} />
            </Box>

            <VStack w={"100%"} mt={"5"}>
              <Info text={"Circulating Supply"} val={`${coinDetail.market_data.circulating_supply}`} />
              <Info text={"Max Supply"} val={`${coinDetail.market_data.max_supply}`} />
              <Info text={"Market Cap"} val={`(${currencySymbol}) ${coinDetail.market_data.market_cap[currency]}`} />
              <HStack position={"relative"} w={"full"} justifyContent={"space-between"}>
                <Text fontWeight={"700"}>Votes Up</Text>
                <Stat position={"absolute"} right={"0"}>
                  <StatHelpText>
                    <StatArrow type='increase' />
                    {coinDetail.sentiment_votes_up_percentage}%
                  </StatHelpText>
                </Stat>
              </HStack>
              <HStack position={"relative"} w={"full"} justifyContent={"space-between"}>
                <Text fontWeight={"700"}>Votes Down</Text>
                <Stat position={"absolute"} right={"0"}>
                  <StatHelpText>
                    <StatArrow type='decrease' />
                    {coinDetail.sentiment_votes_down_percentage}%
                  </StatHelpText>
                </Stat>
              </HStack>
            </VStack>

          </VStack>

          <VStack borderLeft={["","2px solid white"]} w={"full"} h={["max-content","89vh"]} position={"relative"} >
            <Box h={"full"} w={"full"}>
            <Chart currency = {currencySymbol} days={days} arr={chartArray}/>
            </Box>
            {/* const timeFrames = ["1m","5m","15m","24h","7d","1y"] */}
            <Select value={days} onChange={(e)=>setDays(e.target.value)} position={"absolute"} w={"80px"} left={"0"}>
              <option value="1m">1m</option>
              <option value="5m">5m</option>
              <option value="15m">15m</option>
              <option value="24h">24h</option>
              <option value="7d">7d</option>
              <option value="365d">1y</option>
            </Select>
          </VStack>

        </Stack>
      }

    </>

  )
}

const Info = (props) => {
  const { text, val } = props;
  return (
    <HStack w={"full"} justifyContent={"space-between"}>
      <Text fontWeight={"700"}>{text}</Text>
      <Text textTransform={"uppercase"}>{val}</Text>
    </HStack>
  )
}

export default CoinDetails