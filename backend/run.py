"""
Backend server runner script
"""

import uvicorn

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8005,
        reload=True,  # 개발 모드: 코드 변경 시 자동 리로드
        log_level="info"
    )

