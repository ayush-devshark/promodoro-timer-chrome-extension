chrome.alarms.create('promodoroTimer', { periodInMinutes: 1 / 60 });

chrome.alarms.onAlarm.addListener(alarm => {
    if (alarm.name === 'promodoroTimer') {
        chrome.storage.local.get(
            ['timer', 'isRunning', 'timerOptions'],
            res => {
                if (res.isRunning) {
                    let timer = res.timer + 1;
                    let isRunning = true;
                    if (timer === 60 * res.timerOptions) {
                        this.registration.showNotification('Promodoro Timer', {
                            body: `${res.timerOptions} Minutes has passed!`,
                            icon: 'icon.png',
                        });
                        timer = 0;
                        isRunning = false;
                    }
                    chrome.storage.local.set({ timer, isRunning });
                }
            }
        );
    }
});

chrome.storage.local.get(['timer', 'isRunning', 'timerOptions'], res => {
    chrome.storage.local.set({
        timer: 'timer' in res ? res.timer : 0,
        timerOptions: 'timerOptions' in res ? res.timerOptions : 25,
        isRunning: 'isRunning' in res ? res.isRunning : false,
    });
});
