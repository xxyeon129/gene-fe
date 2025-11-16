/**
 * API Client for backend communication
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = endpoint.startsWith("http") ? endpoint : `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Projects API
  async getProjects() {
    return this.request("/api/projects");
  }

  async getProject(id: number) {
    return this.request(`/api/projects/${id}`);
  }

  async createProject(data: any) {
    return this.request("/api/projects", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateProject(id: number, data: any) {
    return this.request(`/api/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteProject(id: number) {
    return this.request(`/api/projects/${id}`, {
      method: "DELETE",
    });
  }

  // Data API
  async getDataFiles(projectId?: number) {
    const params = projectId ? `?project_id=${projectId}` : "";
    return this.request(`/api/data${params}`);
  }

  async uploadFile(file: File, projectId?: number) {
    const formData = new FormData();
    formData.append("file", file);
    if (projectId) {
      formData.append("project_id", projectId.toString());
    }

    const url = `${this.baseUrl}/api/data/upload`;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Missing Value API
  async getMissingValueProjects() {
    return this.request("/api/missing-value/projects");
  }

  async getMissingValueAnalysis(projectId: number) {
    return this.request(`/api/missing-value/summary/${projectId}`);
  }

  async getMissingValueSummary(projectId: number) {
    return this.request(`/api/missing-value/summary/${projectId}/summary`);
  }

  async getMissingValueDistribution(projectId: number) {
    return this.request(`/api/missing-value/summary/${projectId}/distribution`);
  }

  // Verification API
  async getVerificationDashboard(projectId?: number) {
    const params = projectId ? `?project_id=${projectId}` : "";
    return this.request(`/api/verification/dashboard${params}`);
  }

  async getVerificationStatus(projectId?: number) {
    const params = projectId ? `?project_id=${projectId}` : "";
    return this.request(`/api/verification/status${params}`);
  }

  async getVerificationRules(projectId?: number) {
    const params = projectId ? `?project_id=${projectId}` : "";
    return this.request(`/api/verification/rules${params}`);
  }

  // Imputation API
  async getImputationMethods() {
    return this.request("/api/imputation/methods");
  }

  async executeImputation(data: any) {
    return this.request("/api/imputation/execute", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getImputationStatus(jobId: string) {
    return this.request(`/api/imputation/status/${jobId}`);
  }

  async getImputationResults(jobId: string) {
    return this.request(`/api/imputation/results/${jobId}`);
  }
}

export const apiClient = new ApiClient();

