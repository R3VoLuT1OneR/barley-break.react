import React from 'react';
import IndexPage from 'app/components/index.page';

const PageFactory = React.createFactory(IndexPage);

React.render(
    PageFactory(JSON.parse(document.getElementById('react-data').innerHTML)),
    document.getElementById('react-mount')
);