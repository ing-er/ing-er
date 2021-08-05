import { useState, useEffect } from 'react';

import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';

import Room from '../../pages/Room';

import UserModel from './user-model';

import Wrapper from './styles';

const Webrtc = () => {
  const OPENVIDU_SERVER_URL = 'https://localhost:4443';
  const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

  const [flag, setFlag] = useState('init');
  const [sessionId, setSessionId] = useState('defaultSession');
  const [OV, setOV] = useState(undefined);
  const [session, setSession] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [user, setUser] = useState(new UserModel());

  /* constructor hook */
  useEffect(() => {
    // 사용자가 화면을 떠날 때 leave session
    window.addEventListener('beforeunload', onbeforeunload);

    return () => {
      // component unmount 시 해당 이벤트 제거
      window.removeEventListener('beforeunload', onbeforeunload);
    };
  }, []);

  /* session hook */
  useEffect(() => {
    if (!session) return;

    // on every stream received or destroyed
    subscribeToStreamCreated();
    subscribeToStreamDestroyed();
    subscribeToUserChanged();
  }, [session]);

  /* flag hook */
  useEffect(() => {
    if (flag === 'init') {
      getOvSession().then((payload) => {
        joinSession(payload);
      });
    } else if (flag) {
      joinSession([OV, session]);
    }
  }, [flag]);

  // init OV, session
  const getOv = () => new OpenVidu();
  const getOvSession = async () => {
    const _ov = await getOv();
    const _session = await _ov.initSession();
    setOV(_ov);
    setSession(_session);

    return [_ov, _session];
  };

  /* join session(방 입장) */
  const joinSession = (payload) => {
    // connect to Session
    connectToSession(payload);

    // prevent default event
    // event.preventDefault();
  };

  // connect to session
  const connectToSession = (payload) => {
    getToken().then((token) => {
      payload[1]
        .connect(token, { clientData: user })
        .then(() => {
          connectWebCam(payload);
        })
        .catch((err) => {
          // console.log('There was an error while connecting.');
          // console.log(err);
        });
    });
  };

  // webCam 연결
  const connectWebCam = (payload) => {
    let publisher = payload[0].initPublisher(undefined, {
      audioSource: undefined,
      videoSource: undefined,
      publishAudio: false,
      publishVideo: user.isVideoActive(),
      resolution: '1920x1080',
      frameRate: 30,
      insertMode: 'APPEND',
    });

    // session publish then update Subscribers
    payload[1].publish(publisher);

    // set connectionId, streamManager
    user.setConnectionId(payload[1].connection.connectionId);
    user.setStreamManager(publisher);

    // add subs
    let newSubs = subscribers;
    newSubs.push(user);
    setSubscribers([...newSubs]);

    // flag local user in session
    setFlag(true);
  };

  // ON EVERY new subscriber's stream received
  const subscribeToStreamCreated = () => {
    session.on('streamCreated', (event) => {
      const sub = session.subscribe(event.stream, undefined);

      const newUser = new UserModel();
      newUser.setStreamManager(sub);
      newUser.setConnectionId(event.stream.connection.connectionId);

      // const newUserNickname = event.stream.connection.data.split('%')[0];
      // newUser.setNickname(JSON.parse(newUserNickname).clientData);

      let newSubs = subscribers;
      newSubs.push(newUser);
      setSubscribers([...newSubs]);
    });
  };

  // ON EVERY new subscribers' stream destroyed
  const subscribeToStreamDestroyed = () => {
    session.on('streamDestroyed', (e) => {
      // remove the stream from subscribers array
      deleteSubscriber(e.stream);
      e.preventDefault();
    });
  };

  // delete remote subscriber
  const deleteSubscriber = (stream) => {
    let remoteUsers = subscribers;
    let userStream = remoteUsers.filter(
      (user) => user.getStreamManager().stream === stream,
    )[0];
    let idx = remoteUsers.indexOf(userStream, 0);
    if (idx > -1) {
      remoteUsers.splice(idx, 1);
      setSubscribers([...remoteUsers]);
    }
  };

  const onbeforeunload = (event) => {
    this.leaveSession();
  };

  /* leave session */
  const leaveSession = () => {
    const mySession = session;

    if (mySession) {
      mySession.disconnect();
    }

    // empty all properties
    getOvSession();
    setSubscribers([]);
    setUser(new UserModel());
    setFlag(undefined);
  };

  /* handle video mute or unmute */
  const handleVideoMute = () => {
    user.streamManager.publishVideo(!user.isVideoActive())
    user.setVideoActive(!user.isVideoActive())
  };

  /* user 상태 변경 */
  const subscribeToUserChanged = () => {
    session.on('StreamPropertyChanged', (e) => {
      console.log('stream property changed!!!!!!!!!!!!!');
      // let remoteUsers = subscribers;
      // remoteUsers.forEach((user) => {
      //   if (user.getConnectionId() === e.from.connectionId) {
      //     const data = JSON.parse(e.data);

      //     if (data.isVideoActive !== undefined) {
      //       user.setVideoActive(data.isVideoActive);
      //     }
      //   }
      // });
      // setSubscribers([...remoteUsers]);
    });
  };

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behaviour MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
   *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
   *   3) The Connection.token must be consumed in Session.connect() method
   */

  const getToken = () => {
    return createSession(sessionId)
      .then((sessionId) => createToken(sessionId))
      .catch((Err) => console.error(Err));
  };

  const createSession = (sessionId) => {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          // console.log('CREATE SSESION', response);
          resolve(response.data.id);
        })
        .catch((response) => {
          const error = Object.assign({}, response);
          if (error.response && error.response.status === 409) {
            resolve(sessionId);
          } else {
            // console.log(error);
            console.warn(
              'No connection to OpenVidu Server. This may be a certificate error at ' +
                OPENVIDU_SERVER_URL,
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"',
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + '/accept-certificate',
              );
            }
          }
        });
    });
  };

  const createToken = (sessionId) => {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({});
      axios
        .post(
          OPENVIDU_SERVER_URL +
            '/openvidu/api/sessions/' +
            sessionId +
            '/connection',
          data,
          {
            headers: {
              Authorization:
                'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          // // console.log('TOKEN', response);
          // console.log('/sessions/sessionId/connection 결과');
          // console.log(response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  };

  return (
    <Wrapper>
      {!flag ? null : (
        <Room 
          subscribers={subscribers}
          leaveSession={leaveSession}
          handleVideoMute={handleVideoMute}
        />
      )}
    </Wrapper>
  );
};

export default Webrtc;
