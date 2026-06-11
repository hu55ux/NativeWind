import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";

export function useNotificationPermission() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    async function requestPermission() {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();

      if (existingStatus === "granted") {
        setGranted(true);
        return;
      }

      const { status } = await Notifications.requestPermissionsAsync();
      setGranted(status === "granted");
    }

    requestPermission();
  }, []);

  return granted;
}
