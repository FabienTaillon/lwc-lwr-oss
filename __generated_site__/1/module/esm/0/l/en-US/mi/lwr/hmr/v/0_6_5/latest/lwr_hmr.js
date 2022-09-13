import { load } from "/1/module/esm/0/l/en-US/mi/lwr%2FesmLoader%2Fv%2F0_6_5/latest/lwr_esmLoader.js";
import { updateStaleModule } from '/1/module/esm/0/l/en-US/mi/lwr%2Fhmr%23util%2Fswap%2Fv%2F0_6_5/latest/lwr_hmr_util_swap.js';

// This is a workaround until we don't change the way HMR works
// The server will always return the same canonical "latest URL"
// So we need to track the last new URI instead
const URI_MAPPING = new Map();

async function moduleUpdate(payload) {
    const {
        oldUri,
        newUri,
        module: { specifier },
    } = payload;

    const lastEvalutedUri = URI_MAPPING.get(oldUri) || oldUri;
    const oldModule = await load(lastEvalutedUri, 'lwr/hmr/v/0_6_5');
    const newModule = await load(newUri, 'lwr/hmr/v/0_6_5');
    URI_MAPPING.set(oldUri, newUri);

    updateStaleModule({
        oldModule,
        newModule,
        specifier,
    });
}

function viewUpdate(payload, metadata) {
    const viewId = payload.viewId;
    const assetId = payload.assetId;

    // eslint-disable-next-line no-undef
    if (metadata.templates.includes(viewId) || metadata.assetReferences.includes(assetId)) {
        window.location.reload();
    }
}

export function initHMR(serverURI = '', metadata) {
    const normalizedMeta = {
        ...{ assetReferences: [], templates: [] },
        ...metadata,
    };
    // {apiVersion}/hmr/{format}/{compat}?debug
    const host = serverURI.startsWith('/') ? location.host : '';
    const socket = new WebSocket(`ws://${host}${serverURI}`);
    socket.addEventListener('message', async ({ data }) => {
        const { eventType, payload } = JSON.parse(data);

        switch (eventType) {
            case 'moduleUpdate':
                return moduleUpdate(payload);
            case 'viewUpdate':
                return viewUpdate(payload, normalizedMeta);
            default:
                return;
        }
    });
}
