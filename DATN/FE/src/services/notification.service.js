import mainRequest from '@/api/mainRequest';

export const getNotifications = async (userId) => {
  const response = await mainRequest.get(`/api/notifications/user/${userId}`);
  return response.data;
};

export const getUnreadNotificationCount = async (userId) => {
  const response = await mainRequest.get(`/api/notifications/user/${userId}/unread-count`);
  return response.data;
};

export const markAllNotificationsAsRead = async (userId) => {
  await mainRequest.post(`/api/notifications/user/${userId}/mark-all-read`);
}; 