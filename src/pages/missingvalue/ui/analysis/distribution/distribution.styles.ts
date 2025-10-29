import styled from "styled-components";

export const DistributionContainer = styled.article`
  display: flex;
  flex-direction: column;
  column-gap: 1rem;
  margin-top: 1rem;
`;

export const H2 = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 700;
  margin-bottom: 1rem;
`;

export const DistributionList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

const distributionColorMap = {
  backgroundColor: {
    "0-10%": "#D1FAE5",
    "10-20%": "#FEF3C7",
    "20-30%": "#FED7AA",
    "30-50%": "#FECACA",
    "50%+": "#FCA5A5",
  },
};

export const DistributionItem = styled.li<{ $range: "0-10%" | "10-20%" | "20-30%" | "30-50%" | "50%+" }>`
  flex: 1;
  display: flex;
  row-gap: 0.5rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ $range }) => distributionColorMap.backgroundColor[$range]};
`;

export const DistributionItemRange = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 800;
  width: 8rem;
  display: flex;
  align-items: center;
`;

export const StatusDistributionContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  width: 100%;
`;

export const DistributionItemValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

export const DistributionItemValueWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const StatusBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 0.5rem;
`;

export const StatusBarFill = styled.div<{ $fillPercentage: number }>`
  height: 100%;
  background-color: #324054;
  width: ${({ $fillPercentage }) => `${$fillPercentage}%`};
  border-radius: 0.5rem;
`;

export const DistributionItemValue = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 800;
`;

