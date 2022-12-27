// SPDX-License-Identifier: GPL-3.0

pragma solidity >0.4.0 <0.9.0;

contract Auction {
    mapping(address => uint256) biddersData;
    uint256 highestBidAmount;
    address highestBidder;
    uint256 startTime = block.timestamp;
    uint256 endTime;
    address owner;
    bool auctionEnded = false;

    constructor() {
        owner = msg.sender;
    }

    //put new bid
    function putBid() public payable {
        uint256 CalculateAmount = msg.value;

        //require(auctionEnded==true,"auction is ended");
        //require(block.timestamp<=endTime,"Auction is ended");

        require(msg.value > 0, "BID CANNOT BE ZERO");

        //check highestbid;
        require(
            CalculateAmount > highestBidAmount,
            "highest bid is already present"
        );

        biddersData[msg.sender] = CalculateAmount;

        highestBidAmount = CalculateAmount;

        highestBidder = msg.sender;
    }

    //get contract balance
    function getBidderBid(address _address) public view returns (uint256) {
        return biddersData[_address];
    }

    function HighestBid() public view returns (uint256) {
        return highestBidAmount;
    }

    function HighestBidder() public view returns (address) {
        return highestBidder;
    }

    //put endtime
    function putEndTime(uint256 _endTime) public {
        endTime = _endTime;
    }

    //end auction
    function endAuction() public {
        if (msg.sender == owner) {
            auctionEnded = true;
        }
    }

    //withdrawbid
    function withdrawBid(address payable _address) public {
        if (biddersData[_address] > 0) {
            _address.transfer(biddersData[_address]);
        }
    }
}
