import { useState } from "react";
import * as S from "./projectModal.styles";

interface ProjectModalProps {
  onClose: () => void;
}

export const ProjectModal = ({ onClose }: ProjectModalProps) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [dataTypes, setDataTypes] = useState<string[]>([]);

  const handleDataTypeChange = (type: string) => {
    setDataTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleCreate = () => {
    alert("프로젝트가 생성되었습니다!");
    onClose();
  };

  return (
    <S.Modal onClick={(e) => e.target === e.currentTarget && onClose()}>
      <S.ModalContent>
        <S.ModalHeader>
          <S.ModalTitle>새 프로젝트 생성</S.ModalTitle>
        </S.ModalHeader>

        <S.ModalBody>
          <S.FormGroup>
            <S.FormLabel>프로젝트 이름</S.FormLabel>
            <S.FormInput
              type="text"
              placeholder="예: 당뇨병 오믹스 연구"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.FormLabel>프로젝트 설명</S.FormLabel>
            <S.FormTextarea
              rows={3}
              placeholder="프로젝트에 대한 간단한 설명을 입력하세요"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.FormLabel>데이터 타입</S.FormLabel>
            <S.CheckboxGrid>
              {["전사체", "대사체", "단백체", "메틸화"].map((type) => (
                <S.CheckboxLabel key={type}>
                  <input
                    type="checkbox"
                    checked={dataTypes.includes(type)}
                    onChange={() => handleDataTypeChange(type)}
                  />
                  {type}
                </S.CheckboxLabel>
              ))}
            </S.CheckboxGrid>
          </S.FormGroup>
        </S.ModalBody>

        <S.ModalFooter>
          <S.Button $variant="secondary" onClick={onClose}>
            취소
          </S.Button>
          <S.Button onClick={handleCreate}>프로젝트 생성</S.Button>
        </S.ModalFooter>
      </S.ModalContent>
    </S.Modal>
  );
};



