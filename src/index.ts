import './page/index.html';

function importAll(r:  __WebpackModuleApi.RequireContext) {
    r.keys().forEach(r);
}
  
importAll(require.context('./slider', true, /\.(js|ts|scss)$/i));