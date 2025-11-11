import { useState } from "react";
import * as S from "./dataInput.styles";

export const DataInput = () => {
  const [activeTab, setActiveTab] = useState<"api" | "file">("api");
  const [apiUrl, setApiUrl] = useState("");
  const [authType, setAuthType] = useState("API Key");
  const [apiKey, setApiKey] = useState("");

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
            <S.FormInput
              type="text"
              placeholder="https://api.example.com/data"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
            />
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
            <S.FormInput
              type="password"
              placeholder="API 키를 입력하세요"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </S.FormGroup>

          <S.Button>연결 테스트</S.Button>
        </S.TabContent>
      )}

      {activeTab === "file" && (
        <S.TabContent>
          <S.UploadArea>
            <S.UploadIcon>📁</S.UploadIcon>
            <S.UploadTitle>파일을 드래그하거나 클릭하여 업로드</S.UploadTitle>
            <S.UploadSubtitle>CSV, Excel, TSV, JSON 형식 지원 (최대 500MB)</S.UploadSubtitle>
            <input type="file" style={{ display: "none" }} multiple accept=".csv,.xlsx,.tsv,.json" />
          </S.UploadArea>
        </S.TabContent>
      )}
    </S.Card>
  );
};



