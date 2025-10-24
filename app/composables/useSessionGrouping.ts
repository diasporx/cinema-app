import { computed, type Ref } from 'vue';
import { formatDate } from '@/composables/useUtils';
import type { Movie } from '@core/domain/movie/types';
import type { Cinema } from '@core/domain/cinema/types';

export type SessionType = {
  id: number;
  movieId: string | number;
  cinemaId: string | number;
  startTime: string;
};

export const useGroupedSessions = <T extends SessionType>(
  sessionsRef: Ref<T[]>,
  groupByKey: 'movieId' | 'cinemaId',
) => {
  return computed(() => {
    const sessions = sessionsRef.value;
    const grouped: Record<string, Record<number, T[]>> = {};
    sessions.forEach(session => {
      const dateKey = formatDate(session.startTime, 'DD.MM');
      const groupKey = Number(session[groupByKey]);
      if (!grouped[dateKey]) {
        grouped[dateKey] = {};
      }
      if (!grouped[dateKey][groupKey]) {
        grouped[dateKey][groupKey] = [];
      }
      grouped[dateKey][groupKey].push(session);
    });
    return grouped;
  });
};

export const useEntityName = (entitiesRef: Ref<Movie[] | Cinema[]>) => {
  return (entityId: number | string): string => {
    const entities = entitiesRef.value;
    const id = Number(entityId);
    const entity = entities.find(e => e.id === id);
    if (!entity) {
      return '';
    }
    return 'title' in entity ? entity.title : entity.name;
  };
};
