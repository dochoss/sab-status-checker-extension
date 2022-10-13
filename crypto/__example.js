/* in HTML:
    <script src="core.js"></script>
    <script src="cipher-core.js"></script>
    <script src="aes.js"></script>
    <script src="tripledes.js"></script>
    
    <script src="enc-base64.js"></script>
    <script src="script.js"></script>
*/

var text = "#rawString#";
var key = CryptoJS.enc.Base64.parse("#base64Key#");
var iv  = CryptoJS.enc.Base64.parse("#base64IV#");

console.log("Initial String:: "+text);

var encrypted = CryptoJS.AES.encrypt(text, key, {iv: iv});
console.log("Encrypted String:: "+encrypted.toString());

var decrypted = CryptoJS.AES.decrypt(encrypted, key, {iv: iv});
console.log("Decrypted String:: "+decrypted.toString(CryptoJS.enc.Utf8));