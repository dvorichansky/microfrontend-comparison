import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';

const lifecycles = singleSpaReact({
    React,
    ReactDOMClient,
    errorBoundary() {
        return <div>Error</div>;
    },
    loadRootComponent: () => import('./root.component.js').then((mod) => mod.default),
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
