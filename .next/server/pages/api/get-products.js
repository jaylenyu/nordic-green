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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nasync function getProducts(skip, take) {\n    try {\n        const response = await prisma.products.findMany({\n            skip: skip,\n            take: take\n        });\n        console.log(response);\n        return response;\n    } catch (error) {\n        console.error(error);\n    }\n}\nasync function handler(req, res) {\n    const { skip , take  } = req.query;\n    if (skip == null || take == null) {\n        res.status(400).json({\n            message: \"no skip of take\"\n        });\n        return;\n    }\n    try {\n        const products = await getProducts(Number(skip), Number(take));\n        res.status(200).json({\n            items: products,\n            message: \"Success\"\n        });\n    } catch (error) {\n        res.status(400).json({\n            message: \"Failed\"\n        });\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvZ2V0LXByb2R1Y3RzLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUM4QztBQUU5QyxNQUFNQyxNQUFNLEdBQUcsSUFBSUQsd0RBQVksRUFBRTtBQUVqQyxlQUFlRSxXQUFXLENBQUNDLElBQVksRUFBRUMsSUFBWSxFQUFFO0lBQ3JELElBQUk7UUFDRixNQUFNQyxRQUFRLEdBQUcsTUFBTUosTUFBTSxDQUFDSyxRQUFRLENBQUNDLFFBQVEsQ0FBQztZQUM5Q0osSUFBSSxFQUFFQSxJQUFJO1lBQ1ZDLElBQUksRUFBRUEsSUFBSTtTQUNYLENBQUM7UUFDRkksT0FBTyxDQUFDQyxHQUFHLENBQUNKLFFBQVEsQ0FBQyxDQUFDO1FBQ3RCLE9BQU9BLFFBQVEsQ0FBQztLQUNqQixDQUFDLE9BQU9LLEtBQUssRUFBRTtRQUNkRixPQUFPLENBQUNFLEtBQUssQ0FBQ0EsS0FBSyxDQUFDLENBQUM7S0FDdEI7Q0FDRjtBQU9jLGVBQWVDLE9BQU8sQ0FDbkNDLEdBQW1CLEVBQ25CQyxHQUEwQixFQUMxQjtJQUNBLE1BQU0sRUFBRVYsSUFBSSxHQUFFQyxJQUFJLEdBQUUsR0FBR1EsR0FBRyxDQUFDRSxLQUFLO0lBQ2hDLElBQUlYLElBQUksSUFBSSxJQUFJLElBQUlDLElBQUksSUFBSSxJQUFJLEVBQUU7UUFDaENTLEdBQUcsQ0FBQ0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFBRUMsT0FBTyxFQUFFLGlCQUFpQjtTQUFFLENBQUMsQ0FBQztRQUNyRCxPQUFPO0tBQ1I7SUFFRCxJQUFJO1FBQ0YsTUFBTVgsUUFBUSxHQUFHLE1BQU1KLFdBQVcsQ0FBQ2dCLE1BQU0sQ0FBQ2YsSUFBSSxDQUFDLEVBQUVlLE1BQU0sQ0FBQ2QsSUFBSSxDQUFDLENBQUM7UUFDOURTLEdBQUcsQ0FBQ0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFBRUcsS0FBSyxFQUFFYixRQUFRO1lBQUVXLE9BQU8sRUFBRSxTQUFTO1NBQUUsQ0FBQyxDQUFDO0tBQy9ELENBQUMsT0FBT1AsS0FBSyxFQUFFO1FBQ2RHLEdBQUcsQ0FBQ0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFBRUMsT0FBTyxFQUFFLFFBQVE7U0FBRSxDQUFDLENBQUM7S0FDN0M7Q0FDRiIsInNvdXJjZXMiOlsid2VicGFjazovL25leHRqcy1ncm9vLy4vcGFnZXMvYXBpL2dldC1wcm9kdWN0cy50cz8yOWI2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gXCJuZXh0XCI7XG5pbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcblxuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRQcm9kdWN0cyhza2lwOiBudW1iZXIsIHRha2U6IG51bWJlcikge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcHJpc21hLnByb2R1Y3RzLmZpbmRNYW55KHtcbiAgICAgIHNraXA6IHNraXAsXG4gICAgICB0YWtlOiB0YWtlLFxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gIH1cbn1cblxudHlwZSBEYXRhID0ge1xuICBpdGVtcz86IGFueTtcbiAgbWVzc2FnZTogc3RyaW5nO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihcbiAgcmVxOiBOZXh0QXBpUmVxdWVzdCxcbiAgcmVzOiBOZXh0QXBpUmVzcG9uc2U8RGF0YT5cbikge1xuICBjb25zdCB7IHNraXAsIHRha2UgfSA9IHJlcS5xdWVyeTtcbiAgaWYgKHNraXAgPT0gbnVsbCB8fCB0YWtlID09IG51bGwpIHtcbiAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IFwibm8gc2tpcCBvZiB0YWtlXCIgfSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBwcm9kdWN0cyA9IGF3YWl0IGdldFByb2R1Y3RzKE51bWJlcihza2lwKSwgTnVtYmVyKHRha2UpKTtcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IGl0ZW1zOiBwcm9kdWN0cywgbWVzc2FnZTogXCJTdWNjZXNzXCIgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiBcIkZhaWxlZFwiIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwicHJpc21hIiwiZ2V0UHJvZHVjdHMiLCJza2lwIiwidGFrZSIsInJlc3BvbnNlIiwicHJvZHVjdHMiLCJmaW5kTWFueSIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJxdWVyeSIsInN0YXR1cyIsImpzb24iLCJtZXNzYWdlIiwiTnVtYmVyIiwiaXRlbXMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/get-products.ts\n");

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