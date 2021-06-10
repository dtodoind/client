import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Search.scss'

function Searchbar(){

    const [search, setsearch] = useState('')

    function inputbox(e) {
        setsearch(e.target.value)
    }

    return(
        <div className="searchbar">
            <input className='input-search' onChange={inputbox} placeholder='Search...' />
            {
                search !== ''
                ? <Link className='button-input' to={"/search/"+search}>Search</Link>
                : <button className='button-input'>Search</button>
            }
        </div>
    )
}
export default Searchbar; 

