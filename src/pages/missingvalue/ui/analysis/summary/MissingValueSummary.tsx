import { MISSING_VALUE_PAGE_SUMMARY_LIST } from "@/pages/missingvalue/consts";
import * as S from "./summary.styles";

export const MissingValueSummary = () => {
  return (
    <S.SummaryContainer>
        {MISSING_VALUE_PAGE_SUMMARY_LIST.map((summary) => (
          <S.SummaryItem key={summary.type} $type={summary.type}>
            <S.SummaryItemTitle $type={summary.type}>{summary.title}</S.SummaryItemTitle>
            <S.SummaryItemValue $type={summary.type}>
              {summary.value.toLocaleString()}{summary.type === "all" ? "%" : ""}
            </S.SummaryItemValue>
            <S.SummaryItemDescription $type={summary.type}>{summary.description}</S.SummaryItemDescription>
          </S.SummaryItem>
        ))}
      </S.SummaryContainer>
  );
};