import React from 'react';
import '../styles/centerContent.css';

type DivProps = React.HTMLAttributes<HTMLDivElement>;

const CenterContent: React.FC<DivProps> = ({ children }) => {
    return <div className="center-content-div">{children}</div>;
};

export default CenterContent;
