/**
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { ContextInfo, generateContextualWireAdapter } from '/1/module/esm/0/l/en-US/mi/lwr%2FcontextUtils%2Fv%2F0_6_5/latest/lwr_contextUtils.js';
const NAVIGATION_CONTEXT = new ContextInfo(undefined);
export const NavigationContext = generateContextualWireAdapter(NAVIGATION_CONTEXT);