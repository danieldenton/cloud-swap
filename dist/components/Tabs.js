"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabs = void 0;
var react_1 = __importDefault(require("react"));
var Nav_1 = __importDefault(require("react-bootstrap/Nav"));
var react_router_bootstrap_1 = require("react-router-bootstrap");
var react_router_dom_1 = require("react-router-dom");
var Tabs = function () {
    var location = (0, react_router_dom_1.useLocation)();
    var links = [
        {
            to: "/",
            text: "Swap",
        },
        {
            to: "/deposit",
            text: "Deposit",
        },
        {
            to: "/withdraw",
            text: "Withdraw",
        },
        {
            to: "/charts",
            text: "Charts",
        },
    ];
    var linkPills = links.map(function (link, idx) {
        return (react_1.default.createElement(react_router_bootstrap_1.LinkContainer, { key: idx, to: link.to, className: "purple fw-bold", style: location.pathname === link.to
                ? { backgroundColor: "#D8BFD8", color: 'purple', border: "solid 2px purple", borderRadius: '10px' }
                : { backgroundColor: "transparent" } },
            react_1.default.createElement(Nav_1.default.Link, null, link.text)));
    });
    return (react_1.default.createElement(Nav_1.default, { variant: "pills", defaultActiveKey: "/", className: "justify-content-center my-4" }, linkPills));
};
exports.Tabs = Tabs;
exports.default = exports.Tabs;
//# sourceMappingURL=Tabs.js.map