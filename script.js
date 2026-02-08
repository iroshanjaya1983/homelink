import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Firebase Config (ඔයාගේ google-services.json එකෙන් ගත්තු විස්තර)
const firebaseConfig = {
    apiKey: "AIzaSyDDFajfJdqA9XE2N5mbHhO0NhlfIdZfIdo",
    authDomain: "smarthomelight-5b9c8.firebaseapp.com",
    databaseURL: "https://smarthomelight-5b9c8-default-rtdb.firebaseio.com",
    projectId: "smarthomelight-5b9c8",
    storageBucket: "smarthomelight-5b9c8.firebasestorage.app",
    messagingSenderId: "666485659317",
    appId: "1:666485659317:android:b3a7777bf29080aa4dd0fc"
};

// Firebase Initialize කිරීම
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Screenshot එකේ අනුකූලව path එක: Home -> Home -> Light
const ledRef = ref(database, 'Home/Home/Light');

document.addEventListener('DOMContentLoaded', () => {
    const ledIndicator = document.getElementById('led-indicator');
    const statusText = document.getElementById('status-text');
    const onBtn = document.getElementById('on-btn');
    const offBtn = document.getElementById('off-btn');

    // UI එක update කරන function එක
    const updateUI = (value) => {
        // value එක 1 නම් ON, නැත්නම් OFF (string හෝ number දෙකම වැඩ කරයි)
        if (value == 1 || value == "1") {
            ledIndicator.classList.add('active');
            statusText.textContent = 'System Online';
        } else {
            ledIndicator.classList.remove('active');
            statusText.textContent = 'System Offline';
        }
    };

    // Firebase එකේ data වෙනස් වෙනකොට Realtime වෙබ් එකේ update වීම
    onValue(ledRef, (snapshot) => {
        const data = snapshot.val();
        console.log("Current status:", data);
        updateUI(data);
    });

    // On Button එක click කරාම Firebase එකට 1 යැවීම
    onBtn.addEventListener('click', () => {
        set(ledRef, 1);
        if (window.navigator.vibrate) window.navigator.vibrate(50);
    });

    // Off Button එක click කරාම Firebase එකට 0 යැවීම
    offBtn.addEventListener('click', () => {
        set(ledRef, 0);
        if (window.navigator.vibrate) window.navigator.vibrate(20);
    });
});
