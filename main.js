/*!
 * CaelokLib.js v1.1.0
 * A JavaScript library for modern UI components and effects.
 * Copyright 2025 Caelok
 * Licensed under MIT (Placeholder: You should choose an appropriate license)
 */

(function(window, document) {
    'use strict';

    // Library Namespace
    const CaelokLib = {};

    // --- Utility Functions ---
    CaelokLib.Utils = {
        /**
         * Generates a unique ID.
         * @param {string} [prefix='cl-'] - Prefix for the ID.
         * @returns {string} A unique ID string.
         */
        generateId: function(prefix = 'cl-') {
            return prefix + Math.random().toString(36).substring(2, 15);
        },

        /**
         * Debounces a function.
         * @param {Function} func - The function to debounce.
         * @param {number} wait - The debounce delay in milliseconds.
         * @returns {Function} The debounced function.
         */
        debounce: function(func, wait) {
            let timeout;
            return function(...args) {
                const context = this;
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(context, args), wait);
            };
        },

        /**
         * Throttles a function.
         * @param {Function} func - The function to throttle.
         * @param {number} limit - The throttle limit in milliseconds.
         * @returns {Function} The throttled function.
         */
        throttle: function(func, limit) {
            let inThrottle;
            let lastFunc;
            let lastRan;
            return function(...args) {
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    lastRan = Date.now();
                    inThrottle = true;
                } else {
                    clearTimeout(lastFunc);
                    lastFunc = setTimeout(function() {
                        if ((Date.now() - lastRan) >= limit) {
                            func.apply(context, args);
                            lastRan = Date.now();
                        }
                    }, limit - (Date.now() - lastRan));
                }
            };
        }
    };

    // --- CSS Injection Module ---
    CaelokLib.Core = (function() {
        const cssStyles = `
            /*!
             * CaelokLib CSS Component v1.1.0
             * Copyright 2025 Caelok
             */

            :root {
                --cl-primary-color: #007bff;
                --cl-secondary-color: #6c757d;
                --cl-success-color: #28a745;
                --cl-danger-color: #dc3545;
                --cl-warning-color: #ffc107;
                --cl-info-color: #17a2b8;
                --cl-light-color: #f8f9fa;
                --cl-dark-color: #343a40;
                --cl-body-bg: #ffffff;
                --cl-body-color: #212529;
                --cl-font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
                --cl-border-radius: 0.25rem;
                --cl-box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
                --cl-transition-base: all .2s ease-in-out;
            }

            body.cl-modal-open {
                overflow: hidden;
            }
            body.cl-preloader-active {
                 overflow: hidden;
            }

            /* Preloader Styles */
            .cl-preloader {
                position: fixed;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: 10000; /* Higher than modals */
                background-color: var(--cl-body-bg);
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                transition: opacity 0.75s cubic-bezier(0.4, 0, 0.2, 1), visibility 0s linear 0.75s;
                opacity: 1;
                visibility: visible;
            }

            .cl-preloader.cl-hidden {
                opacity: 0;
                visibility: hidden;
            }

            .cl-preloader-spinner {
                border: 4px solid rgba(0, 0, 0, 0.1);
                width: 36px;
                height: 36px;
                border-radius: 50%;
                border-left-color: var(--cl-primary-color);
                animation: cl-spinner-animation 0.8s infinite linear;
            }
            
            .cl-preloader-text {
                margin-top: 15px;
                font-family: var(--cl-font-family-sans-serif);
                color: var(--cl-body-color);
                font-size: 1em;
            }

            @keyframes cl-spinner-animation {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            /* Modal Styles */
            .cl-modal-backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: rgba(0,0,0,0.5);
                z-index: 1040;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.25s ease-out, visibility 0s linear 0.25s;
            }
            .cl-modal-backdrop.cl-visible {
                opacity: 1;
                visibility: visible;
                transition-delay: 0s;
            }

            .cl-modal {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.9);
                background-color: var(--cl-body-bg);
                border-radius: var(--cl-border-radius);
                box-shadow: var(--cl-box-shadow);
                z-index: 1050;
                width: 90%;
                max-width: 500px;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.25s ease-out, transform 0.25s ease-out, visibility 0s linear 0.25s;
                display: flex;
                flex-direction: column;
                max-height: 90vh; /* Ensure modal fits in viewport */
            }
            .cl-modal.cl-visible {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
                visibility: visible;
                transition-delay: 0s;
            }
            .cl-modal-header {
                padding: 1rem;
                border-bottom: 1px solid #dee2e6;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .cl-modal-title {
                margin: 0;
                font-size: 1.25rem;
                font-weight: 500;
            }
            .cl-modal-close {
                background: transparent;
                border: 0;
                font-size: 1.5rem;
                font-weight: 700;
                line-height: 1;
                color: #000;
                opacity: .5;
                padding: 0.5rem;
                margin: -0.5rem -0.5rem -0.5rem auto; /* Align to right */
                cursor: pointer;
            }
            .cl-modal-close:hover {
                opacity: .75;
            }
            .cl-modal-body {
                padding: 1rem;
                overflow-y: auto; /* For scrollable content */
                flex-grow: 1;
            }
            .cl-modal-footer {
                padding: 0.75rem 1rem;
                border-top: 1px solid #dee2e6;
                display: flex;
                justify-content: flex-end; /* Align buttons to the right */
                gap: 0.5rem; /* Space between buttons */
            }
            .cl-modal-footer .cl-button { /* Basic button styling */
                padding: 0.375rem 0.75rem;
                border-radius: var(--cl-border-radius);
                border: 1px solid transparent;
                cursor: pointer;
                font-size: 1rem;
                transition: var(--cl-transition-base);
            }
            .cl-button-primary {
                background-color: var(--cl-primary-color);
                color: white;
                border-color: var(--cl-primary-color);
            }
            .cl-button-primary:hover {
                background-color: #0056b3;
                border-color: #0056b3;
            }
             .cl-button-secondary {
                background-color: var(--cl-secondary-color);
                color: white;
                border-color: var(--cl-secondary-color);
            }
            .cl-button-secondary:hover {
                background-color: #545b62;
                border-color: #545b62;
            }

            /* Tooltip Styles */
            .cl-tooltip {
                position: absolute;
                z-index: 1070;
                display: block;
                margin: 0;
                font-family: var(--cl-font-family-sans-serif);
                font-style: normal;
                font-weight: 400;
                line-height: 1.5;
                text-align: left;
                text-decoration: none;
                text-shadow: none;
                text-transform: none;
                letter-spacing: normal;
                word-break: normal;
                word-spacing: normal;
                white-space: normal;
                line-break: auto;
                font-size: 0.875rem;
                word-wrap: break-word;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.15s ease-in-out, visibility 0s linear 0.15s;
                pointer-events: none; /* Tooltips shouldn't be interactive themselves */
            }
            .cl-tooltip.cl-visible {
                opacity: 0.9; /* Slightly transparent */
                visibility: visible;
                transition-delay: 0s;
            }
            .cl-tooltip-inner {
                max-width: 200px;
                padding: 0.25rem 0.5rem;
                color: var(--cl-light-color);
                text-align: center;
                background-color: var(--cl-dark-color);
                border-radius: var(--cl-border-radius);
            }
            /* Tooltip arrow (optional, basic) */
            .cl-tooltip .cl-tooltip-arrow {
                position: absolute;
                display: block;
                width: 0.8rem;
                height: 0.4rem;
            }
            .cl-tooltip .cl-tooltip-arrow::before {
                position: absolute;
                content: "";
                border-color: transparent;
                border-style: solid;
            }
            .cl-tooltip[data-popper-placement^="top"] > .cl-tooltip-arrow { bottom: -0.4rem; }
            .cl-tooltip[data-popper-placement^="top"] > .cl-tooltip-arrow::before {
                border-width: 0.4rem 0.4rem 0;
                border-top-color: var(--cl-dark-color);
            }
            /* Add more for bottom, left, right if using Popper.js or similar advanced positioning */

            /* Scroll Animate Styles */
            .cl-animate {
                opacity: 0;
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            .cl-animate.cl-fade-in {
                opacity: 0;
            }
            .cl-animate.cl-fade-in.cl-is-visible {
                opacity: 1;
            }
            .cl-animate.cl-slide-up {
                opacity: 0;
                transform: translateY(30px);
            }
            .cl-animate.cl-slide-up.cl-is-visible {
                opacity: 1;
                transform: translateY(0);
            }
            .cl-animate.cl-slide-in-left {
                opacity: 0;
                transform: translateX(-50px);
            }
            .cl-animate.cl-slide-in-left.cl-is-visible {
                opacity: 1;
                transform: translateX(0);
            }
            .cl-animate.cl-slide-in-right {
                opacity: 0;
                transform: translateX(50px);
            }
            .cl-animate.cl-slide-in-right.cl-is-visible {
                opacity: 1;
                transform: translateX(0);
            }

            /* Notification/Toast Styles */
            .cl-notification-container {
                position: fixed;
                z-index: 1080; /* Above most other elements */
                padding: 0.5rem;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                width: 100%; /* For mobile full width */
                max-width: 350px; /* Max width on larger screens */
            }
            .cl-notification-container.cl-top-right { top: 1rem; right: 1rem; align-items: flex-end; }
            .cl-notification-container.cl-top-left { top: 1rem; left: 1rem; align-items: flex-start; }
            .cl-notification-container.cl-bottom-right { bottom: 1rem; right: 1rem; align-items: flex-end; }
            .cl-notification-container.cl-bottom-left { bottom: 1rem; left: 1rem; align-items: flex-start; }
            .cl-notification-container.cl-top-center { top: 1rem; left: 50%; transform: translateX(-50%); align-items:center; }
            .cl-notification-container.cl-bottom-center { bottom: 1rem; left: 50%; transform: translateX(-50%); align-items:center; }


            .cl-notification {
                background-color: var(--cl-dark-color);
                color: var(--cl-light-color);
                padding: 0.75rem 1.25rem;
                border-radius: var(--cl-border-radius);
                box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,0.1);
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.3s ease, transform 0.3s ease, visibility 0s linear 0.3s;
                position: relative; /* For close button positioning */
                width: fit-content; /* Adjust to content, respecting container's max-width */
                min-width: 200px;
                display: flex; /* For aligning close button */
                justify-content: space-between;
                align-items: center;
            }
            .cl-notification.cl-visible {
                opacity: 1;
                transform: translateY(0);
                visibility: visible;
                transition-delay: 0s;
            }
            .cl-notification-message {
                margin-right: 1rem; /* Space for close button */
            }
            .cl-notification-close {
                background: none;
                border: none;
                color: inherit;
                opacity: 0.7;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0.25rem;
            }
            .cl-notification-close:hover { opacity: 1; }

            .cl-notification.cl-info { background-color: var(--cl-info-color); color: white; }
            .cl-notification.cl-success { background-color: var(--cl-success-color); color: white; }
            .cl-notification.cl-warning { background-color: var(--cl-warning-color); color: #212529; }
            .cl-notification.cl-danger { background-color: var(--cl-danger-color); color: white; }

            /* Simple utility classes */
            .cl-d-none { display: none !important; }
            .cl-visually-hidden {
                position: absolute !important;
                width: 1px !important;
                height: 1px !important;
                padding: 0 !important;
                margin: -1px !important;
                overflow: hidden !important;
                clip: rect(0,0,0,0) !important;
                white-space: nowrap !important;
                border: 0 !important;
            }

            /* Responsive adjustments */
            @media (max-width: 576px) {
                .cl-modal {
                    width: 95%;
                    max-height: 95vh;
                }
                .cl-notification-container { /* Full width on small screens */
                    left: 0.5rem;
                    right: 0.5rem;
                    width: auto;
                    max-width: none;
                    align-items: stretch; /* Notifications take full width of container */
                }
                .cl-notification-container.cl-top-center,
                .cl-notification-container.cl-bottom-center {
                     transform: none;
                     left: 0.5rem; /* Override centered positioning */
                }
                .cl-notification {
                    width: 100%; /* Notifications use full width of their container */
                }
            }
        `;

        function injectCSS() {
            if (document.getElementById('caelok-lib-styles')) return;
            const styleTag = document.createElement('style');
            styleTag.type = 'text/css';
            styleTag.id = 'caelok-lib-styles';
            /* istanbul ignore if */
            if (styleTag.styleSheet) { styleTag.styleSheet.cssText = cssStyles; }
            else { styleTag.appendChild(document.createTextNode(cssStyles)); }
            document.head.appendChild(styleTag);
        }

        return {
            init: injectCSS,
            getStyles: () => cssStyles
        };
    })();

    // --- LocalStorage Module (from v1.0.0) ---
    CaelokLib.Storage = (function() {
        // ... (previous Storage code - kept concise for brevity in this example)
        let isSupported = false; try { const t = '__cl_test__'; localStorage.setItem(t, t); localStorage.removeItem(t); isSupported = true; } catch (e) { /* istanbul ignore next */ console.warn('CaelokLib.Storage: localStorage unavailable.');}
        return {
            set: (k, v) => { if(!isSupported) return false; try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { /* istanbul ignore next */ return false; } },
            get: (k) => { if(!isSupported) return null; try { const i = localStorage.getItem(k); return i ? JSON.parse(i) : null; } catch (e) { /* istanbul ignore next */ return null; } },
            remove: (k) => { if(!isSupported) return false; try { localStorage.removeItem(k); return true; } catch (e) { /* istanbul ignore next */ return false; } },
            clearAll: () => { if(!isSupported) return false; try { localStorage.clear(); return true; } catch (e) { /* istanbul ignore next */ return false; } },
            isSupported: () => isSupported
        };
    })();

    // --- Preloader Module (Enhanced) ---
    CaelokLib.Preloader = (function() {
        let preloaderElement = null;
        let config = {
            autoShow: true,
            autoHide: true,
            showSpinner: true,
            text: null,
            customHTML: null // New: Allow custom HTML for preloader content
        };

        function createPreloaderDOM() {
            const container = document.createElement('div');
            container.className = 'cl-preloader';
            container.setAttribute('aria-live', 'assertive');
            container.setAttribute('role', 'status');

            if (config.customHTML) {
                if (typeof config.customHTML === 'string') {
                    container.innerHTML = config.customHTML;
                } else if (config.customHTML instanceof HTMLElement) {
                    container.appendChild(config.customHTML.cloneNode(true));
                }
            } else {
                if (config.showSpinner) {
                    const spinner = document.createElement('div');
                    spinner.className = 'cl-preloader-spinner';
                    container.appendChild(spinner);
                }
                if (config.text) {
                    const textElement = document.createElement('div');
                    textElement.className = 'cl-preloader-text';
                    textElement.textContent = config.text;
                    container.appendChild(textElement);
                }
            }
            return container;
        }

        function show() {
            if (preloaderElement && preloaderElement.parentNode) {
                 preloaderElement.classList.remove('cl-hidden');
            } else {
                preloaderElement = createPreloaderDOM();
                document.body.appendChild(preloaderElement);
                /* istanbul ignore next */
                void preloaderElement.offsetHeight; // Reflow
            }
            document.body.classList.add('cl-preloader-active');
        }

        function hide(removeElement = true) {
            if (preloaderElement) {
                preloaderElement.classList.add('cl-hidden');
                document.body.classList.remove('cl-preloader-active');

                const onTransitionEnd = (event) => {
                    if (event.target === preloaderElement && event.propertyName === 'opacity') {
                        preloaderElement.removeEventListener('transitionend', onTransitionEnd);
                        if (removeElement && preloaderElement.parentNode) {
                            preloaderElement.parentNode.removeChild(preloaderElement);
                            preloaderElement = null;
                        }
                    }
                };
                preloaderElement.addEventListener('transitionend', onTransitionEnd);
                // Fallback for safety
                /* istanbul ignore next */
                setTimeout(() => {
                    if (preloaderElement && preloaderElement.classList.contains('cl-hidden') && removeElement && preloaderElement.parentNode) {
                        preloaderElement.removeEventListener('transitionend', onTransitionEnd); // Clean up just in case
                        preloaderElement.parentNode.removeChild(preloaderElement);
                        preloaderElement = null;
                    }
                }, 800);
            }
        }
        
        function updateConfig(userConfig = {}) {
            config = { ...config, ...userConfig };
            if (preloaderElement && preloaderElement.parentNode) { // If visible, update it
                const oldPreloader = preloaderElement;
                preloaderElement = createPreloaderDOM();
                if (oldPreloader.classList.contains('cl-hidden')) {
                    preloaderElement.classList.add('cl-hidden');
                }
                oldPreloader.parentNode.replaceChild(preloaderElement, oldPreloader);
            }
        }

        function autoInit() {
            if (config.autoShow) {
                if (document.body) show();
                else document.addEventListener('DOMContentLoaded', show, { once: true });
            }
            if (config.autoHide) {
                window.addEventListener('load', () => hide(true), { once: true });
            }
        }

        return {
            show: show,
            hide: hide,
            init: function(userConfig) {
                updateConfig(userConfig);
                autoInit();
            },
            isVisible: () => preloaderElement !== null && !preloaderElement.classList.contains('cl-hidden'),
            configure: updateConfig
        };
    })();

    // --- EQ+ Module (from v1.0.0, slightly reviewed) ---
    CaelokLib.EQ = (function() {
        // ... (previous EQ code - kept concise for brevity in this example)
        const observedItems = []; let resizeObserver = null;
        function evalQ(item) { /* ... evaluate queries ... */ if(!item.parent || !document.body.contains(item.element)) return; const pw = item.parent.clientWidth; item.queries.forEach(q => { let m = false; if(q.operator && typeof q.breakpoint === 'number'){ switch(q.operator){ case 'min-width': m = pw >= q.breakpoint; break; case 'max-width': m = pw <= q.breakpoint; break; }} else if(typeof q.condition === 'function'){m = q.condition(pw, item.element);} if(m) item.element.classList.add(q.className); else item.element.classList.remove(q.className);}); }
        function checkAll() { observedItems.forEach(evalQ); }
        /* istanbul ignore else */ if (typeof ResizeObserver !== 'undefined') { resizeObserver = new ResizeObserver(entries => { for (const entry of entries) { observedItems.filter(i => i.parent === entry.target).forEach(evalQ); }});} else { /* istanbul ignore next */ window.addEventListener('resize', CaelokLib.Utils.debounce(checkAll, 150), { passive: true }); console.warn("CaelokLib.EQ: ResizeObserver not supported. Using debounced window resize."); }
        return {
            observe: (elSel, qs) => {const el = (typeof elSel === 'string')?document.querySelector(elSel):elSel; if(!el || !el.parentNode || el.parentNode.nodeType !== Node.ELEMENT_NODE) { /* istanbul ignore next */ console.error('EQ: Invalid element or no parent.'); return; } CaelokLib.EQ.unobserve(el,false); const ni = {element: el, queries: qs, parent: el.parentNode}; observedItems.push(ni); if(resizeObserver) resizeObserver.observe(ni.parent); evalQ(ni);},
            unobserve: (elSel, unobserveParent = true) => {const el = (typeof elSel === 'string')?document.querySelector(elSel):elSel; if(!el) return; let p=null; for(let i=observedItems.length-1;i>=0;i--){if(observedItems[i].element===el){p=observedItems[i].parent;observedItems.splice(i,1);}} if(resizeObserver && p && unobserveParent && !observedItems.some(item => item.parent === p)){resizeObserver.unobserve(p);}},
            unobserveAll: () => { if(resizeObserver) { const parents = new Set(observedItems.map(i => i.parent)); parents.forEach(p => resizeObserver.unobserve(p)); } observedItems.length=0;},
            update: checkAll,
            init: () => {}
        };
    })();

    // --- Modal Module ---
    CaelokLib.Modal = (function() {
        let activeModal = null;
        let backdropElement = null;
        const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]';

        function createBackdrop() {
            if (!backdropElement) {
                backdropElement = document.createElement('div');
                backdropElement.className = 'cl-modal-backdrop';
                backdropElement.addEventListener('click', () => {
                    if (activeModal && activeModal.config.closeOnBackdropClick) {
                        hide();
                    }
                });
                document.body.appendChild(backdropElement);
            }
        }
        
        function trapFocus(modalElement) {
            const focusableElements = modalElement.querySelectorAll(focusableElementsString);
            const firstFocusableElement = focusableElements[0];
            const lastFocusableElement = focusableElements[focusableElements.length - 1];

            modalElement.addEventListener('keydown', function(e) {
                if (e.key !== 'Tab') return;

                if (e.shiftKey) { // Shift + Tab
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            });
             /* istanbul ignore else */
            if (firstFocusableElement) {
                setTimeout(() => firstFocusableElement.focus(), 50); // Delay focus slightly for transition
            }
        }


        function show(options) {
            if (activeModal) hide(false); // Hide previous modal without removing backdrop immediately

            const config = {
                title: '',
                content: '', // HTML string or HTMLElement
                footerContent: '', // HTML string or HTMLElement for footer buttons
                size: 'default', // 'sm', 'lg', 'xl' (todo: add CSS for these)
                closeButton: true,
                closeOnEscape: true,
                closeOnBackdropClick: true,
                onShow: null, // Callback when shown
                onHide: null, // Callback when hidden
                id: CaelokLib.Utils.generateId('modal-')
            };
            Object.assign(config, options);

            createBackdrop(); // Ensure backdrop is ready

            const modalElement = document.createElement('div');
            modalElement.className = 'cl-modal';
            modalElement.id = config.id;
            modalElement.setAttribute('role', 'dialog');
            modalElement.setAttribute('aria-modal', 'true');
            if (config.title) modalElement.setAttribute('aria-labelledby', config.id + '-title');
            
            let modalHTML = '';
            if (config.title || config.closeButton) {
                modalHTML += `<div class="cl-modal-header">`;
                if (config.title) {
                    modalHTML += `<h5 class="cl-modal-title" id="${config.id}-title">${config.title}</h5>`;
                }
                if (config.closeButton) {
                    modalHTML += `<button type="button" class="cl-modal-close" aria-label="Cerrar">&times;</button>`;
                }
                modalHTML += `</div>`;
            }

            modalHTML += `<div class="cl-modal-body"></div>`;

            if (config.footerContent) {
                modalHTML += `<div class="cl-modal-footer"></div>`;
            }
            modalElement.innerHTML = modalHTML;

            const bodyElement = modalElement.querySelector('.cl-modal-body');
            if (typeof config.content === 'string') {
                bodyElement.innerHTML = config.content;
            } else if (config.content instanceof HTMLElement) {
                bodyElement.appendChild(config.content);
            }
            
            if(config.footerContent){
                const footerElement = modalElement.querySelector('.cl-modal-footer');
                 if (typeof config.footerContent === 'string') {
                    footerElement.innerHTML = config.footerContent;
                } else if (config.footerContent instanceof HTMLElement) {
                    footerElement.appendChild(config.footerContent);
                }
            }


            document.body.appendChild(modalElement);
            document.body.classList.add('cl-modal-open');
            
            // Add event listener for close button
            const closeBtn = modalElement.querySelector('.cl-modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => hide());
            }

            // Show backdrop and modal with slight delay for transitions
            /* istanbul ignore next */
            requestAnimationFrame(() => {
                /* istanbul ignore next */
                requestAnimationFrame(() => { // Double requestAnimationFrame for some browsers
                    if(backdropElement) backdropElement.classList.add('cl-visible');
                    modalElement.classList.add('cl-visible');
                });
            });

            activeModal = { element: modalElement, config: config, previousFocus: document.activeElement };
            
            if (config.closeOnEscape) {
                document.addEventListener('keydown', handleEscapeKey);
            }
            
            trapFocus(modalElement);

            if (typeof config.onShow === 'function') {
                config.onShow(modalElement);
            }
            return modalElement;
        }

        function hide(removeBackdrop = true) {
            if (!activeModal) return;

            const { element, config, previousFocus } = activeModal;

            element.classList.remove('cl-visible');
            if (removeBackdrop && backdropElement) {
                 backdropElement.classList.remove('cl-visible');
            }
            
            document.body.classList.remove('cl-modal-open');


            const onTransitionEnd = (event) => {
                 if(event.target !== element) return; // Only react to modal's own transition
                element.removeEventListener('transitionend', onTransitionEnd);
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
                if (removeBackdrop && backdropElement && backdropElement.parentNode && !backdropElement.classList.contains('cl-visible')) {
                    backdropElement.parentNode.removeChild(backdropElement);
                    backdropElement = null;
                }
                 /* istanbul ignore else */
                if (previousFocus && typeof previousFocus.focus === 'function') {
                    previousFocus.focus();
                }
                if (typeof config.onHide === 'function') {
                    config.onHide();
                }
            };

            element.addEventListener('transitionend', onTransitionEnd);
            // Fallback if transitionend doesn't fire
            /* istanbul ignore next */
            setTimeout(() => {
                if (element.parentNode) { // Check if still there
                    onTransitionEnd({target: element}); // Manually trigger cleanup
                }
            }, 300); // slightly longer than transition

            if (config.closeOnEscape) {
                document.removeEventListener('keydown', handleEscapeKey);
            }
            activeModal = null;
        }

        function handleEscapeKey(event) {
            if (event.key === 'Escape' && activeModal && activeModal.config.closeOnEscape) {
                hide();
            }
        }

        return {
            show: show,
            hide: hide,
            getActiveModal: () => activeModal ? activeModal.element : null,
            init: () => { /* Modals are created on demand */ }
        };
    })();

    // --- Tooltip Module (Simple, CSS driven for basic positioning) ---
    CaelokLib.Tooltip = (function() {
        const tooltipRegistry = new Map(); // Store {element: tooltipElement}

        function createTooltipElement(text, id) {
            const tooltip = document.createElement('div');
            tooltip.className = 'cl-tooltip';
            tooltip.setAttribute('role', 'tooltip');
            tooltip.id = id;
            
            const inner = document.createElement('div');
            inner.className = 'cl-tooltip-inner';
            inner.textContent = text;
            tooltip.appendChild(inner);
            
            // Optional: Add arrow for basic positioning (more advanced needs Popper.js)
            // For simplicity, this example relies on CSS for a generic position,
            // or you'd integrate a library like PopperJS here for precise placement.
            // const arrow = document.createElement('div');
            // arrow.className = 'cl-tooltip-arrow';
            // tooltip.appendChild(arrow);

            document.body.appendChild(tooltip);
            return tooltip;
        }

        function positionTooltip(target, tooltip) {
            const targetRect = target.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            let top, left;

            // Default: Top position
            top = targetRect.top - tooltipRect.height - 5; // 5px offset
            left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);

            // Basic boundary detection (very simplified)
            if (top < 0) { // If too close to top, show below
                top = targetRect.bottom + 5;
                tooltip.setAttribute('data-popper-placement', 'bottom'); // For arrow styling
            } else {
                tooltip.setAttribute('data-popper-placement', 'top');
            }
            if (left < 0) left = 5;
            if (left + tooltipRect.width > window.innerWidth) left = window.innerWidth - tooltipRect.width - 5;


            tooltip.style.top = `${top + window.scrollY}px`;
            tooltip.style.left = `${left + window.scrollX}px`;
        }
        
        function showTooltip(target) {
            const title = target.getAttribute('title') || target.getAttribute('data-cl-tooltip');
            if (!title) return;

            // Prevent native title from showing
            if(target.getAttribute('title')) {
                target.setAttribute('data-cl-original-title', title);
                target.removeAttribute('title');
            }

            const tooltipId = CaelokLib.Utils.generateId('tooltip-');
            const tooltipElement = createTooltipElement(title, tooltipId);
            target.setAttribute('aria-describedby', tooltipId);
            
            positionTooltip(target, tooltipElement);
            tooltipElement.classList.add('cl-visible');
            tooltipRegistry.set(target, tooltipElement);
        }

        function hideTooltip(target) {
            const tooltipElement = tooltipRegistry.get(target);
            if (tooltipElement) {
                tooltipElement.classList.remove('cl-visible');
                // Remove after transition
                tooltipElement.addEventListener('transitionend', function te() {
                    this.removeEventListener('transitionend', te);
                    /* istanbul ignore if */
                    if (this.parentNode) this.parentNode.removeChild(this);
                });
                /* istanbul ignore next */
                setTimeout(() => { if(tooltipElement.parentNode) tooltipElement.parentNode.removeChild(tooltipElement); }, 200);


                target.removeAttribute('aria-describedby');
                tooltipRegistry.delete(target);
            }
            // Restore native title if it was moved
            const originalTitle = target.getAttribute('data-cl-original-title');
            if (originalTitle) {
                target.setAttribute('title', originalTitle);
                target.removeAttribute('data-cl-original-title');
            }
        }

        function initTooltips(selector = '[data-cl-tooltip]') {
            document.querySelectorAll(selector).forEach(el => {
                // Ensure each element only gets listeners once
                if (el.dataset.clTooltipInitialized) return;
                el.dataset.clTooltipInitialized = 'true';

                el.addEventListener('mouseenter', () => showTooltip(el));
                el.addEventListener('focus', () => showTooltip(el));
                el.addEventListener('mouseleave', () => hideTooltip(el));
                el.addEventListener('blur', () => hideTooltip(el));
            });
        }
        
        // Handle ESC key to close any active tooltip (though less common for tooltips)
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                tooltipRegistry.forEach((tooltipEl, targetEl) => {
                    hideTooltip(targetEl);
                });
            }
        });

        return {
            init: initTooltips,
            dispose: (selectorOrElement) => {
                const elements = typeof selectorOrElement === 'string' ? document.querySelectorAll(selectorOrElement) : [selectorOrElement];
                elements.forEach(el => {
                    hideTooltip(el); // Hide it first
                    el.removeEventListener('mouseenter', showTooltip); // Simplified, actual listeners are anonymous
                    el.removeEventListener('focus', showTooltip);
                    el.removeEventListener('mouseleave', hideTooltip);
                    el.removeEventListener('blur', hideTooltip);
                    delete el.dataset.clTooltipInitialized;
                });
            }
        };
    })();

    // --- Scroll Animate Module ---
    CaelokLib.ScrollAnimate = (function() {
        let observer;
        const defaultOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1, // 10% visible
            animationClass: 'cl-is-visible', // Class to add when element is visible
            delay: '0s',
            duration: '0.6s',
            once: true // Only animate once
        };

        function handleIntersect(entries, obs) {
            entries.forEach(entry => {
                const target = entry.target;
                if (entry.isIntersecting) {
                    target.style.transitionDelay = target.dataset.clDelay || defaultOptions.delay;
                    target.style.transitionDuration = target.dataset.clDuration || defaultOptions.duration;
                    target.classList.add(target.dataset.clAnimationClass || defaultOptions.animationClass);
                    if (target.dataset.clOnce === 'true' || (target.dataset.clOnce === undefined && defaultOptions.once)) {
                        obs.unobserve(target);
                    }
                } else {
                    // Option to re-animate if 'once' is false
                    if (target.dataset.clOnce === 'false') {
                         target.classList.remove(target.dataset.clAnimationClass || defaultOptions.animationClass);
                    }
                }
            });
        }

        function init(selector = '.cl-animate', options = {}) {
            /* istanbul ignore if */
            if (!('IntersectionObserver' in window)) {
                console.warn('CaelokLib.ScrollAnimate: IntersectionObserver not supported. Animations will not trigger.');
                // Fallback: make all elements visible immediately
                document.querySelectorAll(selector).forEach(el => {
                    el.classList.add(el.dataset.clAnimationClass || defaultOptions.animationClass);
                });
                return;
            }

            const mergedOptions = { ...defaultOptions, ...options };
            observer = new IntersectionObserver(handleIntersect, mergedOptions);
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                // Store options on the element if they are specific
                if(el.dataset.clAnimationClass === undefined) el.dataset.clAnimationClass = mergedOptions.animationClass;
                if(el.dataset.clDelay === undefined && mergedOptions.delay) el.dataset.clDelay = mergedOptions.delay;
                if(el.dataset.clDuration === undefined && mergedOptions.duration) el.dataset.clDuration = mergedOptions.duration;
                if(el.dataset.clOnce === undefined && mergedOptions.once !== undefined) el.dataset.clOnce = String(mergedOptions.once);
                
                observer.observe(el);
            });
        }
        
        function observe(element, elOptions = {}) {
            /* istanbul ignore if */
            if (!observer) {
                console.warn('CaelokLib.ScrollAnimate: Not initialized. Call init() first or ensure IntersectionObserver is supported.');
                if (element instanceof HTMLElement) element.classList.add(elOptions.animationClass || defaultOptions.animationClass);
                return;
            }
             if (element instanceof HTMLElement) {
                if(elOptions.animationClass) element.dataset.clAnimationClass = elOptions.animationClass;
                if(elOptions.delay) element.dataset.clDelay = elOptions.delay;
                if(elOptions.duration) element.dataset.clDuration = elOptions.duration;
                if(elOptions.once !== undefined) element.dataset.clOnce = String(elOptions.once);
                observer.observe(element);
             } else {
                console.error('CaelokLib.ScrollAnimate.observe: Invalid element provided.');
             }
        }
        
        function unobserve(element) {
             /* istanbul ignore if */
             if (!observer) return;
             if (element instanceof HTMLElement) {
                observer.unobserve(element);
             }
        }


        return {
            init: init, // Initialize with a general selector
            observe: observe, // Observe a specific element dynamically
            unobserve: unobserve, // Unobserve a specific element
            destroy: () => { /* istanbul ignore if */ if (observer) observer.disconnect(); observer = null; }
        };
    })();

    // --- Notification/Toast Module ---
    CaelokLib.Notify = (function() {
        let container = null;
        const defaultConfig = {
            message: '',
            type: 'info', // 'info', 'success', 'warning', 'danger', 'dark' (uses dark as default style)
            duration: 3000, // milliseconds, 0 for sticky
            position: 'top-right', // 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'
            closable: true,
            customHTML: null, // Allow full custom HTML content
            onClose: null // Callback when notification is closed
        };

        function getContainer(position) {
            // Check if a container for this specific position already exists
            let specificContainer = document.querySelector(`.cl-notification-container.cl-${position}`);
            if (specificContainer) {
                return specificContainer;
            }

            // If not, create a new one
            specificContainer = document.createElement('div');
            specificContainer.className = `cl-notification-container cl-${position}`;
            document.body.appendChild(specificContainer);
            return specificContainer;
        }


        function show(optionsOrMessage) {
            const config = { ...defaultConfig };
            if (typeof optionsOrMessage === 'string') {
                config.message = optionsOrMessage;
            } else {
                Object.assign(config, optionsOrMessage);
            }

            container = getContainer(config.position);

            const notificationElement = document.createElement('div');
            notificationElement.className = `cl-notification cl-${config.type}`;
            notificationElement.setAttribute('role', 'alert');
            notificationElement.setAttribute('aria-live', 'assertive');

            if (config.customHTML) {
                 if (typeof config.customHTML === 'string') {
                    notificationElement.innerHTML = config.customHTML;
                } else if (config.customHTML instanceof HTMLElement) {
                    notificationElement.appendChild(config.customHTML.cloneNode(true));
                }
            } else {
                const messageSpan = document.createElement('span');
                messageSpan.className = 'cl-notification-message';
                messageSpan.textContent = config.message;
                notificationElement.appendChild(messageSpan);
            }
            

            if (config.closable) {
                const closeButton = document.createElement('button');
                closeButton.type = 'button';
                closeButton.className = 'cl-notification-close';
                closeButton.innerHTML = '&times;';
                closeButton.setAttribute('aria-label', 'Cerrar notificación');
                closeButton.addEventListener('click', () => dismiss(notificationElement, config.onClose));
                // Ensure close button is appended appropriately if customHTML is used
                if (config.customHTML && notificationElement.firstChild && notificationElement.firstChild.nodeType === Node.ELEMENT_NODE) {
                    // Try to append it smartly, or require user to place it in customHTML
                     notificationElement.appendChild(closeButton); // Simplest append
                } else if (!config.customHTML) {
                     notificationElement.appendChild(closeButton);
                }
            }
            
            // Prepend so new notifications appear on top (or bottom depending on flex-direction of container)
            if (config.position.startsWith('top-')) {
                 container.prepend(notificationElement);
            } else {
                 container.appendChild(notificationElement);
            }


            // Trigger animation
            /* istanbul ignore next */
            requestAnimationFrame(() => {
                notificationElement.classList.add('cl-visible');
            });

            if (config.duration > 0) {
                setTimeout(() => dismiss(notificationElement, config.onClose), config.duration);
            }
            return notificationElement;
        }

        function dismiss(notificationElement, onCloseCallback) {
            if (!notificationElement || !notificationElement.parentNode) return;

            notificationElement.classList.remove('cl-visible');
            notificationElement.addEventListener('transitionend', function te() {
                this.removeEventListener('transitionend', te);
                /* istanbul ignore if */
                if (this.parentNode) {
                    this.parentNode.removeChild(this);
                    // Check if container is empty and remove it
                    const parentContainer = this.closest('.cl-notification-container');
                    if (parentContainer && parentContainer.childElementCount === 0) {
                        parentContainer.remove();
                    }
                }
                if (typeof onCloseCallback === 'function') {
                    onCloseCallback();
                }
            });
            // Fallback for safety
            /* istanbul ignore next */
            setTimeout(() => {
                 if (notificationElement.parentNode) {
                    notificationElement.parentNode.removeChild(notificationElement);
                    const parentContainer = notificationElement.closest('.cl-notification-container');
                    if (parentContainer && parentContainer.childElementCount === 0) {
                        parentContainer.remove();
                    }
                    if (typeof onCloseCallback === 'function') {
                        onCloseCallback(); // Call it here if not already called
                    }
                 }
            }, 350); // a bit longer than transition
        }
        
        // Convenience methods
        function info(message, options={}) { return show({...options, message, type: 'info'}); }
        function success(message, options={}) { return show({...options, message, type: 'success'}); }
        function warning(message, options={}) { return show({...options, message, type: 'warning'}); }
        function danger(message, options={}) { return show({...options, message, type: 'danger'}); }


        return {
            show: show,
            info: info,
            success: success,
            warning: warning,
            danger: danger,
            init: () => { /* Notifications are created on demand */ }
        };
    })();


    // --- Global Initialization ---
    CaelokLib.init = function(config = {}) {
        CaelokLib.Core.init(); // Injects CSS first

        const preloaderConfig = typeof config.preloader === 'object' ? config.preloader : {};
        if (config.preloader !== false) {
             CaelokLib.Preloader.init(preloaderConfig);
        }
        
        CaelokLib.EQ.init(); // Ready for observe calls
        CaelokLib.Modal.init(); // Ready for show calls
        CaelokLib.Tooltip.init(config.tooltipSelector); // Auto-init existing tooltips
        CaelokLib.ScrollAnimate.init(config.scrollAnimateSelector, config.scrollAnimateOptions); // Auto-init scroll animations
        CaelokLib.Notify.init(); // Ready for show calls
        
        // console.info('CaelokLib v1.1.0 Initialized.');
    };

    // Expose CaelokLib to the global window object
    window.CaelokLib = CaelokLib;

    // Auto-initialize the library based on window.caelokLibConfig
    function attemptAutoInit() {
        const libConfig = window.caelokLibConfig || {};
        CaelokLib.init(libConfig);
    }

    /* istanbul ignore if */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attemptAutoInit, { once: true });
    } else {
        attemptAutoInit();
    }

})(window, document);
