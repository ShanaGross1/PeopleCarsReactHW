import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function WithRouter(Component) {
    return function WrapperComponent(props) {
        const params = useParams();
        const navigate = useNavigate();

        return <Component {...props} params={params} navigate={navigate} />;
    };
}

export default WithRouter;