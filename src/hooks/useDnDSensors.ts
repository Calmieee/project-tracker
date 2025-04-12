import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

export const useDnDSensors = () => {
  return useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3
      }
    })
  );
};