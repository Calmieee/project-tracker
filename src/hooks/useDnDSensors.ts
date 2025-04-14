import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

export const useDnDSensors = () =>
  useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3
      }
    })
  );
