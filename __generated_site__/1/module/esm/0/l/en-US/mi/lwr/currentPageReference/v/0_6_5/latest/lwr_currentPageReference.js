/**
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { generateContextualWireAdapter, ContextInfo } from '/1/module/esm/0/l/en-US/mi/lwr%2FcontextUtils%2Fv%2F0_6_5/latest/lwr_contextUtils.js';
const CURRENT_PAGE_REFERENCE_CONTEXT = new ContextInfo(undefined);
/**
 * Services @wire(CurrentPageReference) requests.
 * Hooks up to an Observable from the current navigation context.
 */

export const CurrentPageReference = generateContextualWireAdapter(CURRENT_PAGE_REFERENCE_CONTEXT);