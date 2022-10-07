document.getElementById("btnStart").addEventListener("click", function() {
  let url = document.getElementById("url").value;
  let apiKey = document.getElementById("apikey").value;
  let interval = document.getElementById("interval").value;
  
  console.log("Starting request with URL: " + url + ", API Key: " + apiKey + ", Interval: " + interval);
  if (!(url && apiKey && interval)) {
    console.log('not starting');
    document.getElementById("error").innerHTML = "Please fill in all fields";
    return;
  }

  if (!url.startsWith("http")) {
    url = "http://" + url;
  }
  
  localStorage.setItem("url", url);
  localStorage.setItem("interval", interval);
  
  chrome.extension
    .getBackgroundPage()
    .startRequest(url, apiKey, interval);
  setStatus("Running", "text-success");
  document.getElementById("error").innerHTML = "";

});

document.getElementById("btnStop").addEventListener("click", function() {
  stopRunningRequest();
});

document.getElementById("usessl").addEventListener("click", function() {
  let isChecked = document.getElementById("usessl").checked;
  let url = document.getElementById("url").value;

  if (url.startsWith("http:") && isChecked) {
    url = url.replace("http", "https");
  } else if (url.startsWith("https:") && !isChecked) {
    url = url.replace("https", "http");
  }
  document.getElementById("url").value = url;
});

window.onload = function() {
  let status = document.getElementById("status");
  if (localStorage.getItem("url")) {
    document.getElementById("url").value = localStorage.getItem("url");
  }
  if (localStorage.getItem("interval")) {
    document.getElementById("interval").value = localStorage.getItem("interval");
  }
  if (chrome.extension.getBackgroundPage().runningIntervalId) {
    status.innerHTML = "Running";
    status.className = '';
    status.classList.add("text-success");
  } else {
    status.innerHTML = "Stopped";
    status.className = '';
    status.classList.add("text-danger");
  }
}

function stopRunningRequest() {
  chrome.extension
    .getBackgroundPage()
    .stopRequest();
  setStatus("Stopped", "text-danger");
}

function setStatus(text, className) {
  let status = document.getElementById("status");
  status.innerHTML = text;
  status.className = '';
  status.classList.add(className);
}


