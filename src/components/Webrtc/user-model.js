class UserModel {
  connectionId;
  audioActive;
  videoActive;
  name;
  streamManager;

  constructor() {
    this.connectionId = '';
    this.audioActive = false;
    this.videoActive = true;
    this.name = '';
    this.streamManager = null;
  }

  isVideoActive() {
    return this.videoActive;
  }

  getConnectionId() {
    return this.connectionId;
  }

  getname() {
    return this.name;
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
  setname(name) {
    this.name = name;
  }
}

export default UserModel;
