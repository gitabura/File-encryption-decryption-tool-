const fileInput = document.getElementById("fileInput");
const password = document.getElementById("password");
const encryptBtn = document.getElementById("encryptBtn");
const decryptBtn = document.getElementById("decryptBtn");
const downloadLink = document.getElementById("downloadLink");
const message = document.getElementById("message");

function encrypt(text, key) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(
            text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
    }
    return btoa(result);
}

function decrypt(text, key) {
    text = atob(text);
    let result = "";
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(
            text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
    }
    return result;
}

encryptBtn.onclick = function () {

    if (!fileInput.files.length) {
        message.innerHTML = "Please select a file.";
        return;
    }

    if (password.value === "") {
        message.innerHTML = "Please enter a password.";
        return;
    }

    const reader = new FileReader();

    reader.onload = function () {

        const encrypted = encrypt(reader.result, password.value);

        const blob = new Blob([encrypted], { type: "text/plain" });

        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "encrypted.txt";
        downloadLink.style.display = "block";
        downloadLink.innerHTML = "Download Encrypted File";

        message.innerHTML = "✅ File Encrypted Successfully";

    };

    reader.readAsText(fileInput.files[0]);

};

decryptBtn.onclick = function () {

    if (!fileInput.files.length) {
        message.innerHTML = "Please select a file.";
        return;
    }

    if (password.value === "") {
        message.innerHTML = "Please enter a password.";
        return;
    }

    const reader = new FileReader();

    reader.onload = function () {

        try {

            const decrypted = decrypt(reader.result, password.value);

            const blob = new Blob([decrypted], { type: "text/plain" });

            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = "decrypted.txt";
            downloadLink.style.display = "block";
            downloadLink.innerHTML = "Download Decrypted File";

            message.innerHTML = "✅ File Decrypted Successfully";

        } catch (e) {

            message.innerHTML = "❌ Invalid Password or File";

        }

    };

    reader.readAsText(fileInput.files[0]);

};