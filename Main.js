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
        image: 'home.png'
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
        image: 'calculator.png'
    },
    Finances: {
        file: 'Finances.js',
        level: 0,
        image: 'finances.png',
        resize: true,
        headerWidth: 0
    },
    Vacations: {
        file: 'Vacations.js',
        level: 0,
        image: 'vacations.png',
        resize: true,
        headerWidth: 0
    },
    WishList: {
        file: 'Wish List.js',
        level: 0,
        image: 'wishlist.png',
        resize: true,
        headerWidth: 0
    },
    Todos: {
        file: 'Todos.js',
        level: 0,
        image: 'todos.png',
        resize: true,
        headerWidth: 0
    },
    Meals: {
        file: 'Meals.js',
        level: 0,
        image: 'meals.png',
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