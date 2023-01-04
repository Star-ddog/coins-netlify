import React from 'react';
import Coinitem from './Coinitem';
import { Link } from 'react-router-dom';
import './Coins.css';
import Coin from '../Routes/Coin';

const Coins = (props) => {

   
  return (
  <div className='container'>
     <div>

     <div className='search'>
        <input
          icon='search'
          placeholder='search...'
        onChange={(e) => props.searchData(e.target.value)}
        />
        </div>
        
         <div className='heading'>
             <p>#</p>
             <p className='coin-name'>Coin</p>
             <p>Price</p>
             <p>24h</p>
             <p className='hide-mobile'>volume</p>
             <p className='hide-mobile'>Mkt Cap</p>
         </div>

        {props.ispending && <div className='load'>loading...</div> }

        {props.searchTerm.length > 1?(
            props.filteredResults.map((coins) =>{
                return(
                    <Link to={`/coin/${coins.id}`} element={<Coin/>} key={coins.id} >
                    <Coinitem coins={coins} />
                </Link>
                )
            })
        ) : (
            props.coins.map(coins => {
                return(
                    <Link to={`/coin/${coins.id}`} element={<Coin/>} key={coins.id} >
                        <Coinitem coins={coins} />
                    </Link>
                )
            })
        )}
        
     </div>

  </div>
  );
};

export default Coins;
