// Admin and Moderator Log
// =======================
// This log is used to track actions performed by admins and moderators.

// Import required modules
const fs = require('fs');
const path = require('path');

// Define log file path and name
const logFilePath = path.join(__dirname, 'admin-moderator-log.txt');

// Define log levels
const logLevels = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
};

// Define log function
function log(message, level = logLevels.INFO) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} [${level}] ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage);
  console.log(logMessage);
}

// Define admin and moderator actions
function adminAction(action, userId, details) {
  log(`Admin ${userId} performed action: ${action}. Details: ${details}`, logLevels.INFO);
}

function moderatorAction(action, userId, details) {
  log(`Moderator ${userId} performed action: ${action}. Details: ${details}`, logLevels.INFO);
}

// Example usage
adminAction('Deleted user', 'admin123', 'User ID: 456');
moderatorAction('Edited post', 'moderator456', 'Post ID: 789');

// Error handling
process.on('uncaughtException', (err) => {
  log(`Uncaught exception: ${err.message}`, logLevels.ERROR);
  process.exit(1);
});