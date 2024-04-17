
let looping = async function() {
    async function getBlock() {
        const response = await fetch( 
            'https://mempool.space/api/v1/mining/blocks/timestamp/'+ Math.ceil(Date.now()/1000),
            {
                method: 'GET'
            }
        );
        if (response.ok) { // Check if the response was successful
            const data = await response.json(); // Parse JSON from the response
            if (data) {
                                return data.height; // Assuming 'data' is an array and 'height' is a property
            } else {
                console.log("Received:\n")
                console.log(data)
                console.error("No data received or data format unexpected:", data);
                return null; // Handle cases where data might be empty or in an unexpected format
            }
        } else {
            throw new Error('Network response was not ok.');
        }
    }

    const period = 210000;
    let current_block; 
    try {
        current_block = await getBlock(); 
    } catch (error) {
        console.error('Error fetching block:', error);
    }

    let next_halving = (Math.floor(current_block / period) + 1) * period;
    let remain = next_halving - current_block;

    if (remain <= 1 ) {
        chrome.browserAction.setBadgeBackgroundColor({color: '#FF0000'});
        alert("BTC Halving Warning: It's Halving block baby!!!");
        
    }
    console.log("Next Halving Block: " + next_halving);
    console.log("Current Block: " + current_block);
    console.log("Remain Block: " + remain);
    console.log("Timestamp: " + Math.ceil(Date.now()/1000));
    chrome.browserAction.setBadgeText({text: '' + remain + ''});
    chrome.browserAction.setBadgeBackgroundColor({color: '#00FF00'});
}

setInterval(looping, 5000);
