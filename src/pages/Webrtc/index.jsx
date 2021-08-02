import { useState, useEffect } from 'react';

import { OpenVidu, Session, Publisher } from 'openvidu-browser';
import axios from 'axios';

import Room from '../Room';

import Wrapper from './styles';

const Webrtc = () => {
  const OPENVIDU_SERVER_URL = 'https://localhost:4443';
  const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

  const [OV, setOV] = useState(undefined);
  const [session, setSession] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const username = 'defaultUsername';

  const defaultSessionInfo = {
    sessionId: 'sessionA',
    token: undefined,
  };

  const [sessionInfo, setSessionInfo] = useState(defaultSessionInfo);

  /* constructor */
  useEffect(() => {
    getOvSession();
    // 회원 category에 해당하는 customSessionId init
  }, []);

  const getOvSession = async () => {
    const getOv = () => new OpenVidu();

    const _ov = await getOv();
    const _session = _ov.initSession()
    setOV(_ov)
    setSession(_session);
  };

  /* session(방) 입장 */
  const joinSession = (event) => {
    // category session
    if (sessionInfo.sessionId) {
      getToken().then((token) => {
        setSessionInfo({
          ...sessionInfo,
          token,
          session: true,
        });
        session.connect(token)
          .then(() => {
            connectWebCam();
          });
      });
    }
    event.preventDefault();
  };

  /* webCam 연결 */
  const connectWebCam = () => {
    const publisher = OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: undefined,
      publishAudio: true,
      publishVideo: true,
      resolution: '1920x1080',
      frameRate: 30,
      insertMode: 'APPEND',
    });
    setPublisher(publisher)
    session.publish(publisher)
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
    return createSession(sessionInfo.mySessionId)
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
          console.log('CREATE SSESION', response);
          resolve(response.data.id);
        })
        .catch((response) => {
          const error = Object.assign({}, response);
          if (error.response && error.response.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
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
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  };

  return (
    <Wrapper>
      {sessionInfo.session === undefined && OV !== undefined ? (
        <button onClick={joinSession}>방입장</button>
      ) : (
        <Room publisher={publisher} />
      )}
    </Wrapper>
  );
};

export default Webrtc;
