const isClass = (value, Class) => value === Class || (typeof value === 'function' && value.prototype instanceof Class)

export default isClass
