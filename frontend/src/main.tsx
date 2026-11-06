import './devtools/dev-bootstrap';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { reactRootErrorHandlers } from './devtools/dev-logger';
import { DevErrorBoundary } from './devtools/DevErrorBoundary';
import { DevProfiler } from './devtools/DevProfiler';

createRoot(document.getElementById('root')!, reactRootErrorHandlers).render(
  <StrictMode>
    <DevProfiler id="Root">
      <DevErrorBoundary>
        <App />
      </DevErrorBoundary>
    </DevProfiler>
  </StrictMode>,
);
