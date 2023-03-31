import AllRoutes from './routes/AllRoutes';
import './App.css';
import Navbar from './routes/Navbar';
import { useMediaQuery } from '@chakra-ui/react'
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';
import { useState } from 'react';
function App() {
  const [check,setCheck]=useState(false)
console.log(check)

  const [isLargerThan800] = useMediaQuery('(min-width: 800px)')
  return (
    <div className="App">
     {isLargerThan800?<Navbar setCheck={setCheck} />:<MobileNav />}
      <AllRoutes setCheck={setCheck} check={check} />
      {/* <Footer  /> */}
    </div>
  );
}

export default App;