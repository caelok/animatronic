/*!
 * Caelok CSS Framework v0.1.1
 * Copyright 2025 Caelok
 * Licensed under MIT (https://opensource.org/licenses/MIT)
 */

class CaelokFramework {
  constructor(options = {}) {
    this.options = Object.assign({
      targetElement: document.head,
      prefix: 'ck-',
      theme: {
        colors: {
          primary: '#007bff',
          secondary: '#6c757d',
          success: '#28a745',
          danger: '#dc3545',
          warning: '#ffc107',
          info: '#17a2b8',
          light: '#f8f9fa',
          dark: '#343a40',
          white: '#ffffff',
          black: '#000000',
          bodyBg: '#ffffff',
          textColor: '#212529',
          linkColor: '#007bff',
        },
        breakpoints: {
          xs: '0px',
          sm: '576px',
          md: '768px',
          lg: '992px',
          xl: '1200px',
          xxl: '1400px',
        },
        spacing: [0, 0.25, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5], // rem units
        typography: {
          fontFamilyBase: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          fontSizeBase: '1rem',
          fontWeightLight: 300,
          fontWeightNormal: 400,
          fontWeightBold: 700,
          lineHeightBase: 1.5,
          headings: {
            h1: { size: '2.5rem', weight: 500 },
            h2: { size: '2rem', weight: 500 },
            h3: { size: '1.75rem', weight: 500 },
            h4: { size: '1.5rem', weight: 500 },
            h5: { size: '1.25rem', weight: 500 },
            h6: { size: '1rem', weight: 500 },
          }
        },
        borders: {
          width: '1px',
          color: '#dee2e6',
          radius: '0.25rem',
          radiusSm: '0.2rem',
          radiusLg: '0.3rem',
        },
        shadows: {
          sm: '0 .125rem .25rem rgba(0, 0, 0, .075)',
          md: '0 .5rem 1rem rgba(0, 0, 0, .15)',
          lg: '0 1rem 3rem rgba(0, 0, 0, .175)',
        },
        transitions: {
          base: 'all .2s ease-in-out',
        },
        zIndex: {
          modal: 1050,
          navbar: 1030,
          tooltip: 1070,
          popover: 1060,
        }
      },
      modules: {
        grid: true,
        utilities: true,
        components: true,
        icons: true,
        animations: true,
      },
      icons: {
        'arrow-right': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/></svg>',
        'check': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>',
        'x': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>',
        'menu': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/></svg>',
        'search': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>',
      },
    }, options);

    this.styles = '';
    this.styleElement = null;
    this._init();
  }

  _init() {
    this._generateCSSVariables();
    this._generateBaseStyles();

    if (this.options.modules.grid) this._generateGrid();
    if (this.options.modules.utilities) this._generateUtilities();
    if (this.options.modules.components) this._generateComponents();
    if (this.options.modules.icons) this._generateIconStyles();
    if (this.options.modules.animations) this._generateAnimations();

    this._injectCSS();
    console.info('[ck] : initialized.');
  }

  _generateCSSVariables() {
    let variables = ':root {\n';
    const theme = this.options.theme;
    const p = this.options.prefix;

    for (const category in theme) {
      if (typeof theme[category] === 'object' && theme[category] !== null) {
        for (const key in theme[category]) {
          if (typeof theme[category][key] === 'object' && theme[category][key] !== null) {
             for (const subKey in theme[category][key]) {
                variables += `  --${p}${category}-${key}-${subKey}: ${theme[category][key][subKey]};\n`;
             }
          } else {
            variables += `  --${p}${category}-${key}: ${theme[category][key]};\n`;
          }
        }
      }
    }
    // Add RGB versions for primary color for box-shadows
    if (theme.colors && theme.colors.primary) {
        const primaryColor = theme.colors.primary;
        let r,g,b;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(primaryColor)) { // Hex color
            let c = primaryColor.substring(1).split('');
            if (c.length === 3) { c = [c[0], c[0], c[1], c[1], c[2], c[2]]; }
            c = '0x' + c.join('');
            r = (c >> 16) & 255;
            g = (c >> 8) & 255;
            b = c & 255;
            variables += `  --${p}theme-colors-primaryRGB: ${r},${g},${b};\n`;
        }
        // can add parsers for other color formats if needed (rgb, rgba, hsl)
    }

    variables += '}\n\n';
    this.styles += variables;
  }

  _generateBaseStyles() {
    const p = this.options.prefix;
    this.styles += `
      *, *::before, *::after { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: var(--${p}typography-fontFamilyBase);
        font-size: var(--${p}typography-fontSizeBase);
        font-weight: var(--${p}typography-fontWeightNormal);
        line-height: var(--${p}typography-lineHeightBase);
        color: var(--${p}theme-textColor);
        background-color: var(--${p}theme-bodyBg);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      a {
        color: var(--${p}theme-linkColor);
        text-decoration: none;
        transition: var(--${p}transitions-base);
      }
      a:hover {
        text-decoration: underline;
      }
      img, svg { vertical-align: middle; max-width: 100%; height: auto; }
      ${Object.entries(this.options.theme.typography.headings).map(([tag, props]) => `
        ${tag} {
          font-size: var(--${p}typography-headings-${tag}-size);
          font-weight: var(--${p}typography-headings-${tag}-weight);
          margin-top: 0;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }
      `).join('')}
      hr {
        margin: 1rem 0;
        color: inherit;
        background-color: currentColor;
        border: 0;
        opacity: 0.25;
        height: 1px;
      }
    `;
  }

  _generateGrid() {
    const p = this.options.prefix;
    let gridStyles = `
      .${p}container, .${p}container-fluid {
        width: 100%;
        padding-right: var(--${p}spacing-3, 1rem);
        padding-left: var(--${p}spacing-3, 1rem);
        margin-right: auto;
        margin-left: auto;
      }
    `;
    Object.entries(this.options.theme.breakpoints).forEach(([bp, width]) => {
      if (bp !== 'xs') {
        gridStyles += `
          @media (min-width: ${width}) {
            .${p}container {
              max-width: ${width === this.options.theme.breakpoints.sm ? '540px' :
                         width === this.options.theme.breakpoints.md ? '720px' :
                         width === this.options.theme.breakpoints.lg ? '960px' :
                         width === this.options.theme.breakpoints.xl ? '1140px' : '1320px'};
            }
          }
        `;
      }
    });
    gridStyles += `
      .${p}row {
        display: flex;
        flex-wrap: wrap;
        margin-right: calc(-0.5 * var(--${p}spacing-3, 1rem));
        margin-left: calc(-0.5 * var(--${p}spacing-3, 1rem));
      }
      .${p}row > * {
        box-sizing: border-box;
        flex-shrink: 0;
        width: 100%;
        max-width: 100%;
        padding-right: calc(0.5 * var(--${p}spacing-3, 1rem));
        padding-left: calc(0.5 * var(--${p}spacing-3, 1rem));
      }
    `;
    const bpKeys = Object.keys(this.options.theme.breakpoints);
    for (let i = 1; i <= 12; i++) {
      gridStyles += `.${p}col-${i} { flex: 0 0 auto; width: ${(i / 12) * 100}%; }\n`;
      gridStyles += `.${p}offset-${i} { margin-left: ${(i / 12) * 100}%; }\n`;
    }
    bpKeys.forEach(bp => {
      if (bp === 'xs') return;
      gridStyles += `@media (min-width: ${this.options.theme.breakpoints[bp]}) {\n`;
      for (let i = 1; i <= 12; i++) {
        gridStyles += `  .${p}col-${bp}-${i} { flex: 0 0 auto; width: ${(i / 12) * 100}%; }\n`;
        gridStyles += `  .${p}offset-${bp}-${i} { margin-left: ${(i / 12) * 100}%; }\n`;
      }
      gridStyles += `}\n`;
    });
    this.styles += gridStyles;
  }

  _generateUtilities() {
    const p = this.options.prefix;
    let utilityStyles = '';
    const displays = ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'none', 'table', 'table-row', 'table-cell'];
    displays.forEach(d => utilityStyles += `.${p}d-${d} { display: ${d} !important; }\n`);
    const sides = { t: 'top', b: 'bottom', s: 'left', e: 'right', x: ['left', 'right'], y: ['top', 'bottom'], '': '' };
    this.options.theme.spacing.forEach((val, i) => {
      for (const sKey in sides) {
        const properties = Array.isArray(sides[sKey]) ? sides[sKey] : [sides[sKey]];
        const classNameSuffix = sKey ? `-${sKey}` : '';
        let marginProps = properties.map(prop => prop ? `margin-${prop}: ${val}rem !important;` : `margin: ${val}rem !important;`).join(' ');
        utilityStyles += `.${p}m${classNameSuffix}-${i} { ${marginProps} }\n`;
         if (sKey === 'x') {
            utilityStyles += `.${p}mx-auto { margin-left: auto !important; margin-right: auto !important; }\n`;
        }
        let paddingProps = properties.map(prop => prop ? `padding-${prop}: ${val}rem !important;` : `padding: ${val}rem !important;`).join(' ');
        utilityStyles += `.${p}p${classNameSuffix}-${i} { ${paddingProps} }\n`;
      }
    });
    const textAligns = ['left', 'center', 'right', 'justify'];
    textAligns.forEach(align => utilityStyles += `.${p}text-${align} { text-align: ${align} !important; }\n`);
    const fontWeights = {
        'light': `var(--${p}typography-fontWeightLight)`,
        'normal': `var(--${p}typography-fontWeightNormal)`,
        'bold': `var(--${p}typography-fontWeightBold)`
    };
    for(const weightName in fontWeights) {
        utilityStyles += `.${p}fw-${weightName} { font-weight: ${fontWeights[weightName]} !important; }\n`;
    }
    utilityStyles += `.${p}text-wrap { white-space: normal !important; }\n`;
    utilityStyles += `.${p}text-nowrap { white-space: nowrap !important; }\n`;
    utilityStyles += `.${p}text-truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n`;
    utilityStyles += `.${p}text-decoration-none { text-decoration: none !important; }\n`;
    utilityStyles += `.${p}text-decoration-underline { text-decoration: underline !important; }\n`;
    utilityStyles += `.${p}text-lowercase { text-transform: lowercase !important; }\n`;
    utilityStyles += `.${p}text-uppercase { text-transform: uppercase !important; }\n`;
    utilityStyles += `.${p}text-capitalize { text-transform: capitalize !important; }\n`;
    for (const colorName in this.options.theme.colors) {
      utilityStyles += `.${p}text-${colorName} { color: var(--${p}theme-colors-${colorName}) !important; }\n`;
      utilityStyles += `.${p}bg-${colorName} { background-color: var(--${p}theme-colors-${colorName}) !important; }\n`;
    }
    const borderSides = ['', '-top', '-bottom', '-start', '-end'];
    borderSides.forEach(side => {
      utilityStyles += `.${p}border${side} { border${side.replace('-', '-')} : var(--${p}borders-width) solid var(--${p}borders-color) !important; }\n`;
      utilityStyles += `.${p}border${side}-0 { border${side.replace('-', '-')} : 0 !important; }\n`;
    });
    for (const colorName in this.options.theme.colors) {
        utilityStyles += `.${p}border-${colorName} { border-color: var(--${p}theme-colors-${colorName}) !important; }\n`;
    }
    const roundedOptions = {
        '': `var(--${p}borders-radius)`, '0': '0', '1': `var(--${p}borders-radiusSm)`,
        '2': `var(--${p}borders-radius)`, '3': `var(--${p}borders-radiusLg)`,
        'circle': '50%', 'pill': '50rem'
    };
    for(const rKey in roundedOptions){
        utilityStyles += `.${p}rounded${rKey ? `-${rKey}`:''} { border-radius: ${roundedOptions[rKey]} !important; }\n`;
    }
    for(const shadowName in this.options.theme.shadows) {
      utilityStyles += `.${p}shadow-${shadowName} { box-shadow: var(--${p}shadows-${shadowName}) !important; }\n`;
    }
    utilityStyles += `.${p}shadow-none { box-shadow: none !important; }\n`;
    const flexDirections = ['row', 'row-reverse', 'column', 'column-reverse'];
    flexDirections.forEach(dir => utilityStyles += `.${p}flex-${dir} { flex-direction: ${dir} !important; }\n`);
    const justifyContents = ['start', 'end', 'center', 'between', 'around', 'evenly'];
    justifyContents.forEach(jc => utilityStyles += `.${p}justify-content-${jc} { justify-content: ${jc.replace('between', 'space-between').replace('around', 'space-around').replace('evenly', 'space-evenly')} !important; }\n`);
    const alignItemsOptions = ['start', 'end', 'center', 'baseline', 'stretch'];
    alignItemsOptions.forEach(ai => utilityStyles += `.${p}align-items-${ai} { align-items: ${ai} !important; }\n`);
    utilityStyles += `.${p}flex-fill { flex: 1 1 auto !important; }\n`;
    utilityStyles += `.${p}flex-grow-0 { flex-grow: 0 !important; }\n`;
    utilityStyles += `.${p}flex-grow-1 { flex-grow: 1 !important; }\n`;
    utilityStyles += `.${p}flex-shrink-0 { flex-shrink: 0 !important; }\n`;
    utilityStyles += `.${p}flex-shrink-1 { flex-shrink: 1 !important; }\n`;
    utilityStyles += `.${p}flex-wrap { flex-wrap: wrap !important; }\n`;
    utilityStyles += `.${p}flex-nowrap { flex-wrap: nowrap !important; }\n`;
    utilityStyles += `.${p}flex-wrap-reverse { flex-wrap: wrap-reverse !important; }\n`;
    utilityStyles += `.${p}visible { visibility: visible !important; }\n`;
    utilityStyles += `.${p}invisible { visibility: hidden !important; }\n`;
    const overflows = ['auto', 'hidden', 'visible', 'scroll'];
    overflows.forEach(o => utilityStyles += `.${p}overflow-${o} { overflow: ${o} !important; }\n`);
    Object.entries(this.options.theme.breakpoints).forEach(([bp, width]) => {
      if (bp === 'xs') return;
      utilityStyles += `@media (min-width: ${width}) {\n`;
      displays.forEach(d => utilityStyles += `  .${p}d-${bp}-${d} { display: ${d} !important; }\n`);
      this.options.theme.spacing.forEach((val, i) => {
        for (const sKey in sides) {
          const properties = Array.isArray(sides[sKey]) ? sides[sKey] : [sides[sKey]];
          const classNameSuffix = sKey ? `-${sKey}` : '';
          let marginProps = properties.map(prop => prop ? `margin-${prop}: ${val}rem !important;` : `margin: ${val}rem !important;`).join(' ');
          utilityStyles += `  .${p}m${classNameSuffix}-${bp}-${i} { ${marginProps} }\n`;
          let paddingProps = properties.map(prop => prop ? `padding-${prop}: ${val}rem !important;` : `padding: ${val}rem !important;`).join(' ');
          utilityStyles += `  .${p}p${classNameSuffix}-${bp}-${i} { ${paddingProps} }\n`;
        }
      });
      textAligns.forEach(align => utilityStyles += `  .${p}text-${bp}-${align} { text-align: ${align} !important; }\n`);
      flexDirections.forEach(dir => utilityStyles += `  .${p}flex-${bp}-${dir} { flex-direction: ${dir} !important; }\n`);
      justifyContents.forEach(jc => utilityStyles += `  .${p}justify-content-${bp}-${jc} { justify-content: ${jc.replace('between', 'space-between').replace('around', 'space-around').replace('evenly', 'space-evenly')} !important; }\n`);
      alignItemsOptions.forEach(ai => utilityStyles += `  .${p}align-items-${bp}-${ai} { align-items: ${ai} !important; }\n`);
      utilityStyles += `}\n`;
    });
    this.styles += utilityStyles;
  }

  _generateComponents() {
    const p = this.options.prefix;
    let componentStyles = '';
    componentStyles += `
      .${p}btn {
        display: inline-block;
        font-weight: var(--${p}typography-fontWeightNormal);
        line-height: var(--${p}typography-lineHeightBase);
        color: var(--${p}theme-textColor);
        text-align: center;
        text-decoration: none;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        background-color: transparent;
        border: var(--${p}borders-width) solid transparent;
        padding: var(--${p}spacing-2) var(--${p}spacing-3);
        font-size: var(--${p}typography-fontSizeBase);
        border-radius: var(--${p}borders-radius);
        transition: var(--${p}transitions-base);
      }
      .${p}btn:hover {
        text-decoration: none;
      }
      .${p}btn:focus, .${p}btn.focus {
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(var(--${p}theme-colors-primaryRGB, 0,123,255), .25);
      }
      .${p}btn:disabled, .${p}btn.disabled {
        pointer-events: none;
        opacity: 0.65;
      }
    `;
    for (const colorName in this.options.theme.colors) {
      if (['light', 'white', 'transparent'].includes(colorName)) continue;
       componentStyles += `
        .${p}btn-${colorName} {
          color: ${['dark', 'black'].includes(colorName) ? `var(--${p}theme-colors-white)`: `var(--${p}theme-colors-black)`};
          background-color: var(--${p}theme-colors-${colorName});
          border-color: var(--${p}theme-colors-${colorName});
        }
        .${p}btn-${colorName}:hover {
          filter: brightness(90%);
        }
        .${p}btn-outline-${colorName} {
          color: var(--${p}theme-colors-${colorName});
          border-color: var(--${p}theme-colors-${colorName});
          background-color: transparent;
        }
        .${p}btn-outline-${colorName}:hover {
          color: ${['dark', 'black'].includes(colorName) ? `var(--${p}theme-colors-white)`: `var(--${p}theme-colors-black)`};
          background-color: var(--${p}theme-colors-${colorName});
        }
      `;
    }
    componentStyles += `
      .${p}card {
        position: relative; display: flex; flex-direction: column; min-width: 0; word-wrap: break-word;
        background-color: var(--${p}theme-colors-white); background-clip: border-box;
        border: var(--${p}borders-width) solid var(--${p}borders-color);
        border-radius: var(--${p}borders-radius); margin-bottom: var(--${p}spacing-3);
        box-shadow: var(--${p}shadows-sm);
      }
      .${p}card-body { flex: 1 1 auto; padding: var(--${p}spacing-3); }
      .${p}card-title { margin-bottom: var(--${p}spacing-2); }
      .${p}card-subtitle { margin-top: calc(-1 * var(--${p}spacing-2) / 2); margin-bottom: 0; }
      .${p}card-text:last-child { margin-bottom: 0; }
      .${p}card-header, .${p}card-footer {
        padding: var(--${p}spacing-2) var(--${p}spacing-3); background-color: rgba(0,0,0,.03);
        border-bottom: var(--${p}borders-width) solid var(--${p}borders-color);
      }
      .${p}card-header:first-child { border-radius: var(--${p}borders-radius) var(--${p}borders-radius) 0 0; }
      .${p}card-footer:last-child { border-radius: 0 0 var(--${p}borders-radius) var(--${p}borders-radius); border-top: var(--${p}borders-width) solid var(--${p}borders-color); border-bottom: 0;}
      .${p}card-img-top { width: 100%; border-top-left-radius: var(--${p}borders-radius); border-top-right-radius: var(--${p}borders-radius); }
    `;
    componentStyles += `
      .${p}modal {
        position: fixed; top: 0; left: 0; z-index: var(--${p}zIndex-modal); display: none;
        width: 100%; height: 100%; overflow-x: hidden; overflow-y: auto; outline: 0;
        background-color: rgba(0,0,0,0.5);
      }
      .${p}modal.show { display: block; }
      .${p}modal-dialog { position: relative; width: auto; margin: var(--${p}spacing-2); pointer-events: none; }
      @media (min-width: ${this.options.theme.breakpoints.sm}) {
        .${p}modal-dialog { max-width: 500px; margin: 1.75rem auto; }
      }
      .${p}modal-content {
        position: relative; display: flex; flex-direction: column; width: 100%; pointer-events: auto;
        background-color: var(--${p}theme-colors-white); background-clip: padding-box;
        border: var(--${p}borders-width) solid rgba(0,0,0,.2); border-radius: var(--${p}borders-radiusLg);
        outline: 0; box-shadow: var(--${p}shadows-lg);
      }
      .${p}modal-header {
        display: flex; flex-shrink: 0; align-items: center; justify-content: space-between;
        padding: var(--${p}spacing-3); border-bottom: var(--${p}borders-width) solid var(--${p}borders-color);
        border-top-left-radius: var(--${p}borders-radiusLg); border-top-right-radius: var(--${p}borders-radiusLg);
      }
      .${p}modal-title { margin-bottom: 0; line-height: var(--${p}typography-lineHeightBase); }
      .${p}modal-body { position: relative; flex: 1 1 auto; padding: var(--${p}spacing-3); }
      .${p}modal-footer {
        display: flex; flex-wrap: wrap; flex-shrink: 0; align-items: center; justify-content: flex-end;
        padding: var(--${p}spacing-3); border-top: var(--${p}borders-width) solid var(--${p}borders-color);
        border-bottom-right-radius: var(--${p}borders-radiusLg); border-bottom-left-radius: var(--${p}borders-radiusLg);
      }
      .${p}modal-footer > * { margin: var(--${p}spacing-1); }
      .${p}btn-close {
        background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e") center/1em auto no-repeat;
        border: 0; border-radius: var(--${p}borders-radius); opacity: .5; padding: .5em;
      }
      .${p}btn-close:hover { opacity: .75; }
      .${p}btn-close:focus { outline: 0; box-shadow: 0 0 0 0.2rem rgba(var(--${p}theme-colors-primaryRGB, 0,123,255), .25); opacity: 1;}
    `;
    componentStyles += `
      .${p}alert {
        position: relative; padding: var(--${p}spacing-3); margin-bottom: var(--${p}spacing-3);
        border: var(--${p}borders-width) solid transparent; border-radius: var(--${p}borders-radius);
      }
    `;
    for (const colorName in this.options.theme.colors) {
      if (['white', 'black', 'transparent'].includes(colorName)) continue;
      componentStyles += `
        .${p}alert-${colorName} {
          color: var(--${p}theme-colors-${colorName});
          background-color: color-mix(in srgb, var(--${p}theme-colors-${colorName}) 20%, transparent);
          border-color: color-mix(in srgb, var(--${p}theme-colors-${colorName}) 40%, transparent);
        }
        .${p}alert-${colorName} .${p}alert-link { color: color-mix(in srgb, var(--${p}theme-colors-${colorName}) 80%, black); font-weight: var(--${p}typography-fontWeightBold); }
      `;
    }
    componentStyles += `
      .${p}navbar {
        position: relative; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
        padding-top: var(--${p}spacing-2); padding-bottom: var(--${p}spacing-2);
        background-color: var(--${p}theme-colors-light); box-shadow: var(--${p}shadows-sm);
        z-index: var(--${p}zIndex-navbar);
      }
      .${p}navbar > .${p}container, .${p}navbar > .${p}container-fluid {
        display: flex; flex-wrap: inherit; align-items: center; justify-content: space-between;
      }
      .${p}navbar-brand {
        padding-top: .3125rem; padding-bottom: .3125rem; margin-right: var(--${p}spacing-3);
        font-size: 1.25rem; text-decoration: none; white-space: nowrap;
      }
      .${p}navbar-nav {
        display: flex; flex-direction: column; padding-left: 0; margin-bottom: 0; list-style: none;
      }
      .${p}navbar-nav .${p}nav-link {
        padding-right: var(--${p}spacing-2); padding-left: var(--${p}spacing-2);
        color: var(--${p}theme-textColor);
      }
      .${p}navbar-nav .${p}nav-link.active, .${p}navbar-nav .${p}nav-link.show {
        color: var(--${p}theme-colors-primary);
      }
      .${p}navbar-toggler {
        padding: var(--${p}spacing-1) var(--${p}spacing-2); font-size: 1.25rem; line-height: 1;
        background-color: transparent; border: var(--${p}borders-width) solid var(--${p}borders-color);
        border-radius: var(--${p}borders-radius); transition: box-shadow .15s ease-in-out;
      }
      .${p}navbar-toggler-icon {
        display: inline-block; width: 1.5em; height: 1.5em; vertical-align: middle;
        background-repeat: no-repeat; background-position: center; background-size: 100%;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(0, 0, 0, 0.55)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
      }
      .${p}navbar-collapse {
        flex-basis: 100%; flex-grow: 1; align-items: center; display: none;
      }
      .${p}navbar-collapse.show { display: flex; }
      @media (min-width: ${this.options.theme.breakpoints.md}) {
        .${p}navbar-expand-md .${p}navbar-nav { flex-direction: row; }
        .${p}navbar-expand-md .${p}navbar-collapse { display: flex !important; flex-basis: auto; }
        .${p}navbar-expand-md .${p}navbar-toggler { display: none; }
      }
    `;
    ['light', 'dark'].forEach(scheme => {
        const bgColor = scheme === 'light' ? `var(--${p}theme-colors-light)` : `var(--${p}theme-colors-dark)`;
        const textColor = scheme === 'light' ? `var(--${p}theme-colors-dark)` : `var(--${p}theme-colors-light)`;
        const togglerIconColor = scheme === 'light' ? 'rgba(0,0,0,.55)' : 'rgba(255,255,255,.55)';
        componentStyles += `
        .${p}navbar-${scheme} { background-color: ${bgColor} !important; color: ${textColor}; }
        .${p}navbar-${scheme} .${p}navbar-brand { color: ${textColor}; }
        .${p}navbar-${scheme} .${p}navbar-nav .${p}nav-link { color: ${textColor}; }
        .${p}navbar-${scheme} .${p}navbar-toggler { border-color: ${togglerIconColor}; }
        .${p}navbar-${scheme} .${p}navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='${togglerIconColor}' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }`;
    });
    componentStyles += `
      .${p}form-label { margin-bottom: .5rem; display: inline-block; }
      .${p}form-control, .${p}form-select {
        display: block; width: 100%; padding: .375rem .75rem;
        font-size: var(--${p}typography-fontSizeBase); font-weight: var(--${p}typography-fontWeightNormal);
        line-height: var(--${p}typography-lineHeightBase); color: var(--${p}theme-textColor);
        background-color: var(--${p}theme-colors-white); background-clip: padding-box;
        border: var(--${p}borders-width) solid var(--${p}borders-color);
        appearance: none; border-radius: var(--${p}borders-radius);
        transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
      }
      .${p}form-control:focus, .${p}form-select:focus {
        color: var(--${p}theme-textColor); background-color: var(--${p}theme-colors-white);
        border-color: color-mix(in srgb, var(--${p}theme-colors-primary) 50%, white);
        outline: 0; box-shadow: 0 0 0 0.25rem color-mix(in srgb, var(--${p}theme-colors-primary) 25%, transparent);
      }
      .${p}form-control::placeholder { color: var(--${p}theme-colors-secondary); opacity: 1; }
      .${p}form-control:disabled, .${p}form-control[readonly] {
        background-color: var(--${p}theme-colors-light); opacity: 1;
      }
      textarea.${p}form-control { min-height: calc(1.5em + .75rem + 2px); }
      .${p}form-check { display: block; min-height: 1.5rem; padding-left: 1.5em; margin-bottom: .125rem; }
      .${p}form-check-input {
        width: 1em; height: 1em; margin-top: .25em; vertical-align: top;
        background-color: var(--${p}theme-colors-white);
        border: var(--${p}borders-width) solid var(--${p}borders-color);
        appearance: none; float: left; margin-left: -1.5em;
      }
      .${p}form-check-input[type="checkbox"] { border-radius: .25em; }
      .${p}form-check-input[type="radio"] { border-radius: 50%; }
      .${p}form-check-input:active { filter: brightness(90%); }
      .${p}form-check-input:focus {
        border-color: color-mix(in srgb, var(--${p}theme-colors-primary) 50%, white);
        outline: 0; box-shadow: 0 0 0 0.25rem color-mix(in srgb, var(--${p}theme-colors-primary) 25%, transparent);
      }
      .${p}form-check-input:checked {
        background-color: var(--${p}theme-colors-primary);
        border-color: var(--${p}theme-colors-primary);
      }
      .${p}form-check-input:checked[type="checkbox"] {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
      }
      .${p}form-check-input:checked[type="radio"] {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e");
      }
      .${p}form-check-label { display: inline-block; }
      .${p}form-select {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
        background-repeat: no-repeat; background-position: right .75rem center; background-size: 16px 12px;
      }
      .${p}form-select:disabled { background-color: var(--${p}theme-colors-light); }
    `;
    componentStyles += `
      .${p}list-group { display: flex; flex-direction: column; padding-left: 0; margin-bottom: 0; border-radius: var(--${p}borders-radius); }
      .${p}list-group-item {
        position: relative; display: block; padding: var(--${p}spacing-2) var(--${p}spacing-3);
        color: var(--${p}theme-textColor); text-decoration: none;
        background-color: var(--${p}theme-colors-white);
        border: var(--${p}borders-width) solid var(--${p}borders-color);
      }
      .${p}list-group-item:first-child { border-top-left-radius: inherit; border-top-right-radius: inherit; }
      .${p}list-group-item:last-child { border-bottom-right-radius: inherit; border-bottom-left-radius: inherit; }
      .${p}list-group-item + .${p}list-group-item { border-top-width: 0; }
      .${p}list-group-item.active {
        z-index: 2; color: var(--${p}theme-colors-white);
        background-color: var(--${p}theme-colors-primary); border-color: var(--${p}theme-colors-primary);
      }
      .${p}list-group-item-action { width: 100%; color: #495057; text-align: inherit; }
      .${p}list-group-item-action:hover, .${p}list-group-item-action:focus {
        z-index: 1; color: #0b5ed7; text-decoration: none; background-color: #f8f9fa;
      }
    `;
    this.styles += componentStyles;
  }

  _generateIconStyles() {
    const p = this.options.prefix;
    this.styles += `
      .${p}icon {
        display: inline-block; width: 1em; height: 1em;
        vertical-align: -0.125em; fill: currentColor;
      }
    `;
  }

  _generateAnimations() {
    const p = this.options.prefix;
    this.styles += `
      @keyframes ${p}fadeIn { from { opacity: 0; } to { opacity: 1; } }
      .${p}anim-fadeIn { animation-name: ${p}fadeIn; animation-duration: 0.5s; animation-fill-mode: both; }
      @keyframes ${p}fadeOut { from { opacity: 1; } to { opacity: 0; } }
      .${p}anim-fadeOut { animation-name: ${p}fadeOut; animation-duration: 0.5s; animation-fill-mode: both; }
      @keyframes ${p}slideInUp { from { transform: translateY(100%); opacity:0; } to { transform: translateY(0); opacity:1; } }
      .${p}anim-slideInUp { animation-name: ${p}slideInUp; animation-duration: 0.5s; animation-fill-mode: both; }
      @keyframes ${p}pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
      .${p}anim-pulse { animation-name: ${p}pulse; animation-duration: 1s; animation-iteration-count: infinite; }
      @keyframes ${p}spin { to { transform: rotate(360deg); } }
      .${p}anim-spin { animation-name: ${p}spin; animation-duration: 1s; animation-iteration-count: infinite; animation-timing-function: linear; }
      .${p}transition-base { transition: var(--${p}transitions-base); }
    `;
  }

  _injectCSS() {
    if (!this.styleElement) {
      this.styleElement = document.createElement('style');
      this.styleElement.id = `${this.options.prefix}dynamic-styles`;
      this.options.targetElement.appendChild(this.styleElement);
    }
    this.styleElement.textContent = this.styles;
  }

  updateTheme(newTheme) {
    const mergeDeep = (target, source) => {
        for (const key in source) {
            if (source[key] instanceof Object && key in target && target[key] instanceof Object) { // Ensure target[key] is also an object
                mergeDeep(target[key], source[key]);
            } else {
                 target[key] = source[key]; // overwrite or add property
            }
        }
        return target;
    }
    mergeDeep(this.options.theme, newTheme);
    this.styles = '';
    this._generateCSSVariables();
    this._generateBaseStyles();
    if (this.options.modules.grid) this._generateGrid();
    if (this.options.modules.utilities) this._generateUtilities();
    if (this.options.modules.components) this._generateComponents();
    if (this.options.modules.icons) this._generateIconStyles();
    if (this.options.modules.animations) this._generateAnimations();
    this._injectCSS();
    console.info('[ck] : theme updated.');
  }

  getIcon(iconName, attributes = {}) {
    const p = this.options.prefix;
    if (this.options.icons[iconName]) {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(this.options.icons[iconName], "image/svg+xml");
      const svgElement = svgDoc.documentElement;
      svgElement.classList.add(`${p}icon`);
      svgElement.classList.add(`${p}icon-${iconName}`);
      for (const attr in attributes) {
        svgElement.setAttribute(attr, attributes[attr]);
      }
      return svgElement;
    }
    console.warn(`CaelokFramework: Icon "${iconName}" not found.`);
    return null;
  }

  addClass(element, className) {
    if (element && className) element.classList.add(className);
  }

  removeClass(element, className) {
    if (element && className) element.classList.remove(className);
  }

  toggleClass(element, className) {
     if (element && className) element.classList.toggle(className);
  }

  toggleModal(modalSelectorOrElement, show) {
    const modalElement = typeof modalSelectorOrElement === 'string' ? document.querySelector(modalSelectorOrElement) : modalSelectorOrElement;
    if (!modalElement || !modalElement.classList.contains(`${this.options.prefix}modal`)) {
      console.warn('[ck] : Modal element not found or invalid.', modalSelectorOrElement);
      return;
    }
    const currentlyShown = modalElement.classList.contains('show');
    if (show === undefined) {
        modalElement.classList.toggle('show');
    } else if (show && !currentlyShown) {
        modalElement.classList.add('show');
    } else if (!show && currentlyShown) {
        modalElement.classList.remove('show');
    }
    if (modalElement.classList.contains('show')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
  }

  toggleNavbar(targetSelectorOrElement) {
    const targetElement = typeof targetSelectorOrElement === 'string' ? document.querySelector(targetSelectorOrElement) : targetSelectorOrElement;
    if (!targetElement || !targetElement.classList.contains(`${this.options.prefix}navbar-collapse`)) {
      console.warn('[ck] : Navbar collapse target not found or invalid.', targetSelectorOrElement);
      return;
    }
    targetElement.classList.toggle('show');
  }
}

if (typeof window !== 'undefined' && window.caelokConfig) {
  window.Caelok = new CaelokFramework(window.caelokConfig);
}
