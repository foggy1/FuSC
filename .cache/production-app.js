"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _apiRunnerBrowser = require("./api-runner-browser");

var _apiRunnerBrowser2 = _interopRequireDefault(_apiRunnerBrowser);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = require("react-router-dom");

var _reactRouterScroll = require("react-router-scroll");

var _createBrowserHistory = require("history/createBrowserHistory");

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _emitter = require("./emitter");

var _emitter2 = _interopRequireDefault(_emitter);

var _pages = require("./pages.json");

var _pages2 = _interopRequireDefault(_pages);

var _componentRenderer = require("./component-renderer");

var _componentRenderer2 = _interopRequireDefault(_componentRenderer);

var _asyncRequires = require("./async-requires");

var _asyncRequires2 = _interopRequireDefault(_asyncRequires);

var _loader = require("./loader");

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.___emitter = _emitter2.default;
// emitter.on(`*`, (type, e) => console.log(`emitter`, type, e))

// import invariant from "invariant"

_loader2.default.addPagesArray(_pages2.default);
_loader2.default.addProdRequires(_asyncRequires2.default);
window.asyncRequires = _asyncRequires2.default;

window.___loader = _loader2.default;

window.matchPath = _reactRouterDom.matchPath;

// Let the site/plugins run code very early.
(0, _apiRunnerBrowser2.default)(`onClientEntry`);

var navigateTo = function navigateTo(pathname) {
  // If we're already at this path, do nothing.
  if (window.location.pathname === pathname) {
    return;
  }

  // Listen to loading events. If page resources load before
  // a second, navigate immediately.
  function eventHandler(e) {
    if (e.page.path === _loader2.default.getPage(pathname).path) {
      _emitter2.default.off(`onPostLoadPageResources`, eventHandler);
      clearTimeout(timeoutId);
      window.___history.push(pathname);
    }
  }

  // Start a timer to wait for a second before transitioning and showing a
  // loader in case resources aren't around yet.
  var timeoutId = setTimeout(function () {
    _emitter2.default.off(`onPostLoadPageResources`, eventHandler);
    _emitter2.default.emit(`onDelayedLoadPageResources`, { pathname });
    window.___history.push(pathname);
  }, 1000);

  if (_loader2.default.getResourcesForPathname(pathname)) {
    // The resources are already loaded so off we go.
    clearTimeout(timeoutId);
    window.___history.push(pathname);
  } else {
    // They're not loaded yet so let's add a listener for when
    // they finish loading.
    _emitter2.default.on(`onPostLoadPageResources`, eventHandler);
  }
};

// window.___loadScriptsForPath = loadScriptsForPath
window.___navigateTo = navigateTo;

var history = (0, _createBrowserHistory2.default)();

function attachToHistory(history) {
  window.___history = history;

  history.listen(function (location, action) {
    (0, _apiRunnerBrowser2.default)(`onRouteUpdate`, { location, action });
  });
}

function shouldUpdateScroll(prevRouterProps, _ref) {
  var pathname = _ref.location.pathname;

  var results = (0, _apiRunnerBrowser2.default)(`shouldUpdateScroll`, {
    prevRouterProps,
    pathname
  });
  if (results.length > 0) {
    return results[0];
  }

  if (prevRouterProps) {
    var oldPathname = prevRouterProps.location.pathname;

    if (oldPathname === pathname) {
      return false;
    }
  }
  return true;
}

var AltRouter = (0, _apiRunnerBrowser2.default)(`replaceRouterComponent`, { history })[0];
var DefaultRouter = function DefaultRouter(_ref2) {
  var children = _ref2.children;
  return _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    { history: history },
    children
  );
};

var loadLayout = function loadLayout(cb) {
  if (_asyncRequires2.default.layouts[`index`]) {
    _asyncRequires2.default.layouts[`index`](function (err, executeChunk) {
      var module = executeChunk();
      cb(module);
    });
  } else {
    cb(function (props) {
      return _react2.default.createElement(
        "div",
        null,
        props.children()
      );
    });
  }
};

loadLayout(function (layout) {
  var Root = function Root() {
    return (0, _react.createElement)(AltRouter ? AltRouter : DefaultRouter, null, (0, _react.createElement)(_reactRouterScroll.ScrollContext, { shouldUpdateScroll }, (0, _react.createElement)((0, _reactRouterDom.withRouter)(layout), {
      children: function children(layoutProps) {
        return (0, _react.createElement)(_reactRouterDom.Route, {
          render: function render(routeProps) {
            attachToHistory(routeProps.history);
            var props = layoutProps ? layoutProps : routeProps;
            if (_loader2.default.getPage(props.location.pathname)) {
              return (0, _react.createElement)(_componentRenderer2.default, (0, _extends3.default)({}, props));
            } else {
              // TODO check (somehow) if we loaded the page
              // from a service worker (app shell) as if this
              // is the case and we get a 404 we want to kill
              // the sw and reload as probably the user is
              // trying to visit a page that was created after
              // the first time they visited.
              return (0, _react.createElement)(_componentRenderer2.default, {
                location: { pathname: `/404.html` }
              });
            }
          }
        });
      }
    })));
  };

  var NewRoot = (0, _apiRunnerBrowser2.default)(`wrapRootComponent`, { Root }, Root)[0];
  _reactDom2.default.render(_react2.default.createElement(NewRoot, null), typeof window !== `undefined` ? document.getElementById(`___gatsby`) : void 0);
});
//# sourceMappingURL=production-app.js.map