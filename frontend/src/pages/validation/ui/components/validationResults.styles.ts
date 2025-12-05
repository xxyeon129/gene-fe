import styled from "styled-components";

export const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;

  th {
    background: #f9fafb;
    padding: 12px;
    text-align: left;
    font-size: 13px;
    font-weight: 600;
    color: #374151;
    border-bottom: 1px solid #e5e7eb;
  }

  td {
    padding: 12px;
    font-size: 14px;
    color: #1f2937;
    border-bottom: 1px solid #f3f4f6;
  }

  tr:hover {
    background: #f9fafb;
  }
`;

export const Status = styled.span<{ $color: string }>`
  color: ${({ $color }) => $color};
`;



