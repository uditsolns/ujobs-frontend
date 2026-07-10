/**
 * Leads Service
 * Service layer for employer lead operations
 */

import apiClient from '@/lib/api/client';
import { API_CONFIG } from '@/config/api';
import type { EmployerLead, EmployerLeadResponse } from '@/types';

export const LeadsService = {
  /**
   * Submit employer lead
   */
  async submitLead(lead: EmployerLead): Promise<EmployerLeadResponse> {
    const response = await apiClient.post(API_CONFIG.endpoints.web.employerLead, lead);
    return response.data;
  },
};

export default LeadsService;
