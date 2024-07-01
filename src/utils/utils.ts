/**
 * Creates a debounced function that delays invoking `func` until after `delay` milliseconds
 * have elapsed since the last time the debounced function was invoked.
 * @param {Function} func - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay.
 * @returns {Function} - The debounced function.
 */
export const debounce = (func: Function, delay: number) => {
  let timeoutId: number | undefined;

  return function (...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      func(...args);
    }, delay);
  };
}

/**
* Filters an array of objects based on a case-insensitive search term.
* @param {Array<any>} array - The array of objects to filter.
* @param {string} searchTerm - The search term to filter objects by.
* @returns {Array<any>} - Filtered array of objects matching the search term.
*/
export const filterObjects = (array: Array<any>, searchTerm: string) => {
  const lowercasedSearchTerm = searchTerm.toLowerCase();

  return array.filter(item => {
    return Object.values(item).some(value =>
      String(value).toLowerCase().includes(lowercasedSearchTerm)
    );
  });
};

/**
 * Retrieves the value of a nested property from an object based on a dot-separated path.
 * @param {string} path - The dot-separated path to the property (e.g., 'address.office.suburb').
 * @param {Object} obj - The object from which to retrieve the nested property value.
 * @returns {*} - The value of the nested property if found, otherwise undefined.
 */

export const getPropertyValueByPath = (path: string, obj: Object) => {
  const properties: any[] = path.split('.');
  return properties.reduce((acc, property) => {
    if (acc && acc[property] !== undefined) {
      return acc[property];
    }
    return undefined;
  }, obj);
}

/**
* Fetches JSON data from the specified URL.
* @param {string} url - The URL to fetch JSON data from.
* @returns {Promise<any>} A promise that resolves to the parsed JSON data, or null if there's an error.
*/
export const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
};




