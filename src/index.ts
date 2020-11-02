import './page/index.html';

function importAll(r:  __WebpackModuleApi.RequireContext) {
    r.keys().forEach(r);
}

importAll(require.context('./slider', true, /(?<!\.d)\.(js|ts|scss)$/i));