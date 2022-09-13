import { load } from "/1/module/esm/0/l/en-US/mi/lwr%2FesmLoader%2Fv%2F0_6_5/latest/lwr_esmLoader.js";
// Cache for promises that import icon templates
const importPromises = {};
const iconTemplateCache = {};
export function hasIconLibrary(dir, category) {
  const cacheKey = makeCacheKey(dir, category);
  return !!iconTemplateCache[cacheKey];
}
export function getIconLibrary(dir, category) {
  const cacheKey = makeCacheKey(dir, category);
  return iconTemplateCache[cacheKey] || null;
}
export function fetchIconLibrary(dir, category) {
  const cacheKey = makeCacheKey(dir, category); // If icon template is being requested, return the cached promise

  if (importPromises[cacheKey]) {
    return importPromises[cacheKey];
  }

  const promise = fetchIconTemplate(dir, category);
  promise.then(tmpl => {
    iconTemplateCache[cacheKey] = tmpl;
    delete importPromises[cacheKey];
  }).catch(() => {
    delete importPromises[cacheKey];
  }); // Cache the promise to import

  importPromises[cacheKey] = promise;
  return promise;
}

function makeCacheKey(dir, category) {
  return `${category}${dir}`;
} // eslint-disable-next-line @lwc/lwc/no-async-await


async function fetchIconTemplate(dir, category) {
  if (dir === 'rtl') {
    switch (category) {
      case 'utility':
        {
          // eslint-disable-next-line @lwc/lwc/no-async-await
          const {
            default: Lib
          } = await load('lightning/iconSvgTemplatesUtilityRtl/v/1_14_7-alpha');
          return Lib;
        }

      case 'action':
        {
          // eslint-disable-next-line @lwc/lwc/no-async-await
          const {
            default: Lib
          } = await load('lightning/iconSvgTemplatesActionRtl/v/1_14_7-alpha');
          return Lib;
        }

      case 'standard':
        {
          // eslint-disable-next-line @lwc/lwc/no-async-await
          const {
            default: Lib
          } = await load('lightning/iconSvgTemplatesStandardRtl/v/1_14_7-alpha');
          return Lib;
        }

      case 'doctype':
        {
          // eslint-disable-next-line @lwc/lwc/no-async-await
          const {
            default: Lib
          } = await load('lightning/iconSvgTemplatesDoctypeRtl/v/1_14_7-alpha');
          return Lib;
        }

      case 'custom':
        {
          // eslint-disable-next-line @lwc/lwc/no-async-await
          const {
            default: Lib
          } = await load('lightning/iconSvgTemplatesCustomRtl/v/1_14_7-alpha');
          return Lib;
        }

      default:
        return null;
    }
  } else {
    switch (category) {
      case 'utility':
        {
          // eslint-disable-next-line @lwc/lwc/no-async-await
          const {
            default: Lib
          } = await load('lightning/iconSvgTemplatesUtility/v/1_14_7-alpha');
          return Lib;
        }

      case 'action':
        {
          // eslint-disable-next-line @lwc/lwc/no-async-await
          const {
            default: Lib
          } = await load('lightning/iconSvgTemplatesAction/v/1_14_7-alpha');
          return Lib;
        }

      case 'standard':
        {
          // eslint-disable-next-line @lwc/lwc/no-async-await
          const {
            default: Lib
          } = await load('lightning/iconSvgTemplatesStandard/v/1_14_7-alpha');
          return Lib;
        }

      case 'doctype':
        {
          // eslint-disable-next-line @lwc/lwc/no-async-await
          const {
            default: Lib
          } = await load('lightning/iconSvgTemplatesDoctype/v/1_14_7-alpha');
          return Lib;
        }

      case 'custom':
        {
          // eslint-disable-next-line @lwc/lwc/no-async-await
          const {
            default: Lib
          } = await load('lightning/iconSvgTemplatesCustom/v/1_14_7-alpha');
          return Lib;
        }

      default:
        return null;
    }
  }
}