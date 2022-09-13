import { messages, invariant } from '/1/module/esm/0/l/en-US/mi/lwr%2FrouterErrors%2Fv%2F0_6_5/latest/lwr_routerErrors.js';
import { pathToRegexp, compile } from '/1/module/esm/0/l/en-US/mi/lwr%2FrouterUtils%23pathToRegexp%2Fv%2F0_6_5/latest/lwr_routerUtils_pathToRegexp.js';
import { getQueryFromUrl, getPathFromUrl, isParam, getParamName, getQueryNames } from '/1/module/esm/0/l/en-US/mi/lwr%2FrouterUtils%23uriUtils%2Fv%2F0_6_5/latest/lwr_routerUtils_uriUtils.js';
const {
  INVALID_ROUTE_QUERY,
  MISSING_ROUTE_TEMPLATE,
  MISSING_PAGE_BINDING,
  INVALID_PAGE_BINDING,
  INVALID_URI_SYNTAX
} = messages;
/**
 * Parse the route definitions with path-to-regex functionality for paths, and
 * query parameter validation
 *
 * @example
 * {
 *      original: the user-defined route definition
 *      regex: regular expression based on the route definition path
 *      toPath: function which takes an object of parameters and creates a path
 *      params: an array of objects with info on each path parameter
 *      compiledQuery: an object that represents defined routeDefintion query params
 *      queryMatcher: a function that can be used to see if this route defintion
 *                   mataches against a given input QueryObject
 * }
 */

export function parseRoutes(config) {
  const {
    routes,
    caseSensitive
  } = config;
  return routes.map(def => {
    return parseUriRoute(def, caseSensitive);
  });
}
/**
 * Given a RouteDefintion, create a CompiledRouteDefinition that can be used to match
 * against input URIs.
 *
 * @param {RouteDefinition} def - A RouteDefintion to parse into a CompiledRouteDefiniton
 * @param {boolean} caseSensitive - determines whether or not the given RouteDefintion should
 * be case sensitive against path literals, and query parameter values
 * @returns {CompiledRouteDefinition} - Object that represents the compiled path so as to be used
 * for matching input URIs
 */

function parseUriRoute(def, caseSensitive = false) {
  const params = [];
  const {
    uri,
    page
  } = def;
  invariant(!!uri, MISSING_ROUTE_TEMPLATE);
  invariant(isValidUri(uri), INVALID_URI_SYNTAX);
  invariant(!!page, MISSING_PAGE_BINDING);
  const path = getPathFromUrl(uri);
  const query = getQueryFromUrl(uri);
  const regex = pathToRegexp(path, params, {
    sensitive: caseSensitive,
    // True if this is a leaf route, and must match URLs exactly with no trailing segments.
    end: def.exact === false ? false : true
  });
  const toPath = compile(path, {
    encode: encodeURIComponent
  });
  const compiledQuery = compileQueryObject(query);
  const queryMatcher = getQueryMatcher(compiledQuery, caseSensitive);
  const compiledRoute = {
    original: def,
    regex,
    params,
    toPath,
    compiledQuery,
    queryMatcher
  };
  invariant(isValidPageBinding(compiledRoute), INVALID_PAGE_BINDING);
  return compiledRoute;
}
/**
 * Returns true if URI format contains invalid characters
 * - No *, +, (, ), +, ;
 * @param uri
 */


function isValidUri(uri = '') {
  const invalid = ['*', '+', '(', ')', ';'];
  const containsInvalidCharacter = invalid.some(invalidChar => uri.indexOf(invalidChar) >= 0);
  return !containsInvalidCharacter;
}
/**
 * Returns true if the given compiledDef has a valid pageReference binding.
 * - All params in uri are accounted for
 * - No params are used more than once
 * - All params used in binding are defined in uri
 * @param compiledDef
 */


function isValidPageBinding(compiledDef) {
  const {
    original: {
      page
    } = {},
    params,
    compiledQuery
  } = compiledDef;
  const pageType = page ? page.type : page;
  const pageAttributes = (page ? page.attributes : page) || {};
  const pageState = (page ? page.state : page) || {};

  if (typeof pageType !== 'string' || typeof pageAttributes !== 'object' || typeof pageState !== 'object') {
    return false;
  }

  const pathParams = Object.values(params).map(({
    name
  }) => name);
  const queryParams = getQueryNames(compiledQuery);
  const allParams = [...pathParams, ...queryParams];
  const attributeBindings = Object.values(pageAttributes).filter(isParam).map(getParamName);
  const stateBindings = Object.values(pageState).filter(isParam).map(getParamName);
  const hasAllParams = allParams.every(paramName => {
    // Key.name could be an index if it's an unnamed parameter (https://github.com/pillarjs/path-to-regexp#unnamed-parameters)
    // We do not support unnamed parameters.
    if (typeof paramName !== 'string') {
      return false;
    }

    return attributeBindings.indexOf(paramName) >= 0 || stateBindings.indexOf(paramName) >= 0;
  });
  const paramsUsedOnlyOnce = allParams.length === attributeBindings.length + stateBindings.length;
  return !!(page && pageType && pageAttributes && pageState && hasAllParams && paramsUsedOnlyOnce);
}
/**
 * Converts a QueryObject create from the routeDefintion.uri, and converts it into a
 * CompiledQuery object that represents the defined 1) queryStringKeys, 2) routeParameter name,
 * and 3) and what input is valid for this query. e.g.,
 *
 * Given the following uri: /path?someKey=:qParam, then "someKey" is the queryStringKey, ":qParam"
 * is the route parameter name, and any input would be valid.
 *
 * @param {QueryObject} queryObject - queryObject retrieved from the routeDefinition uri
 * @returns {CompiledQuery} - CompiledQuery
 */


export function compileQueryObject(queryObject) {
  const compiled = {};
  Object.keys(queryObject).forEach(qKey => {
    const qValue = queryObject[qKey]; // INVALID: ?:qParam=value

    invariant(isParam(qKey) ? qValue === null : true, INVALID_ROUTE_QUERY);

    if (isParam(qKey)) {
      // ?:qParam => ?qParam=:qParam
      compiled[qKey.substr(1)] = {
        routeParamName: qKey
      };
    } else if (qValue && isParam(qValue)) {
      // ?qKey=:qParam
      compiled[qKey] = {
        routeParamName: qValue
      };
    } else {
      // ?qKey OR ?qKey=literal
      compiled[qKey] = {
        literalValue: qValue === null ? null : qValue
      };
    }
  });
  return compiled;
}
/**
 * Takes a CompiledQuery a returns a QueryMatcher function that will match a QueryObject
 * against the CompiledQuery and returns either a MatchedQuery, representing all the
 * input values that match the CompiledQuery, or null if any input query parameter
 * doesn't match the CompiledQuery.
 *
 * @param compiledQuery - CompiledQuery object to use to create the matcher
 * @param {boolean} caseSensitive - true if this should case-sensitive match query values
 * @returns {QueryMatcher} - The queryMatcher function
 */

export function getQueryMatcher(compiledQuery, caseSensitive = false) {
  const queryMatcher = queryObject => {
    const inputKeys = Object.keys(queryObject);
    const defKeys = Object.keys(compiledQuery);
    const hasAllDefKeys = defKeys.every(defKey => inputKeys.indexOf(defKey) >= 0);

    if (hasAllDefKeys) {
      return defKeys.reduce((matched, defKey) => {
        // If we find that any param doesn't match, escape out.
        if (matched === null) return null;
        const {
          literalValue,
          routeParamName
        } = compiledQuery[defKey];
        const inputValue = queryObject[defKey]; // no literal was provided, default true

        let literalValueMatches = true;

        if (typeof literalValue === 'string') {
          literalValueMatches = caseSensitive ? literalValue === inputValue : literalValue.toUpperCase() === (inputValue == null ? inputValue : inputValue.toUpperCase());
        } else if (literalValue === null) {
          literalValueMatches = inputValue === literalValue;
        }

        if (literalValueMatches) {
          // force null to string for matching
          matched = { ...matched,
            [defKey]: {
              value: inputValue,
              routeParamName
            }
          };
        } else {
          matched = null;
        }

        return matched;
      }, {});
    }

    return null;
  };

  return queryMatcher;
}