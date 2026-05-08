import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  if (command === 'build') {
    return {
      build: {
        lib: {
          entry: 'src/p5.toast.js',
          name: 'p5toast',
          fileName: (format) => (format === 'es' ? 'p5.toast.mjs' : 'p5.toast.js'),
          formats: ['es', 'iife']
        },
        emptyOutDir: true
      }
    };
  }

  return {
    root: 'example',
    server: {
      // example/index.html references ../src/p5.toast.js
      fs: { allow: ['..'] }
    }
  };
});
