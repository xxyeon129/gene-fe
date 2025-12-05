import { HiOutlineDownload } from 'react-icons/hi'
import { IoSettingsOutline } from 'react-icons/io5'
import * as S from './header.styles'
import { CommonBlueButton } from '@/shared'

const date = new Date()
const weekdays = ['일', '월', '화', '수', '목', '금', '토']
const weekday = weekdays[date.getDay()]
const formattedDate = `${date.getFullYear()}년 ${String(
  date.getMonth() + 1,
).padStart(2, '0')}월 ${String(date.getDate()).padStart(
  2,
  '0',
)}일 ${weekday}요일`

export const DashboardHeader = () => {
  return (
    <S.Header>
      <S.TextContainer>
        <S.HeaderTitleH1>품질관리 대시보드</S.HeaderTitleH1>
        <S.DateText>{formattedDate}</S.DateText>
      </S.TextContainer>

      <S.ButtonContainer>
        <S.WhiteButton>
          <HiOutlineDownload /> 리포트
        </S.WhiteButton>
        <CommonBlueButton>
          <IoSettingsOutline /> 설정
        </CommonBlueButton>
      </S.ButtonContainer>
    </S.Header>
  )
}
