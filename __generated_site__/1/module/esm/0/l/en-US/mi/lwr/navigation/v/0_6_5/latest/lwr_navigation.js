/**
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// Wires and their return types
export { NavigationContext } from '/1/module/esm/0/l/en-US/mi/lwr%2FnavigationContext%2Fv%2F0_6_5/latest/lwr_navigationContext.js'; // provides ContextId

export { CurrentPageReference } from '/1/module/esm/0/l/en-US/mi/lwr%2FcurrentPageReference%2Fv%2F0_6_5/latest/lwr_currentPageReference.js'; // provides PageReference

export { CurrentRoute } from '/1/module/esm/0/l/en-US/mi/lwr%2FcurrentRoute%2Fv%2F0_6_5/latest/lwr_currentRoute.js'; // Provides RouteInstance

export { CurrentView } from '/1/module/esm/0/l/en-US/mi/lwr%2FcurrentView%2Fv%2F0_6_5/latest/lwr_currentView.js'; // Provides Constructable
// The LWR Navigation context singleton (i.e. CACHE in lwr/contextUtils#navigationApiStore)
// These functions and classes must only be included in an app ONCE:
//      - 'lwr/navigation' must be excluded from bundling
//      - ALWAYS import these from 'lwr/navigation', even internally

export { ContextInfo, getNavigationHelm, registerNavigationHelm, generateContextualWireAdapter } from '/1/module/esm/0/l/en-US/mi/lwr%2FcontextUtils%2Fv%2F0_6_5/latest/lwr_contextUtils.js'; // NavigationMixin has a dependency on navigate and generateUrl
// They need to be sibling exports in order to avoid a circular dependency

export { navigate, generateUrl } from '/1/module/esm/0/l/en-US/mi/lwr%2Fnavigation%23navigationApi%2Fv%2F0_6_5/latest/lwr_navigation_navigationApi.js';
export { NavigationMixin } from '/1/module/esm/0/l/en-US/mi/lwr%2Fnavigation%23navigationMixin%2Fv%2F0_6_5/latest/lwr_navigation_navigationMixin.js';