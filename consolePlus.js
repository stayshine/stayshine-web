// Added Rosata to class names and ID to completly minimize the chance that the user will not
// ever lose their styling due to this application running over their site.

var cnsPlusRosata = {}; // A Wrapper Object to save the NS

// ConsolePlus Object
// Properties: initialized
// Methods: init, log, hideConsole
cnsPlusRosata.consolePlus = {
    initialized: false,
    HTMLConsole: undefined, // Will hold the actual Console Element
    consoleVisible: true, // Used in this.hideConsole to track visibility

    //run this after page is loaded
    init: function () {
        // Build the console, add CSSrules, append it to page.
        var HTMLConsole = cnsPlusRosata.consoleBuilder.create();
        cnsPlusRosata.consoleBuilder.cssRules();
        document.body.appendChild(HTMLConsole);
        // Get a reference to the console on page, add hotkey listener
        this.HTMLConsole = document.getElementById('consolePlusRosata');
        document.body.addEventListener('keydown', function (e) {
            cnsPlusRosata.consolePlus.hideConsole(e);
        }, false);
        // set the log() method to window for ease of use
        window.log = this.log;
        this.initialized = true;
        cnsPlusRosata.inspector.init(); // Initialize the inspector, could do this outside consold obj.
    },

    // Log/Asset Hybrid function
    log: function (msg, val, cons) {
        // First check this.initialized, meaning DOM loaded
        if (this.initialized === false) {
            return;
        }
        // Nice hybrid of my Logger method and John Resigs Assert method
        // Use log(msg) to 'log' and log(msg, value) to 'assert'. cons is bool to stop msg going to window.console
        if (!cons) console.log(msg);
        if (val !== undefined) {
            var result = document.getElementById('resRosata');
            var li1 = document.createElement('li');
            li1.appendChild(document.createTextNode(msg));
            li1.className = val ? "passRosata" : "failRosata";
            result.appendChild(li1);
            return;
        }
        var myLog = document.getElementById('myLogRosata');
        var li2 = document.createElement('li');
        li2.appendChild(document.createTextNode(msg));
        myLog.appendChild(li2);
    },

    hideConsole: function (e) {
        // Press CRTL 17 and UP 38 to hide/show console
        if (e.keyCode == 38 && e.ctrlKey === true) {
            // Determine if console should show/hide
            this.HTMLConsole.style.visibility = this.consoleVisible ? 'hidden' : '';
            this.consoleVisible = !this.consoleVisible;
        }
    }
};

// Inspector Object
// Properties: obj, opt, current
// Methods: init, updateObject, updateOptions, fillSelect
cnsPlusRosata.inspector = {
    obj: undefined, // After init these will be: Text field
    opt: undefined, // The SELECT menu
    info: undefined, // Info Div
    clearBtn: undefined, // clearObj button
    current: undefined, // The current inspected object

    init: function () {
        this.obj = document.getElementById('objRosata'); // Text Field
        this.opt = document.getElementById('optRosata'); // SELECT
        this.clearBtn = document.getElementById('clearObjRosata'); // Clear Button
        this.info = document.getElementById('infoRosata'); // Info Div
        // Listen for text input change
        this.obj.addEventListener('change', function (e) {
            cnsPlusRosata.inspector.updateObject(e);
        }, false);
        //Listen for dropdown change
        this.opt.addEventListener('change', function (e) {
            cnsPlusRosata.inspector.updateOptions(e);
        }, false);
        // Listen to Clear to form
        this.clearBtn.addEventListener('click', function (e) {
            cnsPlusRosata.inspector.clearFields(e);
        }, false);
    },

    // Called when Text Field Changes
    updateObject: function (e, option) {
        var names = this.obj.value.split('.');
        if (option) { //check for SELECT VALUE
            names.push(option); // Add it to the array and to the text input
            this.obj.value = this.obj.value + '.' + names[names.length - 1];
        }
        this.current = undefined;
        this.opt.innerHTML = '';
        for (var i = 0; i < names.length; i++) {
            if (names[0] == 'window') {
                names.shift('window');
                if (names.length < 1) {
                    this.current = window;
                    break;
                }
            }
            this.current = window[names[i]];
        }
        this.info.innerHTML = '<pre>' + this.current + '</pre>';
        this.fillSelect();
    },

    updateOptions: function (e) {
        var selectMenu = this.opt;
        this.updateObject(e, selectMenu[selectMenu.selectedIndex].value);
    },

    // Clears Everything except for Asserts and Logs
    clearFields: function (e) {
        this.obj.value = '';
        this.info.innerHTML = '';
    },

    fillSelect: function () {
        var i,
        select = document.getElementById('optRosata'),
            items = Object.getOwnPropertyNames(this.current);
        select.innerHTML = '';
        for (i = 0; i < items.length; i++) {
            var option = document.createElement('option');
            option.text = items[i];
            select.value = items[i];
            select.appendChild(option);
        }
    }

};

///////////////////////////////////////////
///// CONSOLE BUILDING OBJECT ///////////// 
///////////////////////////////////////////
//
// Methods: create, cssRules
cnsPlusRosata.consoleBuilder = {
    create: function () {
        // Function to build below Elements with any properies you need
        var buildElm = function (type, props, className) {
            var elm = document.createElement(type);
            if (props) {
                for (var x in props) {
                    elm[x] = props[x];
                }
            }
            // If className argument class, add it
            if (className) {
                console.log(elm);
                elm.classList.add(className);
            }
            return elm;
        };

        // Build all the elements needed to build console
        var consolePlus = buildElm('div', {
            "id": "consolePlusRosata"
        }, "cnsPlusRosata");
        var menuBar = buildElm('div', {
            "id": "cnsPlusMenuBar"
        }, "menuBarRosata");
        var optsMenu = buildElm('div', {
            "id": "cnsPlusOptionBtn"
        }, "btnRosata");
        //Next two are logging and assert
        var result = buildElm('ul', {
            "id": "resRosata"
        }, "logsRosata");
        var myLog = buildElm('ul', {
            "id": "myLogRosata"
        }, "logsRosata");
        var form = buildElm('form', {
            "name": "insRosata",
                "id": "insRosata"
        });
        // Next three go into form
        var inputObj = buildElm('input', {
            "type": "text",
                "name": "objRosata",
                "id": "objRosata"
        });
        var select = buildElm('select', {
            "name": "optRosata",
                "id": "optRosata"
        });
        var inputBtn = buildElm('input', {
            "type": "button",
                "name": "clearObjRosata",
                "id": "clearObjRosata",
                "value": "clear"
        });
        // Last one on console
        var infoDiv = buildElm('div', {
            "id": "infoRosata"
        }, "consolePlusRosata");

        // Append Text into the menuBar div
        optsMenu.appendChild(document.createTextNode("Options"));
        menuBar.appendChild(optsMenu);
        // Append Text into the Log divs
        result.appendChild(document.createTextNode('Assert Logs'));
        myLog.appendChild(document.createTextNode('Console Log'));
        // Build the whole console
        consolePlus.appendChild(menuBar);
        consolePlus.appendChild(result);
        consolePlus.appendChild(myLog);
        form.appendChild(inputObj);
        form.appendChild(select);
        form.appendChild(inputBtn);
        consolePlus.appendChild(form);
        consolePlus.appendChild(infoDiv);

        return consolePlus;
    },

    cssRules: function () {
        var i,
        sheet = document.styleSheets[document.styleSheets.length - 1];
        // Make a multidimensional Array of selector rule pairs
        var cssRules = [
            ['.cnsPlusRosata', 'width:500px;border:3px solid #2F4F4F;border-radius: 6px;border-bottom-left-radius: 0;border-top-right-radius: 0; background-color: #F5DEB3;position:fixed;top:18px;right:18px;z-index:9000;'],
            ['.cnsPlusRosata > form', 'border:6px solid #2F4F4F;margin: 0;background-color: white;'],
            ['.cnsPlusRosata > form > select', 'min-width: 140px;'],
            ['.cnsPlusRosata > .logsRosata', 'display:inline-block;width: 30%;'],
            ['.cnsPlusRosata > .cnsPlusRosata', 'border: none;'],
            ['.menuBarRosata', '  background-color: rgb(133,155,166);border-bottom: 1px solid black;margin: 0px;height: 22px;'],
            ['.btnRosata', '  background-color: rgb(133,155,166);border-bottom: 1px solid black;margin: 0px 10px;padding:0px 6px;height: 22px;width:70px;'],
            ['.btnRosata:hover', 'cursor: pointer;background-color: rgba(30,30,30,.2);'],
            ['li.passRosata', 'color:green'],
            ['li.failRosata', 'color:red;']
        ];
        // Loop through them all adding to last stylesheet collection
        for (i = 0; i < cssRules.length; i++) {
            sheet.addRule(cssRules[i][0], cssRules[i][1], i);
        }
    }
};


///////////////////////////////////////////
///// NOW START THE INITIATION! ///////////// 
///////////////////////////////////////////

// Init all objects via consolePlus.init 
// use log(str) to log regular and console.
// use log(str, value) to assert something
cnsPlusRosata.consolePlus.init();