(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/hooks/useVideoLibrary.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useVideoLibrary",
    ()=>useVideoLibrary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useVideoLibrary() {
    _s();
    const [videos, setVideos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const addVideos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVideoLibrary.useCallback[addVideos]": (files)=>{
            const newVideos = files.map({
                "useVideoLibrary.useCallback[addVideos].newVideos": (file)=>({
                        id: crypto.randomUUID(),
                        file,
                        url: URL.createObjectURL(file),
                        name: file.name
                    })
            }["useVideoLibrary.useCallback[addVideos].newVideos"]);
            // Generate thumbnails (async)
            newVideos.forEach({
                "useVideoLibrary.useCallback[addVideos]": async (video)=>{
                    try {
                        const thumb = await generateThumbnail(video.url);
                        setVideos({
                            "useVideoLibrary.useCallback[addVideos]": (prev)=>prev.map({
                                    "useVideoLibrary.useCallback[addVideos]": (v)=>v.id === video.id ? {
                                            ...v,
                                            thumbnailUrl: thumb
                                        } : v
                                }["useVideoLibrary.useCallback[addVideos]"])
                        }["useVideoLibrary.useCallback[addVideos]"]);
                    } catch (e) {
                        console.error('Failed to generate thumbnail', e);
                    }
                }
            }["useVideoLibrary.useCallback[addVideos]"]);
            setVideos({
                "useVideoLibrary.useCallback[addVideos]": (prev)=>[
                        ...prev,
                        ...newVideos
                    ]
            }["useVideoLibrary.useCallback[addVideos]"]);
        }
    }["useVideoLibrary.useCallback[addVideos]"], []);
    // Cleanup URLs on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useVideoLibrary.useEffect": ()=>{
            return ({
                "useVideoLibrary.useEffect": ()=>{
                    videos.forEach({
                        "useVideoLibrary.useEffect": (v)=>URL.revokeObjectURL(v.url)
                    }["useVideoLibrary.useEffect"]);
                }
            })["useVideoLibrary.useEffect"];
        }
    }["useVideoLibrary.useEffect"], []); // eslint-disable-line react-hooks/exhaustive-deps
    return {
        videos,
        addVideos
    };
}
_s(useVideoLibrary, "GU6Xe9QvAYd26vieRKnpEW5JLH4=");
async function generateThumbnail(videoUrl) {
    return new Promise((resolve, reject)=>{
        const video = document.createElement('video');
        video.src = videoUrl;
        video.muted = true;
        video.crossOrigin = 'anonymous'; // Not crucial for local blobs but good practice
        video.currentTime = 5; // Capture at 5s
        video.onloadeddata = ()=>{
            // If video is short, capture at 10%
            if (video.duration < 5) video.currentTime = video.duration * 0.1;
        };
        video.onseeked = ()=>{
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/jpeg'));
            } else {
                reject('Canvas context not found');
            }
            video.remove();
        };
        video.onerror = (e)=>{
            reject(e);
            video.remove();
        };
        // Trigger load
        video.load();
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/UploadZone.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "content": "UploadZone-module__SuXmHa__content",
  "dragging": "UploadZone-module__SuXmHa__dragging",
  "formats": "UploadZone-module__SuXmHa__formats",
  "hiddenInput": "UploadZone-module__SuXmHa__hiddenInput",
  "iconWrapper": "UploadZone-module__SuXmHa__iconWrapper",
  "subtitle": "UploadZone-module__SuXmHa__subtitle",
  "title": "UploadZone-module__SuXmHa__title",
  "zone": "UploadZone-module__SuXmHa__zone",
});
}),
"[project]/src/components/UploadZone.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UploadZone
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$film$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Film$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/film.js [app-client] (ecmascript) <export default as Film>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UploadZone$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/UploadZone.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function UploadZone({ onVideosSelected }) {
    _s();
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleDragOver = (e)=>{
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = (e)=>{
        e.preventDefault();
        setIsDragging(false);
    };
    const handleDrop = (e)=>{
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const videoFiles = Array.from(e.dataTransfer.files).filter((file)=>file.type.startsWith('video/') || file.name.endsWith('.mkv') // Basic check
            );
            if (videoFiles.length > 0) onVideosSelected(videoFiles);
        }
    };
    const handleClick = ()=>{
        fileInputRef.current?.click();
    };
    const handleFileChange = (e)=>{
        if (e.target.files && e.target.files.length > 0) {
            const videoFiles = Array.from(e.target.files);
            onVideosSelected(videoFiles);
            // Reset input so same files can be selected again if needed
            e.target.value = '';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UploadZone$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].zone} ${isDragging ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UploadZone$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dragging : ''}`,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
        onClick: handleClick,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "file",
                multiple: true,
                accept: "video/*,.mkv",
                ref: fileInputRef,
                onChange: handleFileChange,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UploadZone$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hiddenInput
            }, void 0, false, {
                fileName: "[project]/src/components/UploadZone.tsx",
                lineNumber: 57,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UploadZone$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].content,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UploadZone$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].iconWrapper,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                            size: 48,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UploadZone$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].icon
                        }, void 0, false, {
                            fileName: "[project]/src/components/UploadZone.tsx",
                            lineNumber: 67,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/UploadZone.tsx",
                        lineNumber: 66,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UploadZone$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                        children: "Upload Videos"
                    }, void 0, false, {
                        fileName: "[project]/src/components/UploadZone.tsx",
                        lineNumber: 69,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UploadZone$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                        children: "Drag & drop local video files here, or click to browse"
                    }, void 0, false, {
                        fileName: "[project]/src/components/UploadZone.tsx",
                        lineNumber: 70,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UploadZone$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formats,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$film$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Film$3e$__["Film"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/components/UploadZone.tsx",
                                lineNumber: 72,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Supports MP4, WebM, MKV (if supported by browser)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/UploadZone.tsx",
                                lineNumber: 73,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/UploadZone.tsx",
                        lineNumber: 71,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/UploadZone.tsx",
                lineNumber: 65,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/UploadZone.tsx",
        lineNumber: 50,
        columnNumber: 9
    }, this);
}
_s(UploadZone, "UVwffXkjAZ0sCTsG+piCKVVmsLQ=");
_c = UploadZone;
var _c;
__turbopack_context__.k.register(_c, "UploadZone");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/VideoGrid.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "card": "VideoGrid-module__YxI0mG__card",
  "grid": "VideoGrid-module__YxI0mG__grid",
  "gridContainer": "VideoGrid-module__YxI0mG__gridContainer",
  "info": "VideoGrid-module__YxI0mG__info",
  "overlay": "VideoGrid-module__YxI0mG__overlay",
  "placeholderThumb": "VideoGrid-module__YxI0mG__placeholderThumb",
  "playButton": "VideoGrid-module__YxI0mG__playButton",
  "sectionTitle": "VideoGrid-module__YxI0mG__sectionTitle",
  "thumbnail": "VideoGrid-module__YxI0mG__thumbnail",
  "thumbnailWrapper": "VideoGrid-module__YxI0mG__thumbnailWrapper",
  "videoTitle": "VideoGrid-module__YxI0mG__videoTitle",
});
}),
"[project]/src/components/VideoGrid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VideoGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/VideoGrid.module.css [app-client] (css module)");
;
;
;
function VideoGrid({ videos, onVideoSelect }) {
    if (videos.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].gridContainer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                children: "My List"
            }, void 0, false, {
                fileName: "[project]/src/components/VideoGrid.tsx",
                lineNumber: 16,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].grid,
                children: videos.map((video)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                        onClick: ()=>onVideoSelect(video),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].thumbnailWrapper,
                                children: [
                                    video.thumbnailUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: video.thumbnailUrl,
                                        alt: video.name,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].thumbnail
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/VideoGrid.tsx",
                                        lineNumber: 26,
                                        columnNumber: 33
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].placeholderThumb
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/VideoGrid.tsx",
                                        lineNumber: 28,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].overlay,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].playButton,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                fill: "white",
                                                size: 24
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/VideoGrid.tsx",
                                                lineNumber: 32,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/VideoGrid.tsx",
                                            lineNumber: 31,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/VideoGrid.tsx",
                                        lineNumber: 30,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/VideoGrid.tsx",
                                lineNumber: 24,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].info,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].videoTitle,
                                    children: video.name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VideoGrid.tsx",
                                    lineNumber: 37,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/VideoGrid.tsx",
                                lineNumber: 36,
                                columnNumber: 25
                            }, this)
                        ]
                    }, video.id, true, {
                        fileName: "[project]/src/components/VideoGrid.tsx",
                        lineNumber: 19,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/VideoGrid.tsx",
                lineNumber: 17,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/VideoGrid.tsx",
        lineNumber: 15,
        columnNumber: 9
    }, this);
}
_c = VideoGrid;
var _c;
__turbopack_context__.k.register(_c, "VideoGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/NetPlayer.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "activeBtn": "NetPlayer-module__LgmX7W__activeBtn",
  "bottomBar": "NetPlayer-module__LgmX7W__bottomBar",
  "centerPlay": "NetPlayer-module__LgmX7W__centerPlay",
  "controlsOverlay": "NetPlayer-module__LgmX7W__controlsOverlay",
  "controlsRow": "NetPlayer-module__LgmX7W__controlsRow",
  "hidden": "NetPlayer-module__LgmX7W__hidden",
  "iconBtn": "NetPlayer-module__LgmX7W__iconBtn",
  "leftControls": "NetPlayer-module__LgmX7W__leftControls",
  "playerContainer": "NetPlayer-module__LgmX7W__playerContainer",
  "progressBar": "NetPlayer-module__LgmX7W__progressBar",
  "progressContainer": "NetPlayer-module__LgmX7W__progressContainer",
  "rightControls": "NetPlayer-module__LgmX7W__rightControls",
  "selected": "NetPlayer-module__LgmX7W__selected",
  "settingsColumn": "NetPlayer-module__LgmX7W__settingsColumn",
  "settingsDivider": "NetPlayer-module__LgmX7W__settingsDivider",
  "settingsMenu": "NetPlayer-module__LgmX7W__settingsMenu",
  "settingsOption": "NetPlayer-module__LgmX7W__settingsOption",
  "settingsOptionDisabled": "NetPlayer-module__LgmX7W__settingsOptionDisabled",
  "spin": "NetPlayer-module__LgmX7W__spin",
  "textBtn": "NetPlayer-module__LgmX7W__textBtn",
  "timeDisplay": "NetPlayer-module__LgmX7W__timeDisplay",
  "title": "NetPlayer-module__LgmX7W__title",
  "topBar": "NetPlayer-module__LgmX7W__topBar",
  "video": "NetPlayer-module__LgmX7W__video",
  "videoWithControls": "NetPlayer-module__LgmX7W__videoWithControls",
  "volumeContainer": "NetPlayer-module__LgmX7W__volumeContainer",
  "volumeSlider": "NetPlayer-module__LgmX7W__volumeSlider",
});
}),
"[project]/src/utils/subtitle.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "srtToWebvtt",
    ()=>srtToWebvtt
]);
function srtToWebvtt(srtContent) {
    // Simple SRT to WebVTT converter
    let vtt = "WEBVTT\n\n";
    // Normalize line endings
    const normalized = srtContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    // Split into blocks
    const blocks = normalized.split('\n\n');
    blocks.forEach((block)=>{
        const lines = block.split('\n');
        if (lines.length >= 2) {
            // Check if first line is index or timing
            let timingLineIndex = 0;
            if (lines[0].match(/^\d+$/)) {
                timingLineIndex = 1;
            }
            const timingLine = lines[timingLineIndex];
            // SRT timing: 00:00:20,000 --> 00:00:24,400
            // VTT timing: 00:00:20.000 --> 00:00:24.400
            if (timingLine && timingLine.includes('-->')) {
                const vttTiming = timingLine.replace(/,/g, '.');
                vtt += vttTiming + '\n';
                // Add text lines
                for(let i = timingLineIndex + 1; i < lines.length; i++){
                    vtt += lines[i] + '\n';
                }
                vtt += '\n';
            }
        }
    });
    return vtt;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useFFmpeg.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFFmpeg",
    ()=>useFFmpeg
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
// import { FFmpeg } from '@ffmpeg/ffmpeg';
// Custom implementation to avoid "expression is too dynamic" bundler error with @ffmpeg/util
const toBlobURL = async (url, mimeType)=>{
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Failed to fetch ${url}`);
    const blob = await resp.blob();
    return URL.createObjectURL(new Blob([
        blob
    ], {
        type: mimeType
    }));
};
const fetchFile = async (source)=>{
    if (typeof source === 'string') {
        const resp = await fetch(source);
        if (!resp.ok) throw new Error(`Failed to fetch ${source}`);
        return new Uint8Array(await resp.arrayBuffer());
    } else {
        return new Uint8Array(await source.arrayBuffer());
    }
};
const useFFmpeg = ()=>{
    _s();
    const [loaded, setLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const ffmpegRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const logRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const load = async ()=>{
        if (loaded) return;
        setIsLoading(true);
        const baseURL = '/ffmpeg';
        try {
            // Wait for script to allow window.FFmpegWASM to populate
            let retries = 0;
            while(!window.FFmpegWASM && !window.FFmpeg && retries < 10){
                await new Promise((r)=>setTimeout(r, 500));
                retries++;
            }
            // @ts-ignore
            const FFmpegClass = window.FFmpegWASM?.FFmpeg || window.FFmpeg?.FFmpeg;
            if (!FFmpegClass) throw new Error("FFmpeg script failed to load. Please check your internet connection or refresh.");
            if (!ffmpegRef.current) {
                ffmpegRef.current = new FFmpegClass();
            }
            const ffmpeg = ffmpegRef.current;
            // Capture logs for probing
            ffmpeg.on('log', ({ message })=>{
                // console.log(message); // Silenced per user request
                logRef.current.push(message);
            });
            await ffmpeg.load({
                coreURL: `${baseURL}/ffmpeg-core.js`,
                wasmURL: `${baseURL}/ffmpeg-core.wasm`,
                workerURL: `${baseURL}/ffmpeg-core.worker.js`
            });
            setLoaded(true);
        } catch (e) {
            console.error("FFmpeg load failed", e);
            throw e; // Re-throw to let UI know
        } finally{
            setIsLoading(false);
        }
    };
    const mountFile = async (file)=>{
        const ffmpeg = ffmpegRef.current;
        const data = await fetchFile(file);
        const name = file.name;
        // Clean up previous inputs (we'll just use the exact name to be safe or a generic one with correct ext)
        // Simplest strategy: always call it "input" + extension
        const ext = name.split('.').pop() || 'mkv';
        const inputName = `input.${ext}`;
        // Try to delete common previous files just in case
        try {
            await ffmpeg.deleteFile('input.mkv');
        } catch  {}
        try {
            await ffmpeg.deleteFile('input.mp4');
        } catch  {}
        try {
            await ffmpeg.deleteFile(inputName);
        } catch  {}
        await ffmpeg.writeFile(inputName, data);
        return inputName;
    };
    const probeFile = async (file)=>{
        if (!loaded) await load();
        const ffmpeg = ffmpegRef.current;
        logRef.current = []; // Clear logs
        const inputName = await mountFile(file);
        // Run info command
        try {
            await ffmpeg.exec([
                '-i',
                inputName
            ]);
        } catch (e) {
        // Expected
        }
        // Parse logs
        const streamMap = new Map();
        const logs = logRef.current.join('\n');
        // Improved Regex: Matches "Stream #0:1", optional hex "[0x1]", optional lang "(eng)", type, details
        // we capture: 1=index, 2=lang, 3=type, 4=details
        const streamRegex = /Stream #\d+:(\d+)(?:\[0x[0-9a-fA-F]+\])?(?:\(([^)]+)\))?:? (Audio|Subtitle): (.+)/g;
        let match;
        while((match = streamRegex.exec(logs)) !== null){
            const index = parseInt(match[1]);
            if (!streamMap.has(index)) {
                streamMap.set(index, {
                    index: index,
                    type: match[3],
                    language: match[2] || 'und',
                    label: match[4]?.split(',')[0]?.trim() || 'Unknown',
                    codec: match[4]?.split(' ')[0] || ''
                });
            }
        }
        return Array.from(streamMap.values());
    };
    const extractSubtitleTrack = async (track, file)=>{
        const ffmpeg = ffmpegRef.current;
        const ext = file.name.split('.').pop() || 'mkv';
        const inputName = `input.${ext}`; // File is already mounted or will be found
        try {
            await ffmpeg.exec([
                '-i',
                inputName,
                '-map',
                `0:${track.index}`,
                '-f',
                'webvtt',
                'output.vtt',
                '-y'
            ]);
            const data = await ffmpeg.readFile('output.vtt');
            const blob = new Blob([
                data
            ], {
                type: 'text/vtt'
            });
            return URL.createObjectURL(blob);
        } catch (e) {
            console.error("Subtitle extraction failed", e);
            return null;
        }
    };
    const extractAudioTrack = async (track, file)=>{
        const ffmpeg = ffmpegRef.current;
        const ext = file.name.split('.').pop() || 'mkv';
        const inputName = `input.${ext}`;
        // Check if we can stream copy (much faster)
        // Common web-supported audio codecs
        const compatibleCodecs = [
            'aac',
            'mp3',
            'mp4a',
            'opus',
            'vorbis'
        ];
        const canCopy = compatibleCodecs.some((c)=>track.codec?.toLowerCase().includes(c));
        const audioCodec = canCopy ? 'copy' : 'aac';
        // console.log(`Extracting audio track ${track.index} (${track.codec}) using codec: ${audioCodec}`);
        try {
            await ffmpeg.exec([
                '-i',
                inputName,
                '-map',
                '0:v:0',
                '-map',
                `0:${track.index}`,
                '-c:v',
                'copy',
                '-c:a',
                audioCodec,
                '-strict',
                'experimental',
                'output.mp4',
                '-y'
            ]);
            const data = await ffmpeg.readFile('output.mp4');
            const blob = new Blob([
                data
            ], {
                type: 'video/mp4'
            });
            return URL.createObjectURL(blob);
        } catch (e) {
            console.error("Audio remux failed", e);
            return null;
        }
    };
    return {
        loaded,
        isLoading,
        load,
        probeFile,
        extractSubtitleTrack,
        extractAudioTrack
    };
};
_s(useFFmpeg, "m801RzH2ipwPDOIRkblnf0UJ7GI=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/NetPlayer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NetPlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/script.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-2.js [app-client] (ecmascript) <export default as Volume2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-x.js [app-client] (ecmascript) <export default as VolumeX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize.js [app-client] (ecmascript) <export default as Maximize>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minimize.js [app-client] (ecmascript) <export default as Minimize>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$captions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Captions$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/captions.js [app-client] (ecmascript) <export default as Captions>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/NetPlayer.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$subtitle$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/subtitle.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFFmpeg$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useFFmpeg.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function NetPlayer({ video, onBack }) {
    _s();
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const subtitleInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [volume, setVolume] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [isMuted, setIsMuted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isFullscreen, setIsFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showControls, setShowControls] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showSettings, setShowSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Tracks State
    const [subtitleUrl, setSubtitleUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [audioTracks, setAudioTracks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [textTracks, setTextTracks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedAudioIndex, setSelectedAudioIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [selectedTextTrackIndex, setSelectedTextTrackIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(-1); // -1 = off
    const [selectedFFmpegSubtitleIndex, setSelectedFFmpegSubtitleIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const controlsTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NetPlayer.useEffect": ()=>{
            // Auto play
            if (videoRef.current) {
                videoRef.current.play().catch({
                    "NetPlayer.useEffect": (e)=>console.log('Autoplay blocked', e)
                }["NetPlayer.useEffect"]);
                setIsPlaying(true);
                // Delay to let tracks load
                setTimeout({
                    "NetPlayer.useEffect": ()=>{
                        scanTracks();
                        // Auto run deep scan silently
                        if (video.file) handleDeepScan(false);
                    }
                }["NetPlayer.useEffect"], 1000);
            }
        }
    }["NetPlayer.useEffect"], []);
    const scanTracks = ()=>{
        if (!videoRef.current) return;
        const vid = videoRef.current;
        // Audio Tracks (Experimental / Vendor specific)
        const aTracks = vid.audioTracks || vid.mozAudioTracks || vid.webkitAudioTracks;
        if (aTracks) {
            const tracks = [];
            for(let i = 0; i < aTracks.length; i++){
                tracks.push(aTracks[i]);
                if (aTracks[i].enabled) setSelectedAudioIndex(i);
            }
            setAudioTracks(tracks);
        }
        // Text Tracks (Native)
        // Filter out metadata tracks if any
        const tTracks = Array.from(videoRef.current.textTracks).filter((t)=>t.kind === 'subtitles' || t.kind === 'captions');
        setTextTracks(tTracks);
        // Check if any is showing
        const showingIndex = tTracks.findIndex((t)=>t.mode === 'showing');
        setSelectedTextTrackIndex(showingIndex);
    };
    const handleMouseMove = ()=>{
        setShowControls(true);
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = setTimeout(()=>{
            if (isPlaying && !showSettings) setShowControls(false);
        }, 3000);
    };
    const togglePlay = ()=>{
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };
    const handleTimeUpdate = ()=>{
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const duration = videoRef.current.duration || 1;
            setProgress(current / duration * 100);
        }
    };
    const handleSeek = (e)=>{
        const val = parseFloat(e.target.value);
        if (videoRef.current) {
            const duration = videoRef.current.duration || 1;
            videoRef.current.currentTime = val / 100 * duration;
            setProgress(val);
        }
    };
    const toggleVolume = ()=>{
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };
    const handleVolumeChange = (e)=>{
        const val = parseFloat(e.target.value);
        setVolume(val);
        if (videoRef.current) {
            videoRef.current.volume = val;
            setIsMuted(val === 0);
        }
    };
    const toggleFullscreen = ()=>{
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };
    const formatTime = (seconds)=>{
        if (!seconds) return "0:00";
        const date = new Date(seconds * 1000);
        const hh = date.getUTCHours();
        const mm = date.getUTCMinutes();
        const ss = date.getUTCSeconds().toString().padStart(2, '0');
        if (hh) {
            return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
        }
        return `${mm}:${ss}`;
    };
    // --- Subtitle & Audio Handling ---
    const handleSubtitleAddClick = ()=>{
        subtitleInputRef.current?.click();
        setShowSettings(false);
    };
    const handleSubtitleFileChange = async (e)=>{
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const text = await file.text();
            let vttContent = text;
            if (file.name.endsWith('.srt')) {
                vttContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$subtitle$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["srtToWebvtt"])(text);
            }
            if (subtitleUrl) URL.revokeObjectURL(subtitleUrl);
            const blob = new Blob([
                vttContent
            ], {
                type: 'text/vtt'
            });
            const url = URL.createObjectURL(blob);
            setSubtitleUrl(url);
            // We need to wait for the track to be added to DOM
            setTimeout(()=>{
                scanTracks();
                // Automatically select the new track (it will be the last one likely, or we find it)
                if (videoRef.current) {
                    const tracks = Array.from(videoRef.current.textTracks);
                    // The new track is likely the last one
                    const newIndex = tracks.length - 1;
                    selectTextTrack(newIndex);
                }
            }, 500);
        }
    };
    const selectAudioTrack = (index)=>{
        if (!videoRef.current) return;
        const vid = videoRef.current;
        const aTracks = vid.audioTracks || vid.mozAudioTracks || vid.webkitAudioTracks;
        if (aTracks) {
            for(let i = 0; i < aTracks.length; i++){
                aTracks[i].enabled = i === index;
            }
            setSelectedAudioIndex(index);
        }
    };
    const selectTextTrack = (index)=>{
        setSelectedTextTrackIndex(index);
        if (!videoRef.current) return;
        const tracks = Array.from(videoRef.current.textTracks).filter((t)=>t.kind === 'subtitles' || t.kind === 'captions');
        tracks.forEach((track, i)=>{
            if (i === index) {
                track.mode = 'showing';
            } else {
                track.mode = 'hidden'; // or disabled
            }
        });
    };
    // FFmpeg Integration
    const { loaded: ffmpegLoaded, isLoading: ffmpegLoading, load: loadFFmpeg, probeFile, extractSubtitleTrack, extractAudioTrack } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFFmpeg$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFFmpeg"])();
    const [isScanning, setIsScanning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scannedTracks, setScannedTracks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleDeepScan = async (manual = true)=>{
        setIsScanning(true);
        try {
            if (!ffmpegLoaded) {
                await loadFFmpeg();
            }
            if (video.file) {
                const streams = await probeFile(video.file);
                const audio = streams.filter((s)=>s.type === 'Audio');
                const subtitles = streams.filter((s)=>s.type === 'Subtitle');
                setScannedTracks({
                    audio,
                    subtitles
                });
                // Show alert if ANY tracks are found
                if (manual) {
                    if (audio.length > 0 || subtitles.length > 0) {
                        alert(`Scan Complete! Found ${audio.length} audio and ${subtitles.length} subtitle tracks.`);
                    } else {
                        alert("Scan Complete! No compatible embedded tracks found. (Check console for FFmpeg logs)");
                    }
                }
            }
        } catch (e) {
            console.error(e);
            if (manual) alert("Scan failed. Ensure the FFmpeg script is loaded.");
        } finally{
            setIsScanning(false);
        }
    };
    const [processingTrackId, setProcessingTrackId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleFFmpegAudioSelect = async (track)=>{
        if (isScanning || processingTrackId !== null) return;
        setIsScanning(true);
        setProcessingTrackId(track.index);
        if (!video.file) return;
        try {
            const url = await extractAudioTrack(track, video.file);
            if (url) {
                if (videoRef.current) {
                    const currentTime = videoRef.current.currentTime;
                    // Changing src pauses the video, we must force play if it was playing
                    videoRef.current.src = url;
                    videoRef.current.currentTime = currentTime;
                    try {
                        await videoRef.current.play();
                    } catch (err) {
                        console.error("Auto-play failed", err);
                    }
                    // Update UI
                    setSelectedAudioIndex(track.index);
                }
            } else {
                alert("Failed to process audio track. See console.");
            }
        } catch (e) {
            console.error(e);
            alert("Audio switch error.");
        } finally{
            setIsScanning(false);
            setProcessingTrackId(null);
        }
    };
    const handleFFmpegSubtitleSelect = async (track)=>{
        setIsScanning(true);
        if (!video.file) return;
        try {
            const url = await extractSubtitleTrack(track, video.file);
            if (url) {
                setSubtitleUrl(url);
                // Clear native selection
                setSelectedTextTrackIndex(-1);
                // Set FFmpeg selection
                setSelectedFFmpegSubtitleIndex(track.index);
                setTimeout(()=>{
                    // Force the track element to be default
                    if (videoRef.current) {
                        const tracks = videoRef.current.querySelectorAll('track');
                        tracks.forEach((t)=>t.default = true);
                    }
                }, 100);
            } else {
                alert("Failed to extract subtitle.");
            }
        } catch (e) {
            console.error(e);
        } finally{
            setIsScanning(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NetPlayer.useEffect": ()=>{
            const handleKeyDown = {
                "NetPlayer.useEffect.handleKeyDown": (e)=>{
                    // Ignore if typing in an input (though we only have file input currently)
                    if (e.target.tagName === 'INPUT') return;
                    switch(e.key.toLowerCase()){
                        case ' ':
                        case 'k':
                            e.preventDefault(); // Prevent scrolling
                            togglePlay();
                            break;
                        case 'f':
                            e.preventDefault();
                            toggleFullscreen();
                            break;
                        case 'arrowright':
                        case 'l':
                            e.preventDefault();
                            if (videoRef.current) {
                                videoRef.current.currentTime += 10;
                                handleMouseMove(); // Show controls
                            }
                            break;
                        case 'arrowleft':
                        case 'j':
                            e.preventDefault();
                            if (videoRef.current) {
                                videoRef.current.currentTime -= 10;
                                handleMouseMove();
                            }
                            break;
                        case 'm':
                            toggleVolume();
                            break;
                    }
                }
            }["NetPlayer.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "NetPlayer.useEffect": ()=>window.removeEventListener('keydown', handleKeyDown)
            })["NetPlayer.useEffect"];
        }
    }["NetPlayer.useEffect"], [
        isPlaying,
        isFullscreen,
        isMuted,
        volume
    ]); // Ref dependencies are stable, but state needs to be fresh
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NetPlayer.useEffect": ()=>{
            return ({
                "NetPlayer.useEffect": ()=>{
                    if (subtitleUrl) URL.revokeObjectURL(subtitleUrl);
                }
            })["NetPlayer.useEffect"];
        }
    }["NetPlayer.useEffect"], [
        subtitleUrl
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].playerContainer,
        onMouseMove: handleMouseMove,
        onMouseLeave: ()=>isPlaying && !showSettings && setShowControls(false),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: "/ffmpeg/ffmpeg.js",
                strategy: "lazyOnload"
            }, void 0, false, {
                fileName: "[project]/src/components/NetPlayer.tsx",
                lineNumber: 378,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                ref: videoRef,
                src: video.url,
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].video} ${showControls ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].videoWithControls : ''}`,
                onClick: togglePlay,
                onTimeUpdate: handleTimeUpdate,
                onEnded: ()=>setIsPlaying(false),
                children: subtitleUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("track", {
                    kind: "subtitles",
                    src: subtitleUrl,
                    label: "Active Subtitle",
                    default: true
                }, void 0, false, {
                    fileName: "[project]/src/components/NetPlayer.tsx",
                    lineNumber: 387,
                    columnNumber: 33
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/NetPlayer.tsx",
                lineNumber: 379,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "file",
                ref: subtitleInputRef,
                onChange: handleSubtitleFileChange,
                accept: ".srt,.vtt",
                style: {
                    display: 'none'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/NetPlayer.tsx",
                lineNumber: 390,
                columnNumber: 13
            }, this),
            showSettings && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].settingsMenu,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].settingsColumn,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                children: "Audio"
                            }, void 0, false, {
                                fileName: "[project]/src/components/NetPlayer.tsx",
                                lineNumber: 402,
                                columnNumber: 25
                            }, this),
                            audioTracks.map((track, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].settingsOption} ${selectedAudioIndex === i ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].selected : ''}`,
                                    onClick: ()=>selectAudioTrack(i),
                                    children: track.label || track.language || `Track ${i + 1}`
                                }, `native-${i}`, false, {
                                    fileName: "[project]/src/components/NetPlayer.tsx",
                                    lineNumber: 405,
                                    columnNumber: 29
                                }, this)),
                            scannedTracks?.audio.map((track)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].settingsOption} ${selectedAudioIndex === track.index ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].selected : ''}`,
                                    onClick: ()=>handleFFmpegAudioSelect(track),
                                    style: {
                                        opacity: isScanning && processingTrackId !== track.index ? 0.5 : 1,
                                        pointerEvents: isScanning ? 'none' : 'auto'
                                    },
                                    children: processingTrackId === track.index ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].spin,
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/NetPlayer.tsx",
                                                lineNumber: 424,
                                                columnNumber: 41
                                            }, this),
                                            " Switching..."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/NetPlayer.tsx",
                                        lineNumber: 423,
                                        columnNumber: 37
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    opacity: 0.7
                                                },
                                                children: "[Deep Scan]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/NetPlayer.tsx",
                                                lineNumber: 427,
                                                columnNumber: 39
                                            }, this),
                                            " ",
                                            track.language,
                                            " (",
                                            track.codec,
                                            ")"
                                        ]
                                    }, void 0, true)
                                }, `ffmpeg-audio-${track.index}`, false, {
                                    fileName: "[project]/src/components/NetPlayer.tsx",
                                    lineNumber: 416,
                                    columnNumber: 29
                                }, this)),
                            audioTracks.length === 0 && (!scannedTracks || scannedTracks.audio.length === 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].settingsOptionDisabled,
                                children: "Default Audio"
                            }, void 0, false, {
                                fileName: "[project]/src/components/NetPlayer.tsx",
                                lineNumber: 433,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/NetPlayer.tsx",
                        lineNumber: 401,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].settingsColumn,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                children: "Subtitles"
                            }, void 0, false, {
                                fileName: "[project]/src/components/NetPlayer.tsx",
                                lineNumber: 438,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].settingsOption} ${selectedTextTrackIndex === -1 && selectedFFmpegSubtitleIndex === null ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].selected : ''}`,
                                onClick: ()=>{
                                    selectTextTrack(-1);
                                    setSelectedFFmpegSubtitleIndex(null);
                                    setSubtitleUrl(null);
                                },
                                children: "Off"
                            }, void 0, false, {
                                fileName: "[project]/src/components/NetPlayer.tsx",
                                lineNumber: 439,
                                columnNumber: 25
                            }, this),
                            textTracks.map((track, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].settingsOption} ${selectedTextTrackIndex === i ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].selected : ''}`,
                                    onClick: ()=>selectTextTrack(i),
                                    children: track.label || track.language || `Track ${i + 1}`
                                }, `native-${i}`, false, {
                                    fileName: "[project]/src/components/NetPlayer.tsx",
                                    lineNumber: 452,
                                    columnNumber: 29
                                }, this)),
                            scannedTracks?.subtitles.map((track)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].settingsOption} ${selectedFFmpegSubtitleIndex === track.index ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].selected : ''}`,
                                    onClick: ()=>handleFFmpegSubtitleSelect(track),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                opacity: 0.7
                                            },
                                            children: "[Deep Scan]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/NetPlayer.tsx",
                                            lineNumber: 468,
                                            columnNumber: 33
                                        }, this),
                                        " ",
                                        track.language,
                                        " (",
                                        track.label,
                                        ")"
                                    ]
                                }, `ffmpeg-sub-${track.index}`, true, {
                                    fileName: "[project]/src/components/NetPlayer.tsx",
                                    lineNumber: 463,
                                    columnNumber: 29
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].settingsDivider
                            }, void 0, false, {
                                fileName: "[project]/src/components/NetPlayer.tsx",
                                lineNumber: 472,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].settingsOption,
                                onClick: handleSubtitleAddClick,
                                children: "Upload .srt..."
                            }, void 0, false, {
                                fileName: "[project]/src/components/NetPlayer.tsx",
                                lineNumber: 473,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].settingsDivider
                            }, void 0, false, {
                                fileName: "[project]/src/components/NetPlayer.tsx",
                                lineNumber: 477,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].settingsOption,
                                onClick: ()=>handleDeepScan(true),
                                style: {
                                    color: scannedTracks ? '#4CAF50' : '#aaa',
                                    fontSize: '0.8rem'
                                },
                                children: isScanning ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].spin,
                                            size: 14
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/NetPlayer.tsx",
                                            lineNumber: 481,
                                            columnNumber: 37
                                        }, this),
                                        " Scanning..."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/NetPlayer.tsx",
                                    lineNumber: 480,
                                    columnNumber: 33
                                }, this) : scannedTracks ? "Rescan File" : "Deep Scan (FFmpeg)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/NetPlayer.tsx",
                                lineNumber: 478,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/NetPlayer.tsx",
                        lineNumber: 437,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/NetPlayer.tsx",
                lineNumber: 400,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].controlsOverlay} ${!showControls ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hidden : ''}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].topBar,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onBack,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].iconBtn,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    size: 32
                                }, void 0, false, {
                                    fileName: "[project]/src/components/NetPlayer.tsx",
                                    lineNumber: 494,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/NetPlayer.tsx",
                                lineNumber: 493,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                                children: video.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/NetPlayer.tsx",
                                lineNumber: 496,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/NetPlayer.tsx",
                        lineNumber: 492,
                        columnNumber: 17
                    }, this),
                    !isPlaying && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].centerPlay,
                        onClick: togglePlay,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                            size: 64,
                            fill: "white"
                        }, void 0, false, {
                            fileName: "[project]/src/components/NetPlayer.tsx",
                            lineNumber: 501,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/NetPlayer.tsx",
                        lineNumber: 500,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].bottomBar,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].progressContainer,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].progressBar,
                                    min: "0",
                                    max: "100",
                                    step: "0.1",
                                    value: progress,
                                    onChange: handleSeek,
                                    style: {
                                        backgroundSize: `${progress}% 100%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/NetPlayer.tsx",
                                    lineNumber: 507,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/NetPlayer.tsx",
                                lineNumber: 506,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].controlsRow,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].leftControls,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: togglePlay,
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].iconBtn,
                                                children: isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                                                    fill: "white"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/NetPlayer.tsx",
                                                    lineNumber: 522,
                                                    columnNumber: 46
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                    fill: "white"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/NetPlayer.tsx",
                                                    lineNumber: 522,
                                                    columnNumber: 71
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/NetPlayer.tsx",
                                                lineNumber: 521,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    if (videoRef.current) videoRef.current.currentTime -= 10;
                                                },
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].textBtn,
                                                children: "-10s"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/NetPlayer.tsx",
                                                lineNumber: 525,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    if (videoRef.current) videoRef.current.currentTime += 10;
                                                },
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].textBtn,
                                                children: "+10s"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/NetPlayer.tsx",
                                                lineNumber: 529,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].volumeContainer,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: toggleVolume,
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].iconBtn,
                                                        children: isMuted || volume === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__["VolumeX"], {}, void 0, false, {
                                                            fileName: "[project]/src/components/NetPlayer.tsx",
                                                            lineNumber: 535,
                                                            columnNumber: 64
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {}, void 0, false, {
                                                            fileName: "[project]/src/components/NetPlayer.tsx",
                                                            lineNumber: 535,
                                                            columnNumber: 78
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/NetPlayer.tsx",
                                                        lineNumber: 534,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "range",
                                                        min: "0",
                                                        max: "1",
                                                        step: "0.05",
                                                        value: isMuted ? 0 : volume,
                                                        onChange: handleVolumeChange,
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].volumeSlider
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/NetPlayer.tsx",
                                                        lineNumber: 537,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/NetPlayer.tsx",
                                                lineNumber: 533,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].timeDisplay,
                                                children: [
                                                    videoRef.current ? formatTime(videoRef.current.currentTime) : "0:00",
                                                    " / ",
                                                    videoRef.current ? formatTime(videoRef.current.duration) : "0:00"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/NetPlayer.tsx",
                                                lineNumber: 548,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/NetPlayer.tsx",
                                        lineNumber: 520,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].rightControls,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].iconBtn} ${showSettings ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].activeBtn : ''}`,
                                                onClick: ()=>setShowSettings(!showSettings),
                                                title: "Audio & Subtitles",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$captions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Captions$3e$__["Captions"], {}, void 0, false, {
                                                    fileName: "[project]/src/components/NetPlayer.tsx",
                                                    lineNumber: 562,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/NetPlayer.tsx",
                                                lineNumber: 557,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: toggleFullscreen,
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].iconBtn,
                                                children: isFullscreen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize$3e$__["Minimize"], {}, void 0, false, {
                                                    fileName: "[project]/src/components/NetPlayer.tsx",
                                                    lineNumber: 566,
                                                    columnNumber: 49
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize$3e$__["Maximize"], {}, void 0, false, {
                                                    fileName: "[project]/src/components/NetPlayer.tsx",
                                                    lineNumber: 566,
                                                    columnNumber: 64
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/NetPlayer.tsx",
                                                lineNumber: 565,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/NetPlayer.tsx",
                                        lineNumber: 555,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/NetPlayer.tsx",
                                lineNumber: 519,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/NetPlayer.tsx",
                        lineNumber: 505,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/NetPlayer.tsx",
                lineNumber: 491,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/NetPlayer.tsx",
        lineNumber: 372,
        columnNumber: 9
    }, this);
}
_s(NetPlayer, "PESr/uRDmvCaWHBD6Wdf6X6iDC4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFFmpeg$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFFmpeg"]
    ];
});
_c = NetPlayer;
var _c;
__turbopack_context__.k.register(_c, "NetPlayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "content": "page-module___8aEwW__content",
  "header": "page-module___8aEwW__header",
  "logo": "page-module___8aEwW__logo",
  "main": "page-module___8aEwW__main",
  "uploadContainer": "page-module___8aEwW__uploadContainer",
  "uploadRow": "page-module___8aEwW__uploadRow",
});
}),
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useVideoLibrary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useVideoLibrary.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UploadZone$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/UploadZone.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/VideoGrid.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/NetPlayer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/page.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function Home() {
    _s();
    const { videos, addVideos } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useVideoLibrary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVideoLibrary"])();
    const [currentVideo, setCurrentVideo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleVideoSelect = (video)=>{
        setCurrentVideo(video);
    };
    const handleBack = ()=>{
        setCurrentVideo(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].main,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logo,
                    children: "PLAYFLIX"
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 27,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 26,
                columnNumber: 13
            }, this),
            currentVideo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NetPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                video: currentVideo,
                onBack: handleBack
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 31,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].content,
                children: videos.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].uploadContainer,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UploadZone$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        onVideosSelected: addVideos
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 36,
                        columnNumber: 29
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 35,
                    columnNumber: 25
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].uploadRow,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UploadZone$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                onVideosSelected: addVideos
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 41,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 40,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            videos: videos,
                            onVideoSelect: handleVideoSelect
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 43,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 33,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 24,
        columnNumber: 9
    }, this);
}
_s(Home, "Aw2UyMHHmTlGaJnBWGtiY8t6Rak=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useVideoLibrary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVideoLibrary"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_cbb30f8f._.js.map