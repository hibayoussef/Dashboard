import { useState } from "react";
import { useQuery } from "react-query";
import { _NotificationsApi } from "services/notifications/notifications.service";

export const useNotifications = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const [user, setUser] = useState("");

  const { data, isLoading } = useQuery(
    ["notifications", page, query, user],
    () =>
      _NotificationsApi
        .index({
          page,
          query,
          user,
        })
        .then((res) => res)
  );

  return {
    data,
    isLoading,
    page,
    setPage,
    setQuery,
    setUser,
  };
};
