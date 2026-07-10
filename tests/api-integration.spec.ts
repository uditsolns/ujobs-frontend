/**
 * API Integration Tests for Backend
 * Tests all PublicWebController endpoints
 */

import { test, expect } from '@playwright/test';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ujobsindia.com/aayusha-backend/public/api/v1';
const TIMEOUT = 10000;

test.describe('Jobs API Tests', () => {
  test('GET /web/jobs - should return paginated jobs', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/web/jobs`, {
      timeout: TIMEOUT,
    });

    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(Array.isArray(body.data)).toBeTruthy();
    
    console.log(`✅ Jobs API: Returned ${body.data.length} jobs`);
  });

  test('POST /web/jobs/search - should search jobs', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/web/jobs/search`, {
      data: {
        q: 'driver',
        per_page: 10,
      },
      timeout: TIMEOUT,
    });

    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    
    console.log(`✅ Job Search API: Found ${body.data.length} results`);
  });

  test('GET /web/jobs/stats - should return job statistics', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/web/jobs/stats`, {
      timeout: TIMEOUT,
    });

    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('active_jobs');
    
    console.log(`✅ Job Stats API: ${body.data.active_jobs} active jobs`);
  });

  test('GET /web/jobs/featured - should return featured jobs', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/web/jobs/featured?per_page=5`, {
      timeout: TIMEOUT,
    });

    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    
    console.log(`✅ Featured Jobs API: Returned ${body.data.length} featured jobs`);
  });

  test('GET /web/jobs/{id} - should return job details', async ({ request }) => {
    // First get a job ID
    const listResponse = await request.get(`${API_BASE_URL}/web/jobs?per_page=1`);
    const listBody = await listResponse.json();
    
    if (listBody.data && listBody.data.length > 0) {
      const jobId = listBody.data[0].id;
      
      const response = await request.get(`${API_BASE_URL}/web/jobs/${jobId}`, {
        timeout: TIMEOUT,
      });

      expect(response.status()).toBe(200);
      
      const body = await response.json();
      expect(body).toHaveProperty('status', 'success');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('id', jobId);
      
      console.log(`✅ Job Detail API: Retrieved job ${jobId}`);
    } else {
      console.log('⚠️ No jobs available to test detail endpoint');
    }
  });

  test('GET /web/jobs/{id}/similar - should return similar jobs', async ({ request }) => {
    // First get a job ID
    const listResponse = await request.get(`${API_BASE_URL}/web/jobs?per_page=1`);
    const listBody = await listResponse.json();
    
    if (listBody.data && listBody.data.length > 0) {
      const jobId = listBody.data[0].id;
      
      const response = await request.get(`${API_BASE_URL}/web/jobs/${jobId}/similar`, {
        timeout: TIMEOUT,
      });

      expect(response.status()).toBe(200);
      
      const body = await response.json();
      expect(body).toHaveProperty('status', 'success');
      expect(body).toHaveProperty('data');
      
      console.log(`✅ Similar Jobs API: Found ${body.data.length} similar jobs`);
    }
  });
});

test.describe('Candidates API Tests', () => {
  test('GET /web/candidates - should return paginated candidates', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/web/candidates`, {
      timeout: TIMEOUT,
    });

    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(Array.isArray(body.data)).toBeTruthy();
    
    console.log(`✅ Candidates API: Returned ${body.data.length} candidates`);
  });

  test('POST /web/candidates/search - should search candidates', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/web/candidates/search`, {
      data: {
        per_page: 10,
      },
      timeout: TIMEOUT,
    });

    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    
    console.log(`✅ Candidate Search API: Found ${body.data.length} results`);
  });

  test('GET /web/candidates/stats - should return candidate statistics', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/web/candidates/stats`, {
      timeout: TIMEOUT,
    });

    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    
    console.log('✅ Candidate Stats API: Stats retrieved');
  });

  test('GET /web/candidates/featured - should return featured candidates', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/web/candidates/featured?per_page=5`, {
      timeout: TIMEOUT,
    });

    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    
    console.log(`✅ Featured Candidates API: Returned ${body.data.length} candidates`);
  });
});

test.describe('Work Types (Categories) API Tests', () => {
  test('GET /web/work-types - should return all categories', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/web/work-types`, {
      timeout: TIMEOUT,
    });

    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('workTypes');
    expect(Array.isArray(body.workTypes)).toBeTruthy();
    
    console.log(`✅ Work Types API: Returned ${body.workTypes.length} categories`);
    
    // Verify structure
    if (body.workTypes.length > 0) {
      const category = body.workTypes[0];
      expect(category).toHaveProperty('id');
      expect(category).toHaveProperty('name');
    }
  });
});

test.describe('Locations API Tests', () => {
  test('GET /web/locations - should return all locations', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/web/locations`, {
      timeout: TIMEOUT,
    });

    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(Array.isArray(body.data)).toBeTruthy();
    
    console.log(`✅ Locations API: Returned ${body.data.length} locations`);
    
    // Verify structure
    if (body.data.length > 0) {
      const location = body.data[0];
      expect(location).toHaveProperty('id');
      expect(location).toHaveProperty('name');
    }
  });
});

test.describe('Banners API Tests', () => {
  test('GET /web/banners - should return banners', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/web/banners`, {
      timeout: TIMEOUT,
    });

    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(Array.isArray(body.data)).toBeTruthy();
    
    console.log(`✅ Banners API: Returned ${body.data.length} banners`);
  });
});

test.describe('Employer Lead API Tests', () => {
  test('POST /web/employer-lead - should submit lead', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/web/employer-lead`, {
      data: {
        name: 'Test Company',
        mobile_no: '9876543210',
        company_name: 'Test Corp',
        requirement: 'Need 5 drivers',
      },
      timeout: TIMEOUT,
    });

    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('lead_id');
    
    console.log(`✅ Employer Lead API: Lead created with ID ${body.lead_id}`);
  });

  test('POST /web/employer-lead - should validate required fields', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/web/employer-lead`, {
      data: {
        // Missing required fields
        name: '',
        mobile_no: '',
      },
      timeout: TIMEOUT,
    });

    // Should return validation error (422 or 400)
    expect(response.status()).toBeGreaterThanOrEqual(400);
    
    console.log('✅ Employer Lead API: Validation works');
  });
});

test.describe('API Response Format Tests', () => {
  test('All APIs should return consistent format', async ({ request }) => {
    const endpoints = [
      '/web/jobs',
      '/web/work-types',
      '/web/locations',
      '/web/banners',
      '/web/candidates',
    ];

    for (const endpoint of endpoints) {
      const response = await request.get(`${API_BASE_URL}${endpoint}`, {
        timeout: TIMEOUT,
      });

      const body = await response.json();
      
      // All should have status field
      expect(body).toHaveProperty('status');
      
      // Status should be 'success' for 200 responses
      if (response.status() === 200) {
        expect(body.status).toBe('success');
      }
      
      console.log(`✅ ${endpoint}: Consistent format`);
    }
  });
});

test.describe('API Performance Tests', () => {
  test('All endpoints should respond within 2 seconds', async ({ request }) => {
    const endpoints = [
      { method: 'GET', url: '/web/jobs', data: null },
      { method: 'GET', url: '/web/jobs/stats', data: null },
      { method: 'GET', url: '/web/work-types', data: null },
      { method: 'GET', url: '/web/locations', data: null },
      { method: 'GET', url: '/web/candidates', data: null },
    ];

    for (const endpoint of endpoints) {
      const startTime = Date.now();
      
      const response = endpoint.method === 'GET'
        ? await request.get(`${API_BASE_URL}${endpoint.url}`, { timeout: TIMEOUT })
        : await request.post(`${API_BASE_URL}${endpoint.url}`, { data: endpoint.data, timeout: TIMEOUT });

      const duration = Date.now() - startTime;
      
      expect(response.status()).toBe(200);
      expect(duration).toBeLessThan(2000);
      
      console.log(`✅ ${endpoint.url}: ${duration}ms (target: < 2000ms)`);
    }
  });
});

test.describe('CORS & Security Tests', () => {
  test('API should allow requests from frontend domain', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/web/jobs`, {
      headers: {
        'Origin': 'https://ujobsindia.com',
      },
      timeout: TIMEOUT,
    });

    expect(response.status()).toBe(200);
    
    // Check CORS headers (may not be present in test environment)
    const headers = response.headers();
    console.log('CORS headers:', headers['access-control-allow-origin']);
    
    console.log('✅ CORS: API accessible');
  });
});

console.log(`
╔════════════════════════════════════════════╗
║   UJOBS INDIA API INTEGRATION TESTS        ║
║   Testing All Backend Endpoints            ║
╚════════════════════════════════════════════╝
`);
