// This is claimed to be a portable module, but it really isn't. It can be imported, but will not RUN in the portable environment
import { guid } from '/1/module/esm/0/l/en-US/mi/lwr%2FrouterUtils%2Fv%2F0_6_5/latest/lwr_routerUtils.js'; // A hack to get NavigationMixin working without requiring lwc

export const CONTEXT_ID_BACKDOOR = `universalcontainergetnavigationcontext${guid()}`;