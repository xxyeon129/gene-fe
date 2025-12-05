from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
  mysql_host: str = '127.0.0.1'
  mysql_port: int = 3306
  mysql_user: str = 'root'
  mysql_password: str = 'Mysql1234'
  mysql_db: str = 'data_qc'
  mysql_echo: bool = False
  
  # SSH 연결 타임아웃 (초)
  ssh_timeout: int = 30

  model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")
  
  @property
  def database_url(self):
    return f"mysql+pymysql://{self.mysql_user}:{self.mysql_password}@{self.mysql_host}:{self.mysql_port}/{self.mysql_db}"

settings = Settings()