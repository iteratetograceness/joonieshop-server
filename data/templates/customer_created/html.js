"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _button = require("@react-email/button");
var _container = require("@react-email/container");
var _font = require("@react-email/font");
var _head = require("@react-email/head");
var _html = require("@react-email/html");
var _preview = require("@react-email/preview");
var _section = require("@react-email/section");
var _tailwind = require("@react-email/tailwind");
var _text = require("@react-email/text");
var _hr = require("@react-email/hr");
var React = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Email = function Email(_ref) {
  var _ref$first_name = _ref.first_name,
    first_name = _ref$first_name === void 0 ? 'there!' : _ref$first_name;
  return /*#__PURE__*/React.createElement(_html.Html, {
    lang: "en"
  }, /*#__PURE__*/React.createElement(_head.Head, null, /*#__PURE__*/React.createElement("title", null, "welcome 2 joonieshop"), /*#__PURE__*/React.createElement(_font.Font, {
    fontFamily: "Libre Caslon Text",
    fallbackFontFamily: "Times New Roman",
    webFont: {
      url: 'https://fonts.gstatic.com/s/librecaslontext/v5/DdT878IGsGw1aF1JU10PUbTvNNaDMfq41-JJHRO0.woff2',
      format: 'woff2'
    },
    fontWeight: 400,
    fontStyle: "normal"
  })), /*#__PURE__*/React.createElement(_preview.Preview, null, "thanks for signing up!"), /*#__PURE__*/React.createElement(_tailwind.Tailwind, {
    config: {
      theme: {
        extend: {
          colors: {
            dark: '#071013',
            light: '#F8F7F7',
            'dark-blue': '#274496',
            'light-blue': 'hsl(216, 25%, 75%)',
            yellow: 'hsl(41, 68%, 54%)',
            brown: '#903C18',
            'light-brown': 'hsl(21, 38%, 55%)',
            'dark-brown': 'hsl(18, 97%, 17%)',
            red: 'hsl(12, 61%, 47%)'
          }
        }
      }
    }
  }, /*#__PURE__*/React.createElement(_container.Container, {
    className: "mx-0 my-auto p-6"
  }, /*#__PURE__*/React.createElement(_button.Button, {
    href: "https://shop.joonie.dev",
    className: "text-brown text-4xl",
    style: {
      fontFamily: 'Libre Caslon Text'
    }
  }, "joonieshop"), /*#__PURE__*/React.createElement(_section.Section, {
    className: "text-brown"
  }, /*#__PURE__*/React.createElement(_text.Text, null, "hi ", first_name.toLowerCase(), ","), /*#__PURE__*/React.createElement(_text.Text, null, "welcome to joonieshop! i'm happy you're here. and don't worry, i won't spam you with emails (yet and only if you explicitly say yes)! your email will be used for order updates and in case your need to reset your password."), /*#__PURE__*/React.createElement(_button.Button, {
    href: "https://shop.joonie.dev",
    className: "text-light bg-brown px-4 py-2 rounded my-2"
  }, "shop now"), /*#__PURE__*/React.createElement(_hr.Hr, {
    className: "border-brown border-px mt-8"
  }), /*#__PURE__*/React.createElement(_text.Text, null, "\xA9 ", new Date().getFullYear())))));
};
var _default = Email;
exports["default"] = _default;
