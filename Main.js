var modules = {
    Menu: {
        gid: '0BxRDplunxMIZUjZjZzZ4VDg0RUU',
        level: -1
    },
    Home: {
        gid: '0BxRDplunxMIZQWxnb29UMy1wbFE',
        level: 0,
        shares: 536,
        image: '0BxRDplunxMIZSFVsR1RIa0M1VGc'
    },
    Clock: {
        gid: '0BxRDplunxMIZTVk2a1RRb1gweVE',
        level: 1
    },
    Stopwatch: {
        gid: '0BxRDplunxMIZUjQ4X0FKN2w3Y3c',
        level: 1
    },
    Calculator: {
        gid: '0BxRDplunxMIZZklYTk5NQ2VaVzA',
        level: -1,
        image: '0BxRDplunxMIZS25sdjlLeXdJS0k'
    },
    Finances: {
        gid: '0BxRDplunxMIZZS1sdFd1T1ZRa2c',
        level: 0,
        image: '0BxRDplunxMIZTzhqS3l1QW1JcUk',
        resize: true,
        headerWidth: 0
    },
    Vacations: {
        gid: '0BxRDplunxMIZMGl1OWhPZzR6MkE',
        level: 0,
        image: '0BxRDplunxMIZak5pNTVib01NSXM',
        resize: true,
        headerWidth: 0
    },
    WishList: {
        gid: '0BxRDplunxMIZTHJPSTMwTDRxNjQ',
        level: 0,
        image: '0BxRDplunxMIZVC1uT3RPc2pkX0E',
        resize: true,
        headerWidth: 0
    },
    Todos: {
        gid: '0BxRDplunxMIZZEUwdk1jVm84X1U',
        level: 0,
        image: '0BxRDplunxMIZZWIyLWRGTk9qNVU',
        resize: true,
        headerWidth: 0
    },
    Meals: {
        gid: '0BxRDplunxMIZQTNId3h2c09mU2M',
        level: 0,
        image: '0BxRDplunxMIZbU1aUWluYTBDYlk',
        resize: true,
        headerWidth: 0
    }/*,
    Notes: {
        gid: '0BxRDplunxMIZdDd6aFJlZEZXY0k',
        level: 0,
        image: '0BxRDplunxMIZZFhIMFFYb3ZncjA',
        resize: true,
        headerWidth: 0
    }*/
};

LoadScripts();

MyOnLoadEvent(function() {
    GetBodyHTML();
    Menu.Init();
    Calculator.Init();
    for (var module in modules) {
        if (modules[module].level === 0) {
            eval(module).Init();
        }
    }
});

MyOnResizeEvent(function() {
    for (var module in modules) {
        if (modules[module].resize) {
            eval(module).Resize();
        }
    }
});