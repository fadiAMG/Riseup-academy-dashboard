import React, { useState } from 'react';
import { EpisodesView } from './episodes.view';
import { Actions } from './components/actions';
import { fetchEpisodes } from '../../store/selectors/selectors';
import { useRecoilValueLoadable } from 'recoil';
import ViewEpisodes from './components/ViewEpisodes';

const Episodes = () => {
  const data = useRecoilValueLoadable(fetchEpisodes);
  const [drawer, setDrawer] = useState(false);

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
        <Actions showDrawer={() => setDrawer(true)} record={record} />
      ),
    },
  ];
  return (
    <>
      <EpisodesView data={data} columns={columns} />
      <ViewEpisodes drawer={drawer} onClose={() => setDrawer(false)} />
    </>
  );
};
export default Episodes;
