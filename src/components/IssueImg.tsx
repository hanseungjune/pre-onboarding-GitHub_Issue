import { IssueImgDivStyle, IssueImgStyle } from '../styles/issuesStyle';
import { Link } from 'react-router-dom';

interface IssueImgProps {
  src?: string | undefined;
}

export interface IssueImgStyleProps {
  imageUrl: string | undefined;
}

const IssueImg = ({ src }: IssueImgProps) => {
  const style = {
    backgroundImage: `url('${src}')`,
  };

  return (
    <Link to={`https://www.wanted.co.kr/jobsfeed`}>
      <IssueImgDivStyle>
        <IssueImgStyle style={style} />
      </IssueImgDivStyle>
    </Link>
  );
};

export default IssueImg;
