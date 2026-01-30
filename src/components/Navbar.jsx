import React, { useContext, useState, useEffect } from "react";
import { Button } from "./button.jsx";
import { connectWallet, disconnectWallet } from "../utils/wallet";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { useMediChain } from "../context/BlockChainContext.jsx";
import axios from "axios";
import { 
  Activity, 
  Wallet as WalletIcon, 
  User, 
  LogOut, 
  ShieldCheck,
  Loader2,
  AlertCircle
} from "lucide-react";

const Navbar = () => {
  const [wallet, setWallet] = useState(null);
  const [doctorName, setDoctorName] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const [mintStatus, setMintStatus] = useState({
    loading: false,
    error: null,
    success: false,
    tokenId: null
  });
  
  const { user, logout } = useContext(AuthContext);
  const { userHealthID, connectWallet: connectBlockchainWallet } = useMediChain();

  // Handle scroll effect for navbar elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWalletConnect = async () => {
    const address = await connectWallet();
    setWallet(address);
    
    if (address) {
      await connectBlockchainWallet();
      
      try {
        const response = await axios.get(`http://localhost:5000/api/blockchain/check-health-id/${address}`);
        if (response.data.hasHealthID) {
          setMintStatus({
            loading: false,
            error: null,
            success: true,
            tokenId: response.data.tokenId
          });
        }
      } catch (error) {
        console.error("Error checking HealthID:", error);
      }
    }
  };

  const handleWalletDisconnect = () => {
    disconnectWallet();
    setWallet(null);
    setMintStatus({
      loading: false,
      error: null,
      success: false,
      tokenId: null
    });
  };

  const handleMintHealthID = async () => {
    if (!wallet) return;
    
    setMintStatus({
      loading: true,
      error: null,
      success: false,
      tokenId: null
    });
    
    try {
      const token = localStorage.getItem('token') || (user && user.token);
      const response = await axios.post('http://localhost:5000/api/blockchain/mint-health-id', {
        walletAddress: wallet
      }, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      });
      
      setMintStatus({
        loading: false,
        error: null,
        success: true,
        tokenId: response.data.tokenId
      });
    } catch (error) {
      console.error("Error minting HealthID:", error);
      setMintStatus({
        loading: false,
        error: error.response?.data?.error || "Failed to mint HealthID",
        success: false,
        tokenId: null
      });
    }
  };

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      if (user && user._id) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:5000/api/doctors/${user._id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (response.data?.name) {
            setDoctorName(response.data.name);
          }
        } catch (error) {
          console.error("Error fetching doctor name:", error);
        }
      }
    };
  
    fetchDoctorInfo();
  }, [user]);

  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-in-out
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-white border-b border-gray-100'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo Section - Left */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group transition-transform duration-200 hover:scale-105"
          >
            <div className="relative">
              {/* Logo Icon with Pulse Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-2.5 rounded-xl shadow-lg">
                <Activity className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
            </div>
            
            {/* Logo Text */}
            <div className="hidden sm:flex flex-col">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-700 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                MedLink AI
              </span>
              <span className="text-xs text-gray-500 font-medium -mt-1">
                Healthcare Reimagined
              </span>
            </div>
          </Link>

          {/* Right Section - User Info & Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            
            {/* User Greeting - Hidden on mobile */}
            {user && (
              <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                <User className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  Hello, <span className="text-blue-700 font-semibold">{user.name}</span>
                </span>
              </div>
            )}

            {/* Wallet Address Badge */}
            {wallet && (
              <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200 shadow-sm">
                <div className="relative">
                  <WalletIcon className="w-4 h-4 text-emerald-600" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                </div>
                <span className="text-sm font-mono font-semibold text-emerald-700">
                  {wallet.slice(0, 6)}...{wallet.slice(-4)}
                </span>
              </div>
            )}

            {/* HealthID Badge */}
            {(userHealthID || mintStatus.tokenId) && (
              <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-700">
                  ID #{userHealthID || mintStatus.tokenId}
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              
              {user ? (
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="group hover:bg-red-50 hover:text-red-600 transition-all"
                  leftIcon={<LogOut className="w-4 h-4" />}
                >
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              ) : (
                <>
                  <Link to="/login">
                    <Button 
                      variant="ghost" 
                      size="md"
                      className="hover:bg-blue-50 hover:text-blue-700"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button 
                      variant="primary" 
                      size="md"
                      className="hidden sm:inline-flex"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}

              {/* Wallet Connect/Disconnect */}
              {wallet ? (
                <Button 
                  variant="outline" 
                  size="md"
                  onClick={handleWalletDisconnect}
                  className="border-gray-300 hover:border-red-400 hover:bg-red-50 hover:text-red-600"
                  leftIcon={<WalletIcon className="w-4 h-4" />}
                >
                  <span className="hidden lg:inline">Disconnect</span>
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="md"
                  onClick={handleWalletConnect}
                  className="border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
                  leftIcon={<WalletIcon className="w-4 h-4" />}
                >
                  <span className="hidden lg:inline">Connect Wallet</span>
                </Button>
              )}

              {/* Mint HealthID Button */}
              {wallet && !userHealthID && !mintStatus.success && (
                <Button 
                  variant="primary" 
                  size="md"
                  onClick={handleMintHealthID}
                  disabled={mintStatus.loading}
                  leftIcon={
                    mintStatus.loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ShieldCheck className="w-4 h-4" />
                    )
                  }
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30"
                >
                  {mintStatus.loading ? "Minting..." : "Mint ID"}
                </Button>
              )}
            </div>

            {/* Error Message Tooltip */}
            {mintStatus.error && (
              <div className="absolute top-full right-4 mt-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg shadow-lg max-w-xs animate-in slide-in-from-top-2 duration-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-red-700 font-medium">
                    {mintStatus.error}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom gradient line for visual appeal */}
      <div className="h-0.5 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 opacity-60" />
    </nav>
  );
};

export default Navbar;