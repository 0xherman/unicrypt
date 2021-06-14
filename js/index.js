(function ($) {
	let account = localStorage.getItem("account") || "";
	let chainId = localStorage.getItem("chainId") || null;
	const canConnect = typeof window.ethereum !== "undefined";

	let presaleAddress = new URLSearchParams(window.location.search).get("presale");

	if (presaleAddress) {
		loadPresaleData(presaleAddress);
		$("#presaleAddress").val(presaleAddress);
	}

	const checkConnection = async () => {
		// Reload on
		window.ethereum.on('chainChanged', (_chainId) => window.location.reload());

		if (account && chainId !== null) {
			$("#connectBtn").hide();
			$("#address").text(account);
		} else {
			$("#address").text("");
		}

		window.ethereum.on('accountsChanged', function (accounts) {
			console.log("account changed");
			disconnectAccount();
		});

		loadBlocks();
	};
	checkConnection();
	$("#connectBtn").click(connectAccount);

	async function connectAccount() {
		if (canConnect) {
			console.log("Connecting via web3");
			try {
				const web3 = new window.Web3(window.ethereum);
				
				web3.currentProvider.on("disconnect", function () {
					disconnectAccount();
				});
				chainId = await web3.eth.getChainId();
				if (chainId !== 56 && chainId !== 97 && chainId !== 1337) {
					window.ethereum.request({
						method: 'wallet_addEthereumChain',
						params: [{
							chainId: '0x38',
							chainName: 'Binance Smart Chain',
							nativeCurrency: {
								name: 'BNB',
								symbol: 'BNB',
								decimals: 18
							},
							rpcUrls: ['https://bsc-dataseed.binance.org/'],
							blockExplorerUrls: ['https://bscscan.com/']
						}]
					});
				}
				const accounts = await web3.eth.requestAccounts();
				account = accounts[0];
				localStorage.setItem("account", account);
				localStorage.setItem("chainId", chainId);
				console.log(account + " connected.");

				$("#address").text(account);
				$("#connectBtn").hide();
			} catch (err) {
				console.log("Failed to connect via web3");
				disconnectAccount();
			}
		}
	}

	function disconnectAccount() {
		console.log("disconnected");
		account = "";
		chainId = null;
		localStorage.removeItem("account");
		localStorage.removeItem("chainId");
		$("#connectBtn").show();
		$("#address").text("");
	}

	async function loadPresaleData(presaleAddress) {
		try {
			const web3 = new window.Web3(window.ethereum);
			const presaleContract = new web3.eth.Contract(presaleABI, presaleAddress);

			const details = await presaleContract.methods.PRESALE_INFO().call();

			const max = web3.utils.fromWei(details.MAX_SPEND_PER_BUYER);
			const softcap = web3.utils.fromWei(details.SOFTCAP);
			const hardcap = web3.utils.fromWei(details.HARDCAP);
			console.log(max, hardcap, details);

			$("#maxbtn").off("click").on("click", () => $("#contribution").val(max));
			$("#contribution").attr({
				max: max,
				min: 0,
				step: 0.1
			}).val(max);

			const address = details.S_TOKEN;

			const contract = new web3.eth.Contract(basicABI, address);
			const name = await contract.methods.name().call();
			const symbol = await contract.methods.symbol().call();
			console.log(name, symbol);

			// const timestamp = (await web3.eth.getBlock(details.START_BLOCK)).timestamp;
			// console.log(timestamp);

			$("#presale-data").html(`
				<div class="form-row">
                <div class="form-group col-md-12">
                  <label for="tokenAddress">Token Address</label>
                  <a target="_blank" href="https://bscscan.com/address/${address}">${address}</a>
                </div>
				<div class="form-group col-md-12">
                  <label for="tokenAddress">Presale Address</label>
                  <a target="_blank" href="https://bscscan.com/address/${presaleAddress}">${presaleAddress}</a>
                </div>
                <div class="form-group col-md-6">
                  <label for="tokenName">Token Name</label>
                  <p>${name}</p>
                </div>
                <div class="form-group col-md-6">
                  <label for="tokenSymbol">Token Symbol</label>
                  <p>${symbol}</p>
                </div>
                <div class="form-group col-md-4">
                  <label>Presale Start Block</label>
                  <p>${details.START_BLOCK}</p>
                </div>
                <div class="form-group col-md-4">
                  <label for="max">Max Contribution</label>
                  <p>${max}</p>
                </div>
                <div class="form-group col-md-4">
                  <label for="cap">Goal/Cap</label>
                  <p>${softcap}/${hardcap}</p>
                </div>
              </div>`);

			$("#presale-form").show();
		} catch (err) {
			console.log(err);
			$("#presale-data").html("<h4 class='text-danger'>Failed to load</h4>")
		}
	}

	$("#loadBtn").click(() => {
		presaleAddress = $("#presaleAddress").val();
		loadPresaleData(presaleAddress);
	});


	async function loadBlocks() {
		if (canConnect) {
			const web3 = new window.Web3(window.ethereum);
			const block = await web3.eth.getBlockNumber();
			$("#block").text(block).attr("href", `https://bscscan.com/block/${block}`);
			setTimeout(loadBlocks, 1000);
		}
	}

	async function purchase() {
		try {
			const web3 = new window.Web3(window.ethereum);
			const presaleContract = new web3.eth.Contract(presaleABI, presaleAddress);

			const contribution = $("#contribution").val();
			const wei = web3.utils.toWei(contribution, "ether");

			presaleContract.methods.userDeposit(wei).send({
				from: account,
				value: wei
			}, function(err) {
				if (err) {
					alert("Something went wrong I guesss. You probably didn't get in.");
				} else {
					alert("Well I think everything worked. Go check you got in or no.");
				}
			});
		} catch (err) {
			alert("An error occurred somewhere lol.");
		}
	}

	$("#purchaseBtn").click(purchase);
})(jQuery);