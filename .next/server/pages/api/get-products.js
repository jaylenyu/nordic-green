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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nasync function getProducts(skip, take, category) {\n    const where = category && category !== -1 ? {\n        where: {\n            category_id: category\n        }\n    } : undefined;\n    try {\n        const response = await prisma.products.findMany({\n            skip: skip,\n            take: take,\n            ...where,\n            orderBy: {\n                name: \"asc\"\n            }\n        });\n        console.log(response);\n        return response;\n    } catch (error) {\n        console.error(error);\n    }\n}\nasync function handler(req, res) {\n    const { skip , take , category  } = req.query;\n    if (skip == null || take == null) {\n        res.status(400).json({\n            message: \"no skip of take\"\n        });\n        return;\n    }\n    try {\n        const products = await getProducts(Number(skip), Number(take), Number(category));\n        res.status(200).json({\n            items: products,\n            message: \"Success\"\n        });\n    } catch (error) {\n        res.status(400).json({\n            message: \"Failed\"\n        });\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvZ2V0LXByb2R1Y3RzLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUM4QztBQUU5QyxNQUFNQyxNQUFNLEdBQUcsSUFBSUQsd0RBQVksRUFBRTtBQUVqQyxlQUFlRSxXQUFXLENBQUNDLElBQVksRUFBRUMsSUFBWSxFQUFFQyxRQUFnQixFQUFFO0lBQ3ZFLE1BQU1DLEtBQUssR0FDVEQsUUFBUSxJQUFJQSxRQUFRLEtBQUssQ0FBQyxDQUFDLEdBQ3ZCO1FBQ0VDLEtBQUssRUFBRTtZQUNMQyxXQUFXLEVBQUVGLFFBQVE7U0FDdEI7S0FDRixHQUNERyxTQUFTO0lBQ2YsSUFBSTtRQUNGLE1BQU1DLFFBQVEsR0FBRyxNQUFNUixNQUFNLENBQUNTLFFBQVEsQ0FBQ0MsUUFBUSxDQUFDO1lBQzlDUixJQUFJLEVBQUVBLElBQUk7WUFDVkMsSUFBSSxFQUFFQSxJQUFJO1lBQ1YsR0FBR0UsS0FBSztZQUNSTSxPQUFPLEVBQUU7Z0JBQ1BDLElBQUksRUFBRSxLQUFLO2FBQ1o7U0FDRixDQUFDO1FBQ0ZDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDTixRQUFRLENBQUMsQ0FBQztRQUN0QixPQUFPQSxRQUFRLENBQUM7S0FDakIsQ0FBQyxPQUFPTyxLQUFLLEVBQUU7UUFDZEYsT0FBTyxDQUFDRSxLQUFLLENBQUNBLEtBQUssQ0FBQyxDQUFDO0tBQ3RCO0NBQ0Y7QUFPYyxlQUFlQyxPQUFPLENBQ25DQyxHQUFtQixFQUNuQkMsR0FBMEIsRUFDMUI7SUFDQSxNQUFNLEVBQUVoQixJQUFJLEdBQUVDLElBQUksR0FBRUMsUUFBUSxHQUFFLEdBQUdhLEdBQUcsQ0FBQ0UsS0FBSztJQUMxQyxJQUFJakIsSUFBSSxJQUFJLElBQUksSUFBSUMsSUFBSSxJQUFJLElBQUksRUFBRTtRQUNoQ2UsR0FBRyxDQUFDRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztZQUFFQyxPQUFPLEVBQUUsaUJBQWlCO1NBQUUsQ0FBQyxDQUFDO1FBQ3JELE9BQU87S0FDUjtJQUVELElBQUk7UUFDRixNQUFNYixRQUFRLEdBQUcsTUFBTVIsV0FBVyxDQUNoQ3NCLE1BQU0sQ0FBQ3JCLElBQUksQ0FBQyxFQUNacUIsTUFBTSxDQUFDcEIsSUFBSSxDQUFDLEVBQ1pvQixNQUFNLENBQUNuQixRQUFRLENBQUMsQ0FDakI7UUFDRGMsR0FBRyxDQUFDRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztZQUFFRyxLQUFLLEVBQUVmLFFBQVE7WUFBRWEsT0FBTyxFQUFFLFNBQVM7U0FBRSxDQUFDLENBQUM7S0FDL0QsQ0FBQyxPQUFPUCxLQUFLLEVBQUU7UUFDZEcsR0FBRyxDQUFDRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztZQUFFQyxPQUFPLEVBQUUsUUFBUTtTQUFFLENBQUMsQ0FBQztLQUM3QztDQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dGpzLWdyb28vLi9wYWdlcy9hcGkvZ2V0LXByb2R1Y3RzLnRzPzI5YjYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSBcIm5leHRcIjtcbmltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xuXG5jb25zdCBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KCk7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFByb2R1Y3RzKHNraXA6IG51bWJlciwgdGFrZTogbnVtYmVyLCBjYXRlZ29yeTogbnVtYmVyKSB7XG4gIGNvbnN0IHdoZXJlID1cbiAgICBjYXRlZ29yeSAmJiBjYXRlZ29yeSAhPT0gLTFcbiAgICAgID8ge1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBjYXRlZ29yeV9pZDogY2F0ZWdvcnksXG4gICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICAgOiB1bmRlZmluZWQ7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBwcmlzbWEucHJvZHVjdHMuZmluZE1hbnkoe1xuICAgICAgc2tpcDogc2tpcCxcbiAgICAgIHRha2U6IHRha2UsXG4gICAgICAuLi53aGVyZSxcbiAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgbmFtZTogXCJhc2NcIixcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgfVxufVxuXG50eXBlIERhdGEgPSB7XG4gIGl0ZW1zPzogYW55O1xuICBtZXNzYWdlOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKFxuICByZXE6IE5leHRBcGlSZXF1ZXN0LFxuICByZXM6IE5leHRBcGlSZXNwb25zZTxEYXRhPlxuKSB7XG4gIGNvbnN0IHsgc2tpcCwgdGFrZSwgY2F0ZWdvcnkgfSA9IHJlcS5xdWVyeTtcbiAgaWYgKHNraXAgPT0gbnVsbCB8fCB0YWtlID09IG51bGwpIHtcbiAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IFwibm8gc2tpcCBvZiB0YWtlXCIgfSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBwcm9kdWN0cyA9IGF3YWl0IGdldFByb2R1Y3RzKFxuICAgICAgTnVtYmVyKHNraXApLFxuICAgICAgTnVtYmVyKHRha2UpLFxuICAgICAgTnVtYmVyKGNhdGVnb3J5KVxuICAgICk7XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBpdGVtczogcHJvZHVjdHMsIG1lc3NhZ2U6IFwiU3VjY2Vzc1wiIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogXCJGYWlsZWRcIiB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsInByaXNtYSIsImdldFByb2R1Y3RzIiwic2tpcCIsInRha2UiLCJjYXRlZ29yeSIsIndoZXJlIiwiY2F0ZWdvcnlfaWQiLCJ1bmRlZmluZWQiLCJyZXNwb25zZSIsInByb2R1Y3RzIiwiZmluZE1hbnkiLCJvcmRlckJ5IiwibmFtZSIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJxdWVyeSIsInN0YXR1cyIsImpzb24iLCJtZXNzYWdlIiwiTnVtYmVyIiwiaXRlbXMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/get-products.ts\n");

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