const basicABI = [{
    constant: !0,
    inputs: [],
    name: "name",
    outputs: [{
        name: "",
        type: "string"
    }],
    payable: !1,
    stateMutability: "view",
    type: "function"
}, {
    constant: !0,
    inputs: [],
    name: "symbol",
    outputs: [{
        name: "",
        type: "string"
    }],
    payable: !1,
    stateMutability: "view",
    type: "function"
}];

const presaleABI = [{
    "inputs": [{
        "internalType": "address",
        "name": "_presaleGenerator",
        "type": "address"
    }],
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "BUYERS",
    "outputs": [{
        "internalType": "uint256",
        "name": "baseDeposited",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "tokensOwed",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "CONTRACT_VERSION",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "PRESALE_FEE_INFO",
    "outputs": [{
        "internalType": "uint256",
        "name": "UNICRYPT_BASE_FEE",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "UNICRYPT_TOKEN_FEE",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "REFERRAL_FEE",
        "type": "uint256"
    }, {
        "internalType": "address payable",
        "name": "BASE_FEE_ADDRESS",
        "type": "address"
    }, {
        "internalType": "address payable",
        "name": "TOKEN_FEE_ADDRESS",
        "type": "address"
    }, {
        "internalType": "address payable",
        "name": "REFERRAL_FEE_ADDRESS",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "PRESALE_GENERATOR",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "PRESALE_INFO",
    "outputs": [{
        "internalType": "address payable",
        "name": "PRESALE_OWNER",
        "type": "address"
    }, {
        "internalType": "contract IERC20",
        "name": "S_TOKEN",
        "type": "address"
    }, {
        "internalType": "contract IERC20",
        "name": "B_TOKEN",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "TOKEN_PRICE",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "MAX_SPEND_PER_BUYER",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "AMOUNT",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "HARDCAP",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "SOFTCAP",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "LIQUIDITY_PERCENT",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "LISTING_RATE",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "START_BLOCK",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "END_BLOCK",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "LOCK_PERIOD",
        "type": "uint256"
    }, {
        "internalType": "bool",
        "name": "PRESALE_IN_ETH",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "PRESALE_LOCK_FORWARDER",
    "outputs": [{
        "internalType": "contract IPresaleLockForwarder",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "PRESALE_SETTINGS",
    "outputs": [{
        "internalType": "contract IPresaleSettings",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "STATUS",
    "outputs": [{
        "internalType": "bool",
        "name": "WHITELIST_ONLY",
        "type": "bool"
    }, {
        "internalType": "bool",
        "name": "LP_GENERATION_COMPLETE",
        "type": "bool"
    }, {
        "internalType": "bool",
        "name": "FORCE_FAILED",
        "type": "bool"
    }, {
        "internalType": "uint256",
        "name": "TOTAL_BASE_COLLECTED",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "TOTAL_TOKENS_SOLD",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "TOTAL_TOKENS_WITHDRAWN",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "TOTAL_BASE_WITHDRAWN",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "ROUND1_LENGTH",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "NUM_BUYERS",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "UNI_FACTORY",
    "outputs": [{
        "internalType": "contract IUniswapV2Factory",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "WETH",
    "outputs": [{
        "internalType": "contract IWETH",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "addLiquidity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address[]",
        "name": "_users",
        "type": "address[]"
    }, {
        "internalType": "bool",
        "name": "_add",
        "type": "bool"
    }],
    "name": "editWhitelist",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "forceFailByUnicrypt",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "forceFailIfPairExists",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_user",
        "type": "address"
    }],
    "name": "getUserWhitelistStatus",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
    }],
    "name": "getWhitelistedUserAtIndex",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getWhitelistedUsersLength",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address payable",
        "name": "_presaleOwner",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_tokenPrice",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_maxEthPerBuyer",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_hardcap",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_softcap",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_liquidityPercent",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_listingRate",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_startblock",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_endblock",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_lockPeriod",
        "type": "uint256"
    }],
    "name": "init1",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "contract IERC20",
        "name": "_baseToken",
        "type": "address"
    }, {
        "internalType": "contract IERC20",
        "name": "_presaleToken",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "_unicryptBaseFee",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_unicryptTokenFee",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_referralFee",
        "type": "uint256"
    }, {
        "internalType": "address payable",
        "name": "_baseFeeAddress",
        "type": "address"
    }, {
        "internalType": "address payable",
        "name": "_tokenFeeAddress",
        "type": "address"
    }, {
        "internalType": "address payable",
        "name": "_referralAddress",
        "type": "address"
    }],
    "name": "init2",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "ownerWithdrawTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "presaleStatus",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "bool",
        "name": "_flag",
        "type": "bool"
    }],
    "name": "setWhitelistFlag",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_startBlock",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_endBlock",
        "type": "uint256"
    }],
    "name": "updateBlocks",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_maxSpend",
        "type": "uint256"
    }],
    "name": "updateMaxSpendLimit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
    }],
    "name": "userDeposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [],
    "name": "userWithdrawBaseTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "userWithdrawTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}]