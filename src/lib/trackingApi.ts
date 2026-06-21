declare var process: any;

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
  || `${window.location.protocol}//${window.location.hostname || 'localhost'}:8000`;
const TOKEN_KEY = 'kaarbaar_auth_token';
const REQUEST_TIMEOUT = 10000; // 10 seconds

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

interface RequestOptions {
  method?: string;
  body?: Record<string, JsonValue>;
  timeout?: number;
}

let authToken = localStorage.getItem(TOKEN_KEY) || '';

export function setAuthToken(token: string) {
  authToken = token;
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function getAuthToken() {
  return authToken;
}

function authHeaders(): Record<string, string> {
  return authToken ? { Authorization: `Bearer ${authToken}` } : {};
}

async function tryRefreshToken(): Promise<boolean> {
  if (!getAuthToken()) return false;
  try {
    const refreshed = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT),
    });
    const refreshData = await refreshed.json().catch(() => ({}));
    if (refreshed.ok && refreshData.token) {
      setAuthToken(refreshData.token);
      return true;
    }
  } catch (err) {
    console.error('Token refresh failed:', err);
  }
  return false;
}

/**
 * Generic request handler with timeout, retry logic, and 401 token refresh
 */
async function request<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    method = 'GET',
    body = undefined,
    timeout = REQUEST_TIMEOUT,
  } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...authHeaders(),
  };

  const makeRequest = async (): Promise<Response> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      return await fetch(`${API_BASE_URL}${path}`, {
        method,
        credentials: 'include',
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }
  };

  let response: Response;
  try {
    response = await makeRequest();
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeout}ms: ${path}`);
    }
    throw err;
  }

  // Handle 401 with token refresh
  if (response.status === 401 && (await tryRefreshToken())) {
    return request<T>(path, { ...options });
  }

  let data: any;
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    const errorMessage = data?.message || `Request failed: ${path} (${response.status})`;
    throw new Error(errorMessage);
  }

  return data as T;
}

// --- EXPORTED API FUNCTIONS ---

export async function loginUser(email: string, password: string) {
  return request('/api/auth/login', {
    method: 'POST',
    body: { email, password },
  });
}

export async function signupUser(payload: Record<string, JsonValue>) {
  return request('/api/auth/signup', {
    method: 'POST',
    body: payload,
  });
}

export async function getCurrentUser() {
  return request('/api/auth/me', { method: 'GET' });
}

export async function trackEvent(
  type: string,
  page: string,
  metadata: Record<string, JsonValue> = {}
) {
  return request('/api/track/event', {
    method: 'POST',
    body: { type, page, metadata },
  });
}

export async function submitLead(payload: Record<string, JsonValue>) {
  return request('/api/leads/contact', {
    method: 'POST',
    body: payload,
  });
}

export async function requestCallback(payload: Record<string, JsonValue>) {
  return request('/api/leads/callback', {
    method: 'POST',
    body: payload,
  });
}

export async function createOrderIntent(payload: Record<string, JsonValue>) {
  return request('/api/orders/intent', {
    method: 'POST',
    body: payload,
  });
}

export async function updateOrderStatus(orderId: string, status: string) {
  return request(`/api/orders/intent/${orderId}`, {
    method: 'PATCH',
    body: { status },
  });
}

export async function getDashboardSummary() {
  return request('/api/dashboard/summary', { method: 'GET' });
}

export async function deleteOrder(orderId: string) {
  return request(`/api/orders/intent/${orderId}`, {
    method: 'DELETE',
  });
}

export async function updateOrder(
  orderId: string,
  payload: Record<string, JsonValue>
) {
  return request(`/api/orders/intent/${orderId}`, {
    method: 'PATCH',
    body: payload,
  });
}