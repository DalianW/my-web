import axios from 'axios';
import qs from 'qs';
import { notification } from 'ant-design-vue';
function request(options) {
  const baseURL =
    process.env.NODE_ENV === 'production' ? 'http://lian.xkmov.net/' : '/api';
  // options.params = qs.stringify(options.params);
  return axios[options.method](
    baseURL + options.url,
    qs.stringify(options.params)
  )
    .then(res => {
      if (res.status == 200) {
        return {
          result: true,
          data: res.data,
        };
      } else {
        notification.error({
          // eslint-disable-next-line no-unused-vars
          message: res.statusText,
        });
        return {
          result: false,
          data: res,
        };
      }
    })
    .catch(error => {
      const {
        response: { status, statusText },
      } = error;
      notification.error({
        // eslint-disable-next-line no-unused-vars
        message: h => (
          <div>
            请求错误<span style="color:red">{status}</span>:{options.url}
          </div>
        ),
        description: statusText,
      });
      return Promise.reject(error);
    });
}

export default request;
