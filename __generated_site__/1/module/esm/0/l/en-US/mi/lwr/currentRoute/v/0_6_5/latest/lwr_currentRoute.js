import { generateContextualWireAdapter, ContextInfo } from '/1/module/esm/0/l/en-US/mi/lwr%2FcontextUtils%2Fv%2F0_6_5/latest/lwr_contextUtils.js';
const CURRENT_ROUTE_CONTEXT = new ContextInfo(undefined);
/**
 * Services @wire(CurrentRoute) requests.
 * Hooks up to an Observable from the current navigation context.
 */

export const CurrentRoute = generateContextualWireAdapter(CURRENT_ROUTE_CONTEXT);