const setLoading = (isLoading, message) => {
  let existingOverlay = document.querySelector('.loading-overlay');

  if (isLoading) {
    // Remove if one already exists (optional safety)
    if (existingOverlay) existingOverlay.remove();

    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';

    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loading-spinner';

    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'loading-message';
    loadingMessage.textContent = message;

    loadingOverlay.appendChild(loadingSpinner);
    loadingOverlay.appendChild(loadingMessage);

    document.body.appendChild(loadingOverlay);
  } else {
    if (existingOverlay) existingOverlay.remove();
  }
};

export default setLoading