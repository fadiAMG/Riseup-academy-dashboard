import React from 'react';
import { Drawer, Button, Descriptions, Space } from 'antd';
import { useRecoilValue } from 'recoil';
import { drawerState } from '../../../store/atoms/atoms';
import { api, urls, showNotification } from '../../../helpers';

const ViewEpisodes = ({ drawer, onClose }) => {
  const drawerData = useRecoilValue(drawerState);

  const {
    name,
    _id,
    description,
    image,
    createdAt,
    meetingDuration,
    meetingId,
    meetingPassword,
    meetingStartTime,
    meetingStartUrl,
    updatedAt,
    pollId,
  } = drawerData;
  const triggerPoll = (pollId) => {
    api
      .postData(`${urls.triggerPoll}/${pollId}/${_id}`, {}, 'POST')
      .then((res) => {
        showNotification('success', 'Success', res.data.message);
        onClose();
      })
      .catch(() =>
        showNotification(
          'error',
          "Couldn't Start Poll",
          'Something went wrong. Internal Server Error'
        )
      );
  };
  return (
    <>
      {drawerData && (
        <Drawer
          title={name}
          width={720}
          onClose={onClose}
          visible={drawer}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
            </div>
          }
        >
          <Descriptions title="Episode Info" layout="vertical" bordered>
            <Descriptions.Item label="Episode ID" span={3}>
              {_id}
            </Descriptions.Item>
            <Descriptions.Item label="Description" span={3}>
              {description}
            </Descriptions.Item>
            <Descriptions.Item label="Thumbnail" span={3}>
              <img src={image} width="500px" alt="" />
            </Descriptions.Item>
            <Descriptions.Item label="Duration">
              {meetingDuration}
            </Descriptions.Item>
            <Descriptions.Item label="Meeting ID">
              {meetingId}
            </Descriptions.Item>
            <Descriptions.Item label="Password">
              {meetingPassword}
            </Descriptions.Item>
            <Descriptions.Item label="Meeting Start Time" span={3}>
              {meetingStartTime}
            </Descriptions.Item>
            <Descriptions.Item label="Action" span={3}>
              <Button onClick={() => (window.location.href = meetingStartUrl)}>
                Start Meeting
              </Button>
            </Descriptions.Item>
            {pollId &&
              pollId.map((poll) => (
                <Descriptions.Item label={`Poll ID: ${poll}`} span={3}>
                  <Space size="large">
                    <Button onClick={() => triggerPoll(poll)}>Start</Button>
                    <Button
                      onClick={() =>
                        window.open(`https://strawpoll.com/${poll}/r`, '_blank')
                      }
                    >
                      View Results
                    </Button>
                  </Space>
                </Descriptions.Item>
              ))}
            <Descriptions.Item label="Created At" span={3}>
              {createdAt}
            </Descriptions.Item>
            <Descriptions.Item label="Updated At" span={3}>
              {updatedAt}
            </Descriptions.Item>
          </Descriptions>
          ,
        </Drawer>
      )}
    </>
  );
};
export default ViewEpisodes;
