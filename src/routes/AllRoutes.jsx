import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Women from './Women';
import MenPage from './Men';
import {Box} from '@chakra-ui/react'
import HomePage from './HomePage';
import Kidspage from './Kidspage';
import Signup from './Signup';
import Login from './Login';
import SingleUserPage from './SingleUserPage';
import Cart from './Cart';
import Querypage from './Querypage';
const AllRoutes = ({setCheck,check}) => {
  return (
    <div>
        <Box marginTop={'90px'} >
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
            <Route path='/women' element={<Women check={check}/>} />
            <Route path='/men' element={<MenPage  check={check}/>} />
            <Route path="/kids" element={<Kidspage check={check}/>}></Route>

            
            <Route path='/cart' element={<Cart  check={check}/>}/>

            <Route path='/signup' element={<Signup />}/>
            <Route path='/login' element={<Login setCheck={setCheck} check={check}/>}/>

            <Route path='/men/:id' element={<SingleUserPage check={check}/>} />
            <Route path='/querypage/:value' element={<Querypage />}></Route>
            <Route path='/women/:id' element={<SingleUserPage check={check}/>} />
            <Route path='/kids/:id' element={<SingleUserPage check={check}/>} />
        </Routes>
        </Box>
      
    </div>
  )
}

export default AllRoutes
