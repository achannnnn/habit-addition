import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { SettingsProvider } from './contexts/SettingsContext';
import { HabitsProvider } from './contexts/HabitsContext';
import { requestNotificationPermission } from './utils/notificationService';

export default function App() {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <SettingsProvider>
      <HabitsProvider>
        <RouterProvider router={router} />
      </HabitsProvider>
    </SettingsProvider>
  );
}