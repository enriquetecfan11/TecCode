export const editorConfig = {
    // Editor dimensions
    width: 900,
    htmlHeight: 300,
    cssHeight: 300,
    jsHeight: 300,
    livepreviewHeight: 600,

    // Editor settings
    theme: 'vs-dark',
    fontSize: 14,
    tabSize: 2,
    autoCloseBrackets: true,
    autoIndent: true,

    // Preview settings
    autoRefresh: true,
    refreshDelay: 1000,

    // Layout settings
    showMinimap: true,
    showLineNumbers: true,
    wordWrap: 'on',

    // Language settings
    defaultLanguage: {
        html: 'html',
        css: 'css',
        js: 'javascript'
    },

    // Command settings
    commands: {
        'ctrl+s': 'save',
        'ctrl+f': 'format',
        'ctrl+shift+f': 'format',
        'ctrl+g': 'goToLine',
        'ctrl+d': 'deleteLine',
        'ctrl+h': 'replace',
        'ctrl+z': 'undo',
        'ctrl+y': 'redo',
        'ctrl+/': 'toggle-comment',
        'ctrl+space': 'suggestions',
        'alt+f': 'format-document'
    }
};
