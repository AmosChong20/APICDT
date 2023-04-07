export default function handler(req, res) {
    const startTime = new Date(req.body.startTime);
    const endTime = new Date(req.body.endTime);
    const clickedTime = new Date();
    const duration = clickedTime - startTime;
    const checkPast = clickedTime - endTime;
    console.log(clickedTime, startTime, endTime);
    // console.log(duration);
    res.status(200).json({ totalDuration: duration, checkPast: checkPast });
}