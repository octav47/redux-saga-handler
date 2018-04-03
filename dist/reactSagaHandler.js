'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.middleware = exports.createSagaHandler = exports.setConfig = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.handle = handle;

var _effects = require('redux-saga/effects');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regeneratorRuntime.mark(handle);

var ReduxSagaHandler = function ReduxSagaHandler() {
    (0, _classCallCheck3.default)(this, ReduxSagaHandler);
};

var _config = {
    handle: function handle() {}
};

function handle(action, fn) {
    return _regenerator2.default.wrap(function handle$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return fn(action);

                case 3:
                    _context.next = 13;
                    break;

                case 5:
                    _context.prev = 5;
                    _context.t0 = _context['catch'](0);

                    if (!_config[_context.t0.code]) {
                        _context.next = 12;
                        break;
                    }

                    _context.next = 10;
                    return _config[_context.t0.code](action);

                case 10:
                    _context.next = 13;
                    break;

                case 12:
                    (0, _effects.put)({ type: '@@redux-saga-handler/UNKNOWN_ERROR' });

                case 13:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this, [[0, 5]]);
}

var setConfig = exports.setConfig = function setConfig(newConfig) {
    _config = (0, _extends3.default)({}, _config, newConfig);
};

var createSagaHandler = exports.createSagaHandler = function createSagaHandler(config) {};

var middleware = exports.middleware = function middleware(store) {
    return function (next) {
        return function (action) {
            if (action['@@redux-saga/SAGA_ACTION']) {
                _config.handle(store, next, action);
            }

            next(action);
        };
    };
};
