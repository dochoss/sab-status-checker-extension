function getSabQueue(url, apiKey) {
    var req = new XMLHttpRequest();
    req.open("GET", url + "/api?mode=queue&output=json&apikey=" + apiKey, false);
    req.send(null);
    return JSON.parse(req.responseText);
}

function setBadgeText(text) {
    chrome.browserAction.setBadgeText({text: text});
}

function setBadgeBackgroundColor(color) {
    chrome.browserAction.setBadgeBackgroundColor({color: color});
}

/**
 * Start the background requests to the Sabnzbd API
 * @param {String} url The base URL of the API (e.g. http://localhost:8080)
 * @param {String} apiKey The API key from Sabnzbd
 * @param {Number} interval The interval in milliseconds to poll the API
 * @returns {String} The interval ID of the running interval
 */
function startRequest(url, apiKey, interval) {
    console.log('starting new request...')
    if (window.runningIntervalId) {
        stopRequest();
    }
    window.runningIntervalId = setInterval(() => {
        console.log('running...');
        var queue = getSabQueue(url, apiKey);
        var queueSize = queue.queue.slots.length;
        var queueStatus = queue.queue.status;
        var queueText = queueSize.toString();
        var pctComplete = (100 - (Math.round((Number(queue.queue.mbleft) / Number(queue.queue.mb)) * 100))) + ' \%'

        if (queueStatus === "Paused") {
            setBadgeBackgroundColor([255, 0, 0, 255]);
        } else {
            setBadgeBackgroundColor([0, 0, 0, 255]);
        }
    
        if (queueSize > 0) {
            setBadgeText(queueText + ' - ' + pctComplete);
        } else {
            setBadgeText("");
        }        
    }, interval);
    console.log('Started with interval ID: ' + window.runningIntervalId);
}

/**
 * Stop the background requests to the Sabnzbd API
 */
function stopRequest() {
    console.log('stopping interval ID: ' + window.runningIntervalId);
    clearInterval(window.runningIntervalId);
    if (window.runningIntervalId)
        window.runningIntervalId = null;
}

// window.onload = function() {
//     setInterval(() => {
//         var apiKey = "f7abf26c4326417b9358f5fbcc76ffa0";
//         var queue = getSabQueue(apiKey);
//         var queueSize = queue.queue.slots.length;
//         var queueStatus = queue.queue.status;
//         var queueText = queueSize.toString();
//         var pctComplete = (100 - (Math.round((Number(queue.queue.mbleft) / Number(queue.queue.mb)) * 100))) + ' \%'

//         if (queueStatus === "Paused") {
//             setBadgeBackgroundColor([255, 0, 0, 255]);
//         } else {
//             setBadgeBackgroundColor([0, 0, 0, 255]);
//         }
    
//         if (queueSize > 0) {
//             setBadgeText(queueText + ' - ' + pctComplete);
//         } else {
//             setBadgeText("");
//         }        
//     }, 2500);
// }