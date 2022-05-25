import Web3 from 'web3'
import React, { useEffect, useState, createContext } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';
export const ParkingContext = createContext();
const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const ParkingContract = new ethers.Contract(contractAddress, contractABI, signer);

  return ParkingContract;
}

export default function ParkingsProvider({ children }) {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [available, setavailable] = useState(0);
  const [occupied, setoccupied] = useState(0);
  const [driverlist, setdriverlist] = useState([]);
  const [userbalance, setuserbalance] = useState(0);
  let web3 = new Web3()


  const checkIfWalletIsConnect = async () => {
    try {
      web3 = new Web3(window.ethereum);
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        const balance = await web3.eth.getBalance(accounts[0]);
        const etherValue = Web3.utils.fromWei(balance, 'ether');
        console.log("balance is: ", etherValue);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      web3 = new Web3(window.ethereum);
      const accounts = await ethereum.request({ method: "eth_requestAccounts", });
      setCurrentAccount(accounts[0]);
      const balance = await web3.eth.getBalance(accounts[0]);
      const etherValue = Web3.utils.fromWei(balance, 'ether');
      setuserbalance(etherValue);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const ParkingFees = async () => {
    try {
      if (ethereum) {
        const ParkingContract = getEthereumContract();
        const amount = "0.1";
        const test = parseInt(amount);
        if (userbalance >= test) {
          const parsedAmount = ethers.utils.parseEther(amount);
          await ParkingContract.park(currentAccount, { value: parsedAmount._hex, });
        }
        else {
          alert("You have insufficient Balance")
        }
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log("error found")
    }
  }

  const Exit = async () => {
    try {
      if (ethereum) {
        const ParkingContract = getEthereumContract();
        await ParkingContract.exit(currentAccount);
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log("error found")
    }
  }

  const Withdraw = async () => {
    try {
      if (ethereum) {
        const ParkingContract = getEthereumContract();
        const addressTo = "0xd7b3De408C49DC693aA44193fB44240F1bFe1772";
        const amount = "0.1";
        const parsedAmount = ethers.utils.parseEther(amount);
        await ParkingContract.withdraw(addressTo, parsedAmount._hex);
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const FetchParking = async () => {
    try {
      if (ethereum) {
        const ParkingContract = getEthereumContract();
        const remain = await ParkingContract.remainingParking();
        const parked = await ParkingContract.parkedCar()
        let avail = remain["_hex"].toString()[remain["_hex"].toString().length - 1]
        let occup = parked["_hex"].toString()[parked["_hex"].toString().length - 1]
        console.log(avail + " : " + occup)
        await setavailable(avail);
        await setoccupied(occup)
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const FetchDriverList = async () => {
    try {
      if (ethereum) {
        const ParkingContract = getEthereumContract();
        const driverl = await ParkingContract.fetchParked();
        let list = [];
        for (let i = 0; i < driverl.length; i++) {
          if (driverl[i] !== "0x0000000000000000000000000000000000000000") {
            list.push(driverl[i])
          }
        }
        setdriverlist(list);
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const Logout = async () => {
    try {
      if (ethereum) {
        setCurrentAccount(null);
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };
  useEffect(() => {
    checkIfWalletIsConnect();
  }, [])

  return (
    <ParkingContext.Provider value={{ connectWallet, currentAccount, ParkingFees, Withdraw, Logout, available, occupied, FetchParking, Exit, FetchDriverList, driverlist }}>
      {children}
    </ParkingContext.Provider>
  )
}