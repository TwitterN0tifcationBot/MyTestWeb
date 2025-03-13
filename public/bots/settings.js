// Assuming the settings page has a form with id 'settingsForm'
document.getElementById('settingsForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const settings = Object.fromEntries(formData.entries());
  
  // Update the settings
  updateSettings(settings);
});

// Function to update the settings
function updateSettings(settings) {
  // Assuming the settings are stored in localStorage
  localStorage.setItem('settings', JSON.stringify(settings));
  
  // Update the UI to reflect the new settings
  updateUI(settings);
}

// Function to update the UI
function updateUI(settings) {
  // Update the UI elements to reflect the new settings
  // For example:
  document.getElementById('theme').style.backgroundColor = settings.theme;
  document.getElementById('fontSize').style.fontSize = settings.fontSize;
}