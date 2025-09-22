import React, { useState, useEffect, useCallback } from 'react';

const BNBCapitalApp = () => {
  // State management
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [bnbPrice, setBnbPrice] = useState(600);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState(null);
  
  // Calculator state
  const [days, setDays] = useState(18);
  const [amount, setAmount] = useState(1);
  
  // Dashboard state
  const [userStats, setUserStats] = useState({
    withdrawable: 0,
    invested: 0,
    withdrawn: 0,
    referralReward: 0,
    referralLevels: [0, 0, 0, 0, 0]
  });
  
  // Contract stats state
  const [contractStats, setContractStats] = useState({
    totalInvested: 0,
    totalWithdrawn: 0,
    totalReferralPaid: 0,
    totalUsers: 0,
    contractBalance: 0
  });
  
  // Balance state
  const [balance, setBalance] = useState(0);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  // Translation helper
  const t = (key) => translations[currentLanguage]?.[key] || key;

  // Toast notification
  const showToast = (message, type = 'info', duration = 3000) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'info' }), duration);
  };

  // Update balance
  const updateBalance = async (accountAddress) => {
    if (!web3 || !accountAddress) return;
    
    try {
      const balance = await web3.eth.getBalance(accountAddress);
      const balanceInBNB = parseFloat(web3.utils.fromWei(balance, 'ether'));
      setBalance(balanceInBNB);
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  // Load user data
  const loadUserData = async (accountAddress) => {
    if (!contract || !accountAddress) return;
    
    try {
      const userInfo = await contract.methods.userInfo(accountAddress).call();
      
      setUserStats({
        withdrawable: parseFloat(web3.utils.fromWei(userInfo[0].toString(), 'ether')),
        invested: parseFloat(web3.utils.fromWei(userInfo[1].toString(), 'ether')),
        withdrawn: parseFloat(web3.utils.fromWei(userInfo[2].toString(), 'ether')),
        referralReward: parseFloat(web3.utils.fromWei(userInfo[3].toString(), 'ether')),
        referralLevels: userInfo[4] || [0, 0, 0, 0, 0]
      });
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  // Load contract data
  const loadContractData = async () => {
    if (!contract) return;
    
    try {
      const contractInfo = await contract.methods.contractInfo().call();
      
      setContractStats({
        totalInvested: parseFloat(web3.utils.fromWei(String(contractInfo[0]), 'ether')),
        totalWithdrawn: parseFloat(web3.utils.fromWei(String(contractInfo[1]), 'ether')),
        totalReferralPaid: parseFloat(web3.utils.fromWei(String(contractInfo[2]), 'ether')),
        totalUsers: String(contractInfo[3]),
        contractBalance: parseFloat(web3.utils.fromWei(String(contractInfo[4]), 'ether'))
      });
    } catch (error) {
      console.error('Error loading contract data:', error);
    }
  };

  // Investment function
  const invest = async () => {
    if (!account) {
      showToast('⚠️ Please connect your wallet first');
      return;
    }
    
    if (!amount || parseFloat(amount) < 0.01) {
      showToast('❌ Minimum investment is 0.01 BNB');
      return;
    }
    
    try {
      if (parseFloat(amount) > balance) {
        showToast(`❌ Insufficient balance. You have ${balance.toFixed(4)} BNB`);
        return;
      }
      
      const referrer = '0x2Bfc8a296ac4E12a2A0A18e5da5205874dE5BF2A'; // Default referrer
      
      const gasPrice = await web3.eth.getGasPrice();
      const increasedGasPrice = Math.floor(Number(gasPrice) * 1.5).toString();
      
      const tx = await contract.methods.deposit(days, referrer).send({
        from: account,
        value: web3.utils.toWei(amount.toString(), 'ether'),
        gas: 600000,
        gasPrice: increasedGasPrice
      });
      
      showToast('✅ Investment successful!', 'success', 5000);
      
      setSuccessData({
        amount: amount,
        days: days,
        txHash: tx.transactionHash
      });
      setShowSuccessModal(true);
      
      // Refresh data
      loadUserData(account);
      loadContractData();
      updateBalance(account);
      
    } catch (error) {
      console.error('Investment error:', error);
      if (error.code === 4001) {
        showToast('❌ Transaction rejected by user');
      } else {
        showToast('❌ Transaction failed');
      }
    }
  };

  // Withdraw function
  const withdraw = async () => {
    if (!account) {
      showToast('Please connect wallet first');
      return;
    }
    
    try {
      await contract.methods.withdraw().send({ from: account });
      showToast('Withdrawal successful!');
      loadUserData(account);
    } catch (error) {
      console.error('Withdrawal error:', error);
      showToast('Withdrawal failed');
    }
  };

  // Calculator calculations
  const calculateROI = () => {
    const totalROI = days === 30 ? 234 : (119 + ((days - 7) * 5));
    const dailyROI = (totalROI / days).toFixed(1);
    const earnings = (amount * totalROI / 100).toFixed(3);
    
    return { totalROI, dailyROI, earnings };
  };

  // Fetch BNB price
  const fetchBNBPrice = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd');
      const data = await response.json();
      
      if (data.binancecoin && data.binancecoin.usd) {
        setBnbPrice(parseFloat(data.binancecoin.usd));
      }
    } catch (error) {
      console.log('BNB price fetch error, using fallback');
      setBnbPrice(580);
    }
  };

  // Copy referral link
  const copyReferralLink = () => {
    const link = account ? `https://bnbcapital.org?ref=${account}` : 'Connect wallet to get referral link';
    navigator.clipboard.writeText(link);
    showToast('Referral link copied!');
  };

  // Initialize app
  useEffect(() => {
    initWeb3();
    fetchBNBPrice();
    
    const interval = setInterval(() => {
      loadContractData();
      if (account) {
        loadUserData(account);
        updateBalance(account);
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, [initWeb3, account]);

  // Auto-connect wallet
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          updateBalance(accounts[0]);
          loadUserData(accounts[0]);
        }
      });
    }
  }, [web3, contract]);

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          setAccount(null);
          setBalance(0);
          setUserStats({
            withdrawable: 0,
            invested: 0,
            withdrawn: 0,
            referralReward: 0,
            referralLevels: [0, 0, 0, 0, 0]
          });
        } else {
          setAccount(accounts[0]);
          updateBalance(accounts[0]);
          loadUserData(accounts[0]);
        }
      };
      
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
      
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, [web3, contract]);

  const { totalROI, dailyROI, earnings } = calculateROI();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-black to-green-900">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 ${
          toast.type === 'success' ? 'bg-gradient-to-r from-green-500 to-green-600' :
          toast.type === 'error' ? 'bg-gradient-to-r from-red-500 to-red-600' :
          'bg-gradient-to-r from-gray-700 to-gray-800'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Header */}
      <header className="bg-black/80 backdrop-blur-md border-b-2 border-green-500 sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="text-white hover:text-green-400 transition-colors"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center font-bold text-black">
              B
            </div>
            <span className="text-white font-bold text-lg">BNBCapital</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsLanguageModalOpen(true)}
              className="text-2xl hover:scale-110 transition-transform"
            >
              🇬🇧
            </button>
            <button 
              onClick={account ? () => setAccount(null) : connectWallet}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                account 
                  ? 'bg-green-500/20 border border-green-500 text-green-400' 
                  : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
              }`}
            >
              <i className={`fas ${account ? 'fa-check-circle' : 'fa-wallet'}`}></i>
              {account ? `${account.substr(0, 6)}...${account.substr(-4)}` : t('connectWallet')}
            </button>
          </div>
        </div>
      </header>

      {/* Side Menu */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <div className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-black to-green-950 z-50 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center font-bold text-black">
                  B
                </div>
                <span className="text-white font-bold text-xl">BNBCapital</span>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-red-400 transition-colors"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            {/* Menu items */}
            <div className="space-y-2">
              {[
                { icon: 'fa-home', text: 'Home', href: '#' },
                { icon: 'fa-info-circle', text: 'How It Works', href: '#howitworks' },
                { icon: 'fa-chart-pie', text: 'Investment Plans', href: '#plans' },
                { icon: 'fa-calculator', text: 'Calculator', href: '#calculator' },
                { icon: 'fa-chart-line', text: 'Dashboard', href: '#dashboard' },
                { icon: 'fa-users', text: 'Referral Program', href: '#referral' },
                { icon: 'fa-star', text: 'Features', href: '#features' },
                { icon: 'fa-question-circle', text: 'FAQ', href: '#faq' }
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-green-500/20 transition-colors"
                >
                  <i className={`fas ${item.icon} w-5`}></i>
                  <span>{item.text}</span>
                </a>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="pb-20">
        {/* Hero Section */}
        <section className="relative px-4 py-12 text-center overflow-hidden">
          <div className="absolute inset-0">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-green-400 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          
          <div className="relative z-10">
            <div className="bg-green-500/20 border border-green-500 rounded-full px-4 py-2 inline-flex items-center gap-2 mb-6">
              <i className="fas fa-shield-alt text-green-400"></i>
              <span className="text-green-400 font-medium">100% Decentralized</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Stable & Profitable<br />
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Yield Farming
              </span><br />
              DApp on BSC
            </h1>
            
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Fully decentralized, immutable smart contract. No owner, no admin control. 
              Earn 7.8% to 17% daily ROI with 5 levels of referral rewards.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { icon: 'fa-check-circle', text: 'Verified Contract' },
                { icon: 'fa-lock', text: 'No Admin Keys' },
                { icon: 'fa-infinity', text: 'Immutable' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-lg">
                  <i className={`fas ${item.icon} text-green-400`}></i>
                  <span className="text-white text-sm">{item.text}</span>
                </div>
              ))}
            </div>
            
            {/* Contract Address */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-8 max-w-lg mx-auto">
              <div className="text-gray-400 text-xs mb-2 uppercase tracking-wide">
                <i className="fas fa-file-contract"></i> Smart Contract V7 (LATEST)
              </div>
              <div className="font-mono text-xs text-green-400 break-all mb-3">
                {CONTRACT_ADDRESS}
              </div>
              <a
                href={`https://bscscan.com/address/${CONTRACT_ADDRESS}#code`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-xs font-medium hover:from-green-600 hover:to-green-700 transition-all"
              >
                <i className="fas fa-external-link-alt"></i>
                View on BSCScan
              </a>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">7-30</div>
                <div className="text-gray-400 text-sm">Days Plans</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">234%</div>
                <div className="text-gray-400 text-sm">Max ROI</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">11.5%</div>
                <div className="text-gray-400 text-sm">Referral</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#calculator"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2"
              >
                <i className="fas fa-rocket"></i>
                Start Earning
              </a>
              <a
                href="#howitworks"
                className="border border-green-500 text-green-400 px-8 py-4 rounded-lg font-medium hover:bg-green-500/10 transition-all flex items-center justify-center gap-2"
              >
                <i className="fas fa-play-circle"></i>
                How It Works
              </a>
            </div>
          </div>
        </section>

        {/* TVL Card */}
        <div className="px-4 mb-6">
          <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6 text-center">
            <div className="text-gray-400 text-sm mb-2">Total Value Locked (TVL)</div>
            <div className="text-3xl font-bold text-green-400 mb-1">
              {contractStats.contractBalance.toFixed(3)} BNB
            </div>
            <div className="text-gray-400 text-sm">
              ≈ ${(contractStats.contractBalance * bnbPrice).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} USD
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="px-4 mb-8">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Total Users', value: contractStats.totalUsers },
              { label: 'Total Invested', value: contractStats.totalInvested.toFixed(3) },
              { label: 'Total Withdrawn', value: contractStats.totalWithdrawn.toFixed(3) },
              { label: 'Referral Rewards', value: contractStats.totalReferralPaid.toFixed(3) }
            ].map((stat, index) => (
              <div key={index} className="bg-black/50 border border-gray-700 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Calculator Section */}
        <section id="calculator" className="px-4 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">{t('calculateProfit')}</h2>
          <div className="bg-gradient-to-br from-black/80 to-green-950/50 border border-green-500/30 rounded-xl p-6">
            {/* Days Slider */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-3">Deposit Period ({t('days')}):</label>
              <input
                type="range"
                min="7"
                max="30"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-center mt-2 text-green-400 font-bold text-lg">
                {days} {t('days')}
              </div>
            </div>

            {/* Amount Input */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-3">Deposit Amount:</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  placeholder="Enter BNB amount"
                  step="0.01"
                  min="0.01"
                  className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                />
                <button
                  onClick={() => setAmount(Math.max(0.01, balance - 0.002))}
                  className="bg-green-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  MAX
                </button>
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>Min: 0.01 BNB</span>
                <span>Balance: {balance.toFixed(4)} BNB</span>
              </div>
            </div>

            {/* Profit Display */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-gray-400 text-sm mb-1">Daily ROI</div>
                <div className="text-green-400 font-bold text-lg">{dailyROI}%</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400 text-sm mb-1">Total Profit</div>
                <div className="text-green-400 font-bold text-lg">{totalROI}%</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400 text-sm mb-1">You Will Earn</div>
                <div className="text-green-400 font-bold text-lg">{earnings} BNB</div>
              </div>
            </div>

            {/* Invest Button */}
            <button
              onClick={invest}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2"
            >
              <i className="fas fa-rocket"></i>
              {t('investNow')}
            </button>
          </div>
        </section>

        {/* Dashboard Section */}
        <section id="dashboard" className="px-4 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">{t('dashboard')}</h2>
          <div className="bg-gradient-to-br from-black/80 to-green-950/50 border border-green-500/30 rounded-xl p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">{userStats.withdrawable.toFixed(4)}</div>
                <div className="text-gray-400 text-sm">Withdrawable</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{userStats.invested.toFixed(4)}</div>
                <div className="text-gray-400 text-sm">Total Investment</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{userStats.withdrawn.toFixed(4)}</div>
                <div className="text-gray-400 text-sm">Total Withdrawal</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{userStats.referralReward.toFixed(4)}</div>
                <div className="text-gray-400 text-sm">Referral Reward</div>
              </div>
            </div>

            <button
              onClick={withdraw}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-lg font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2"
            >
              <i className="fas fa-hand-holding-usd"></i>
              {t('withdraw')}
            </button>
          </div>
        </section>

        {/* Referral Section */}
        <section id="referral" className="px-4 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Referral Program</h2>
          <div className="bg-gradient-to-br from-black/80 to-green-950/50 border border-green-500/30 rounded-xl p-6">
            {/* Referral Link */}
            <div className="flex items-center gap-2 mb-6">
              <input
                type="text"
                value={account ? `https://bnbcapital.org?ref=${account}` : 'Connect wallet to get referral link'}
                readOnly
                className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-green-400 text-sm font-mono"
              />
              <button
                onClick={copyReferralLink}
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <i className="fas fa-copy"></i>
                {t('copy')}
              </button>
            </div>

            {/* Referral Levels */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {[
                { level: 1, percentage: '5%', refs: userStats.referralLevels[0] || 0 },
                { level: 2, percentage: '3%', refs: userStats.referralLevels[1] || 0 },
                { level: 3, percentage: '2%', refs: userStats.referralLevels[2] || 0 },
                { level: 4, percentage: '1%', refs: userStats.referralLevels[3] || 0 },
                { level: 5, percentage: '0.5%', refs: userStats.referralLevels[4] || 0 }
              ].map((item) => (
                <div key={item.level} className="bg-black/50 border border-gray-700 rounded-lg p-3 text-center">
                  <div className="text-green-400 font-bold text-lg mb-1">{item.percentage}</div>
                  <div className="text-gray-400 text-xs mb-1">LEVEL {item.level}</div>
                  <div className="text-white text-xs">{item.refs} referrals</div>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-gray-400 mb-6">
              Total potential: <span className="text-green-400 font-semibold">11.5%</span> from your network's investments
            </p>

            {/* Share Buttons */}
            <div className="flex justify-center gap-4">
              {[
                { icon: 'fab fa-twitter', color: 'bg-blue-500 hover:bg-blue-600' },
                { icon: 'fab fa-telegram', color: 'bg-blue-400 hover:bg-blue-500' },
                { icon: 'fab fa-facebook', color: 'bg-blue-600 hover:bg-blue-700' },
                { icon: 'fab fa-whatsapp', color: 'bg-green-500 hover:bg-green-600' }
              ].map((social, index) => (
                <button
                  key={index}
                  className={`w-12 h-12 ${social.color} text-white rounded-full flex items-center justify-center transition-colors`}
                >
                  <i className={social.icon}></i>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Investment Plans Table */}
        <section id="plans" className="px-4 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Investment Plans & Returns</h2>
          <div className="bg-gradient-to-br from-black/80 to-green-950/50 border border-green-500/30 rounded-xl p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 text-white">Duration</th>
                    <th className="text-left py-3 text-white">Total ROI</th>
                    <th className="text-left py-3 text-white">Daily Return</th>
                    <th className="text-left py-3 text-white">1 BNB Returns</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { days: 7, roi: 119, daily: 17, returns: 1.19 },
                    { days: 10, roi: 134, daily: 13.4, returns: 1.34 },
                    { days: 15, roi: 159, daily: 10.6, returns: 1.59 },
                    { days: 20, roi: 184, daily: 9.2, returns: 1.84 },
                    { days: 25, roi: 209, daily: 8.36, returns: 2.09 },
                    { days: 30, roi: 234, daily: 7.8, returns: 2.34 }
                  ].map((plan, index) => (
                    <tr key={index} className="border-b border-gray-800">
                      <td className="py-3 text-white">{plan.days} days</td>
                      <td className="py-3 text-green-400 font-semibold">{plan.roi}%</td>
                      <td className="py-3 text-white">{plan.daily}%</td>
                      <td className="py-3 text-green-400 font-semibold">{plan.returns} BNB</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="px-4 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">FAQ</h2>
          <div className="space-y-4">
            {[
              {
                question: "What is the minimum investment?",
                answer: "The minimum investment is 0.01 BNB. There is no maximum limit - you can invest as much as you want."
              },
              {
                question: "Can I withdraw anytime?",
                answer: "Yes, you can withdraw your accumulated earnings anytime. There is a 1-hour cooldown between withdrawals for security purposes."
              },
              {
                question: "How does the referral program work?",
                answer: "You earn commissions from 5 levels of referrals: Level 1 (5%), Level 2 (3%), Level 3 (2%), Level 4 (1%), and Level 5 (0.5%). Share your referral link and earn automatically when your referrals invest."
              },
              {
                question: "Is the contract safe?",
                answer: "Yes, V7 contract is 100% immutable with no owner privileges. It fixes all critical issues including the delayed payment bug, checkpoint bug, gas optimization, and ROI accuracy. The code is verified on BSCScan for transparency."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gradient-to-br from-black/80 to-green-950/50 border border-green-500/30 rounded-xl overflow-hidden">
                <button
                  onClick={() => {
                    const element = document.getElementById(`faq-${index}`);
                    element.classList.toggle('hidden');
                  }}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-green-500/10 transition-colors"
                >
                  <span className="text-white font-medium">{faq.question}</span>
                  <i className="fas fa-chevron-down text-green-400"></i>
                </button>
                <div id={`faq-${index}`} className="hidden px-6 pb-4">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t-2 border-green-500 z-40">
        <div className="flex justify-around py-2">
          {[
            { id: 'home', icon: 'fa-home', label: t('home'), href: '#' },
            { id: 'invest', icon: 'fa-rocket', label: 'Invest', href: '#calculator' },
            { id: 'dashboard', icon: 'fa-wallet', label: t('dashboard'), href: '#dashboard' },
            { id: 'referral', icon: 'fa-share-alt', label: t('referral'), href: '#referral' },
            { id: 'more', icon: 'fa-th', label: t('more'), onClick: () => setIsMoreMenuOpen(true) }
          ].map((nav) => (
            <a
              key={nav.id}
              href={nav.href}
              onClick={nav.onClick}
              className={`flex flex-col items-center justify-center py-2 px-4 transition-colors ${
                activeNav === nav.id ? 'text-green-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                activeNav === nav.id ? 'bg-green-500/20' : 'hover:bg-gray-700'
              }`}>
                <i className={`fas ${nav.icon} text-xl`}></i>
              </div>
              <span className="text-xs mt-1">{nav.label}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* Language Modal */}
      {isLanguageModalOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsLanguageModalOpen(false)}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-black to-green-950 border border-green-500 rounded-xl p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Select Language</h3>
                <button 
                  onClick={() => setIsLanguageModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { code: 'en', flag: '🇬🇧', name: 'English' },
                  { code: 'zh', flag: '🇨🇳', name: '中文' },
                  { code: 'es', flag: '🇪🇸', name: 'Español' },
                  { code: 'ru', flag: '🇷🇺', name: 'Русский' },
                  { code: 'ar', flag: '🇸🇦', name: 'العربية' },
                  { code: 'ja', flag: '🇯🇵', name: '日本語' }
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLanguage(lang.code);
                      setIsLanguageModalOpen(false);
                    }}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-700 hover:border-green-500 hover:bg-green-500/10 transition-colors"
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-white text-sm">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* More Menu Modal */}
      {isMoreMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsMoreMenuOpen(false)}
          ></div>
          <div className="fixed bottom-20 right-4 bg-gradient-to-br from-black to-green-950 border border-green-500 rounded-xl p-4 z-50 min-w-40">
            {[
              { icon: 'fa-question-circle', text: 'FAQ', href: '#faq' },
              { icon: 'fa-newspaper', text: 'Media', href: '#media' },
              { icon: 'fa-star', text: 'Features', href: '#features' },
              { icon: 'fa-external-link-alt', text: 'BSCScan', href: `https://bscscan.com/address/${CONTRACT_ADDRESS}` }
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : '_self'}
                onClick={() => setIsMoreMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-white hover:bg-green-500/20 rounded-lg transition-colors"
              >
                <i className={`fas ${item.icon} text-green-400 w-4`}></i>
                <span className="text-sm">{item.text}</span>
              </a>
            ))}
          </div>
        </>
      )}

      {/* Success Modal */}
      {showSuccessModal && successData && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowSuccessModal(false)}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-black to-green-950 border-2 border-green-500 rounded-xl p-8 max-w-md w-full text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-check text-white text-3xl"></i>
              </div>
              
              <h2 className="text-2xl font-bold text-green-400 mb-4">Investment Successful! 🎉</h2>
              
              <p className="text-gray-300 mb-6">
                Your investment has been processed successfully and you've started earning returns!
              </p>
              
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6 text-left">
                <div className="flex justify-between mb-3">
                  <span className="text-gray-400">Amount Invested:</span>
                  <span className="text-green-400 font-semibold">{successData.amount} BNB</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-400">Investment Period:</span>
                  <span className="text-green-400 font-semibold">{successData.days} Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Expected Return:</span>
                  <span className="text-green-400 font-semibold">
                    {(successData.amount * (successData.days === 30 ? 2.34 : (1.19 + ((successData.days - 7) * 0.05)))).toFixed(3)} BNB
                  </span>
                </div>
              </div>
              
              <a
                href={`https://bscscan.com/tx/${successData.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500 text-green-400 px-4 py-2 rounded-lg mb-6 hover:bg-green-500/30 transition-colors"
              >
                <i className="fas fa-external-link-alt"></i>
                View on BSCScan
              </a>
              
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all"
              >
                <i className="fas fa-chart-line mr-2"></i>
                View Dashboard
              </button>
            </div>
          </div>
        </>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        .slider {
          background: linear-gradient(to right, #10b981 0%, #10b981 ${((days - 7) / (30 - 7)) * 100}%, #374151 ${((days - 7) / (30 - 7)) * 100}%, #374151 100%);
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 0 0 1px #10b981;
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 0 0 1px #10b981;
        }
      `}</style>
    </div>
  );
};

export default BNBCapitalApp;