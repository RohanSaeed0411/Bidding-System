import "./App.css";
import React from "react";
import Web3 from "web3";
import Auction from "./static/Auction.json";
import Car from "./static/car.jpg";
var myContract;

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      bidAmount: 0,
      yourBid: 0,
      highestBid: 0,
      highestBidder: "",
    };
  }

  async componentDidMount() {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545")
    );

    var accounts = await web3.eth.getAccounts();
    var myAccount = accounts[2];

    myContract = await new web3.eth.Contract(
      Auction.abi,
      Auction.networks[5777].address
    );
    // console.log(myContract);
    this.setState({
      yourBid: await myContract.methods.getBidderBid(myAccount).call(),
    });
    this.setState({
      highestBid: await myContract.methods.HighestBid().call(),
    });

    this.setState({
      highestBidder: await myContract.methods.HighestBidder().call(),
    });
    console.log(myAccount);

    console.log(await myContract.methods.HighestBid().call());

    console.log(await myContract.methods.HighestBidder().call());
  }

  async putBitFuc(e) {
    e.preventDefault();

    const web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545")
    );
    var accounts = await web3.eth.getAccounts();
    var myAccount = accounts[2];

    if (typeof window.ethereum !== "undefined") {
      if (window.ethereum.selectedAddress) {
        console.log(window.ethereum.selectedAddress);
        console.log(Web3.utils.toWei(this.state.bidAmount, "ether"));

        console.log(
          await myContract.methods.putBid().send({
            from: myAccount,
            value: Web3.utils.toWei(this.state.bidAmount, "ether"),
          })
        );

        // console.log(await myContract.methods.HighestBid().send());

        // console.log(await myContract.methods.putBid().send({ from: window.ethereum.selectedAddress, value: Web3.utils.toWei(this.state.bidAmount, 'ether') }))

        this.setState({
          yourBid: await myContract.methods.getBidderBid(myAccount).call(),
        });
        this.setState({
          highestBid: await myContract.methods.HighestBid().call(),
        });
        this.setState({
          highestBidder: await myContract.methods.HighestBidder().call(),
        });
        console.log(await myContract.methods.HighestBid().call());
        console.log(await myContract.methods.HighestBidder().call());
        // console.log(await myContract.methods.getBidderBid(myAccount).call());
      } else {
        console.log(
          await window.ethereum.request({ method: "eth_requestAccounts" })
        );
      }
    } else {
      console.log("your wallet is not connected");
    }
  }

  changeBidAmount(e) {
    e.preventDefault();

    this.setState({ bidAmount: e.target.value });
  }

  render() {
    return (
      <div
        id="container"
        style={{
          margin: "0px auto",
          display: "flex",
          justifyContent: "center",

          flexFlow: "column",
          alignItems: "center",
        }}
      >
        <h1>Ethereum Auction DApp</h1>

        <img src={Car} id="car" alt="unable to upload" />
        <br />

        <br />

        <input
          type="number"
          placeholder="Eth"
          value={this.state.bidAmount}
          onChange={(e) => this.changeBidAmount(e)}
          style={{
            padding: "8px",
            border: "1px solid black",
            borderRadius: 5,
            color: "black",
          }}
        />

        <br />

        <button
          id="button"
          onClick={(e) => this.putBitFuc(e)}
          
        >
          Place Bid
        </button>

        <div>
          {/* <h2>Your Bid :</h2>
          <p>{this.state.highestBid} wei</p> */}
          <h2>Highest Bid :</h2>
          <p>{this.state.highestBid} wei</p>
          <h2>Highest Bidder :</h2>
          <p>{this.state.highestBidder}</p>
        </div>

        <br />
        <br />
      </div>
    );
  }
}

export default App;
