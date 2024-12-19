import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SeatRecommendation from './SeatRecommendation.tsx';

import "@aurodesignsystem/design-tokens/dist/tokens/CSSCustomProperties.css";
import "@aurodesignsystem/auro-button";
import "@aurodesignsystem/auro-header";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* @ts-ignore */}
    <auro-header display="800">Passenger Comfort System</auro-header>
    <SeatRecommendation />
  </React.StrictMode>
);

