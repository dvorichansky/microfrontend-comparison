import React, { useEffect, useState } from 'react';

export default function App() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            System.import('react'),
            System.import('react-dom'),
            System.import('http://localhost:8061/remoteEntry.js'),
        ])
            .then(() => {
                setLoaded(true);
            })
            .catch(console.error);
    }, []);

    return (
        <div className="page">
            <div className="page-header">
                <h1>Checkout</h1>
            </div>
            {loaded ? <remote-component name="John"></remote-component> : <div>Loading remote component...</div>}
        </div>
    );
}
