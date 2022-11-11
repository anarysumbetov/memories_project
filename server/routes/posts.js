import express from 'express';
const router = express();

router.get('/', (req, res) => {
    res.send('THIS WORKS!');
});

export default router;