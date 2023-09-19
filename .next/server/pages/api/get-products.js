"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/get-products";
exports.ids = ["pages/api/get-products"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "(api)/./pages/api/get-products.ts":
/*!***********************************!*\
  !*** ./pages/api/get-products.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nasync function getProducts() {\n    try {\n        const response = await prisma.products.findMany();\n        console.log(response);\n        return response;\n    } catch (error) {\n        console.error(error);\n    }\n}\nasync function handler(req, res) {\n    try {\n        const products = await getProducts();\n        res.status(200).json({\n            items: products,\n            message: \"Success\"\n        });\n    } catch (error) {\n        res.status(400).json({\n            message: \"Failed\"\n        });\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvZ2V0LXByb2R1Y3RzLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUM2QztBQUU3QyxNQUFNQyxNQUFNLEdBQUcsSUFBSUQsd0RBQVksRUFBRTtBQUVqQyxlQUFlRSxXQUFXLEdBQUc7SUFDM0IsSUFBSTtRQUNGLE1BQU1DLFFBQVEsR0FBRyxNQUFNRixNQUFNLENBQUNHLFFBQVEsQ0FBQ0MsUUFBUSxFQUFFO1FBQ2pEQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0osUUFBUSxDQUFDO1FBQ3JCLE9BQU9BLFFBQVE7S0FDaEIsQ0FBQyxPQUFPSyxLQUFLLEVBQUU7UUFDZEYsT0FBTyxDQUFDRSxLQUFLLENBQUNBLEtBQUssQ0FBQztLQUNyQjtDQUNGO0FBT2MsZUFBZUMsT0FBTyxDQUNuQ0MsR0FBbUIsRUFDbkJDLEdBQTBCLEVBQzFCO0lBQ0EsSUFBSTtRQUNGLE1BQU1QLFFBQVEsR0FBRyxNQUFNRixXQUFXLEVBQUU7UUFDcENTLEdBQUcsQ0FBQ0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFBRUMsS0FBSyxFQUFFVixRQUFRO1lBQUVXLE9BQU8sRUFBRSxTQUFTO1NBQUUsQ0FBQztLQUM5RCxDQUFDLE9BQU9QLEtBQUssRUFBRTtRQUNkRyxHQUFHLENBQUNDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO1lBQUVFLE9BQU8sRUFBRSxRQUFRO1NBQUUsQ0FBQztLQUM1QztDQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY29tbWVyY2UvLi9wYWdlcy9hcGkvZ2V0LXByb2R1Y3RzLnRzPzI5YjYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSAnbmV4dCdcbmltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50J1xuXG5jb25zdCBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KClcblxuYXN5bmMgZnVuY3Rpb24gZ2V0UHJvZHVjdHMoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBwcmlzbWEucHJvZHVjdHMuZmluZE1hbnkoKVxuICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgIHJldHVybiByZXNwb25zZVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gIH1cbn1cblxudHlwZSBEYXRhID0ge1xuICBpdGVtcz86IGFueVxuICBtZXNzYWdlOiBzdHJpbmdcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihcbiAgcmVxOiBOZXh0QXBpUmVxdWVzdCxcbiAgcmVzOiBOZXh0QXBpUmVzcG9uc2U8RGF0YT5cbikge1xuICB0cnkge1xuICAgIGNvbnN0IHByb2R1Y3RzID0gYXdhaXQgZ2V0UHJvZHVjdHMoKVxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgaXRlbXM6IHByb2R1Y3RzLCBtZXNzYWdlOiAnU3VjY2VzcycgfSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6ICdGYWlsZWQnIH0pXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJwcmlzbWEiLCJnZXRQcm9kdWN0cyIsInJlc3BvbnNlIiwicHJvZHVjdHMiLCJmaW5kTWFueSIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJzdGF0dXMiLCJqc29uIiwiaXRlbXMiLCJtZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/get-products.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/get-products.ts"));
module.exports = __webpack_exports__;

})();