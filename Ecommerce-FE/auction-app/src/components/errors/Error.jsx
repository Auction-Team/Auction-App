import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Error.css';

export default function Error(props) {
  const navigate = useNavigate();
  let {
    status = '404',
    title,
  } = props;

  if (!title) {
    switch (status) {
      case '404':
        title = 'Sorry, the page you visited does not exist.';
        break;
      case '403':
        title = 'Sorry, you are not authorized to access this page.';
        break;
      case '500':
        title = 'Sorry, something went wrong.';
        break;
      default:
        break;
    }
  }

  return (
    <Result
      status={status}
      title={status}
      subTitle={title}
      extra={
        <>
          <Button type="primary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <Button type="primary" onClick={() => navigate('/')}>
            Return Home
          </Button>
        </>
      }
    />
  );
}
