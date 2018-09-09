/* eslint-disable import/prefer-default-export */

import { createAction } from 'redux-act';

export const updateNotificationsRequested = createAction('UPDATE_NOTIFICATIONS_REQUESTED');
export const updateNotificationsSucceeded = createAction('UPDATE_NOTIFICATIONS_SUCCEEDED');
export const updateNotificationsFailed = createAction('UPDATE_NOTIFICATIONS_FAILED');
