import { notification } from 'antd'

/**
 * Notification: Genera una notificacion a partir del package 'antd'
 * @param {string} id formatMessage id
 * @param {object} intl intl object
 * @param {boolean} isError true: hay error | false: no hay error
 */
const NotificationGenerator = (id = ' ', intl, error) => {
  if (error) {
    notification.error({
      message: intl.formatMessage({ id }),
      style: {
        background: 'rgba(254, 61, 46, 0.1)',
        border: '0.5px solid #FE3D2E',
        borderRadius: '3px',
      },
    })
  } else {
    notification.success({
      message: intl.formatMessage({ id }),
      style: {
        background: 'rgba(57, 228, 137, 0.15)',
        border: '0.5px solid #39E489',
        borderRadius: '3px',
      },
    })
  }
}

export default NotificationGenerator
