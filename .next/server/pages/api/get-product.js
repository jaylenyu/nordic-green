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
exports.id = "pages/api/get-product";
exports.ids = ["pages/api/get-product"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "(api)/./pages/api/get-product.ts":
/*!**********************************!*\
  !*** ./pages/api/get-product.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nasync function getProduct(id) {\n    try {\n        const response = await prisma.products.findUnique({\n            where: {\n                id: id\n            }\n        });\n        console.log(response);\n        return response;\n    } catch (error) {\n        console.error(error);\n    }\n}\nasync function handler(req, res) {\n    const { id  } = req.query;\n    if (id == null) {\n        res.status(400).json({\n            message: \"no id\"\n        });\n        return;\n    }\n    try {\n        const products = await getProduct(Number(id));\n        res.status(200).json({\n            items: products,\n            message: \"Success\"\n        });\n    } catch (error) {\n        res.status(400).json({\n            message: \"Failed\"\n        });\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvZ2V0LXByb2R1Y3QudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQzZDO0FBRTdDLE1BQU1DLE1BQU0sR0FBRyxJQUFJRCx3REFBWSxFQUFFO0FBRWpDLGVBQWVFLFVBQVUsQ0FBQ0MsRUFBVSxFQUFFO0lBQ3BDLElBQUk7UUFDRixNQUFNQyxRQUFRLEdBQUcsTUFBTUgsTUFBTSxDQUFDSSxRQUFRLENBQUNDLFVBQVUsQ0FBQztZQUNoREMsS0FBSyxFQUFFO2dCQUNMSixFQUFFLEVBQUVBLEVBQUU7YUFDUDtTQUNGLENBQUM7UUFDRkssT0FBTyxDQUFDQyxHQUFHLENBQUNMLFFBQVEsQ0FBQztRQUNyQixPQUFPQSxRQUFRO0tBQ2hCLENBQUMsT0FBT00sS0FBSyxFQUFFO1FBQ2RGLE9BQU8sQ0FBQ0UsS0FBSyxDQUFDQSxLQUFLLENBQUM7S0FDckI7Q0FDRjtBQU9jLGVBQWVDLE9BQU8sQ0FDbkNDLEdBQW1CLEVBQ25CQyxHQUEwQixFQUMxQjtJQUNBLE1BQU0sRUFBRVYsRUFBRSxHQUFFLEdBQUdTLEdBQUcsQ0FBQ0UsS0FBSztJQUN4QixJQUFJWCxFQUFFLElBQUksSUFBSSxFQUFFO1FBQ2RVLEdBQUcsQ0FBQ0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFBRUMsT0FBTyxFQUFFLE9BQU87U0FBRSxDQUFDO1FBQzFDLE9BQU07S0FDUDtJQUNELElBQUk7UUFDRixNQUFNWixRQUFRLEdBQUcsTUFBTUgsVUFBVSxDQUFDZ0IsTUFBTSxDQUFDZixFQUFFLENBQUMsQ0FBQztRQUM3Q1UsR0FBRyxDQUFDRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztZQUFFRyxLQUFLLEVBQUVkLFFBQVE7WUFBRVksT0FBTyxFQUFFLFNBQVM7U0FBRSxDQUFDO0tBQzlELENBQUMsT0FBT1AsS0FBSyxFQUFFO1FBQ2RHLEdBQUcsQ0FBQ0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFBRUMsT0FBTyxFQUFFLFFBQVE7U0FBRSxDQUFDO0tBQzVDO0NBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb21tZXJjZS8uL3BhZ2VzL2FwaS9nZXQtcHJvZHVjdC50cz8yMmU2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gJ25leHQnXG5pbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcblxuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpXG5cbmFzeW5jIGZ1bmN0aW9uIGdldFByb2R1Y3QoaWQ6IG51bWJlcikge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcHJpc21hLnByb2R1Y3RzLmZpbmRVbmlxdWUoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgfSxcbiAgICB9KVxuICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgIHJldHVybiByZXNwb25zZVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gIH1cbn1cblxudHlwZSBEYXRhID0ge1xuICBpdGVtcz86IGFueVxuICBtZXNzYWdlOiBzdHJpbmdcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihcbiAgcmVxOiBOZXh0QXBpUmVxdWVzdCxcbiAgcmVzOiBOZXh0QXBpUmVzcG9uc2U8RGF0YT5cbikge1xuICBjb25zdCB7IGlkIH0gPSByZXEucXVlcnlcbiAgaWYgKGlkID09IG51bGwpIHtcbiAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6ICdubyBpZCcgfSlcbiAgICByZXR1cm5cbiAgfVxuICB0cnkge1xuICAgIGNvbnN0IHByb2R1Y3RzID0gYXdhaXQgZ2V0UHJvZHVjdChOdW1iZXIoaWQpKVxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgaXRlbXM6IHByb2R1Y3RzLCBtZXNzYWdlOiAnU3VjY2VzcycgfSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6ICdGYWlsZWQnIH0pXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJwcmlzbWEiLCJnZXRQcm9kdWN0IiwiaWQiLCJyZXNwb25zZSIsInByb2R1Y3RzIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwiaGFuZGxlciIsInJlcSIsInJlcyIsInF1ZXJ5Iiwic3RhdHVzIiwianNvbiIsIm1lc3NhZ2UiLCJOdW1iZXIiLCJpdGVtcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/get-product.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/get-product.ts"));
module.exports = __webpack_exports__;

})();