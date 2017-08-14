/* @flow */

import { createAction } from 'redux-actions'
import canvas from './../../api/canvas-api'

export type UserProfileActionProps = {
  +refreshUsers: () => Promise<User[]>,
}

export let UserProfileActions: (typeof canvas) => UserProfileActionProps = (api) => ({
  refreshUsers: createAction('user-profiles.refresh', (userIDs: string[]) => {
    const promises = userIDs.map((userID) => {
      return api.getUserProfile(userID)
    })

    return {
      promise: Promise.all(promises),
      userIDs,
      handlesError: true,
    }
  }),
})

export default (UserProfileActions(canvas): UserProfileActionProps)
