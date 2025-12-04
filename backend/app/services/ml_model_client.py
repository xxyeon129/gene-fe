"""
ML Model Client Service
SSH를 통해 원격 서버의 ML 모델에 접근하는 클라이언트
"""

import paramiko
import logging
import json
import os
from typing import Dict, Any, Optional
from pathlib import Path
from app.core.config import settings

logger = logging.getLogger(__name__)


class MLModelClient:
    """원격 ML 모델 서버에 SSH로 접근하는 클라이언트"""
    
    def __init__(self):
        self.jump_host = settings.ml_server_jump_host
        self.jump_port = settings.ml_server_jump_port
        self.jump_user = settings.ml_server_jump_user
        self.jump_password = settings.ml_server_jump_password
        
        self.final_host = settings.ml_server_final_host
        self.final_user = settings.ml_server_final_user
        self.final_password = settings.ml_server_final_password
        
        self.model_path = settings.ml_model_path
        self.timeout = settings.ssh_timeout
    
    def _create_ssh_client(self) -> paramiko.SSHClient:
        """SSH 클라이언트 생성 및 설정"""
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        return ssh
    
    def _connect_via_jump_server(self) -> paramiko.SSHClient:
        """
        Jump server를 통해 최종 서버에 접속
        
        ProxyJump 방식으로 접속
        """
        try:
            # Jump server에 먼저 접속
            jump_ssh = self._create_ssh_client()
            logger.info(f"Connecting to jump server: {self.jump_host}")
            jump_ssh.connect(
                hostname=self.jump_host,
                port=self.jump_port,
                username=self.jump_user,
                password=self.jump_password,
                timeout=self.timeout
            )
            
            # Jump server를 통해 최종 서버에 접속
            # ProxyCommand를 사용하여 터널 생성
            transport = jump_ssh.get_transport()
            dest_addr = (self.final_host, 22)
            local_addr = (self.jump_host, 22)
            channel = transport.open_channel("direct-tcpip", dest_addr, local_addr)
            
            # 최종 서버에 접속
            final_ssh = self._create_ssh_client()
            logger.info(f"Connecting to final server via jump: {self.final_host}")
            final_ssh.connect(
                hostname=self.final_host,
                username=self.final_user,
                password=self.final_password,
                sock=channel,
                timeout=self.timeout,
                look_for_keys=False,
                allow_agent=False
            )
            
            return final_ssh
            
        except Exception as e:
            logger.error(f"Failed to connect via jump server: {str(e)}")
            raise
    
    def _connect_direct(self) -> paramiko.SSHClient:
        """
        최종 서버에 직접 접속 (테스트용)
        Jump server 없이 직접 접속이 가능한 경우 사용
        """
        try:
            ssh = self._create_ssh_client()
            logger.info(f"Connecting directly to: {self.final_host}")
            ssh.connect(
                hostname=self.final_host,
                username=self.final_user,
                password=self.final_password,
                timeout=self.timeout
            )
            return ssh
        except Exception as e:
            logger.error(f"Failed to connect directly: {str(e)}")
            raise
    
    def check_connection(self) -> bool:
        """서버 연결 테스트"""
        try:
            ssh = self._connect_via_jump_server()
            ssh.close()
            logger.info("Successfully connected to ML model server")
            return True
        except Exception as e:
            logger.error(f"Connection test failed: {str(e)}")
            return False
    
    def list_models(self) -> list:
        """원격 서버의 모델 목록 조회"""
        ssh = None
        try:
            ssh = self._connect_via_jump_server()
            
            # 모델 디렉토리 목록 조회
            stdin, stdout, stderr = ssh.exec_command(f"ls -la {self.model_path}")
            exit_status = stdout.channel.recv_exit_status()
            
            if exit_status != 0:
                error = stderr.read().decode()
                logger.error(f"Failed to list models: {error}")
                return []
            
            output = stdout.read().decode()
            files = []
            for line in output.split('\n'):
                if line.strip() and not line.startswith('total'):
                    parts = line.split()
                    if len(parts) >= 9:
                        files.append({
                            'permissions': parts[0],
                            'name': parts[-1],
                            'path': f"{self.model_path}/{parts[-1]}"
                        })
            
            return files
            
        except Exception as e:
            logger.error(f"Failed to list models: {str(e)}")
            return []
        finally:
            if ssh:
                ssh.close()
    
    def execute_model(
        self,
        model_name: str,
        input_data: Dict[str, Any],
        input_file_path: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        원격 서버에서 ML 모델 실행
        
        Args:
            model_name: 실행할 모델 이름
            input_data: 입력 데이터 (딕셔너리)
            input_file_path: 입력 파일 경로 (선택사항)
        
        Returns:
            모델 실행 결과
        """
        ssh = None
        try:
            ssh = self._connect_via_jump_server()
            
            # 입력 데이터를 JSON 파일로 생성하여 전송
            if input_file_path:
                # 로컬 파일을 원격 서버로 전송
                sftp = ssh.open_sftp()
                remote_input_path = f"/tmp/input_{model_name}.json"
                local_file = open(input_file_path, 'r')
                sftp.putfo(local_file, remote_input_path)
                local_file.close()
                sftp.close()
            else:
                # 데이터를 직접 전송
                remote_input_path = f"/tmp/input_{model_name}.json"
                sftp = ssh.open_sftp()
                remote_file = sftp.file(remote_input_path, 'w')
                remote_file.write(json.dumps(input_data))
                remote_file.close()
                sftp.close()
            
            # 모델 실행 명령어 (실제 모델에 맞게 수정 필요)
            model_script = f"{self.model_path}/{model_name}"
            command = f"cd {self.model_path} && python {model_script} --input {remote_input_path}"
            
            logger.info(f"Executing model: {command}")
            stdin, stdout, stderr = ssh.exec_command(command)
            
            # 결과 대기
            exit_status = stdout.channel.recv_exit_status()
            output = stdout.read().decode()
            error = stderr.read().decode()
            
            if exit_status != 0:
                logger.error(f"Model execution failed: {error}")
                raise Exception(f"Model execution failed: {error}")
            
            # 결과 파일 읽기 (모델이 결과 파일을 생성하는 경우)
            result_path = f"/tmp/output_{model_name}.json"
            try:
                sftp = ssh.open_sftp()
                remote_result = sftp.file(result_path, 'r')
                result_data = json.loads(remote_result.read().decode())
                remote_result.close()
                sftp.close()
                
                # 임시 파일 정리
                ssh.exec_command(f"rm -f {remote_input_path} {result_path}")
                
                return result_data
            except FileNotFoundError:
                # 결과 파일이 없으면 stdout 출력을 파싱
                try:
                    return json.loads(output)
                except json.JSONDecodeError:
                    return {"output": output, "status": "success"}
            
        except Exception as e:
            logger.error(f"Failed to execute model: {str(e)}")
            raise
        finally:
            if ssh:
                ssh.close()
    
    def upload_file(self, local_path: str, remote_path: str) -> bool:
        """로컬 파일을 원격 서버로 업로드"""
        ssh = None
        try:
            ssh = self._connect_via_jump_server()
            sftp = ssh.open_sftp()
            sftp.put(local_path, remote_path)
            sftp.close()
            logger.info(f"File uploaded: {local_path} -> {remote_path}")
            return True
        except Exception as e:
            logger.error(f"Failed to upload file: {str(e)}")
            return False
        finally:
            if ssh:
                ssh.close()
    
    def download_file(self, remote_path: str, local_path: str) -> bool:
        """원격 서버에서 파일 다운로드"""
        ssh = None
        try:
            ssh = self._connect_via_jump_server()
            sftp = ssh.open_sftp()
            sftp.get(remote_path, local_path)
            sftp.close()
            logger.info(f"File downloaded: {remote_path} -> {local_path}")
            return True
        except Exception as e:
            logger.error(f"Failed to download file: {str(e)}")
            return False
        finally:
            if ssh:
                ssh.close()

