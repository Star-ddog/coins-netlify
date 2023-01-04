import { useState, useEffect } from 'react';
import axios from 'axios'
import { Routes,Route } from 'react-router-dom';
import Coins from './components/Coins';
import Navbar from './components/Navbar';
import Coin from './Routes/Coin';


function App  () {

  const [coins,setCoins] =useState([])
  const [ispending, setIspending] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=300&page=1&sparkline=false'
  
  useEffect(() => {
    axios.get(url).then((response) =>{
      setCoins(response.data)
      setIspending(false);
      console.log(response.data[0])
    }).catch((error) =>{
      console.log(error)
    })
  }, [])

  const searchData = (value) => {
    setSearchTerm(value)
    if (searchTerm !==''){
      const filteredData =coins.filter((item)=> {
        return Object.values(item).join('').toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
      })
      setFilteredResults(filteredData)
    }
    else{
      setFilteredResults(coins)
    }
  }

  return(
    <>
    <Navbar/>
       
    <Routes>
      <Route path='/' element={<Coins coins={coins} ispending={ispending} 
      searchTerm={searchTerm} filteredResults={filteredResults} searchData={searchData} />}/>

      <Route path='/coin' element={<Coin/>}>
        <Route path=':coinId' element={<Coin />} />
      </Route>
    </Routes>
      
    </>
  )
 
};

export default App;