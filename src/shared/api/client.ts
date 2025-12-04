import axios, { AxiosHeaders } from "axios";
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

class ApiClient {
  private client: AxiosInstance;

  constructor(baseUrl: string = API_BASE_URL) {
    this.client = axios.create({
      baseURL: baseUrl,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        const isFormData = config.data instanceof FormData;

        if (!config.headers) {
          config.headers = new AxiosHeaders();
        }

        if (config.headers instanceof AxiosHeaders) {
          if (isFormData) {
            config.headers.delete("Content-Type");
          } else if (!config.headers.has("Content-Type")) {
            config.headers.set("Content-Type", "application/json");
          }
        } else if (isFormData) {
          delete (config.headers as Record<string, string>)["Content-Type"];
        } else if (!(config.headers as Record<string, string>)["Content-Type"]) {
          (config.headers as Record<string, string>)["Content-Type"] = "application/json";
        }

        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error: AxiosError) => {
        const message = (error.response?.data as { message?: string })?.message || error.message || "API request failed";

        console.error(`API response failed: ${error.config?.url ?? "unknown endpoint"}`, error);

        return Promise.reject(new Error(message));
      }
    );
  }

  private async request<T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<T> {
    const config: AxiosRequestConfig = {
      url: endpoint,
      ...options,
    };

    return this.client.request<T, T>(config);
  }

  // Projects API
  async getProjects() {
    return this.request("/projects");
  }

  async getProject(id: number) {
    return this.request(`/projects/${id}`);
  }

  async createProject(data: Record<string, unknown>) {
    return this.request("/projects", {
      method: "POST",
      data,
    });
  }

  async updateProject(id: number, data: Record<string, unknown>) {
    return this.request(`/projects/${id}`, {
      method: "PUT",
      data,
    });
  }

  async deleteProject(id: number) {
    return this.request(`/projects/${id}`, {
      method: "DELETE",
    });
  }

  // Data API
  async getDataFiles(projectId?: number) {
    return this.request("/data", {
      params: projectId ? { project_id: projectId } : undefined,
    });
  }

  async uploadFile(file: File, projectId?: number) {
    const formData = new FormData();
    formData.append("file", file);
    if (projectId) {
      formData.append("project_id", projectId.toString());
    }

    return this.request("/projects/upload-csv", {
      method: "POST",
      data: formData,
    });
  }

  // Missing Value API
  async getMissingValueProjects() {
    return this.request("/missing-value/projects");
  }

  async getMissingValueAnalysis(projectId: number) {
    return this.request(`/missing-value/summary/${projectId}`);
  }

  async getMissingValueSummary(projectId: number) {
    return this.request(`/missing-value/summary/${projectId}/summary`);
  }

  async getMissingValueDistribution(projectId: number) {
    return this.request(`/missing-value/summary/${projectId}/distribution`);
  }

  // Verification API
  async getVerificationDashboard(projectId?: number) {
    return this.request("/verification/dashboard", {
      params: projectId ? { project_id: projectId } : undefined,
    });
  }

  async getVerificationStatus(projectId?: number) {
    return this.request("/verification/status", {
      params: projectId ? { project_id: projectId } : undefined,
    });
  }

  async getVerificationRules(projectId?: number) {
    return this.request("/verification/rules", {
      params: projectId ? { project_id: projectId } : undefined,
    });
  }

  // Imputation API
  async getImputationMethods() {
    return this.request("/imputation/methods");
  }

  async executeImputation(data: Record<string, unknown>) {
    return this.request("/imputation/execute", {
      method: "POST",
      data,
    });
  }

  async getImputationStatus(jobId: string) {
    return this.request(`/imputation/status/${jobId}`);
  }

  async getImputationResults(jobId: string) {
    return this.request(`/imputation/results/${jobId}`);
  }
}

export const apiClient = new ApiClient();
