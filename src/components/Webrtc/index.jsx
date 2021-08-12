import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';

import StudyTimeContainer from '../../containers/StudyTimeContainer';
import Room from '../../pages/Room';

import { setStudyTime } from '../../api/timer/timer';
import Wrapper from './styles';

const Webrtc = () => {
  const OPENVIDU_SERVER_URL = process.env.REACT_APP_OPENVIDU_URL;
  const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

  const userData = useSelector((state) => state.authorization.userData)
  const localStudyTime = useSelector((state) => state.studyTime.studyTime)

  const [flag, setFlag] = useState(false);
  const [OV, setOV] = useState(undefined);
  const [mySessionId, setMysessionId] = useState('SessionT');
  const [session, setSession] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [isLocalVideoActive, setIsLocalVideoActive] = useState(true);
  const [currentUserData, setCurrentUserData] = useState(undefined);

  /* constructor hook */
  useEffect(() => {
    // 사용자가 화면을 떠날 때 leave session
    window.addEventListener('beforeunload', onbeforeunload);

    // init OV
    setOV(new OpenVidu());

    return () => {
      // component unmount 시 해당 이벤트 제거
      window.removeEventListener('beforeunload', onbeforeunload);
    };
  }, []);

  const onbeforeunload = (event) => {
    leaveSession(true);
  };

  /* to init session */
  useEffect(() => {
    if (!OV) return;
    setSession(OV.initSession());
  }, [OV]);

  /* session hook */
  useEffect(() => {
    if (!session) return;
    // join Session
    if (!flag) {
      joinSession();

      // on every stream received or destroyed
      subscribeToStreamCreated();
      subscribeToStreamDestroyed();
      onException();
      subscribeToUserChanged();
    }
  }, [session]);

  /* join session(방 입장) */
  const joinSession = () => {
    let mySession = session;

    getToken().then((token) => {
      mySession
        .connect(token, { clientData: userData })
        .then(() => {
          let _publisher = OV.initPublisher('', {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: false,
            publishVideo: true,
            resolution: '1920x1080',
            frameRate: 30,
            insertMode: 'APPEND',
            mirror: false,
          });

          session.publish(_publisher);
          setPublisher(_publisher);
          setFlag(true);
        })
        .catch((err) => {
          console.log(
            'There was an error connecting to the session:',
            err.code,
            err.message,
          );
        });
    });
  };

  // update streamer
  const updateStreamer = (streamer) => {
    let subs = subscribers;
    subs.push(streamer);
    setSubscribers([...subs]);
  };

  // ON EVERY new subscriber's stream received
  const subscribeToStreamCreated = () => {
    session.on('streamCreated', (event) => {
      let sub = session.subscribe(event.stream, '');

      updateStreamer(sub);
    });
  };

  // ON EVERY new subscriber' stream destroyed
  const subscribeToStreamDestroyed = () => {
    session.on('streamDestroyed', (event) => {
      // remove the stream from subscriber array
      deleteSubscriber(event.stream.streamManager);
    });
  };

  // delete remote subscriber
  const deleteSubscriber = (streamManager) => {
    let subs = subscribers;
    let idx = subs.indexOf(streamManager, 0);
    if (idx > -1) {
      subs.splice(idx, 1);
      setSubscribers([...subs]);
    }
  };

  // ON EVERY exception
  const onException = () => {
    session.on('exception', (exception) => {
      console.warn(exception);
    });
  };

  /* leave session */
  const leaveSession = (isOnbeforeunload) => {
    const mySession = session;

    if (mySession && flag) {
      mySession.disconnect();
      
      // 공부한 시간 db 저장
      if(!isOnbeforeunload) {
        setStudyTime(userData.id, localStudyTime)
      }
      
    }

    // empty all properties
    initStates();
  };

  /* initParams */
  const initStates = () => {
    setOV(undefined);
    setSession(undefined);
    setPublisher(undefined);
    setMysessionId('SessionO');
    setSubscribers([]);
    setIsLocalVideoActive(false);
    setFlag(false);
  };

  /* handle video mute or unmute */
  const handleVideoMute = () => {
    publisher.publishVideo(!isLocalVideoActive);
    setIsLocalVideoActive(!isLocalVideoActive);
  };

  /* user 상태 변경 */
  const subscribeToUserChanged = () => {
    session.on('streamPropertyChanged', (e) => {
      let remoteUsers = subscribers;
      setSubscribers([...remoteUsers]);
    });
  };

  /* 유저 비디오 클릭 */
  const handleVideoClick = (e) => {
    const _currentUserData = e.target.dataset.userdata;
    setCurrentUserData(JSON.parse(_currentUserData));
  }

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
    return createSession(mySessionId)
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
      const data = {};
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
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  };

  return (
    <Wrapper>
      {!flag ? (
        null
      ) : (
        <StudyTimeContainer>
          <Room
            publisher={publisher}
            subscribers={subscribers}
            leaveSession={leaveSession}
            handleVideoMute={handleVideoMute}
            isLocalVideoActive={isLocalVideoActive}
            currentUserData={currentUserData}
            handleVideoClick={handleVideoClick}
          />
        </StudyTimeContainer>
      )}
    </Wrapper>
  );
};

export default Webrtc;
