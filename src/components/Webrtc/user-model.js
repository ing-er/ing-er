class UserModel {
  connectionId;
  audioActive;
  videoActive;
  nickname;
  streamManager;

  constructor() {
    this.connectionId = '';
    this.audioActive = false;
    this.videoActive = true;
    this.nickname = '';
    this.streamManager = null;
  }

  isVideoActive() {
    return this.videoActive;
  }

  getConnectionId() {
    return this.connectionId;
  }

  getNickname() {
    return this.nickname;
  }

  getStreamManager() {
    return this.streamManager;
  }
  setVideoActive(isVideoActive) {
    this.videoActive = isVideoActive;
  }
  setStreamManager(streamManager) {
    this.streamManager = streamManager;
  }

  setConnectionId(conecctionId) {
    this.connectionId = conecctionId;
  }
  setNickname(nickname) {
    this.nickname = nickname;
  }
}

export default UserModel;
