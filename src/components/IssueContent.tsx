import { useNavigate } from 'react-router-dom';
import { IssueDetailDivStyle, IssueDivStyle } from '../styles/issuesStyle';

interface IssueContentProps {
  id?: number | undefined | null;
  title?: string | null | undefined;
  user?: string | null | undefined;
  updateAt?: string | null | undefined;
  comments?: number | undefined;
  img?: string;
}

const IssueContent = ({
  id,
  title,
  user,
  updateAt,
  comments,
  img,
}: IssueContentProps) => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const isImg = Boolean(img);

  const DetailLinked = (id: number | null | undefined) => {
    if (id) {
      return () => {
        navigate(`/issues/${id}`);
      };
    }
  };

  return (
    <>
      {isImg ? (
        <IssueDetailDivStyle>
          <div>
            <img src={img} alt={img} />
          </div>
          <div>
            <div>
              <span>#{id}</span>
              <span>{title}</span>
            </div>
            <div>
              <span>{user}</span>
              <span>{updateAt}</span>
            </div>
          </div>
          <div>
            <span>Comment</span>
            <span>{comments}</span>
          </div>
        </IssueDetailDivStyle>
      ) : (
        <IssueDivStyle onClick={DetailLinked(id)}>
          <div>
            <div>
              <span>#{id}</span>
              <span>{title}</span>
            </div>
            <div>
              <span>{user}</span>
              <span>{updateAt}</span>
            </div>
          </div>
          <div>
            <span>Comment</span>
            <span>{comments}</span>
          </div>
        </IssueDivStyle>
      )}
    </>
  );
};

export default IssueContent;
