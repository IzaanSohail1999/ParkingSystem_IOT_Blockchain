// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract parkingSystem {
    
    address private owner;
    uint totalValue;
    uint totalParking = 3;
    uint parked = 0;
    address[] public userAddresses;

    constructor() payable{
        owner = msg.sender;
        totalValue = msg.value;  
    }
    
    function park(address driver) payable external{
        require(totalParking - parked > 0,"No empty space available");
        totalValue += msg.value;
        parked += 1;
        userAddresses.push(driver);
        }

    function exit(address driver) external{
        parked -= 1;
        uint index = 0;
        for(uint i = 0; i < userAddresses.length; i++){
            if(userAddresses[i] == driver){index = i;}
        }
        delete userAddresses[index];    
    }
    
    function withdraw(address payable receiverAddr, uint receiverAmnt) external {receiverAddr.transfer(receiverAmnt);}

    function remainingParking() external view returns(uint){return (totalParking - parked);}

    function parkedCar() external view returns(uint){return parked;}

    function fetchParked() external view returns(address[] memory){return userAddresses;}
}