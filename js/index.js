(function ($) {
	const SUPPORTED_VERSIONS = [ 2, 3 ];
	let contractVersion = -1;

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
		$("#error, #presale-form").hide();
		$(".spinner").show();

		try {
			const web3 = new window.Web3(window.ethereum);
			let presaleContract = new web3.eth.Contract(contractVersionABI, presaleAddress);

			contractVersion = parseInt(await presaleContract.methods.CONTRACT_VERSION().call());

			if (SUPPORTED_VERSIONS.indexOf(contractVersion) < 0) {
				throw Error(`Unsupported Unicrypt Version ${contractVersion}`);
			} else {
				presaleContract = new web3.eth.Contract(presaleABIs[contractVersion], presaleAddress);
			}

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
                <div class="form-group col-md-4">
                  <label for="tokenName">Token Name</label>
                  <p>${name}</p>
                </div>
                <div class="form-group col-md-4">
                  <label for="tokenSymbol">Token Symbol</label>
                  <p>${symbol}</p>
                </div>
				<div class="form-group col-md-4">
				<label for="contractVersion">Unicrypt Version</label>
					<p>${contractVersion}</p>
				</div>
                <div class="form-group col-md-3">
                  <label>Presale Start Block</label>
                  <p id="startblock">${details.START_BLOCK}</p>
                </div>
				<div class="form-group col-md-3">
                  <label>Remaining Blocks</label>
                  <p id="remaining"></p>
                </div>
                <div class="form-group col-md-3">
                  <label for="max">Max Contribution</label>
                  <p>${max}</p>
                </div>
                <div class="form-group col-md-3">
                  <label for="cap">Goal/Cap</label>
                  <p>${softcap}/${hardcap}</p>
                </div>
              </div>`);

			$("#presale-form").show();
		} catch (err) {
			console.log(err);
			$("#error").html(`<h4 class='text-danger'>Failed to load.<br>${err}<br>Supported Unicrypt Versions: ${SUPPORTED_VERSIONS.join(", ")}</h4>`).show();
		}
		$(".spinner").hide();
	}

	$("#loadBtn").click(() => {
		presaleAddress = $("#presaleAddress").val();
		loadPresaleData(presaleAddress);
	});


	async function loadBlocks() {
		if (canConnect) {
			const web3 = new window.Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/"));
			const block = await web3.eth.getBlockNumber();
			$("#block").text(block).attr("href", `https://bscscan.com/block/${block}`);
			if ($("#startblock").text()) {
				const start = parseInt($("#startblock").text());
				$("#remaining").text(start - block);
			}
			setTimeout(loadBlocks, 100);
		}
	}

	async function purchase() {
		$("#error").hide();
		try {
			const web3 = new window.Web3(window.ethereum);
			const presaleContract = new web3.eth.Contract(presaleABIs[contractVersion], presaleAddress);

			const contribution = $("#contribution").val();
			const wei = web3.utils.toWei(contribution, "ether");

			let userDeposit = presaleContract.methods.userDeposit.bind(null, wei);
			
			if (contractVersion == 3) {
				const randomNumber = await presaleContract.methods.RANDOM_NUMBER_X82().call();
				const _key = web3.utils.keccak256(web3.eth.abi.encodeParameters(["address", "uint"], [account, randomNumber]))
				userDeposit = presaleContract.methods.userDeposit.bind(null, wei, _key);
			}

			userDeposit().send({
				from: account,
				value: wei
			}, function(err) {
				if (err) {
					$("#error").html(`<h4 class='text-danger'>${err.message}</h4>`).show();
				} else {
					alert("Well I think everything worked. Go check you got in or no.");
				}
			});
		} catch (err) {
			console.log(err);
			$("#error").html(`<h4 class='text-danger'>${err}</h4>`).show();
		}
	}

	$("#purchaseBtn").click(purchase);
})(jQuery);