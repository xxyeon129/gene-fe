import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import * as S from "./dataInput.styles";
import { apiClient } from "@/shared/api";

interface DataInputProps {
  onFileUploaded?: () => void;
}

interface Project {
  id: number;
  name: string;
}

export interface DataInputRef {
  refreshProjects: () => Promise<void>;
}

export const DataInput = forwardRef<DataInputRef, DataInputProps>(({ onFileUploaded }, ref) => {
  const [activeTab, setActiveTab] = useState<"api" | "file">("file");
  const [apiUrl, setApiUrl] = useState("");
  const [authType, setAuthType] = useState("API Key");
  const [apiKey, setApiKey] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoadingProjects(true);
        const data = await apiClient.getProjects() as Project[];
        setProjects(data);
        if (data.length > 0) {
          setSelectedProjectId(data[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!selectedProjectId) return;

      try {
        setLoadingFiles(true);
        const files = await apiClient.getDataFiles(selectedProjectId) as any[];
        setUploadedFiles(files);
      } catch (err) {
        console.error("Failed to fetch files:", err);
      } finally {
        setLoadingFiles(false);
      }
    };
    fetchFiles();
  }, [selectedProjectId]);

  const refreshFiles = async () => {
    if (!selectedProjectId) return;

    try {
      setLoadingFiles(true);
      const files = await apiClient.getDataFiles(selectedProjectId) as any[];
      setUploadedFiles(files);
    } catch (err) {
      console.error("Failed to fetch files:", err);
    } finally {
      setLoadingFiles(false);
    }
  };

  const refreshProjects = async () => {
    try {
      setLoadingProjects(true);
      const data = await apiClient.getProjects() as Project[];
      setProjects(data);

      // 새로운 프로젝트가 추가되었을 때 자동으로 선택
      if (data.length > 0 && !selectedProjectId) {
        setSelectedProjectId(data[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoadingProjects(false);
    }
  };

  // 외부에서 프로젝트 목록을 새로고침할 수 있도록 ref 노출
  useImperativeHandle(ref, () => ({
    refreshProjects,
  }));

  const handleFileUpload = async (file: File) => {
    if (!selectedProjectId) {
      setUploadError("프로젝트를 선택해주세요.");
      return;
    }

    try {
      setUploading(true);
      setUploadError(null);
      setUploadSuccess(false);
      await apiClient.uploadFile(file, selectedProjectId);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);

      // 파일 목록 새로고침
      await refreshFiles();

      // 파일 업로드 성공 시 프로젝트 목록 갱신
      if (onFileUploaded) {
        onFileUploaded();
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "파일 업로드에 실패했습니다.");
      console.error("Failed to upload file:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <S.Card>
      <S.CardHeader>
        <S.CardTitle>데이터 입력 방법</S.CardTitle>
      </S.CardHeader>

      {/* API 연동 탭 - 주석처리됨 */}
      {/* <S.TabGroup>
        <S.TabItem $active={activeTab === "api"} onClick={() => setActiveTab("api")}>
          API 연동
        </S.TabItem>
        <S.TabItem $active={activeTab === "file"} onClick={() => setActiveTab("file")}>
          파일 업로드
        </S.TabItem>
      </S.TabGroup>

      {activeTab === "api" && (
        <S.TabContent>
          <S.Alert $type="info">
            <span>ℹ️</span>
            <div>
              <div>API 연동 설정</div>
              <div>실시간으로 데이터를 수집하고 자동으로 품질 검증을 수행합니다.</div>
            </div>
          </S.Alert>

          <S.FormGroup>
            <S.FormLabel>API Endpoint URL</S.FormLabel>
            <S.FormInput type="text" placeholder="https://api.example.com/data" value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} />
          </S.FormGroup>

          <S.FormGroup>
            <S.FormLabel>인증 방식</S.FormLabel>
            <S.FormSelect value={authType} onChange={(e) => setAuthType(e.target.value)}>
              <option>API Key</option>
              <option>OAuth 2.0</option>
              <option>Basic Auth</option>
            </S.FormSelect>
          </S.FormGroup>

          <S.FormGroup>
            <S.FormLabel>API Key</S.FormLabel>
            <S.FormInput type="password" placeholder="API 키를 입력하세요" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
          </S.FormGroup>

          <S.Button>연결 테스트</S.Button>
        </S.TabContent>
      )}
      */}

      <S.TabContent>
          <S.FormGroup>
            <S.FormLabel>프로젝트 선택</S.FormLabel>
            <S.FormSelect
              value={selectedProjectId || ""}
              onChange={(e) => setSelectedProjectId(Number(e.target.value))}
              disabled={loadingProjects}
            >
              <option value="">프로젝트를 선택하세요</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </S.FormSelect>
            {loadingProjects && <div style={{ fontSize: "0.875rem", color: "#666", marginTop: "0.5rem" }}>프로젝트 목록 로딩 중...</div>}
          </S.FormGroup>

          <S.UploadArea
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={async (e) => {
              e.preventDefault();
              const files = Array.from(e.dataTransfer.files);
              if (files.length > 0) {
                await handleFileUpload(files[0]);
              }
            }}
          >
            <S.UploadIcon>📁</S.UploadIcon>
            <S.UploadTitle>파일을 드래그하거나 클릭하여 업로드</S.UploadTitle>
            <S.UploadSubtitle>CSV, Excel, TSV, JSON 형식 지원 (최대 500MB)</S.UploadSubtitle>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }}
              accept=".csv,.xlsx,.tsv,.json"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  await handleFileUpload(file);
                }
              }}
            />
          </S.UploadArea>
          {uploadError && <div style={{ color: "red", marginTop: "1rem" }}>에러: {uploadError}</div>}
          {uploadSuccess && <div style={{ color: "green", marginTop: "1rem" }}>파일이 성공적으로 업로드되었습니다!</div>}
          {uploading && <div style={{ marginTop: "1rem" }}>업로드 중...</div>}

          {selectedProjectId && (
            <div style={{ marginTop: "2rem" }}>
              <h4 style={{ marginBottom: "1rem", fontSize: "1rem", fontWeight: "bold" }}>업로드된 파일 ({uploadedFiles.length})</h4>
              {loadingFiles ? (
                <div style={{ color: "#666" }}>파일 목록 로딩 중...</div>
              ) : uploadedFiles.length === 0 ? (
                <div style={{ color: "#666", padding: "1rem", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
                  아직 업로드된 파일이 없습니다.
                </div>
              ) : (
                <div style={{ border: "1px solid #e0e0e0", borderRadius: "4px", overflow: "hidden" }}>
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={file.id || index}
                      style={{
                        padding: "0.75rem 1rem",
                        borderBottom: index < uploadedFiles.length - 1 ? "1px solid #e0e0e0" : "none",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: "500" }}>{file.name}</div>
                        <div style={{ fontSize: "0.875rem", color: "#666", marginTop: "0.25rem" }}>
                          {file.size} • {file.createdAt || "날짜 미상"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </S.TabContent>
    </S.Card>
  );
});

DataInput.displayName = "DataInput";
