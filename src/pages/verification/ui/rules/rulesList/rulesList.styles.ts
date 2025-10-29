import styled from "styled-components";

const VerificationRulesItemBackgroundColors = {
  정렬성: "#C8BAFE",
  정밀성: "#FBD4EA",
  완전성: "#AFF5FC",
};

export const VerificationRulesItem = styled.li<{ $category: "정렬성" | "정밀성" | "완전성" }>`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  background-color: ${({ $category }) => VerificationRulesItemBackgroundColors[$category]};
  border-radius: 1rem;
  padding: 1rem 1.5rem;
`;

export const RulesItemHeader = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`;

export const VerificationRulesItemStatus = styled.span<{ $status: "active" | "inactive" }>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
  color: ${({ $status }) => ($status === "active" ? "#116651" : "red")};

  display: flex;
  align-items: center;
  column-gap: 0.2rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;

  background-color: ${({ $status }) => ($status === "active" ? "rgba(17, 104, 81, 0.2)" : "rgba(255, 0, 0, 0.2)")};
  border: 1px solid ${({ $status }) => ($status === "active" ? "rgba(17, 104, 81, 0.4)" : "red")};

  svg {
    font-size: 0.65rem;
  }
`;

export const RulesItemContentUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 0.65rem;
`;

export const RulesItemContentLi = styled.li<{ $isButtonList?: boolean }>`
  display: flex;
  flex-direction: ${({ $isButtonList }) => ($isButtonList ? "row" : "column")};
  row-gap: 0.1rem;
  column-gap: 0.5rem;
`;

export const RulesItemContentLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.gray};
`;

export const RulesItemContentLabelValue = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
`;

export const VerificationRulesItemLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 700;
`;

export const VerificationRulesList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  margin-top: 1.5rem;
`;

export const Button = styled.button<{ $isDelete?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: ${({ $isDelete }) => ($isDelete ? "rgba(255, 0, 0, 0.1)" : "white")};
  border: 1px solid ${({ $isDelete }) => ($isDelete ? "rgba(255, 0, 0, 0.4)" : "white")};
  color: ${({ $isDelete }) => ($isDelete ? "#D93840" : "black")};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
`;
