import express from 'express';
import React from 'react';
import IndexPage from 'app/components/index.page.jsx';
import Board from 'app/components/board.js';

const router = express.Router();

router.get('/', (req, res) => {
    const IndexPageFactory = React.createFactory(IndexPage);
    const data = {board: Board.generate()};

    var view = React.renderToString(IndexPageFactory(data));

    res.render('index', { view: view, data: JSON.stringify(data) });
});

module.exports = router;
