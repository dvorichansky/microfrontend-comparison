import React from 'react';
import { createRoot } from 'react-dom/client';

import Widget from './Widget';

class RemoteElement extends HTMLElement {
    connectedCallback() {
        const mountPoint = document.createElement('div');

        this.appendChild(mountPoint);

        if (mountPoint && mountPoint.isConnected) {
            const root = createRoot(mountPoint);

            root.render(
                <React.StrictMode>
                    <Widget />
                </React.StrictMode>,
            );
        }
    }
}

if (!customElements.get('remote-component')) {
    customElements.define('remote-component', RemoteElement);
}
