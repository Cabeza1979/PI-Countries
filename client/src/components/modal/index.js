import React from'react';
import { Link } from 'react-router-dom';


const myModal=({
    text,
    isModalOpen,
    setIsModalOpen
})=>{
return (
   <>
   {isModalOpen &&
    <div>
        <h2>Activity deleted</h2>
        <Link to={'/allactivities'}>
        <button onClick={()=> setIsModalOpen(false)}> Acept </button>
        </Link>
    </div>
}
   </>
)
};

export default myModal;
