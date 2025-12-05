import { useState, useRef } from "react";
import * as S from "./dataInput.styles";
import { apiClient } from "@/shared/api";

interface DataInputProps {
  onFileUploaded?: () => void;
}

export const DataInput = ({ onFileUploaded }: DataInputProps) => {
  const [activeTab, setActiveTab] = useState<"api" | "file">("api");
  const [apiUrl, setApiUrl] = useState("");
  const [authType, setAuthType] = useState("API Key");
  const [apiKey, setApiKey] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      setUploadError(null);
      setUploadSuccess(false);
      await apiClient.uploadFile(file);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
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

      <S.TabGroup>
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

      {activeTab === "file" && (
        <S.TabContent>
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
        </S.TabContent>
      )}
    </S.Card>
  );
};
