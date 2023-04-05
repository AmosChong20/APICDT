export default function handler(req, res) {
    const startTime = new Date('2023-04-06T20:00:00');
    const clickedTime = new Date();
    const duration = clickedTime - startTime;
    // console.log(clickedTime, startTime);
    // console.log(duration);
    res.status(200).json({ duration });
}