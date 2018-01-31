import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    response:'',
    wallets: [
      {
        number: '1234',
        key: '24532454',
        amount: 112234534
      },
      {
        number:'5252352',
        key: '32525234',
        amount: 4352
      }
    ],
    selectedWalletIndex: undefined,  
    balance: (this.selectedWalletIndex===undefined?'No Wallet selcted yet':this.wallets[this.state.selectedWalletIndex].amount),
    selectedWalletNumber:(this.selectedWalletIndex===undefined?'No Wallet selcted yet':this.wallets[this.state.selectedWalletIndex].number)
  };  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  };
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };
  handleRandomWallet = () =>{
    
    const walletIndex = Math.floor(Math.random()* this.state.wallets.length);
    this.setState(() => ({
      selectedWalletIndex: walletIndex,
      selectedWalletNumber: this.state.wallets[walletIndex].number
    })); 
    };
handleGetBalance = () =>{    
    this.setState(() =>(
      {
        balance: this.state.wallets[this.state.selectedWalletIndex].amount
      }
    ));
  };
  handleDeposit = () =>{
    const amountToAdd = parseInt(document.getElementById('depositSum').value);
    if(amountToAdd===0){
      alert('Please enter a valid number');
    }else if(this.state.selectedWalletIndex===undefined)
    {
      alert('Please fetch a wallet first');}
      else{
    const currnetBalance= this.state.wallets[this.state.selectedWalletIndex];
    const newSum = amountToAdd+currnetBalance;
    this.updateAccount(newSum);
    }
  };
  handleWithdraw = () =>{
    const amountToRemove = parseInt(document.getElementById('withdrawSum').value);
    if(amountToRemove===0){
      alert('Please enter a valid number');
    }else if(this.state.selectedWalletIndex===undefined)
    {
      alert('Please fetch a wallet first');}
      else{
    const currnetBalance= this.state.wallets[this.selectedWalletIndex];
    const newSum = currnetBalance-amountToRemove;
    this.updateAccount(newSum);
    }
  };
  
  updateAccount(newBalance) {
    const wallet = {
      number: this.state.wallets[this.state.selectedWalletIndex].number,
      key: this.state.wallets[this.state.selectedWalletIndex].key,
      amount: newBalance
    };    
    this.setState((prevState) =>{
      prevState.wallets.splice(this.selectedWalletIndex,1,wallet);
      return ({
        wallets: prevState.wallets,        
      });
    }
    );
    console.log(this.state.wallets);
    document.getElementById('depositSum').value = 0;
    document.getElementById('withdrawSum').value = 0;
    
  }; 
  render() {
    return (
      <div className="App">
        <h1>This is my Ethereum Wallet</h1>
        <p className="App-intro">{this.state.response}</p>
        <div>           
            This is the current wallet: { this.state.selectedWalletNumber } 
            <button onClick={this.handleRandomWallet}>Get Random Wallet</button> <br/>
            This is the balance:{this.state.balance}
            <button onClick={this.handleGetBalance}>Show current balance </button><br/>
            <input type="number" id='depositSum' min='0' placeholder="Amount to deposit"/>
            <button onClick={this.handleDeposit}>Deposit </button><br/>
            <input type="number" id='withdrawSum' min='0' placeholder="Amount to withdraw"/>
            <button onClick={this.handleWithdraw}>Withdraw</button><br/>
            
        </div>
  </div>  
 );
  }
}

export default App;
