export default function createCache({ ttlMs = 1000 * 60 } = {}) {
  const store = new Map();
  return {
    get(key) {
      const v = store.get(key);
      if (!v) return null;
      if (Date.now() > v.exp) {
        store.delete(key);
        return null;
      }
      return v.data;
    },
    set(key, data) {
      store.set(key, { data, exp: Date.now() + ttlMs });
    }
  };
}
