import * as S from "./commonUploadFile.styles";

interface CommonUploadFileProps {
  iconType?: "upload" | "file";
  extensions: string[];
  isButton?: boolean;
  isBlue?: boolean;
  padding?: string;
}

export const CommonUploadFile = ({ iconType = "upload", extensions, isButton = true, isBlue = false, padding = "0.5rem" }: CommonUploadFileProps) => {
  return (
    <>
      <S.DataUploadInput type="file" multiple id="dataUploadInput" />
      <S.DataUploadLabel htmlFor="dataUploadInput" $isBlue={isBlue} $padding={padding}>
        {iconType === "upload" ? <S.UploadIcon /> : <S.FileIcon />}

        <S.UploadText>파일을 드래그하거나 클릭하여 업로드</S.UploadText>
        <S.UploadDescription>지원 형식: {extensions.join(", ")}</S.UploadDescription>

        {isButton && (
          <S.ButtonWrapper>
            <S.Button $isBlue={false}>파일 선택</S.Button>
            <S.Button $isBlue={true}>API 연결</S.Button>
          </S.ButtonWrapper>
        )}
      </S.DataUploadLabel>
    </>
  );
};
