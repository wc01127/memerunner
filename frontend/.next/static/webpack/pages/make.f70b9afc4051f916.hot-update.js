"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/make",{

/***/ "./pages/make.js":
/*!***********************!*\
  !*** ./pages/make.js ***!
  \***********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ YourPageName; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _s = $RefreshSig$();\n\n\nfunction YourPageName() {\n    _s();\n    const [isConnected, setIsConnected] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [walletAddress, setWalletAddress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const connectWallet = async ()=>{\n        if (window.ethereum) {\n            try {\n                const accounts = await window.ethereum.request({\n                    method: \"eth_requestAccounts\"\n                });\n                if (accounts.length > 0) {\n                    const formattedAddress = \"\".concat(accounts[0].substring(0, 7), \"...\").concat(accounts[0].substring(accounts[0].length - 5));\n                    setWalletAddress(formattedAddress);\n                    setIsConnected(true);\n                }\n            } catch (error) {\n                console.error(\"Error connecting to MetaMask\", error);\n            }\n        } else {\n            console.error(\"MetaMask not detected\");\n        }\n    };\n    const disconnectWallet = ()=>{\n        setIsConnected(false);\n        setWalletAddress(\"\");\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: \"main-background flex min-h-screen flex-col items-center justify-center p-2.5 bg-no-repeat bg-cover bg-center relative\",\n        style: {\n            backgroundImage: \"url('/factory_background.mp4')\"\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"video\", {\n                autoPlay: true,\n                loop: true,\n                muted: true,\n                className: \"absolute w-full h-full object-cover\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"source\", {\n                    src: \"/factory_background.mp4\",\n                    type: \"video/mp4\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\NeiSen\\\\Documents\\\\Projects\\\\memerunner\\\\frontend\\\\pages\\\\make.js\",\n                    lineNumber: 35,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\NeiSen\\\\Documents\\\\Projects\\\\memerunner\\\\frontend\\\\pages\\\\make.js\",\n                lineNumber: 34,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"title-button-container w-full\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        className: \"neon-title neon-title-main text-6xl font-bold font-cyberpunk opacity-0.95 text-cyberpunkYellow\",\n                        children: \"Maker's Factory\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\NeiSen\\\\Documents\\\\Projects\\\\memerunner\\\\frontend\\\\pages\\\\make.js\",\n                        lineNumber: 39,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: isConnected ? disconnectWallet : connectWallet,\n                        className: \"button-connect-wallet neon-button px-6 py-3 font-cyberpunk\",\n                        children: isConnected ? \"Connected\" : \"Connect Wallet\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\NeiSen\\\\Documents\\\\Projects\\\\memerunner\\\\frontend\\\\pages\\\\make.js\",\n                        lineNumber: 40,\n                        columnNumber: 9\n                    }, this),\n                    isConnected && walletAddress && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"wallet-address neon-title font-cyberpunk text-cyberpunkYellow\",\n                        children: walletAddress\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\NeiSen\\\\Documents\\\\Projects\\\\memerunner\\\\frontend\\\\pages\\\\make.js\",\n                        lineNumber: 47,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\NeiSen\\\\Documents\\\\Projects\\\\memerunner\\\\frontend\\\\pages\\\\make.js\",\n                lineNumber: 38,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                href: \"/\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                    className: \"button-make font-cyberpunk\",\n                    children: [\n                        \"B\",\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\NeiSen\\\\Documents\\\\Projects\\\\memerunner\\\\frontend\\\\pages\\\\make.js\",\n                            lineNumber: 55,\n                            columnNumber: 12\n                        }, this),\n                        \"A\",\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\NeiSen\\\\Documents\\\\Projects\\\\memerunner\\\\frontend\\\\pages\\\\make.js\",\n                            lineNumber: 55,\n                            columnNumber: 18\n                        }, this),\n                        \"C\",\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\NeiSen\\\\Documents\\\\Projects\\\\memerunner\\\\frontend\\\\pages\\\\make.js\",\n                            lineNumber: 55,\n                            columnNumber: 24\n                        }, this),\n                        \"K\"\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\NeiSen\\\\Documents\\\\Projects\\\\memerunner\\\\frontend\\\\pages\\\\make.js\",\n                    lineNumber: 54,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\NeiSen\\\\Documents\\\\Projects\\\\memerunner\\\\frontend\\\\pages\\\\make.js\",\n                lineNumber: 53,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                href: \"/take\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                    className: \"button-take font-cyberpunk\",\n                    children: [\n                        \"T\",\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\NeiSen\\\\Documents\\\\Projects\\\\memerunner\\\\frontend\\\\pages\\\\make.js\",\n                            lineNumber: 61,\n                            columnNumber: 10\n                        }, this),\n                        \"A\",\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\NeiSen\\\\Documents\\\\Projects\\\\memerunner\\\\frontend\\\\pages\\\\make.js\",\n                            lineNumber: 61,\n                            columnNumber: 16\n                        }, this),\n                        \"K\",\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\NeiSen\\\\Documents\\\\Projects\\\\memerunner\\\\frontend\\\\pages\\\\make.js\",\n                            lineNumber: 61,\n                            columnNumber: 22\n                        }, this),\n                        \"E\"\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\NeiSen\\\\Documents\\\\Projects\\\\memerunner\\\\frontend\\\\pages\\\\make.js\",\n                    lineNumber: 60,\n                    columnNumber: 7\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\NeiSen\\\\Documents\\\\Projects\\\\memerunner\\\\frontend\\\\pages\\\\make.js\",\n                lineNumber: 59,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"graveyard-button-container\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                    href: \"/graveyard\",\n                    className: \"grave-button font-cyberpunk\",\n                    children: \"Graveyard\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\NeiSen\\\\Documents\\\\Projects\\\\memerunner\\\\frontend\\\\pages\\\\make.js\",\n                    lineNumber: 66,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\NeiSen\\\\Documents\\\\Projects\\\\memerunner\\\\frontend\\\\pages\\\\make.js\",\n                lineNumber: 65,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"watermark\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                        src: \"/watermark3.png\",\n                        alt: \"Watermark\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\NeiSen\\\\Documents\\\\Projects\\\\memerunner\\\\frontend\\\\pages\\\\make.js\",\n                        lineNumber: 70,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                        src: \"/robot.gif\",\n                        className: \"robot-gif\",\n                        alt: \"Robot Animation\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\NeiSen\\\\Documents\\\\Projects\\\\memerunner\\\\frontend\\\\pages\\\\make.js\",\n                        lineNumber: 71,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\NeiSen\\\\Documents\\\\Projects\\\\memerunner\\\\frontend\\\\pages\\\\make.js\",\n                lineNumber: 69,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\NeiSen\\\\Documents\\\\Projects\\\\memerunner\\\\frontend\\\\pages\\\\make.js\",\n        lineNumber: 31,\n        columnNumber: 5\n    }, this);\n}\n_s(YourPageName, \"sjyewvkkSa05Xnf5EU2cSQGmZrU=\");\n_c = YourPageName;\nvar _c;\n$RefreshReg$(_c, \"YourPageName\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9tYWtlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQW1EO0FBQ3RCO0FBRWQsU0FBU0k7O0lBQ3RCLE1BQU0sQ0FBQ0MsYUFBYUMsZUFBZSxHQUFHTCwrQ0FBUUEsQ0FBQztJQUMvQyxNQUFNLENBQUNNLGVBQWVDLGlCQUFpQixHQUFHUCwrQ0FBUUEsQ0FBQztJQUVuRCxNQUFNUSxnQkFBZ0I7UUFDcEIsSUFBSUMsT0FBT0MsUUFBUSxFQUFFO1lBQ25CLElBQUk7Z0JBQ0YsTUFBTUMsV0FBVyxNQUFNRixPQUFPQyxRQUFRLENBQUNFLE9BQU8sQ0FBQztvQkFBRUMsUUFBUTtnQkFBc0I7Z0JBQy9FLElBQUlGLFNBQVNHLE1BQU0sR0FBRyxHQUFHO29CQUN2QixNQUFNQyxtQkFBbUIsR0FBb0NKLE9BQWpDQSxRQUFRLENBQUMsRUFBRSxDQUFDSyxTQUFTLENBQUMsR0FBRyxJQUFHLE9BQW1ELE9BQTlDTCxRQUFRLENBQUMsRUFBRSxDQUFDSyxTQUFTLENBQUNMLFFBQVEsQ0FBQyxFQUFFLENBQUNHLE1BQU0sR0FBRztvQkFDeEdQLGlCQUFpQlE7b0JBQ2pCVixlQUFlO2dCQUNqQjtZQUNGLEVBQUUsT0FBT1ksT0FBTztnQkFDZEMsUUFBUUQsS0FBSyxDQUFDLGdDQUFnQ0E7WUFDaEQ7UUFDRixPQUFPO1lBQ0xDLFFBQVFELEtBQUssQ0FBQztRQUNoQjtJQUNGO0lBRUEsTUFBTUUsbUJBQW1CO1FBQ3ZCZCxlQUFlO1FBQ2ZFLGlCQUFpQjtJQUNuQjtJQUVBLHFCQUNFLDhEQUFDYTtRQUFLQyxXQUFVO1FBQ2RDLE9BQU87WUFBRUMsaUJBQWlCO1FBQWlDOzswQkFFM0QsOERBQUNDO2dCQUFNQyxRQUFRO2dCQUFDQyxJQUFJO2dCQUFDQyxLQUFLO2dCQUFDTixXQUFVOzBCQUNuQyw0RUFBQ087b0JBQU9DLEtBQUk7b0JBQTBCQyxNQUFLOzs7Ozs7Ozs7OzswQkFHN0MsOERBQUNDO2dCQUFJVixXQUFVOztrQ0FDYiw4REFBQ1c7d0JBQUdYLFdBQVU7a0NBQWlHOzs7Ozs7a0NBQy9HLDhEQUFDWTt3QkFDQ0MsU0FBUzlCLGNBQWNlLG1CQUFtQlg7d0JBQzFDYSxXQUFVO2tDQUVUakIsY0FBYyxjQUFjOzs7Ozs7b0JBRTlCQSxlQUFlRSwrQkFDZCw4REFBQ3lCO3dCQUFJVixXQUFVO2tDQUNaZjs7Ozs7Ozs7Ozs7OzBCQUtQLDhEQUFDSixrREFBSUE7Z0JBQUNpQyxNQUFLOzBCQUNULDRFQUFDRjtvQkFBT1osV0FBVTs7d0JBQTZCO3NDQUM1Qyw4REFBQ2U7Ozs7O3dCQUFJO3NDQUFDLDhEQUFDQTs7Ozs7d0JBQUk7c0NBQUMsOERBQUNBOzs7Ozt3QkFBSTs7Ozs7Ozs7Ozs7OzBCQUl0Qiw4REFBQ2xDLGtEQUFJQTtnQkFBQ2lDLE1BQUs7MEJBQ1gsNEVBQUNGO29CQUFPWixXQUFVOzt3QkFBNkI7c0NBQzVDLDhEQUFDZTs7Ozs7d0JBQUk7c0NBQUMsOERBQUNBOzs7Ozt3QkFBSTtzQ0FBQyw4REFBQ0E7Ozs7O3dCQUFJOzs7Ozs7Ozs7Ozs7MEJBSXBCLDhEQUFDTDtnQkFBSVYsV0FBVTswQkFDYiw0RUFBQ25CLGtEQUFJQTtvQkFBQ2lDLE1BQUs7b0JBQWFkLFdBQVU7OEJBQThCOzs7Ozs7Ozs7OzswQkFHbEUsOERBQUNVO2dCQUFJVixXQUFVOztrQ0FDYiw4REFBQ2dCO3dCQUFJUixLQUFJO3dCQUFrQlMsS0FBSTs7Ozs7O2tDQUMvQiw4REFBQ0Q7d0JBQUlSLEtBQUk7d0JBQWFSLFdBQVU7d0JBQVlpQixLQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJeEQ7R0F2RXdCbkM7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvbWFrZS5qcz8xMjZlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gWW91clBhZ2VOYW1lKCkge1xyXG4gIGNvbnN0IFtpc0Nvbm5lY3RlZCwgc2V0SXNDb25uZWN0ZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFt3YWxsZXRBZGRyZXNzLCBzZXRXYWxsZXRBZGRyZXNzXSA9IHVzZVN0YXRlKCcnKTtcclxuXHJcbiAgY29uc3QgY29ubmVjdFdhbGxldCA9IGFzeW5jICgpID0+IHtcclxuICAgIGlmICh3aW5kb3cuZXRoZXJldW0pIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBhY2NvdW50cyA9IGF3YWl0IHdpbmRvdy5ldGhlcmV1bS5yZXF1ZXN0KHsgbWV0aG9kOiAnZXRoX3JlcXVlc3RBY2NvdW50cycgfSk7XHJcbiAgICAgICAgaWYgKGFjY291bnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZEFkZHJlc3MgPSBgJHthY2NvdW50c1swXS5zdWJzdHJpbmcoMCwgNyl9Li4uJHthY2NvdW50c1swXS5zdWJzdHJpbmcoYWNjb3VudHNbMF0ubGVuZ3RoIC0gNSl9YDtcclxuICAgICAgICAgIHNldFdhbGxldEFkZHJlc3MoZm9ybWF0dGVkQWRkcmVzcyk7XHJcbiAgICAgICAgICBzZXRJc0Nvbm5lY3RlZCh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY29ubmVjdGluZyB0byBNZXRhTWFzaycsIGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcignTWV0YU1hc2sgbm90IGRldGVjdGVkJyk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZGlzY29ubmVjdFdhbGxldCA9ICgpID0+IHtcclxuICAgIHNldElzQ29ubmVjdGVkKGZhbHNlKTtcclxuICAgIHNldFdhbGxldEFkZHJlc3MoJycpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8bWFpbiBjbGFzc05hbWU9XCJtYWluLWJhY2tncm91bmQgZmxleCBtaW4taC1zY3JlZW4gZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtMi41IGJnLW5vLXJlcGVhdCBiZy1jb3ZlciBiZy1jZW50ZXIgcmVsYXRpdmVcIlxyXG4gICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKCcvZmFjdG9yeV9iYWNrZ3JvdW5kLm1wNCcpXCIgfX1cclxuICAgID5cclxuICAgICAgPHZpZGVvIGF1dG9QbGF5IGxvb3AgbXV0ZWQgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdy1mdWxsIGgtZnVsbCBvYmplY3QtY292ZXJcIj5cclxuICAgICAgICA8c291cmNlIHNyYz1cIi9mYWN0b3J5X2JhY2tncm91bmQubXA0XCIgdHlwZT1cInZpZGVvL21wNFwiIC8+XHJcbiAgICAgIDwvdmlkZW8+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlLWJ1dHRvbi1jb250YWluZXIgdy1mdWxsXCI+XHJcbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cIm5lb24tdGl0bGUgbmVvbi10aXRsZS1tYWluIHRleHQtNnhsIGZvbnQtYm9sZCBmb250LWN5YmVycHVuayBvcGFjaXR5LTAuOTUgdGV4dC1jeWJlcnB1bmtZZWxsb3dcIj5NYWtlcidzIEZhY3Rvcnk8L2gxPlxyXG4gICAgICAgIDxidXR0b25cclxuICAgICAgICAgIG9uQ2xpY2s9e2lzQ29ubmVjdGVkID8gZGlzY29ubmVjdFdhbGxldCA6IGNvbm5lY3RXYWxsZXR9XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJidXR0b24tY29ubmVjdC13YWxsZXQgbmVvbi1idXR0b24gcHgtNiBweS0zIGZvbnQtY3liZXJwdW5rXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICB7aXNDb25uZWN0ZWQgPyAnQ29ubmVjdGVkJyA6ICdDb25uZWN0IFdhbGxldCd9XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAge2lzQ29ubmVjdGVkICYmIHdhbGxldEFkZHJlc3MgJiYgKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3YWxsZXQtYWRkcmVzcyBuZW9uLXRpdGxlIGZvbnQtY3liZXJwdW5rIHRleHQtY3liZXJwdW5rWWVsbG93XCI+XHJcbiAgICAgICAgICAgIHt3YWxsZXRBZGRyZXNzfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8TGluayBocmVmPVwiL1wiPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uLW1ha2UgZm9udC1jeWJlcnB1bmtcIj5cclxuICAgICAgICAgIEI8YnIvPkE8YnIvPkM8YnIvPktcclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgPC9MaW5rPlxyXG5cclxuICAgICAgPExpbmsgaHJlZj1cIi90YWtlXCI+XHJcbiAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uLXRha2UgZm9udC1jeWJlcnB1bmtcIj5cclxuICAgICAgICBUPGJyLz5BPGJyLz5LPGJyLz5FXHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L0xpbms+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyYXZleWFyZC1idXR0b24tY29udGFpbmVyXCI+XHJcbiAgICAgICAgPExpbmsgaHJlZj1cIi9ncmF2ZXlhcmRcIiBjbGFzc05hbWU9XCJncmF2ZS1idXR0b24gZm9udC1jeWJlcnB1bmtcIj5HcmF2ZXlhcmQ8L0xpbms+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3YXRlcm1hcmtcIj5cclxuICAgICAgICA8aW1nIHNyYz1cIi93YXRlcm1hcmszLnBuZ1wiIGFsdD1cIldhdGVybWFya1wiIC8+XHJcbiAgICAgICAgPGltZyBzcmM9XCIvcm9ib3QuZ2lmXCIgY2xhc3NOYW1lPVwicm9ib3QtZ2lmXCIgYWx0PVwiUm9ib3QgQW5pbWF0aW9uXCIgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L21haW4+XHJcbiAgKTtcclxufVxyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIkxpbmsiLCJZb3VyUGFnZU5hbWUiLCJpc0Nvbm5lY3RlZCIsInNldElzQ29ubmVjdGVkIiwid2FsbGV0QWRkcmVzcyIsInNldFdhbGxldEFkZHJlc3MiLCJjb25uZWN0V2FsbGV0Iiwid2luZG93IiwiZXRoZXJldW0iLCJhY2NvdW50cyIsInJlcXVlc3QiLCJtZXRob2QiLCJsZW5ndGgiLCJmb3JtYXR0ZWRBZGRyZXNzIiwic3Vic3RyaW5nIiwiZXJyb3IiLCJjb25zb2xlIiwiZGlzY29ubmVjdFdhbGxldCIsIm1haW4iLCJjbGFzc05hbWUiLCJzdHlsZSIsImJhY2tncm91bmRJbWFnZSIsInZpZGVvIiwiYXV0b1BsYXkiLCJsb29wIiwibXV0ZWQiLCJzb3VyY2UiLCJzcmMiLCJ0eXBlIiwiZGl2IiwiaDEiLCJidXR0b24iLCJvbkNsaWNrIiwiaHJlZiIsImJyIiwiaW1nIiwiYWx0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/make.js\n"));

/***/ })

});