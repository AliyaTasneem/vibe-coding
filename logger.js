// Production-Safe Logger
// Automatically disables debug logs in production while keeping error logs

const isDevelopment = window.location.hostname === 'localhost' ||
                      window.location.hostname === '127.0.0.1' ||
                      window.location.hostname === '';

const logger = {
    /**
     * Debug logging - only shows in development (localhost)
     */
    log: function(...args) {
        if (isDevelopment) {
            console.log(...args);
        }
    },

    /**
     * Error logging - always shows (critical for debugging production issues)
     */
    error: function(...args) {
        console.error(...args);
    },

    /**
     * Warning logging - only shows in development
     */
    warn: function(...args) {
        if (isDevelopment) {
            console.warn(...args);
        }
    },

    /**
     * Info logging - only shows in development
     */
    info: function(...args) {
        if (isDevelopment) {
            console.info(...args);
        }
    },

    /**
     * Check if we're in development mode
     */
    isDevelopment: function() {
        return isDevelopment;
    }
};

// Make logger available globally
window.logger = logger;
