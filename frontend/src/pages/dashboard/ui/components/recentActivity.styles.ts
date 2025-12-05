import styled from "styled-components";

export const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

export const TableTh = styled.th`
  background: #f9fafb;
  padding: 12px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
`;

export const TableHeader = styled.thead`
  th {
    background: #f9fafb;
    padding: 12px;
    text-align: left;
    font-size: 13px;
    font-weight: 600;
    color: #374151;
    border-bottom: 1px solid #e5e7eb;
  }
`;

export const TableBody = styled.tbody`
  tr {
    &:hover {
      background: #f9fafb;
    }
  }

  td {
    padding: 12px;
    font-size: 14px;
    color: #1f2937;
    border-bottom: 1px solid #f3f4f6;
  }
`;

export const QualityScore = styled.span<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-weight: 600;
`;

export const StatusBadge = styled.span<{ $bg: string; $color: string }>`
  padding: 4px 8px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  border-radius: 4px;
  font-size: 12px;
`;
