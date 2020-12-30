export function importAll(r: __WebpackModuleApi.RequireContext): void {
  r.keys().forEach(r);
}

importAll(require.context('./plugin', true, /(?<!\.d)\.(js|ts|scss)$/i));
importAll(require.context('./demo-page', true, /\.scss$/i));
