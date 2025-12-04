from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
  mysql_host: str = '127.0.0.1'
  mysql_port: int = 3306
  mysql_user: str = 'root'
  mysql_password: str = 'Mysql1234'
  mysql_db: str = 'data_qc'
  mysql_echo: bool = False

  # ML Model Server SSH 설정
  ml_server_jump_host: str = '210.102.178.234'
  ml_server_jump_port: int = 22
  ml_server_jump_user: str = 'humandeep'
  ml_server_jump_password: str = 'humandeep1234'
  
  ml_server_final_host: str = '192.9.203.83'
  ml_server_final_user: str = 'humandeep'
  ml_server_final_password: str = 'humandeep1234'
  
  # ML 모델 경로
  ml_model_path: str = '/home/humandeep/nmf'
  
  # SSH 연결 타임아웃 (초)
  ssh_timeout: int = 30

  model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")
  
  @property
  def database_url(self):
    return f"mysql+pymysql://{self.mysql_user}:{self.mysql_password}@{self.mysql_host}:{self.mysql_port}/{self.mysql_db}"

settings = Settings()