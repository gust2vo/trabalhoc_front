import React, { useEffect, useState } from 'react';

interface VisitCounterProps {
  visitCount: number;
}

const VisitCounter: React.FC<VisitCounterProps> = ({ visitCount }) => {
  // State local para o contador de visitas
  const [localVisitCount, setLocalVisitCount] = useState<number>(visitCount);

  useEffect(() => {

    setLocalVisitCount(visitCount);
  }, [visitCount]);

  useEffect(() => {

    localStorage.setItem('visitCount', localVisitCount.toString());
  }, [localVisitCount]);

  return (
    <div className="visit-counter">
      <h1>Visitas: {localVisitCount}</h1>
    </div>
  );
};

export default VisitCounter;
