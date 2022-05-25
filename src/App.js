import './App.css';
import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import parking from "./media/parking.jpg"
import parking1 from "./media/R.png"
import { ParkingContext } from './Contexts/ParkingContext';

// import {Container , Grid, Row, Col} from 'bootstrap';

function App() {
  const { connectWallet, ParkingFees, Withdraw,currentAccount, Logout, available, occupied,FetchParking, Exit,FetchDriverList, driverlist } = useContext(ParkingContext);
  
  useEffect(() => {
    FetchParking();
    FetchDriverList();
}, [])

const FetchList = async () => {
  console.log(driverlist)
}
  
  return (
    <div className="App">
      <div className="container">
        <div className='row'>
          <div className='col mt-2'>
            <h1>Blockchain Based Car Parking System</h1>
          </div>
        </div>
        <div>
          {currentAccount && <h5>You are logged in with the following address</h5>}
          <h5>{currentAccount}</h5>
        </div>
        <div>
          {!currentAccount && <button type="button" class="btn btn-success mx-sm-5" onClick={() => connectWallet()}>Connect Wallet</button>}
          {currentAccount &&  <button type="button" class="btn btn-danger mx-sm-5" onClick={() => Logout()}>Log Out</button>}
          {currentAccount &&  <button type="button" class="btn btn-danger mx-sm-5" onClick={() => Withdraw()}>Withdraw</button>}
        </div>
        { currentAccount && <div> 
           
        <div className='row align-items-center'>
          <div className='col-5 '>
            <img style={{ width: "50vw", height: "25vw" }} src={parking1} alt="failed load" />
          </div>
          <div className='col-2' />
          <div className='col-5'>
            <div className='row'>
              {/* <button style={{ backgroundColor: "blue", color:  "white" }} onClick={() => FetchParking()}>Click to Refresh</button> */}
              <table class="table table-dark table-bordered table-hover">
                <thead>
                  <tr>
                    <th scope="col">Available</th>
                    <th scope="col">Occupied</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{available}</td>
                    <td>{occupied}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <button type="button" class="btn btn-success mx-sm-5" onClick={() => ParkingFees()}>Charge Parking</button>
            {/* <button type="button" class="btn btn-success mx-sm-5" onClick={() => FetchList()}>Fetch Parking Details</button> */}
            <button type="button" class="btn btn-danger mx-sm-5" onClick={() => Exit()}>Exit Parking</button>
          </div>
        </div>
        <div className='row mt-2'>
          <div className='col'>
            <div className='row'>
              <table class="table table-dark table-bordered table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {driverlist.map((value, index) => {
                    return <tr>
                    <td>{index}</td>
                    <td>{value}</td>
                  </tr>
                  })
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </div>}
      </div>
    </div>
  );
}

export default App;
