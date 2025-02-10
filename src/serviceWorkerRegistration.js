export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      // Add window size control
      if (window.matchMedia('(display-mode: standalone)').matches) {
        const width = 800;
        const height = 800;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        
        window.moveTo(left, top);
        window.resizeTo(width, height);
      }

      navigator.serviceWorker
        .register(swUrl)
        .then(registration => {
          console.log('SW registered: ', registration);
          
          // Also set size after installation
          window.addEventListener('appinstalled', (event) => {
            const width = 800;
            const height = 800;
            const left = (window.screen.width - width) / 2;
            const top = (window.screen.height - height) / 2;
            
            window.moveTo(left, top);
            window.resizeTo(width, height);
          });
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
} 