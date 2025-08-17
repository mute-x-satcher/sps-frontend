function showMessage(message, type) {
  // Create message container div

  const emojis = {
    alert: '⚠️ Alert: ',
    success: '✅ Success: ',
    error: '❌ Error: '
  };
 
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message',type); // add 'message' and the type class (alert, success, error)
  msgDiv.textContent = `${emojis[type] || ''} ${message}`;

  // Append to body or some container
  document.body.appendChild(msgDiv);

  // Remove after 2 seconds (2000 ms)
  setTimeout(() => {
    msgDiv.remove();
  }, 4000);
}

export default showMessage