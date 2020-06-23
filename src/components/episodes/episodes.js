import React, { useState } from 'react';
import { useRecoilValueLoadable } from 'recoil';

import { EpisodesView } from './episodes.view';
import { Actions, ViewEpisodes, CreatePolls } from './components';
import { fetchEpisodes } from '../../store/selectors/selectors';

const Episodes = () => {
  const data = useRecoilValueLoadable(fetchEpisodes);
  const [drawer, setDrawer] = useState(false);
  const [pollDrawer, setPollDrawer] = useState(false);
  const columns = [
    { title: 'Name', dataIndex: 'name' },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    { title: 'Duration', dataIndex: 'meetingDuration' },
    { title: 'Meeting ID', dataIndex: 'meetingId' },
    {
      title: 'Action',
      key: 'operation',
      render: (record) => (
        <Actions
          showPollDrawer={() => setPollDrawer(true)}
          showDrawer={() => setDrawer(true)}
          record={record}
        />
      ),
    },
  ];
  return (
    <>
      <EpisodesView data={data} columns={columns} />
      <ViewEpisodes drawer={drawer} onClose={() => setDrawer(false)} />
      <CreatePolls drawer={pollDrawer} onClose={() => setPollDrawer(false)} />
    </>
  );
};
export default Episodes;
