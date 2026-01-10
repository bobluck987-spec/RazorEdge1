import React from 'react';
import { usePickContext } from '../context/PickContext';
import PickCard from '../components/PickCard';

export default function Picks() {
  const { picks, loading } = usePickContext();

  if (loading) return <p>Loading picks...</p>;
  if (!picks.length) return <p>No picks available</p>;

  return (
    <div>
      {picks.map((pick) => (
        <PickCard key={pick.id} pick={pick} />
      ))}
    </div>
  );
}
