// /src/analytics.js

export const trackEvent = (eventName, data = {}) => {
  if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      event: eventName,
      ...data,
    });
    // This console.log is for debugging. You can remove it in production.
    console.log(`Event tracked: ${eventName}`, data); 
  } else {
    console.log(`DataLayer not found. Event not tracked: ${eventName}`, data);
  }
};
