import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { SettingsProvider } from './contexts/SettingsContext';
import { HabitsProvider, useHabits } from './contexts/HabitsContext';
import { requestNotificationPermission } from './utils/notificationService';
import { AchievementMilestoneModal } from './components/AchievementMilestoneModal';
import {
  getReachedHabitAchievements,
  getPendingHabitAchievements,
  markAchievementAsSeen,
  type HabitAchievementMilestone,
} from './utils/achievementMilestones';

function AppShell() {
  const { habits, recordAchievementMilestones } = useHabits();
  const [pendingAchievements, setPendingAchievements] = useState<HabitAchievementMilestone[]>([]);

  const enqueuePendingAchievements = () => {
    const nextPendingAchievements = getPendingHabitAchievements(habits);

    setPendingAchievements((currentAchievements) => {
      if (nextPendingAchievements.length === 0) {
        return currentAchievements;
      }

      const existingKeys = new Set(currentAchievements.map((achievement) => achievement.achievementKey));
      const mergedAchievements = [...currentAchievements];

      for (const achievement of nextPendingAchievements) {
        if (!existingKeys.has(achievement.achievementKey)) {
          mergedAchievements.push(achievement);
          existingKeys.add(achievement.achievementKey);
        }
      }

      mergedAchievements.sort((left, right) => {
        const timeDiff = new Date(left.reachedAt).getTime() - new Date(right.reachedAt).getTime();
        if (timeDiff !== 0) return timeDiff;
        return left.days - right.days;
      });

      return mergedAchievements;
    });
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    recordAchievementMilestones(getReachedHabitAchievements(habits));
    enqueuePendingAchievements();
  }, [habits]);

  useEffect(() => {
    const handleAppActive = () => {
      if (document.visibilityState === 'visible') {
        enqueuePendingAchievements();
      }
    };

    window.addEventListener('focus', handleAppActive);
    document.addEventListener('visibilitychange', handleAppActive);

    return () => {
      window.removeEventListener('focus', handleAppActive);
      document.removeEventListener('visibilitychange', handleAppActive);
    };
  }, [habits]);

  const handleCloseAchievementModal = () => {
    if (pendingAchievements.length === 0) return;

    recordAchievementMilestones(pendingAchievements);

    for (const achievement of pendingAchievements) {
      markAchievementAsSeen(achievement.achievementKey);
    }

    setPendingAchievements([]);
  };

  return (
    <>
      <RouterProvider router={router} />
      {pendingAchievements.length > 0 && (
        <AchievementMilestoneModal
          achievements={pendingAchievements}
          onClose={handleCloseAchievementModal}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <HabitsProvider>
        <AppShell />
      </HabitsProvider>
    </SettingsProvider>
  );
}