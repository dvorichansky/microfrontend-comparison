import { constructRoutes, constructApplications, constructLayoutEngine } from 'single-spa-layout';
import { registerApplication, start } from 'single-spa';

const routes = constructRoutes(document.querySelector('#single-spa-layout'), {
    loaders: {
        topNav: '<h1>Loading topnav</h1>',
    },
    errors: {
        topNav: '<h1>Failed to load topnav</h1>',
    },
});
const applications = constructApplications({
    routes,
    loadApp: ({ name }) => import(/* webpackIgnore: true */ name),
});
// Delay starting the layout engine until the styleguide CSS is loaded
const layoutEngine = constructLayoutEngine({
    routes,
    applications,
    active: false,
});

applications.forEach(registerApplication);

layoutEngine.activate();
start();
