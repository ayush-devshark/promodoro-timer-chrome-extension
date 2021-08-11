const timerOptions = document.getElementById('timer-options');
const saveBtn = document.getElementById('save-btn');

timerOptions.addEventListener('change', e => {
    const val = e.target.value;
    if (val < 1 || val > 60) {
        timerOptions.value = 25;
    }
});

saveBtn.addEventListener('click', () => {
    chrome.storage.local.set({
        timer: 0,
        timerOptions: timerOptions.value,
        isRunning: false,
    });
});

chrome.storage.local.get(['timerOptions'], res => {
    timerOptions.value = res.timerOptions;
});
