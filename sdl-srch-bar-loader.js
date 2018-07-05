
/**
 * Returns true if the `class` statement is available.
 *
 * @returns {boolean}
 */
var classFunc = function () {
  return evaluates('class Something {}')
}

/**
 * Returns true if the arrow functions available.
 *
 * @returns {boolean}
 */
var arrowFunc = function () {
  return evaluates('var f = x => 1')
}

/**
 * Returns true if the `let` statement is available.
 *
 * @returns {boolean}
 */
var letFunc = function () {
  return evaluates('let a = 1')
}

/**
 * Returns true if the `const` statement is available.
 *
 * @returns {boolean}
 */
var constFunc = function () {
  return evaluates('const a = 1')
}

/**
 * Returns true if the [new Array features](http://exploringjs.com/es6/ch_arrays.html) are available (exluding `Array.prototype.values` which has zero support anywhere).
 *
 * @returns {boolean}
 */
var newArrayFeatures = function () {
  return typeof Array.prototype.find !== 'undefined' &&
    typeof Array.prototype.findIndex !== 'undefined' &&
    typeof Array.from !== 'undefined' &&
    typeof Array.of !== 'undefined' &&
    typeof Array.prototype.entries !== 'undefined' &&
    typeof Array.prototype.keys !== 'undefined' &&
    typeof Array.prototype.copyWithin !== 'undefined' &&
    typeof Array.prototype.fill !== 'undefined'
}

/**
 * Returns true if the new functions of Object are available.
 *
 * @returns {boolean}
 */
var newObjectFunc = function () {
  return typeof Object.assign !== 'undefined' &&
    typeof Object.setPrototypeOf !== 'undefined' &&
    typeof Object.getOwnPropertySymbols !== 'undefined' &&
    typeof Object.is !== 'undefined'
}

/**
 * Returns true if `Map`, `WeakMap`, `Set` and `WeakSet` are available.
 *
 * @returns {boolean}
 */
var collections = function () {
  return typeof Map !== 'undefined' &&
    typeof WeakMap !== 'undefined' &&
    typeof Set !== 'undefined' &&
    typeof WeakSet !== 'undefined'
}

/**
 * Returns true if generators are available.
 *
 * @returns {boolean}
 */
var generators = function () {
  return evaluates('function* test() {}')
}

/**
 * Returns true if `Promise` is available.
 *
 * @returns {boolean}
 */
var promiseFunc = function () {
  return typeof Promise !== 'undefined'
}

/**
 * Returns true if template strings are available.
 *
 * @returns {boolean}
 */
var templateFunc = function () {
  return evaluates('var a = `a`')
}

/**
 * Returns true if `Symbol` is available.
 *
 * @returns {boolean}
 */
var symbolsFunc = function () {
  return typeof Symbol !== 'undefined' && typeof Symbol.for === 'function'
}

/**
 * Returns true if destructuring is available.
 *
 * @returns {boolean}
 */
var destructuring = function () {
  return evaluates("var { first: f, last: l } = { first: 'Jane', last: 'Doe' }")
}

/**
 * Returns true if the spread operator (`...`) is available.
 *
 * @returns {boolean}
 */
var spreadFunc = function () {
  return evaluates('Math.max(...[ 5, 10 ])')
}

/**
 * Returns true if default parameter values are available.
 *
 * @returns {boolean}
 */
var defaultParamValues = function () {
  return evaluates('function test (one = 1) {}')
}

var importFunc = function () {
  try {
    new Function('import("")');
    return true;
  } catch (err) {
    return false;
  }
}

function evaluates (statement) {
  try {
    eval(statement)
    return true
  } catch (err) {
    return false
  }
}

var cScriptLoader = (function ()
{
    function cScriptLoader(files)
    {
        var _this = this;
        this.log = function (t)
        {
            console.log("ScriptLoader: " + t);
        };
        this.withNoCache = function (filename)
        {
            if (filename.indexOf("?") === -1)
                filename += "?no_cache=" + new Date().getTime();
            else
                filename += "&no_cache=" + new Date().getTime();
            return filename;
        };
        this.loadStyle = function (filename)
        {
            // HTMLLinkElement
            var link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = _this.withNoCache(filename);
            _this.log('Loading style ' + filename);
            link.onload = function ()
            {
                _this.log('Loaded style "' + filename + '".');
            };
            link.onerror = function ()
            {
                _this.log('Error loading style "' + filename + '".');
            };
            _this.m_head.appendChild(link);
        };
        this.loadScript = function (i)
        {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = _this.withNoCache(_this.m_js_files[i]);
            var loadNextScript = function ()
            {
                if (i + 1 < _this.m_js_files.length)
                {
                    _this.loadScript(i + 1);
                }
            };
            script.onload = function ()
            {
                _this.log('Loaded script "' + _this.m_js_files[i] + '".');
                loadNextScript();
            };
            script.onerror = function ()
            {
                _this.log('Error loading script "' + _this.m_js_files[i] + '".');
                loadNextScript();
            };
            _this.log('Loading script "' + _this.m_js_files[i] + '".');
            _this.m_head.appendChild(script);
        };
        this.loadFiles = function ()
        {
            // this.log(this.m_css_files);
            // this.log(this.m_js_files);
            for (var i = 0; i < _this.m_css_files.length; ++i)
                _this.loadStyle(_this.m_css_files[i]);
            _this.loadScript(0);
        };
        this.m_js_files = [];
        this.m_css_files = [];
        this.m_head = document.getElementsByTagName("head")[0];
        // this.m_head = document.head; // IE9+ only
        function endsWith(str, suffix)
        {
            if (str === null || suffix === null)
                return false;
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }
        for (var i = 0; i < files.length; ++i)
        {
            if (endsWith(files[i], ".css"))
            {
                this.m_css_files.push(files[i]);
            }
            else if (endsWith(files[i], ".js"))
            {
                this.m_js_files.push(files[i]);
            }
            else
                this.log('Error unknown filetype "' + files[i] + '".');
        }
    }
    return cScriptLoader;
})();




if (classFunc() && spreadFunc() && promiseFunc() 
      && newObjectFunc() && arrowFunc() && symbolsFunc() 
      && templateFunc() && importFunc()) {
  console.log("loading es6...");
  var ScriptLoader = new cScriptLoader(["./es6-bundled/amd-loader.js", "./es6-bundled/sdl-srch-bar.js"]);
  ScriptLoader.loadFiles();
} else {
  console.log("loading es5...");
  var ScriptLoader = new cScriptLoader(["./es6-bundled/amd-loader.js", "./es6-bundled/sdl-srch-bar.js"]);
  ScriptLoader.loadFiles();
}


