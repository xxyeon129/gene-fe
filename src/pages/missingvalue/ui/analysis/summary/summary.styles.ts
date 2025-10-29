import styled from "styled-components";

export const SummaryContainer = styled.article`
  display: flex;
  column-gap: 1rem;
`;

const summaryColorMap = {
  backgroundColor: {
    all: "#FED3D3",
    sample: "#FEF1BA",
    gene: "#FED09D",
  },
  borderColor: {
    all: "#FCA5A5",
    sample: "#FCD44F",
    gene: "#FB933C",
  },
  textColor: {
    all: "#DC2625",
    sample: "#B4540A",
    gene: "#BF3A05",
  },
};

export const SummaryItem = styled.section<{ $type: "all" | "sample" | "gene" }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ $type }) => summaryColorMap.backgroundColor[$type]};
  border: 2px solid ${({ $type }) => summaryColorMap.borderColor[$type]};
  color: ${({ $type }) => summaryColorMap.textColor[$type]};

`;

export const SummaryItemTitle = styled.p<{$type: "all" | "sample" | "gene"}>`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 800;
  color: #75240A;
`;

export const SummaryItemValue = styled.p<{$type: "all" | "sample" | "gene"}>`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: 700;
  color: ${({ $type }) => summaryColorMap.textColor[$type]};
`;

export const SummaryItemDescription = styled.p<{$type: "all" | "sample" | "gene"}>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  color: ${({ $type }) => summaryColorMap.textColor[$type]};
`;