import { createContextProvider } from '/1/module/esm/0/l/en-US/mi/lwc%2Fv%2F2_5_8/latest/lwc.js';
import { CurrentPageReference, CurrentRoute, CurrentView, NavigationContext } from '/1/module/esm/0/l/en-US/mi/lwr%2Fnavigation%2Fv%2F0_6_5/latest/lwr_navigation.js';
export const currentRouteContextualizer = createContextProvider(CurrentRoute);
export const currentPageReferenceContextualizer = createContextProvider(CurrentPageReference);
export const currentViewContextualizer = createContextProvider(CurrentView);
export const navigationContextContextualizer = createContextProvider(NavigationContext);
/**
 *
 * @param {TContext} contextValue - Context API object
 * @param {EventTarget} providerNode - Context DOM element
 * @param {Contextualizer} contextualizer - Function for providing this context to subtree nodes wired to a specific adapter
 * @param {ContextualWireAdapter<TContext, TEmit, TConfig>} contextualAdapter - Contextual wire adapter capable of subscribing to context changes
 */

export function provideContext(contextValue, providerNode, contextualizer, contextualAdapter) {
  // Set up provider to give context to wire adpaters so that a component connected
  // under the providerNode subtree and wired to those adapters will receive this id
  contextualAdapter.setContext(providerNode, contextValue);
  contextualizer(providerNode, {
    consumerConnectedCallback: contextualAdapter.subscribeContext.bind(contextualAdapter, providerNode),
    consumerDisconnectedCallback: contextualAdapter.unsubscribeContext.bind(contextualAdapter, providerNode)
  });
}