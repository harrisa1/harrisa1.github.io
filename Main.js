var modules = {
    Menu: {
        file: 'Menu.js',
        level: -1
    },
    Home: {
        file: 'Home.js',
        level: 0,
        vested_shares: 59,
        unvested_shares: 1059,
        image: '0BxRDplunxMIZSFVsR1RIa0M1VGc'
    },
    Clock: {
        file: 'Clock.js',
        level: 1
    },
    Stopwatch: {
        file: 'Stopwatch.js',
        level: 1
    },
    Calculator: {
        file: 'Calculator.js',
        level: -1,
        image: '0BxRDplunxMIZS25sdjlLeXdJS0k'
    },
    Finances: {
        file: 'Finances.js',
        level: 0,
        image: '0BxRDplunxMIZTzhqS3l1QW1JcUk',
        resize: true,
        headerWidth: 0
    },
    Vacations: {
        file: 'Vacations.js',
        level: 0,
        image: '0BxRDplunxMIZak5pNTVib01NSXM',
        resize: true,
        headerWidth: 0
    },
    WishList: {
        file: 'Wish List.js',
        level: 0,
        image: '0BxRDplunxMIZVC1uT3RPc2pkX0E',
        resize: true,
        headerWidth: 0
    },
    Todos: {
        file: 'Todos.js',
        level: 0,
        image: '0BxRDplunxMIZZWIyLWRGTk9qNVU',
        resize: true,
        headerWidth: 0
    },
    Meals: {
        file: 'Meals.js',
        level: 0,
        image: '0BxRDplunxMIZbU1aUWluYTBDYlk',
        resize: true,
        headerWidth: 0
    }
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