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
exports.id = "pages/api/update-product";
exports.ids = ["pages/api/update-product"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "(api)/./pages/api/update-product.ts":
/*!*************************************!*\
  !*** ./pages/api/update-product.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nasync function updateProduct(id, contents) {\n    try {\n        const response = await prisma.products.update({\n            where: {\n                id: id\n            },\n            data: {\n                contents: contents\n            }\n        });\n        console.log(response);\n        return response;\n    } catch (error) {\n        console.error(error);\n    }\n}\nasync function handler(req, res) {\n    const { id , contents  } = JSON.parse(req.body);\n    if (id == null || contents == null) {\n        res.status(400).json({\n            message: \"no id or contents\"\n        });\n        return;\n    }\n    try {\n        const products = await updateProduct(Number(id), contents);\n        res.status(200).json({\n            items: products,\n            message: \"Success\"\n        });\n    } catch (error) {\n        res.status(400).json({\n            message: \"Failed\"\n        });\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvdXBkYXRlLXByb2R1Y3QudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQzZDO0FBRTdDLE1BQU1DLE1BQU0sR0FBRyxJQUFJRCx3REFBWSxFQUFFO0FBRWpDLGVBQWVFLGFBQWEsQ0FBQ0MsRUFBVSxFQUFFQyxRQUFnQixFQUFFO0lBQ3pELElBQUk7UUFDRixNQUFNQyxRQUFRLEdBQUcsTUFBTUosTUFBTSxDQUFDSyxRQUFRLENBQUNDLE1BQU0sQ0FBQztZQUM1Q0MsS0FBSyxFQUFFO2dCQUNMTCxFQUFFLEVBQUVBLEVBQUU7YUFDUDtZQUNETSxJQUFJLEVBQUU7Z0JBQ0pMLFFBQVEsRUFBRUEsUUFBUTthQUNuQjtTQUNGLENBQUM7UUFDRk0sT0FBTyxDQUFDQyxHQUFHLENBQUNOLFFBQVEsQ0FBQztRQUNyQixPQUFPQSxRQUFRO0tBQ2hCLENBQUMsT0FBT08sS0FBSyxFQUFFO1FBQ2RGLE9BQU8sQ0FBQ0UsS0FBSyxDQUFDQSxLQUFLLENBQUM7S0FDckI7Q0FDRjtBQU9jLGVBQWVDLE9BQU8sQ0FDbkNDLEdBQW1CLEVBQ25CQyxHQUEwQixFQUMxQjtJQUNBLE1BQU0sRUFBRVosRUFBRSxHQUFFQyxRQUFRLEdBQUUsR0FBR1ksSUFBSSxDQUFDQyxLQUFLLENBQUNILEdBQUcsQ0FBQ0ksSUFBSSxDQUFDO0lBRTdDLElBQUlmLEVBQUUsSUFBSSxJQUFJLElBQUlDLFFBQVEsSUFBSSxJQUFJLEVBQUU7UUFDbENXLEdBQUcsQ0FBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFBRUMsT0FBTyxFQUFFLG1CQUFtQjtTQUFFLENBQUM7UUFDdEQsT0FBTTtLQUNQO0lBQ0QsSUFBSTtRQUNGLE1BQU1mLFFBQVEsR0FBRyxNQUFNSixhQUFhLENBQUNvQixNQUFNLENBQUNuQixFQUFFLENBQUMsRUFBRUMsUUFBUSxDQUFDO1FBQzFEVyxHQUFHLENBQUNJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO1lBQUVHLEtBQUssRUFBRWpCLFFBQVE7WUFBRWUsT0FBTyxFQUFFLFNBQVM7U0FBRSxDQUFDO0tBQzlELENBQUMsT0FBT1QsS0FBSyxFQUFFO1FBQ2RHLEdBQUcsQ0FBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFBRUMsT0FBTyxFQUFFLFFBQVE7U0FBRSxDQUFDO0tBQzVDO0NBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb21tZXJjZS8uL3BhZ2VzL2FwaS91cGRhdGUtcHJvZHVjdC50cz81MDc0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gJ25leHQnXG5pbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcblxuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpXG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVByb2R1Y3QoaWQ6IG51bWJlciwgY29udGVudHM6IHN0cmluZykge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcHJpc21hLnByb2R1Y3RzLnVwZGF0ZSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICBpZDogaWQsXG4gICAgICB9LFxuICAgICAgZGF0YToge1xuICAgICAgICBjb250ZW50czogY29udGVudHMsXG4gICAgICB9LFxuICAgIH0pXG4gICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgcmV0dXJuIHJlc3BvbnNlXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgfVxufVxuXG50eXBlIERhdGEgPSB7XG4gIGl0ZW1zPzogYW55XG4gIG1lc3NhZ2U6IHN0cmluZ1xufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKFxuICByZXE6IE5leHRBcGlSZXF1ZXN0LFxuICByZXM6IE5leHRBcGlSZXNwb25zZTxEYXRhPlxuKSB7XG4gIGNvbnN0IHsgaWQsIGNvbnRlbnRzIH0gPSBKU09OLnBhcnNlKHJlcS5ib2R5KVxuXG4gIGlmIChpZCA9PSBudWxsIHx8IGNvbnRlbnRzID09IG51bGwpIHtcbiAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6ICdubyBpZCBvciBjb250ZW50cycgfSlcbiAgICByZXR1cm5cbiAgfVxuICB0cnkge1xuICAgIGNvbnN0IHByb2R1Y3RzID0gYXdhaXQgdXBkYXRlUHJvZHVjdChOdW1iZXIoaWQpLCBjb250ZW50cylcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IGl0ZW1zOiBwcm9kdWN0cywgbWVzc2FnZTogJ1N1Y2Nlc3MnIH0pXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiAnRmFpbGVkJyB9KVxuICB9XG59XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwicHJpc21hIiwidXBkYXRlUHJvZHVjdCIsImlkIiwiY29udGVudHMiLCJyZXNwb25zZSIsInByb2R1Y3RzIiwidXBkYXRlIiwid2hlcmUiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwiaGFuZGxlciIsInJlcSIsInJlcyIsIkpTT04iLCJwYXJzZSIsImJvZHkiLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsIk51bWJlciIsIml0ZW1zIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/update-product.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/update-product.ts"));
module.exports = __webpack_exports__;

})();