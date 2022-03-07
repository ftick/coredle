import { DEBUG_ENABLED } from '../constants/settings'

export function debuglog(...data: any) {
  if (DEBUG_ENABLED) {
    console.log(...data)
  }
}
