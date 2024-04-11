// 7 seconds timeout request
export const TIMEOUT_REQUEST_API = 70000;

export const BASE_URL=process.env.REACT_APP_API_URL;

export const ROLE_GENERAL = {
  USER_DEFAULT: 'user',
  ADMIN: 'admin',
  SUPER_ADMIN: 'superadmin'
}

export const MESSSAGE_STATUS_CODE = {
    SUCCESS: {
        code: 200,
        message: 'Success'
    },
    INTERNAL_NETWORK_ERROR: {
        code: 500,
        message: 'Internal network error'
    },
    NO_CONTENT: {
        code: 204,
        message: 'No content'
    },
    NOT_FOUND: {
        code: 404,
        message: 'Not found'
    },
    BAD_REQUEST: {
        code: 400,
        message: 'Bad request'
    },
    UNAUTHORISED: {
        code: 401,
        message: 'Unauthorized'
    },
    INVALID_BODY: {
        code: 403,
        message: 'Invalid body'
    },
    UNDER_CONSTRUCTION: {
        code: 593,
        message: 'System is currently undergoing maintenance. Please try again later.'
    },
    PERMISSION_DENIED: {
        code: 406,
        message: 'Permission Denied'
    },
    WRONG_PAGINATION: {
        code: 407,
        message: 'Wrong pagination query'
    },
    INVALID_PASSWORD: {
        code: 4000,
        message: 'Invalid password'
    },
    INVALID_EMAIL: {
        code: 4002,
        message: 'Invalid email'
    },
    USER_REGISTERED: {
        code: 4003,
        message: 'User already registered'
    },
    USER_NOT_FOUND: {
        code: 4004,
        message: 'User not found'
    },
    EMAIL_PASSWORD_INVALID: {
        code: 4005,
        message: 'Email or password invalid'
    },
    WRONG_PAGINATION_QUERY: {
        code: 4006,
        message: 'Wrong pagination query'
    },
    WRONG_BODY: {
        code: 5002,
        message: 'Wrong body'
    },
    PACKAGE_CONFIRMED: {
        code: 5003,
        message: 'Package already confirmed'
    },
    INVALID_PACKAGE_DAYS: {
        code: 5004,
        message: 'Invalid package days. Must be multiple of 30'
    },
    TRAIL_PACKAGE_CREATED: {
        code: 5005,
        message: 'Trial package already created'
    },
    INVALID_PACKAGE_NAME: {
        code: 5006,
        message: 'Invalid package name'
    },
    CONFLICT_TIME_STREAM: {
        code: 3001,
        message: 'Conflict time stream'
    },
    INVALID_RESOLUTION: {
        code: 3002,
        message: 'Invalid resolution'
    },
    AGENT_EXISTS: {
        code: 3503,
        message: 'Agent exists'
    },
    INVALID_URL: {
      code: 3003,
      message: 'Invalid url'
    },
    INVAID_START_END_TIME: {
      code: 3004,
      message: 'Invalid start end time, ended time must be after started time, and ended time must be after now'
    },
    INVALID_YOUTUBE_STREAM_KEY: {
      code: 3005,
      message: 'Invalid youtube live stream key'
    },
    USER_STREAM_NOT_FOUND: {
      code: 3006,
      message: 'User stream not found'
    },
    STREAMING_NOT_FOUND: {
      code: 3007,
      message: 'Streaming not found'
    },
    STREAMING_NOT_RUNNING: {
      code: 3008,
      message: 'Streaming not running'
    },
    STREAMING_RUNNING: {
      code: 3011,
      message: 'Streaming is streaming'
    },
    STREAM_EXPIRED: {
      code: 3010,
      message: 'Stream expired'
    },
    STREAMING_AGENT_NOT_RUNNING: {
      code: 3009,
      message: 'Stream from agent not running'
    },
    NOT_FOUND_AGENT: {
      code: 3504,
      message: 'Not found agent'
    },
    AGENT_ASSIGNED: {
      code: 3505,
      message: 'Agent assigned'
    },
    AGENT_NOT_RUNNING: {
      code: 3506,
      message: 'Agent not running'
    },
    OUT_OF_MAX_STREAM: {
      code: 3509,
      message: 'Out of max stream'
    },
    ONLY_UPDATE_PENDING_STREAM: {
      code: 3012,
      message: 'Only update pending streaming'
    },
    ONLY_PLAY_PENDING_STREAM: {
      code: 3013,
      message: 'Only play pending streaming'
    },
    INVALID_ORDER_BY: {
      code: 3014,
      message: 'Invalid order by'
    },
    KEY_STREAM_EXIST_IN_OTHER: {
      code: 3601,
      message: 'Key of stream exists at other stream'
    },
    REFUSED_UPDATE_WHEN_STREAMING: {
      code: 3602,
      messsage: 'Can not update stream when it is livestreaming'
    },
    STREAMING_STATUS_DOWNLOADING: {
      code: 6,
      message: 'Video is dowloading'
    }
}