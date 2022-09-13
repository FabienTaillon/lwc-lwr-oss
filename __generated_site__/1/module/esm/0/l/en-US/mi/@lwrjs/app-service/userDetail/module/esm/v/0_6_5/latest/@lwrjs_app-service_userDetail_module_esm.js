import { load } from "/1/module/esm/0/l/en-US/mi/lwr%2FesmLoader%2Fv%2F0_6_5/latest/lwr_esmLoader.js";
/* This module is generated */
import { getClientBootstrapConfig } from '/1/module/esm/0/l/en-US/mi/lwr%2FpreInit%2Fv%2F0_6_5/latest/lwr_preInit.js';
import '/1/module/esm/0/l/en-US/mi/%40lwc%2Fsynthetic-shadow%2Fv%2F2_5_8/latest/@lwc_synthetic-shadow.js';
;
import { initHMR } from '/1/module/esm/0/l/en-US/mi/lwr%2Fhmr%2Fv%2F0_6_5/latest/lwr_hmr.js';
import { init as esmLoaderInit } from '/1/module/esm/0/l/en-US/mi/lwr%2FesmLoader%2Fv%2F0_6_5/latest/lwr_esmLoader.js';
import { init, toKebabCase } from '/1/module/esm/0/l/en-US/mi/lwr%2Finit%2Fv%2F0_6_5/latest/lwr_init.js';
const clientBootstrapConfig = getClientBootstrapConfig()

const { imports, index, importMappings, endpoints } = clientBootstrapConfig;
esmLoaderInit({ imports, index, importMappings, endpoints });

// initialize additional non-configured root components
const { rootComponents } = clientBootstrapConfig;
Promise.all(rootComponents.map(async (rootSpecifier) => {
    const element = toKebabCase(rootSpecifier);
    return load(rootSpecifier, '@lwrjs/app-service/userDetail/module/esm/v/0_6_5').then(({default: Ctor}) => {
        init([[element, Ctor]]);
    });
    return;
}));

// HMR related initialization
const viewMetadata = globalThis._lwrRuntimeDebug.viewMetadata;
const hmrEndpoint = clientBootstrapConfig.endpoints.uris.hmr;
initHMR(hmrEndpoint, viewMetadata);