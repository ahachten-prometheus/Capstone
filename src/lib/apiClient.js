export class APIClient {
  constructor(route) {
    this.baseUrl = `/api/${route}`;
  }

  async _handle(path = '', options = {}) {
    try {
      const res = await fetch(`${this.baseUrl}${path}`, options);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.msg ?? `HTTP status ${res.status}`);
      }

      return [data, null];
    } catch (error) {
      console.error('API Error:', error);
      return [null, error.message];
    }
  }

  get(path = '') {
    return this._handle(path, { method: 'GET' });
  }

  post(path = '', body = {}) {
    return this._handle(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  }

  patch(path = '', body = {}) {
    return this._handle(path, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  }

  delete(path = '') {
    return this._handle(path, { method: 'DELETE' });
  }
}